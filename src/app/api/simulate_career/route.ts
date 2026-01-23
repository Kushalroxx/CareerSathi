// app/api/simulate_career/route.ts
import { NextResponse } from "next/server";
import { VertexAI } from "@google-cloud/vertexai";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
    const { careerRole } = await req.json();
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!careerRole) {
      return NextResponse.json({ error: "Missing 'careerRole' in request body." }, { status: 400 });
    }
    const userContext = await prisma.userProfile.findUnique({
      where: { userId: session.user.id }
    })
    
    // Initialize Vertex AI client
    const vertexAI = new VertexAI({
      project: process.env.GOOGLE_PROJECT_ID,
      location: process.env.LOCATION || "us-central1",
      googleAuthOptions:{
        credentials:JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS || "{}")
      }
    });

    const geminiModel = vertexAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const imageModel = vertexAI.getGenerativeModel({ model: "gemini-2.5-flash-image" }); 

 const prompt = `
You are "Hars_h", a Career Mentor AI. 
**TONE:** "Compassionate Reality" (Honest but encouraging). Use "sugar-coated reality" language. 
Your goal is to guide the user without breaking their spirit. Identify weaknesses as "Growth Opportunities".

Generate a single JSON object (no extra text) for the career "${careerRole}", **critically tailored** to the user's specific context. 
User Context: ${JSON.stringify(userContext || {})}

**SPEED INSTRUCTIONS:**
1. Generate **EXACTLY 2** scenarios (Do not generate 4-5).
2. Keep descriptions concise (max 2 sentences).
3. Do NOT include a "visual_prompt" field in the JSON (we handle images separately).

Schema:
{
  "careerRole": "${careerRole}",
  "overview": "<1-2 sentence encouraging but realistic snapshot>",
  "average_daily_routine": "<one paragraph describing typical hours/tasks>",
  "core_soft_skills": ["skill1","skill2"],

  "scenarios": [
    {
      "id": 1,
      "title": "Short, realistic scenario title",
      "description": "2 sentences on a realistic dilemma tailored to the user.",
      "skill_focus": "Primary soft skill",
      "stakeholder_persona": {
        "role": "Stakeholder role",
        "initial_message": "One-line urgent message"
      },
      "choices": [
        {"choice_id": 1, "action": "Choice text"},
        {"choice_id": 2, "action": "Choice text"},
        {"choice_id": 3, "action": "Choice text"}
      ],
      "expected_choice_evaluations": {
        "1": {"evaluation_hint":"HTML_STRING", "impact_score": 0-100},
        "2": {"evaluation_hint":"HTML_STRING", "impact_score": 0-100},
        "3": {"evaluation_hint":"HTML_STRING", "impact_score": 0-100}
      }
    }
  ],

  "related_roles": [
    {"role":"Alternative role","reason":"one-line reason"}
  ]
}

**CRITICAL EVALUATION FORMAT:**
For each "evaluation_hint", combine these 4 points into a single HTML string.
Note: "Weakness" is renamed to "Growth Opportunity".

Format:
"<b>Reality Check:</b> [Truth]<br><b>Growth Opportunity:</b> [Skill to improve]<br><b>Micro-Task:</b> [Action]<br><b>Inspiration:</b> [Quote]"

---
**CRITICAL OUTPUT CONSTRAINTS (MANDATORY):**
1.  **JSON ONLY:** Your *entire* response MUST be a single, valid JSON object.
2.  **NO EXTRA TEXT:** Do NOT add *any* text, commentary, or markdown (like \`\`\`json).
3.  **ESCAPE ALL STRINGS:** Escape all internal double quotes (\\") inside strings.
---
`;

    const imagePrompt = `Cinematic, photorealistic shot of a professional ${careerRole} in their typical working environment. Professional lighting, high detail, 4k.`;
    
    const generateImageWithRetry = async (attempts = 3) => {
        for (let i = 0; i < attempts; i++) {
            try {
                console.log(`Image Gen Attempt ${i + 1}/${attempts}...`);
                const result = await imageModel.generateContent({
                    contents: [{ role: "user", parts: [{ text: imagePrompt }] }],
                }, 
                
                // @ts-ignore
                { numberOfImages: 1, aspectRatio: "16:9", outputMimeType: "image/jpeg" });
                
                console.log(result.response?.candidates?.[0]?.content?.parts);
                return result; 
            } catch (error) {
                console.warn(`Image Attempt ${i + 1} failed:`, error);
                if (i === attempts - 1) return null; 
            }
        }
        return null;
    };


    // 2. Text Generation with Retry Logic
    const generateTextWithRetry = async (attempts = 3) => {
        for (let i = 0; i < attempts; i++) {
            try {
                // console.log(`Text Gen Attempt ${i + 1}/${attempts}...`);
                
                const result = await geminiModel.generateContent({
                    contents: [{ role: "user", parts: [{ text: prompt }] }],
                }, 
                // @ts-ignore
                { responseMimeType: "application/json" });

                const jsonText = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
                const cleaned = jsonText.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
                
                // PARSE & VALIDATE
                const parsed = JSON.parse(cleaned);
                
                if (!parsed.scenarios || !Array.isArray(parsed.scenarios) || parsed.scenarios.length < 1) {
                    throw new Error("Invalid JSON structure: Missing scenarios array");
                }
                
                return parsed; // Success! Return immediately.

            } catch (error) {
                console.warn(`Text Attempt ${i + 1} failed:`, error);
                if (i === attempts - 1) throw error; // If last attempt failed, crash.
            }
        }
    };

    // 3. Await Both (Both will retry internally if needed)
    const [parsedData, imageResult] = await Promise.all([
        generateTextWithRetry(), 
        generateImageWithRetry()
    ]);

    // --- PROCESS RESULTS ---

    let primaryImageBase64: string | undefined = undefined;
    if (imageResult) {
        const base64Img = imageResult.response?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data||imageResult.response?.candidates?.[0]?.content?.parts?.[1]?.inlineData?.data;
        if (base64Img) primaryImageBase64 = `data:image/jpeg;base64,${base64Img}`;
    }

    // Convert evaluations
    for (const s of parsedData.scenarios) {
      const evals = s.expected_choice_evaluations || {};
      const choices = s.choices || [];
      s.choices = choices.map((ch: any) => {
        const key = String(ch.choice_id);
        const ev = evals[key] || {};
        return {
          choice_id: ch.choice_id,
          action: ch.action,
          evaluation_hint: ev.evaluation_hint || null,
          impact_score: typeof ev.impact_score === "number" ? ev.impact_score : null,
        };
      });
      delete s.expected_choice_evaluations;
    }

    const responsePayload = {
      careerRole: parsedData.careerRole || careerRole,
      overview: parsedData.overview || `A day-in-the-life snapshot for ${careerRole}.`,
      average_daily_routine: parsedData.average_daily_routine || "",
      core_soft_skills: parsedData.core_soft_skills || [],
      scenarios: parsedData.scenarios,
      related_roles: parsedData.related_roles || [],
      primary_image: primaryImageBase64 ?? null
    };

    return NextResponse.json(responsePayload);

  } catch (err) {
    console.error("Error generating career simulation (All retries failed):", err);
    // const fallbackImageBase64 = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop";

    // const fallbackResponse = {
    //   careerRole: "Fullstack Developer",
    //   overview: "You are the Swiss Army knife of the tech world, balancing user-centric UI with bulletproof server logic. It's not just about code; it's about solving problems end-to-end.",
    //   average_daily_routine: "Your day starts at 9:30 AM with a 15-minute standup, syncing with the product manager and QA. By 10:00 AM, you're deep in VS Code, stitching a React frontend to a Node.js API. After a quick lunch, you spend the afternoon debugging a tricky database query and reviewing a junior dev's pull request. The day ends updating Jira tickets and deploying a hotfix to staging.",
    //   core_soft_skills: ["Adaptability", "System Thinking"],
    //   primary_image: fallbackImageBase64,
    //   scenarios: [
    //     {
    //       id: 1,
    //       title: "The Deadline vs. Debt Dilemma",
    //       description: "Marketing wants the new dashboard feature launched by Friday for a promo event. You know the current code is 'spaghetti' and adding this feature without refactoring will break the reporting tool.",
    //       skill_focus: "Negotiation & Technical Debt Management",
    //       stakeholder_persona: {
    //         role: "Product Manager (Sarah)",
    //         initial_message: "We absolutely need this live by Friday or we lose the ad spend. Can we just patch it in?"
    //       },
    //       choices: [
    //         {
    //           choice_id: 1,
    //           action: "Agree to patch it in ('Quick & Dirty').",
    //           evaluation_hint: "<b>Reality Check:</b> You hit the deadline, but the reporting tool crashed on Monday.<br><b>Growth Opportunity:</b> Assertiveness<br><b>Micro-Task:</b> Learn to say 'Yes, but here is the risk.'<br><b>Inspiration:</b> 'Technical debt is like a loan; eventually you pay interest.'",
    //           impact_score: 40
    //         },
    //         {
    //           choice_id: 2,
    //           action: "Refuse. Tell her it takes 2 weeks, period.",
    //           evaluation_hint: "<b>Reality Check:</b> Marketing canceled the campaign. You are seen as a blocker, not a partner.<br><b>Growth Opportunity:</b> Empathy<br><b>Micro-Task:</b> Always offer an alternative solution, not just a 'No'.<br><b>Inspiration:</b> 'Code serves the business, not the other way around.'",
    //           impact_score: 30
    //         },
    //         {
    //           choice_id: 3,
    //           action: "Propose a 'Feature Flag' release with reduced scope.",
    //           evaluation_hint: "<b>Reality Check:</b> Sarah agreed. You shipped the UI, disabled the risky backend part, and bought time to refactor next week.<br><b>Growth Opportunity:</b> Strategic Compromise<br><b>Micro-Task:</b> Research 'Feature Toggles' for safer deployments.<br><b>Inspiration:</b> 'Perfect is the enemy of done.'",
    //           impact_score: 95
    //         }
    //       ]
    //     },
    //     {
    //       id: 2,
    //       title: "The Blame Game",
    //       description: "The production site is throwing 500 errors. The frontend team says the API is broken. The backend team says the frontend is sending bad data. You are the only one who knows both stacks.",
    //       skill_focus: "Leadership & Debugging",
    //       stakeholder_persona: {
    //         role: "CTO (David)",
    //         initial_message: "Site is down. Everyone is pointing fingers. I need this fixed NOW."
    //       },
    //       choices: [
    //         {
    //           choice_id: 1,
    //           action: "Pick a side and defend the backend logic.",
    //           evaluation_hint: "<b>Reality Check:</b> You wasted 2 hours proving you were right while users couldn't log in.<br><b>Growth Opportunity:</b> Ownership<br><b>Micro-Task:</b> Stop arguing, start reading logs.<br><b>Inspiration:</b> 'Egos don't fix bugs.'",
    //           impact_score: 20
    //         },
    //         {
    //           choice_id: 2,
    //           action: "Jump on a call, open the logs, and trace the request ID.",
    //           evaluation_hint: "<b>Reality Check:</b> You found a typo in the JSON payload within 10 minutes. Crisis averted.<br><b>Growth Opportunity:</b> Crisis Management<br><b>Micro-Task:</b> Practice reading server logs (AWS CloudWatch/Sentry).<br><b>Inspiration:</b> 'Be the calmest person in the room.'",
    //           impact_score: 100
    //         },
    //         {
    //           choice_id: 3,
    //           action: "Quietly fix the code without telling anyone.",
    //           evaluation_hint: "<b>Reality Check:</b> It's fixed, but nobody learned what went wrong. It will happen again.<br><b>Growth Opportunity:</b> Communication<br><b>Micro-Task:</b> Write a 'Post-Mortem' incident report.<br><b>Inspiration:</b> 'Mistakes are tuition for learning.'",
    //           impact_score: 60
    //         }
    //       ]
    //     }
    //   ],
    //   related_roles: [
    //     { role: "DevOps Engineer", reason: "Focuses more on the deployment pipeline and servers." },
    //     { role: "Product Manager", reason: "Uses technical knowledge to guide product strategy." }
    //   ]
    // };

    return NextResponse.json( { status: 200 });
  }
}
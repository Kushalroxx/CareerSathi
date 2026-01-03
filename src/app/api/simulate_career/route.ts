// app/api/simulate_career/route.ts
import { NextResponse } from "next/server";
import { VertexAI } from "@google-cloud/vertexai";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Result } from "postcss";

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
    return NextResponse.json({
      error: `Failed to generate simulation after multiple attempts. Please try again.`,
      details: (err as any).message ?? null
    }, { status: 500 });
  }
}
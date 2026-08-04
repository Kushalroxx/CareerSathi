import { VertexAI, Content } from "@google-cloud/vertexai";
import { prisma } from "../prisma";
import { VectorDb } from "../vectorDb";
import { textEmbedding } from "../vertex";
import { Session } from "next-auth";
import { careerSathiTools, prompt } from "./tools";
import { userProfileToString } from "../userProfileToString";

export const streamAndResHandler = async (
    message: string, 
    history: any[], 
    chatId: string, 
    session: Session, 
    controller: ReadableStreamDefaultController, 
    encoder: TextEncoder
) => {
    const vertex = new VertexAI({
        project: process.env.GOOGLE_PROJECT_ID!,
        // location: "us-central1",
        googleAuthOptions: {
            credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS || "{}")
        },
    });

    const systemPromptText = `
User Name: ${session.user.name}
${prompt}
Recent Chat:
${JSON.stringify(history.slice(-3).map((msg: any) => `${msg.role === "user" ? "User" : "CareerSathi"}: ${msg.text}`).join("\n"))}`;

    const model = vertex.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: { 
            role: "system",
            parts: [{ text: systemPromptText }] },
        tools: careerSathiTools
    });

    try {
        let completeResponseText = "";
        let newlyCreatedRoadmapUrl = "";

        const currentContents: Content[] = history.map((msg) => ({
            role: msg.role === "assistant" || msg.role === "model" ? "model" : "user",
            parts: [{ text: msg.text }]
        }));

        currentContents.push({ role: "user", parts: [{ text: message }] });

        const streamOrHandleTools = async (depth = 0) => {
            if (depth > 5) {
                console.warn("Tool loop limit reached.");
                const abortMsg = "\n\n*(Continuing chat...)*";
                completeResponseText += abortMsg;
                controller.enqueue(encoder.encode(abortMsg));
                return;
            }

            const responseStream = await model.generateContentStream({
                contents: currentContents,
            });

            let functionCallName = "";
            let functionCallArgs: any = null;

            for await (const chunk of responseStream.stream) {
                const part = chunk.candidates?.[0]?.content?.parts?.[0];
                
                if (part?.text) {
                    completeResponseText += part.text;
                    controller.enqueue(encoder.encode(part.text));
                }
                
                if (part?.functionCall) {
                    functionCallName = part.functionCall.name;
                    functionCallArgs = part.functionCall.args;
                }
            }
            if (functionCallName) {
                console.log(`[Tool Call - Depth ${depth}]:`, functionCallName);
                currentContents.push({
                    role: "model",
                    parts: [{ functionCall: { name: functionCallName, args: functionCallArgs } }]
                });

                let toolResponseData: any = {};
                const args = functionCallArgs || {};

                try {
                    if (functionCallName === "get_user_context") {
                        const [userProfile, activeRoadmaps] = await Promise.all([
                            prisma.userProfile.findUnique({ where: { userId: session.user.id } }),
                            prisma.roadmap.findMany({ where: { userId: session.user.id }, select: { id: true, careerPath: true } })
                        ]);
                        toolResponseData = {
                            profile: userProfile ? userProfileToString(userProfile) : "No profile",
                            activeRoadmaps: activeRoadmaps
                        };
                    } 
                    else if (functionCallName === "get_roadmap_details") {
                        const roadmapData = await prisma.roadmap.findUnique({
                            where: { id: args.roadmapId, userId: session.user.id },
                            include: { skillsToLearn: true, recommendedProjects: true }
                        });
                        toolResponseData = roadmapData ? roadmapData : { error: "Roadmap not found." };
                    }
                    else if (functionCallName === "search_past_memory") {
                        const vectorDb = VectorDb.getInstance();
                        const embMessage = await textEmbedding(message);
                        const pastData = await vectorDb.getFromVectorDb(session.user.id, embMessage, chatId);
                        toolResponseData = { memory: pastData.map((e: any) => e.payload?.text_content).join("\n") };
                    } 
                    else if (functionCallName === "create_new_roadmap") {
                        const newRoadmap = await prisma.roadmap.create({
                            data: {
                                careerPath: args.careerPath,
                                skillsToLearn: { create: (args.skillsToLearn || []).map((skill: string) => ({ skill, done: false })) },
                                recommendedProjects: {
                                    create: (args.recommendedProjects || []).map((project: any) => ({
                                        title: project.title || "Untitled",
                                        description: project.description || "No description.",
                                    })),
                                },
                                user: { connect: { id: session.user.id } }
                            },
                        });
                        newlyCreatedRoadmapUrl = `\n\nI've created a new roadmap for you! \n\n[View your ${args.careerPath} roadmap](/roadmap/${newRoadmap.id})`;
                        toolResponseData = { success: true, roadmapId: newRoadmap.id };
                    }
                    else if (functionCallName === "update_roadmap") {
                        const updatedRoadmap = await prisma.roadmap.update({
                            where: { id: args.roadmapId, userId: session.user.id },
                            data: {
                                skillsToLearn: { 
                                    deleteMany: {}, 
                                    create: (args.skillsToLearn || []).map((skill: string) => ({ skill, done: false })) 
                                },
                                recommendedProjects: {
                                    deleteMany: {}, 
                                    create: (args.recommendedProjects || []).map((project: any) => ({
                                        title: project.title || "Untitled",
                                        description: project.description || "No description.",
                                    })),
                                },
                            },
                        });
                        newlyCreatedRoadmapUrl = `\n\nI've successfully updated your roadmap to match your requested difficulty! \n\n[View your updated roadmap](/roadmap/${updatedRoadmap.id})`;
                        toolResponseData = { success: true };
                    }
                } catch (err) {
                    console.error(`Tool execution failed for ${functionCallName}:`, err);
                    toolResponseData = { error: "Tool execution failed" };
                }
                currentContents.push({
                    role: "user",
                    parts: [{ functionResponse: { name: functionCallName, response: toolResponseData } }]
                });
                await streamOrHandleTools(depth + 1);
            }
        };

        await streamOrHandleTools(0);

        if (newlyCreatedRoadmapUrl) {
            completeResponseText += newlyCreatedRoadmapUrl;
            controller.enqueue(encoder.encode(newlyCreatedRoadmapUrl));
        }
        if (history.length <= 1) {
            try {
                const titleRes = await model.generateContent(`Summarize this message into a highly concise 3-5 word title: "${message}"`);
                const generatedTitle = titleRes.response.candidates?.[0]?.content?.parts?.[0]?.text || "New Career Chat";
                controller.enqueue(encoder.encode(`__CHAT_TITLE__${generatedTitle.trim().replace(/["*]/g, '')}`));
            } catch (err) {
                controller.enqueue(encoder.encode(`__CHAT_TITLE__New Career Chat`));
            }
        }

        if (message.split(" ").length > 2) { 
            try {
                const vectorDb = VectorDb.getInstance();
                const cleanReplyText = completeResponseText.split("__CHAT_TITLE__")[0];
                const [embMsg, embReply] = await Promise.all([
                    textEmbedding(message),
                    textEmbedding(cleanReplyText)
                ]);
                await vectorDb.saveToVectorDb(session.user.id, embMsg, `User: ${message}`, chatId);
                await vectorDb.saveToVectorDb(session.user.id, embReply, `CareerSathi: ${cleanReplyText}`, chatId);
            } catch (err) {
                console.error("Vector DB save failed:", err);
            }
        }
        controller.close();

    } catch (err) {
        console.error("Streaming error:", err);
        controller.enqueue(encoder.encode("\n\n*Sorry, something went wrong. Please try again.*"));
        controller.close();
    }
}
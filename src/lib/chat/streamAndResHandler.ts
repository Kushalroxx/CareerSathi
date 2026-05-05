import { BedrockRuntimeClient, ConverseCommand, ConverseStreamCommand } from "@aws-sdk/client-bedrock-runtime";
import { prisma } from "../prisma";
import { VectorDb } from "../vectorDb";
import { textEmbedding } from "../vertex";
import { Session } from "next-auth";
import { careerSathiTools, prompt } from "./tools";
import { userProfileToString } from "../userProfileToString";
import { NodeHttpHandler } from "@smithy/node-http-handler";

const BEDROCK_MODEL_ID = "openai.gpt-oss-safeguard-120b";
export const streamAndResHandler = async (message: string, history: any[], chatId: string, session: Session, controller: ReadableStreamDefaultController, encoder: TextEncoder) => {
    const bedrockClient = new BedrockRuntimeClient({
    region: process.env.AWS_REGION || "us-west-2",
    maxAttempts: 3,
        requestHandler: new NodeHttpHandler({
            connectionTimeout: 10000, 
            requestTimeout: 60000,    
        }),
});
    const systemPromptText = `
    User Name: ${session.user.name}
  ${prompt}
  Recent Chat:
  ${JSON.stringify(history.slice(-3).map((msg: any) => `${msg.role === "user" ? "User" : "CareerSathi"}: ${msg.text}`).join("\n"))}`;

    try {
        let completeResponseText = "";
        let newlyCreatedRoadmapUrl = "";

        // Bedrock standard message format
        const currentContents: any[] = [
            { role: "user", content: [{ text: message }] }
        ];

        const streamOrHandleTools = async (depth = 0) => {
            if (depth > 5) {
                console.warn("Tool loop limit reached.");
                const abortMsg = "\n\n*(Continuing chat...)*";
                completeResponseText += abortMsg;
                controller.enqueue(encoder.encode(abortMsg));
                return;
            }

            const command = new ConverseStreamCommand({
                modelId: BEDROCK_MODEL_ID,
                system: [{ text: systemPromptText }],
                messages: currentContents,
                toolConfig: { tools: careerSathiTools }
            });

            const response = await bedrockClient.send(command);

            let toolUseId = "";
            let toolName = "";
            let toolInputAccumulator = "";

            // Parse the Bedrock Stream
            for await (const event of response.stream!) {
                if (event.contentBlockDelta?.delta?.text) {
                    completeResponseText += event.contentBlockDelta.delta.text;
                    controller.enqueue(encoder.encode(event.contentBlockDelta.delta.text));
                }
                if (event.contentBlockStart?.start?.toolUse) {
                    toolUseId = event.contentBlockStart.start.toolUse.toolUseId || "";
                    toolName = event.contentBlockStart.start.toolUse.name || "";
                }
                if (event.contentBlockDelta?.delta?.toolUse?.input) {
                    toolInputAccumulator += event.contentBlockDelta.delta.toolUse.input;
                }
            }

            // If the LLM decided to use a tool during the stream
            if (toolName) {
                console.log(`[Tool Call - Depth ${depth}]:`, toolName);
                
                let args: any = {};
                if (toolInputAccumulator) {
                    try { args = JSON.parse(toolInputAccumulator); } catch (e) { console.error("Failed to parse tool args", e); }
                }

                // Append the AI's tool request to history so Bedrock maintains context
                currentContents.push({
                    role: "assistant",
                    content: [{ toolUse: { toolUseId, name: toolName, input: args } }]
                });

                let toolResponseData: any = {};

                try {
                    if (toolName === "get_user_context") {
                        const [userProfile, activeRoadmaps] = await Promise.all([
                            prisma.userProfile.findUnique({ where: { userId: session.user.id } }),
                            prisma.roadmap.findMany({ where: { userId: session.user.id }, select: { id: true, careerPath: true } })
                        ]);
                        toolResponseData = {
                            profile: userProfile ? userProfileToString(userProfile) : "No profile",
                            activeRoadmaps: activeRoadmaps
                        };
                    } 
                    else if (toolName === "get_roadmap_details") {
                        const roadmapData = await prisma.roadmap.findUnique({
                            where: { id: args.roadmapId, userId: session.user.id },
                            include: { skillsToLearn: true, recommendedProjects: true }
                        });
                        toolResponseData = roadmapData ? roadmapData : { error: "Roadmap not found." };
                    }
                    else if (toolName === "search_past_memory") {
                        const vectorDb = VectorDb.getInstance();
                        const embMessage = await textEmbedding(message);
                        const pastData = await vectorDb.getFromVectorDb(session.user.id, embMessage, chatId);
                        toolResponseData = { memory: pastData.map((e: any) => e.payload?.text_content).join("\n") };
                    } 
                    else if (toolName === "create_new_roadmap") {
                        const newRoadmap = await prisma.roadmap.create({
                            data: {
                                careerPath: args.careerPath,
                                skillsToLearn: { create: args.skillsToLearn.map((skill: string) => ({ skill, done: false })) },
                                recommendedProjects: {
                                    create: args.recommendedProjects.map((project: any) => ({
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
                    else if (toolName === "update_roadmap") {
                        const updatedRoadmap = await prisma.roadmap.update({
                            where: { id: args.roadmapId, userId: session.user.id },
                            data: {
                                skillsToLearn: { 
                                    deleteMany: {}, 
                                    create: args.skillsToLearn.map((skill: string) => ({ skill, done: false })) 
                                },
                                recommendedProjects: {
                                    deleteMany: {}, 
                                    create: args.recommendedProjects.map((project: any) => ({
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
                    console.error(`Tool execution failed for ${toolName}:`, err);
                    toolResponseData = { error: "Tool execution failed" };
                }

                // Feed the database result back to Bedrock so it can form a natural sentence
                currentContents.push({
                    role: "user",
                    content: [{ toolResult: { toolUseId, content: [{ json: toolResponseData }] } }]
                });

                await streamOrHandleTools(depth + 1);
            }
        };

        await streamOrHandleTools(0);

        if (newlyCreatedRoadmapUrl) {
            completeResponseText += newlyCreatedRoadmapUrl;
            controller.enqueue(encoder.encode(newlyCreatedRoadmapUrl));
        }

        // Title Generation using Bedrock
        if (history.length <= 1) {
            try {
                const titleCommand = new ConverseCommand({
                    modelId: BEDROCK_MODEL_ID,
                    messages: [{ role: "user", content: [{ text: `Summarize this message into a highly concise 3-5 word title: "${message}"` }] }]
                });
                const titleRes = await bedrockClient.send(titleCommand);
                const generatedTitle = titleRes.output?.message?.content?.[0]?.text || "New Career Chat";
                
                controller.enqueue(encoder.encode(`__CHAT_TITLE__${generatedTitle.trim().replace(/["*]/g, '')}`));
            } catch (err) {
                controller.enqueue(encoder.encode(`__CHAT_TITLE__New Career Chat`));
            }
        }

        controller.close();

        // Save embeddings asynchronously 
        if (message.split(" ").length > 5) {
            Promise.resolve().then(async () => {
                try {
                    const vectorDb = VectorDb.getInstance();
                    const embMsg = await textEmbedding(message);
                    const embReply = await textEmbedding(completeResponseText.split("__CHAT_TITLE__")[0]);
                    await vectorDb.saveToVectorDb(session.user.id, embMsg, `User: ${message}`, chatId);
                    await vectorDb.saveToVectorDb(session.user.id, embReply, `CareerSathi: ${completeResponseText.split("__CHAT_TITLE__")[0]}`, chatId);
                } catch (err) {}
            });
        }

    } catch (err) {
        console.error("Streaming error:", err);
        controller.enqueue(encoder.encode("\n\n*Sorry, something went wrong. Please try again.*"));
        controller.close();
    }
}
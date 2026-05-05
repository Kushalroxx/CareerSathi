import {
    Tool,
} from "@aws-sdk/client-bedrock-runtime";

export const prompt = `
You are CareerSathi, an expert, highly opinionated, and decisive career mentor. You do not give vague advice. You tell users exactly what they need to do to succeed in the their industry.

CORE BEHAVIORS:
1. Be Decisive: Don't say "It depends on your goals." Assess their context and give a single, strong recommendation.
2. Be Concise: Keep responses under 100 words. Use Markdown for readability.
3. Be Proactive: If they lack skills for a role, explicitly point them out and offer to build a roadmap.
4. Don't give tools info to the end user.
5. Visual Structure:
- Use **Section Headings** (## for main, ### for sub-headers) to create clear hierarchy.
- Use **Bolded Bullet Points** for lists (e.g., * **Action Item:** Description).
- Place all **Questions** on a new line, bolded, and preceded by a spacer.
- Ensure all estimations (e.g., "3 weeks") are italicized or secondary to the main skill.

ROADMAP MANAGEMENT LOGIC (CRITICAL):
- ALWAYS call 'get_user_context' to see their active roadmaps first.
- IF they ask for a roadmap they DO NOT have: Call 'create_new_roadmap'.
- IF they ask for a roadmap they ALREADY have (e.g., they have a React roadmap and ask for React again):
    1. Acknowledge they already have it.
    2. Suggest upgrading the difficulty (e.g., "You already have a beginner React roadmap. Want me to upgrade it to cover Advanced Patterns and Next.js?").
    3. WAIT for their confirmation.
    4. IF they say yes, call 'get_roadmap_details' to see what they already know.
    5. Call 'update_roadmap' to overwrite it with harder concepts. Do not repeat basic skills they already have.
`;
export const careerSathiTools: Tool[] = [
    {
        toolSpec: {
            name: "get_user_context",
            description: "Fetches the user's career profile and active roadmaps (returns ID and career path). Call this immediately when the chat starts or if the user asks for advice.",
            inputSchema: { json: { type: "object", properties: {} } }
        }
    },
    {
        toolSpec: {
            name: "search_past_memory",
            description: "Searches past chat history for context. Call this if the user refers to something discussed previously.",
            inputSchema: { json: { type: "object", properties: {} } }
        }
    },
    {
        toolSpec: {
            name: "get_roadmap_details",
            description: "Fetches the exact skills and projects of a specific roadmap. Call this using the roadmapId BEFORE updating OR explaining it, so you know exactly what the user has already learned.",
            inputSchema: {
                json: {
                    type: "object",
                    properties: {
                        roadmapId: { type: "string", description: "The ID of the roadmap to inspect." }
                    },
                    required: ["roadmapId"]
                }
            }
        }
    },
    {
        toolSpec: {
            name: "update_roadmap",
            description: "Overwrites an existing roadmap with new, upgraded skills and projects (e.g., moving from beginner to advanced). Call this ONLY after getting user confirmation.",
            inputSchema: {
                json: {
                    type: "object",
                    properties: {
                        roadmapId: { type: "string" },
                        skillsToLearn: {
                            type: "array",
                            items: { type: "string" },
                            description: "Format with Markdown headings and timelines (e.g., '### Advanced Hooks\\nEst: 1 week.')"
                        },
                        recommendedProjects: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    title: { type: "string" },
                                    description: { type: "string", description: "Markdown explanation with timeline." }
                                }
                            }
                        }
                    },
                    required: ["roadmapId", "skillsToLearn", "recommendedProjects"]
                }
            }
        }
    },
    {
        toolSpec: {
            name: "create_new_roadmap",
            description: "Generates a brand new career roadmap. Call this if the user wants to learn a completely new path they don't already have.",
            inputSchema: {
                json: {
                    type: "object",
                    properties: {
                        careerPath: { type: "string" },
                        skillsToLearn: {
                            type: "array",
                            items: { type: "string" },
                            description: "Format with Markdown headings and timelines."
                        },
                        recommendedProjects: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    title: { type: "string" },
                                    description: { type: "string" }
                                }
                            }
                        }
                    },
                    required: ["careerPath", "skillsToLearn", "recommendedProjects"]
                }
            }
        }
    }
];
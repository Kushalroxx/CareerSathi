import { authOptions } from "@/lib/auth"
import { ExpiringCache } from "@/lib/ExpiringCache"
import { askVertex } from "@/lib/vertex"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const data = await req.json()
        const text = data.text as string;
        
        if (!text) {
            return NextResponse.json({ error: "No text provided" }, { status: 400 })        
        }
        
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const cacheKey = `${session.user.id}-${text.trim()}`;
        const cache = await ExpiringCache.getInstance();
        const cachedResponse = await cache.get(cacheKey);

        if (cachedResponse) {
            return NextResponse.json({ text: cachedResponse }, { status: 200 })
        }

        const prompt = `
You are an expert AI mentor and curriculum designer. Generate a clean, visually appealing, and highly scannable learning roadmap in Markdown for a student.

Raw Request: "${text}"

---
### CRITICAL LAYOUT & FORMATTING RULES:
1. **Sanitize Topic Name**: Strip out noise like "Est: 6 weeks", raw tags, or bad formatting from the request to extract a clean title.
2. **Spacing**: Insert a double newline (blank line) between EVERY section, heading, blockquote, bullet point, and outcome.
3. **No Code Wrappers**: Do NOT enclose the entire response in \`\`\`markdown or \`\`\` code fences. Start immediately with the first \`## \` heading.
4. **Scannability First**: Keep text brief, bold key terms, and limit the "How to Learn It" section to 6-8 core high-impact concepts so it does not become a wall of text.

---
### EXACT OUTPUT TEMPLATE TO FOLLOW:

## 💡 **What is "[Clean Topic Name]"?**

[Provide a punchy 3-4 sentence introduction. Focus on practical engineering mindset and real-world impact.]

---

## 🚀 **How to Achieve It (The Plan)**

### Phase 1: [Phase Name / Week Range]

> 💡 **Why this matters:** [1 sentence explaining core value in a blockquote]

*   **Step 1:** [Concrete action step]
*   **Step 2:** [Concrete action step]

🎯 **Outcome:** [1 tangible result on its own dedicated line]


### Phase 2: [Phase Name / Week Range]

> 💡 **Why this matters:** [1 sentence explaining core value in a blockquote]

*   **Step 1:** [Concrete action step]
*   **Step 2:** [Concrete action step]

🎯 **Outcome:** [1 tangible result on its own dedicated line]


### Phase 3: [Portfolio & Real Projects]

> 💡 **Why this matters:** [1 sentence explaining core value in a blockquote]

*   **Step 1:** [Concrete action step]
*   **Step 2:** [Build a capstone project. Each project you build is a portfolio piece to show recruiters.]

🎯 **Outcome:** [1 tangible result on its own dedicated line]

---

## 📚 **How to Learn It (The Knowledge)**

*   \`[Key Concept 1]\`: **[1 sentence strategy]**. *Search for:* \`"[exact query keywords]"\`.
*   \`[Key Concept 2]\`: **[1 sentence strategy]**. *Search for:* \`"[exact query keywords]"\`.
*   \`[Key Concept 3]\`: **[1 sentence strategy]**. *Search for:* \`"[exact query keywords]"\`.
*   \`[Key Concept 4]\`: **[1 sentence strategy]**. *Search for:* \`"[exact query keywords]"\`.
*   \`[Key Concept 5]\`: **[1 sentence strategy]**. *Search for:* \`"[exact query keywords]"\`.
*   \`[Key Concept 6]\`: **[1 sentence strategy]**. *Search for:* \`"[exact query keywords]"\`.

---

## 🗓️ **A Realistic Timeline**

*   **Estimated Duration:** [e.g., 4-6 Weeks]
*   **Weekly Commitment:** [e.g., 10-12 hours per week]
*   **Mindset:** [1-2 concluding sentences on consistency, focus, and rapid execution.]
`;

        const res = await askVertex(prompt);
        await cache.set(cacheKey, res);

        return NextResponse.json({ text: res }, { status: 200 })
    } catch (error) {
        console.error("Roadmap generation error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
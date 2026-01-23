import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { prisma } from "./prisma";
import { askVertex } from "./vertex";
import { ExpiringCache } from "./ExpiringCache";

export const getRecommendedJobs = async () => {
  try {
    const jobCache = await ExpiringCache.getInstance();
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }

    const userId = session.user.id;

    const cached = await jobCache.get(userId);
    if (cached) {
      return cached;
    }

    const roadmap = await prisma.roadmap.findMany({
      where: { userId },
      include: { skillsToLearn: true },
    });
    const userSkills = roadmap.flatMap((roadmap) =>
      roadmap.skillsToLearn.map((skill) => skill.skill)
    );

    if (userSkills.length === 0) {
      return [];
    }
    
    const prompt = `
      Context: A user has these technical skills: ${userSkills.join(', ')}.
      Task: Identify the top 3 specific job titles used in the job market for this skill set.
      
      Constraints:
      - Return ONLY the job titles separated by commas.
      - Do not include explanatory text.
      - Focus on standard industry titles (e.g., "Full Stack Developer", "Data Analyst", "DevOps Engineer").
      - Do not invent vague titles.
      
      Example Output:
      React Developer, Frontend Engineer, UI Developer
    `;

    const aiReply = await askVertex(prompt);

    const searchTerms = aiReply
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 2)
      .slice(0, 3); 
    if (searchTerms.length === 0) {
      searchTerms.push(userSkills[0] + " Developer");
    }

    const jobsPromises = searchTerms.map(async (term) => {
      try {
        const encodedParam = encodeURIComponent(term);
        const url = `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${process.env.JOB_API_APP_ID}&app_key=${process.env.JOB_API_APP_KEY}&what=${encodedParam}&where=India&content-type=application/json&max_days_old=30&sort_by=date`;
        
        const res = await fetch(url, { next: { revalidate: 3600 } }); 
        if (!res.ok) return [];
        
        const data = await res.json();
        return data.results || [];
      } catch (error) {
        console.error(`Adzuna Error for ${term}:`, error);
        return [];
      }
    });

    const results = await Promise.all(jobsPromises);
    const allJobs = results.flat();
    const uniqueJobs = allJobs.filter(
      (job, index, self) =>
        index === self.findIndex((j) => j.id === job.id || j.redirect_url === job.redirect_url)
    );
    const scoredJobs = uniqueJobs.map((job) => {
      let score = 0;
      const textToCheck = `${job.title} ${job.description}`.toLowerCase();
      
      userSkills.forEach(skill => {
        if (textToCheck.includes(skill.toLowerCase())) {
          score++;
        }
      });

      return { ...job, relevanceScore: score };
    });

    const bestJobs = scoredJobs
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 10); 

    await jobCache.set(userId, bestJobs, 86400000);

    return bestJobs;

  } catch (error) {
    console.error("Error in getRecommendedJobs:", error);
    return []; 
  }
};
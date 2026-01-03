type RoadmapSummary = {
    careerPath: string;
    skillsToLearn: {
        skill: string;
        done: boolean;
    }[];
    recommendedProjects: {
        title: string;
        done: boolean;
    }[];
};

export function summarizeRoadmapsToString(activeRoadmaps: RoadmapSummary[]) {
    if (!activeRoadmaps || activeRoadmaps.length === 0) {
        return {
            activePaths: "",
            skills: { completed: [], inProgress: [] },
            projects: { completed: [], inProgress: [] }
        };
    }

    const completedSkills = new Set<string>();
    const inProgressSkills = new Set<string>();
    
    const completedProjects = new Set<string>();
    const inProgressProjects = new Set<string>();
    
    const allPaths = new Set<string>();

    for (const roadmap of activeRoadmaps) {
        allPaths.add(roadmap.careerPath);

        // Sort Skills
        for (const s of roadmap.skillsToLearn) {
            if (s.done) completedSkills.add(s.skill);
            else inProgressSkills.add(s.skill);
        }

        // Sort Projects
        for (const p of roadmap.recommendedProjects) {
            if (p.done) completedProjects.add(p.title);
            else inProgressProjects.add(p.title);
        }
    }

    // Convert Sets to Arrays for clean output
    const contextData = {
        activePaths: Array.from(allPaths).join(', '),
        skills: {
            completed: Array.from(completedSkills).join(', '),
            inProgress: Array.from(inProgressSkills).join(', ')
        },
        projects: {
            completed: Array.from(completedProjects).join(', '),
            inProgress: Array.from(inProgressProjects).join(', ')
        }
    };

    return contextData;
}
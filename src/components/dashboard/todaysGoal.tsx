"use client"
import React, { useMemo } from 'react'
import { questionsAtom } from '@/lib/atom'      
import { useAtom } from 'jotai' 
import { motion } from 'framer-motion'
import { Target } from 'lucide-react'

const messages = {
  start: [
    "Let’s get rolling! 🚀",
    "A fresh start time to crush it 💪",
    "One step at a time. Begin strong!",
  ],
  mid: [
    "Great progress so far keep going 🔥",
    "Nice momentum! Stay consistent ⚡",
    "Halfway there. You’ve got this 💡",
  ],
  near: [
    "Almost done finish strong! 🏁",
    "Final push don’t stop now 👊",
    "You’re so close, keep grinding 🔥",
  ],
  done: [
    "🎉 Goal complete! Amazing work.",
    "You crushed it today 💯",
    "Another win in the bag respect 👏",
  ],
}

export default function TodaysGoal() {
  const [questions] = useAtom(questionsAtom);

  const answered = questions?.filter((q: any) => q.isAnswered).length || 0;
  const total = questions?.length || 1; 
  const progress = (answered / total) * 100;
  const randomMessage = useMemo(() => {
    let category: keyof typeof messages;

    if (progress === 0) category = "start";
    else if (progress < 50) category = "mid";
    else if (progress < 100) category = "near";
    else category = "done";

    const pool = messages[category];
    return pool[Math.floor(Math.random() * pool.length)];
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full"
    >
      <div className="h-full bg-gradient-to-br from-indigo-600 to-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-200 flex flex-col justify-between relative overflow-hidden">
        {/* Decorator */}
        <Target className="absolute top-[-20px] right-[-20px] w-32 h-32 text-white/10 rotate-12" />
        
        <div>
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-lg font-bold">Today’s Focus</h2>
            <span className="text-2xl font-bold bg-white/20 px-3 py-1 rounded-lg backdrop-blur-sm">
                {Math.round(progress)}%
            </span>
          </div>
          <p className="text-blue-100 font-medium text-sm mb-6">{randomMessage}</p>
        </div>

        <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium text-blue-100 opacity-80">
                <span>Progress</span>
                <span>{answered}/{questions?.length || 0}</span>
            </div>
            <div className="w-full bg-black/20 rounded-full h-3 backdrop-blur-sm">
                <motion.div
                    className="bg-white h-3 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />
            </div>
        </div>
      </div>
    </motion.div>
  )
}

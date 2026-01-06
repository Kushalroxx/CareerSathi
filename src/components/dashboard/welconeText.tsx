'use client'
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { getRandomGreeting } from '@/lib/randomGreeting';
import { Badge } from '@/components/ui/badge'
import { CalendarDays } from 'lucide-react';

export default function WelconeText() {
  const { data: session } = useSession();
  const [greeting, setGreeting] = useState('');
  const [supportText, setSupportText] = useState('');


  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric' 
  });

  useEffect(() => {
    const { greeting, supportText } = getRandomGreeting()
    setGreeting(greeting)
    setSupportText(supportText)
  }, [])

  if (!session) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col md:flex-row md:items-end justify-between gap-4"
    >
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
          {greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            {session.user?.name?.split(" ")[0]}
          </span>
           <motion.span 
            className="ml-2 inline-block origin-[70%_70%]"
            animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1],
              repeat: Infinity,
              repeatDelay: 1
            }}
            role="img" 
            aria-label="waving hand"
          >
            👋
          </motion.span>
        </h1>
        <p className="mt-2 text-lg text-gray-500 font-medium">{supportText}</p>
      </div>

      <Badge
        className="self-start md:self-auto rounded-full px-4 py-1.5 text-sm font-medium
             bg-white text-slate-600 border-slate-200
             shadow-sm gap-2 hover:bg-slate-50"
        variant="outline"
      >
        <CalendarDays size={16} className="text-indigo-500" />
        {today}
      </Badge>
    </motion.div>
  )
}
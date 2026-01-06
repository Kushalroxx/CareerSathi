// components/dashboard/quickActions.tsx
"use client"
import { Bot, Briefcase, FileText, User } from 'lucide-react'
import { useRouter } from 'nextjs-toploader/app'
import React from 'react'
import { motion } from 'framer-motion'

export default function QuickActions() {
    const router = useRouter()
    
    const actions = [
        { icon: Briefcase, label: "Jobs", color: "text-blue-600", bg: "bg-blue-50", href: "/jobs" },
        { icon: User, label: "Profile", color: "text-purple-600", bg: "bg-purple-50", href: "/assessment" },
        { icon: FileText, label: "Roadmaps", color: "text-amber-600", bg: "bg-amber-50", href: "/roadmap" },
        { icon: Bot, label: "AI Mentor", color: "text-emerald-600", bg: "bg-emerald-50", href: "/chat" },
    ]

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/40 border border-slate-100 pb-12"
        >
            <h2 className='text-sm font-bold text-gray-400 uppercase tracking-wider mb-4'>Quick Actions</h2>
           <div className="grid grid-cols-2 gap-3 h-full">
    {actions.map((action, i) => (
        <button
            key={i}
            onClick={() => router.push(action.href)}
          
            className="w-full h-full flex flex-col items-center justify-center gap-2 p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all duration-200 group"
        >
            <div className={`p-2.5 rounded-xl ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
                <action.icon size={20} />
            </div>
            <span className="text-xs font-semibold text-gray-700">{action.label}</span>
        </button>
    ))}
</div>
        </motion.div>
    )
}
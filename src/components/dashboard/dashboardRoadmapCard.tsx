// components/dashboard/dashboardRoadmapCard.tsx
"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Roadmap } from '@/types/roadmap'
import RoadmapCard from '../roadmap/roadmapCard'
import { Map, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function DashboardRoadmapCard({roadmaps}:{roadmaps: Roadmap[]}) {
  // FIX: Only show first 3 items
  const displayedRoadmaps = roadmaps.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/40 border border-slate-100"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-100 rounded-lg text-amber-600"><Map size={20} /></div>
            <h2 className="text-lg font-bold text-gray-900">Your Roadmaps</h2>
        </div>
        {roadmaps.length > 3 && (
            <Link href="/roadmap" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                View All <ArrowRight size={16} />
            </Link>
        )}
      </div>
      
      {/* FIX: Removed max-h and overflow */}
      <div className="grid grid-cols-1 gap-4">
        {displayedRoadmaps.length > 0 ? displayedRoadmaps.map((item, index) => (
          <RoadmapCard key={index} roadmap={item} index={index} />
        )): (
            <div className='py-8 text-center text-gray-400 bg-slate-50 rounded-xl border border-dashed border-slate-200'>
                <p>No active roadmaps.</p>
            </div>
        )}
      </div>
    </motion.div>
  )
}
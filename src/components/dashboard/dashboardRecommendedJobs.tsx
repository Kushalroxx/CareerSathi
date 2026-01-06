// components/dashboard/dashboardRecommendedJobs.tsx
"use client"
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import JobCard from '../jobs/jobCard'
import { recommendedJobsAtom } from '@/lib/atom'
import { useAtom } from 'jotai'
import { Sparkles } from 'lucide-react'

export default function DashboardRecommendedJobs() {
    const [jobs, setJobs] = useAtom(recommendedJobsAtom)
    const [loading, setLoading] = React.useState(false)

    // ... fetch logic remains same ...
    const getRecommendedJobs = async() => {
            try {
              if (jobs) {
                return
              }
              setLoading(true)
                const response = await fetch('/api/jobs/recommended', {
                    method: 'GET',
                })
                const data = await response.json()
                setJobs(data.jobs)
            } catch (error) {
                
            }finally {
                setLoading(false)
            }
        }
        useEffect(() => {
          getRecommendedJobs()
        },[])

  return (
     <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/40 border border-slate-100"
    >
        <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600"><Sparkles size={20} /></div>
            <h2 className="text-lg font-bold text-gray-900">Recommended Jobs</h2>
        </div>

        <div className="space-y-4 max-h-[24rem] overflow-y-auto pr-2 custom-scrollbar">
        {!loading ? !!jobs && jobs.length > 0 ? (
            jobs.map((item, index) => <JobCard key={index} job={item} index={index} />)
        ) : (
            <div className='py-8 text-center text-gray-400 bg-slate-50 rounded-xl border border-dashed border-slate-200'>
                <p>No jobs found for your profile.</p>
            </div>
        ) : (
            <div className="py-12 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )}
        </div>
    </motion.div>
  )
}
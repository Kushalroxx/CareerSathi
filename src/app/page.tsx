'use client'

import { motion } from 'framer-motion'
import HeroSkillTree from '@/components/ui/HomeSkillTree'
import { 
  MessageSquare, Map, CheckCircle2, Zap, CalendarCheck, BookOpen, Lock, 
  ShieldCheck, BrainCircuit, LayoutDashboard, Youtube, Trophy, 
  LineChart, RefreshCw, Briefcase, GraduationCap, Code2, Video, 
  BarChart3, Clock, Calendar, TrendingUp, CheckCircle, Circle, Info
} from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnnouncementBar from '@/components/ui/announcementBar'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
}

export default function HomePage() {
  return (
    <div className="min-h-screen  text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      <AnnouncementBar />
      <Header />
      <section className="relative pt-24 pb-16 lg:pt-36 lg:pb-24 w-full overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute top-0 left-0 right-0 h-[500px] bg-[radial-gradient(ellipse_50%_50%_at_50%_0%,rgba(99,102,241,0.15),transparent)]"></div>
            <HeroSkillTree />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl mx-auto ">
            
            {/* Beta Badge */}
            <motion.div variants={fadeIn} className="inline-flex items-center px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600 mb-6 mx-auto hover:bg-slate-100 transition-colors cursor-default">
              <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
              Accepting New Beta Users
            </motion.div>
            
            {/* Main Headline */}
            <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Don't Just Plan Your Career. <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                Execute It.
              </span>
            </motion.h1>
            
            {/* Subhead */}
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-slate-700 mb-10 max-w-2xl mx-auto leading-relaxed px-2">
              Get a personalized AI  
              <span className="font-bold text-slate-900 px-1 rounded mx-1">roadmap, daily tasks, and guidance</span> 
               to reach your dream role faster.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
              <Link href="/auth/signin" className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base md:text-lg rounded-full transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
                Build My Career Plan
                <MessageSquare className="w-5 h-5" />
              </Link>
              <Link href="/how-it-works" className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-500 hover:border-slate-300 text-slate-700 font-semibold rounded-full text-base md:text-lg transition-all hover:shadow-lg flex items-center justify-center">
                View Sample Roadmap
              </Link>
            </motion.div>
              <motion.p variants={fadeIn} className="mt-6 text-xs md:text-sm text-slate-500 block mb-16">
                No credit card • 2-minute setup • Free beta access
            </motion.p>
            
          </motion.div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 perspective-1000">
          <motion.div 
            initial={{ opacity: 0, y: 40, rotateX: 10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden transform-gpu"
          >
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b border-slate-100">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-white shadow-sm text-blue-500">
                     <BarChart3 size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Frontend Developer Roadmap</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1 text-slate-500 text-sm">
                      <span className="flex items-center gap-1"><Calendar size={14} /> Created Today</span>
                      <span className="flex items-center gap-1"><Clock size={14} /> Updated Just now</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                   <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50">
                      <TrendingUp size={16} className="text-blue-700" /> Increase Difficulty
                   </button>
                </div>
              </div>
              
              {/* Progress Bar Mockup */}
              <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm text-gray-500">12%</span>
                  </div>
                  <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                     <div className="h-full w-[12%] bg-purple-500 rounded-full"></div>
                  </div>
              </div>
            </div>

            {/* --- MOCKUP BODY (Matches RenderRoadmapSkills) --- */}
            <div className="p-6 bg-slate-50/50 space-y-4">
               
               {/* Skill 1: COMPLETED (Green Style) */}
               <div className="px-6 py-4 bg-green-50 rounded-2xl border-2 border-green-200 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                  <div className="flex items-center gap-3 flex-1">
                     <span className="text-green-700 font-medium decoration-green-700/50">1. HTML5 Semantic Structure</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                     <button className="w-full md:w-auto px-3 py-1.5 bg-white border border-green-300 text-green-700 rounded-md text-sm font-medium flex items-center justify-center gap-1 cursor-default">
                        <CheckCircle size={16} /> Completed
                     </button>
                     <button className="w-full md:w-auto px-3 py-1.5 bg-blue-500 text-white rounded-md text-sm font-medium flex items-center justify-center gap-2 shadow-sm opacity-50 cursor-not-allowed">
                        <Info size={16} /> Learn More
                     </button>
                  </div>
               </div>

               {/* Skill 2: ACTIVE (White Style) */}
               <div className="px-6 py-4 bg-white rounded-2xl border-2 border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 flex-1">
                     <span className="text-slate-900 font-medium">2. CSS Grid & Flexbox</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                     <button className="w-full md:w-auto px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md text-sm font-medium flex items-center justify-center gap-1 hover:opacity-90 shadow-sm">
                        <Circle size={16} /> Mark Complete
                     </button>
                     <button className="w-full md:w-auto px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium flex items-center justify-center gap-2 shadow-sm transition-colors">
                        <Info size={16} /> Learn More
                     </button>
                  </div>
               </div>
               
               {/* Skill 3: NEXT (Faded) */}
               <div className="px-6 py-4 bg-white rounded-2xl border border-gray-200 flex items-center justify-between gap-4 shadow-sm opacity-60">
                  <span className="text-slate-900 font-medium">3. JavaScript ES6+ Features</span>
               </div>

            </div>
          </motion.div>
        </div>
      </section>
        

      {/* =========================================
          3. FEATURES GRID
      ========================================= */}
      <section id='features' className="py-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Scale
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We replaced generic advice with engineering tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
                { icon: Youtube, color: "text-red-600 bg-red-50", title: "Curated Resources", desc: "Don't waste time searching. Every task comes with AI-selected videos and docs tailored to the topic." },
                { icon: BrainCircuit, color: "text-purple-600 bg-purple-50", title: "Context-Aware AI", desc: "The mentor remembers your past chats, progress, and difficulty settings." },
                { icon: Trophy, color: "text-yellow-600 bg-yellow-50", title: "Gamified Growth", desc: "Maintain streaks, earn XP for completing tasks, and visualize your consistency." },
                { icon: RefreshCw, color: "text-orange-600 bg-orange-50", title: "Dynamic Pivoting", desc: "Changed your mind? Switch from 'Frontend' to 'Backend' instantly. We preserve your progress." },
                { icon: LineChart, color: "text-blue-600 bg-blue-50", title: "Skill Analytics", desc: "See exactly how much you've learned. Visual progress bars separate 'Skills' from 'Projects'." },
                { icon: Briefcase, color: "text-indigo-600 bg-indigo-50", title: "Job Simulation", desc: "Simulate a 'Day in the Life' of your target role before you commit to the roadmap." }
            ].map((feature, idx) => (
                <motion.div 
                    key={idx}
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true, margin: "-50px" }} 
                    variants={fadeIn} 
                    className="group bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300"
                >
                    <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                        <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-xl mb-3">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">
                        {feature.desc}
                    </p>
                </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          4. TIMELINE (Responsive Fix Applied)
      ========================================= */}
      <section id='how-it-works' className="py-20 ">
        <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
                Your Transformation Timeline
            </h2>
            
            <div className="relative">
                {/* Vertical Line: Left on Mobile, Center on Desktop */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2"></div>
                
                {[
                    { day: "Day 1", title: "The Blueprint", desc: "Chat with AI to define your role.", icon: Map, color: "bg-blue-600" },
                    { day: "Day 7", title: "The Habit", desc: "35 tasks done. No procrastination.", icon: CalendarCheck, color: "bg-purple-600" },
                    { day: "Day 45", title: "The Build", desc: "Move from learning to building projects.", icon: Code2, color: "bg-indigo-600" },
                    { day: "Day 90", title: "Job Ready", desc: "Portfolio ready. Interview prep starts.", icon: GraduationCap, color: "bg-green-600" }
                ].map((step, idx) => (
                    <motion.div 
                        key={idx}
                        initial="hidden" 
                        whileInView="visible" 
                        viewport={{ once: true }} 
                        variants={fadeIn} 
                        className={`relative flex items-center mb-12 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                    >
                        {/* Desktop Spacer */}
                        <div className="hidden md:block w-1/2"></div>
                        
                        {/* Icon Bubble */}
                        <div className={`absolute left-8 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 border-white ${step.color} text-white flex items-center justify-center z-10 shadow-lg`}>
                            <step.icon size={20} />
                        </div>

                        {/* Content Card */}
                        <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${idx % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-1">{step.day}</div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                                <p className="text-slate-600 text-sm">{step.desc}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* =========================================
          5. DAILY TASKS (Visual Upgrade)
      ========================================= */}
      <section className="py-20 bg-slate-900 ">
        <div className="max-w-4xl mx-auto px-4 text-center">
           <div className="inline-block px-4 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-sm font-semibold mb-6">
                Consistency Engine
           </div>
           <h2 className="text-3xl md:text-5xl font-bold mb-6">
             Wake up. <span className="text-indigo-400">Execute.</span> Repeat.
           </h2>
           <p className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto">
             Stop doom-scrolling. CareerSathi assigns you 5 manageable tasks every morning.
           </p>
           
           {/* Visual Cards instead of plain numbers */}
           <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
              {[
                { icon: Video, label: "Watch" },
                { icon: BookOpen, label: "Read" },
                { icon: Code2, label: "Code" },
                { icon: RefreshCw, label: "Review" },
                { icon: CheckCircle2, label: "Quiz" },
              ].map((task, idx) => (
                <div key={idx} className="bg-slate-800 border border-slate-700 p-4 rounded-xl flex flex-col items-center hover:bg-slate-700 transition-colors group cursor-default">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform">
                        <task.icon size={18} className="text-white" />
                    </div>
                    <span className="text-sm font-bold text-slate-200">{task.label}</span>
                    <span className="text-xs text-slate-500 mt-1">Task {idx + 1}</span>
                </div>
              ))}
           </div>
        </div>
      </section>
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">
            Secured & Powered by Zelphine
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60">
             <div className="flex items-center gap-2 text-slate-900 font-bold">
                <ShieldCheck className="w-5 h-5" /> SSL Secure
             </div>
             <div className="flex items-center gap-2 text-slate-900 font-bold">
                <BrainCircuit className="w-5 h-5" /> AI Core
             </div>
             <div className="flex items-center gap-2 text-slate-900 font-bold">
                <Lock className="w-5 h-5" /> Private Data
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
'use client'

import { motion } from 'framer-motion'
import { ArrowRight, MessageSquare, Map, CheckCircle2, Zap, CalendarCheck, BookOpen, BarChart3, Lock, ShieldCheck, BrainCircuit, Trash2, MoreHorizontal, LayoutDashboard, Youtube, Trophy, LineChart, RefreshCw, Briefcase, GraduationCap } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'

// Smooth Fade In Animation
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b to-purple-50 from-indigo-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Header />
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-40">
            <div className="absolute top-[-10%] right-0 w-[800px] h-[800px] bg-gradient-to-b from-blue-100 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-gradient-to-t from-purple-100 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl mx-auto">
            
            <motion.div variants={fadeIn} className=" items-center px-4 py-1.5 rounded-full bg-white/30 border border-slate-200 shadow-sm text-sm font-medium text-slate-600 mb-8 flex justify-center max-w-max mx-auto">
             
              <span>Powered by</span> <Image src="/logo.png" alt="Zelphine Logo" width={20} height={20} className="rounded-full mx-0.5" /><span> Zelphine </span>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.15]">
              Don't Just Plan Your Career. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Execute It.
              </span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Meet your AI Mentor. Chat to define your goals, generate dynamic roadmaps, and receive 
              <span className="font-bold text-slate-900"> 5 custom tasks every day </span> 
              to turn ambition into action.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth/signin" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
                Chat with AI Mentor
                <MessageSquare className="w-5 h-5" />
              </Link>
              <Link href="/how-it-works" className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 hover:border-blue-200 text-slate-700 font-medium rounded-full transition-all hover:shadow-md flex items-center justify-center">
                View Sample Roadmap
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. [NEW] FEATURES GRID */}
      <section id='features' className="py-24 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Scale
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We replaced generic advice with engineering tools. Here is your career stack.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <Youtube className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Curated Resources</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                    Don't waste time searching. Every task comes with AI-selected YouTube videos and documentation links tailored to the topic.
                </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <BrainCircuit className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Context-Aware AI</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                    The mentor remembers your past chats, your current roadmap progress, and your difficulty settings.
                </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-4">
                    <Trophy className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Gamified Growth</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                    Maintain streaks, earn XP for completing tasks, and visualize your consistency over time.
                </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center mb-4">
                    <RefreshCw className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Dynamic Pivoting</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                    Changed your mind? Switch from "Frontend" to "Backend" instantly. The AI preserves relevant progress.
                </p>
            </motion.div>

            {/* Feature 5 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-pink-50 text-pink-600 rounded-lg flex items-center justify-center mb-4">
                    <LineChart className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Skill Analytics</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                    See exactly how much you've learned. Visual progress bars separate "Skills" from "Projects".
                </p>
            </motion.div>

             {/* Feature 6 */}
             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                    <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Job Simulation</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                    (Coming Soon) Simulate a "Day in the Life" of your target role before you commit to the roadmap.
                </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. PRODUCT DEMO (Exact Replica of roadmapss.jpg) */}
      <section className="py-24  overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Copy */}
            <div>
              <div className="inline-block px-4 py-1 rounded-full bg-purple-50 text-purple-600 text-sm font-semibold mb-6">
                Interactive Learning
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                Your Roadmap is <br/> Alive.
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Static PDFs don't work. CareerSathi's roadmaps are interactive environments where you track skills and projects in real-time.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg mt-1">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Actionable Tracking</h4>
                    <p className="text-slate-500 text-sm">Mark tasks complete as you go. Visual progress bars keep you motivated.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg mt-1">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">One-Click Learning</h4>
                    <p className="text-slate-500 text-sm">Stuck? Click "Learn More" to get instant AI-curated resources for that specific task.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-2 bg-orange-50 text-orange-600 rounded-lg mt-1">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Adaptive Difficulty</h4>
                    <p className="text-slate-500 text-sm">Use the "Increase Difficulty" button to instantly upgrade your curriculum.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: UI Mockup Matching "roadmapss.jpg" EXACTLY */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 via-purple-100 to-white rounded-full blur-3xl opacity-60 transform scale-110"></div>
              
              <div className="relative bg-[#F8F9FC] border border-slate-200 rounded-2xl shadow-2xl overflow-hidden max-w-lg mx-auto">
                
                {/* 1. Header Area */}
                <div className="bg-white p-5 border-b border-slate-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                            <LayoutDashboard className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 text-sm leading-tight max-w-[200px]">
                                Freelance Full-Stack JavaScript/TypeScript Developer
                            </h3>
                            <p className="text-[10px] text-slate-400 mt-1">Created Today • AI Generated</p>
                        </div>
                    </div>
                    {/* Buttons: Increase Difficulty & Delete */}
                    <div className="flex gap-2">
                        <button className="flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded hover:bg-slate-50 shadow-sm">
                           <Zap size={12} className="text-orange-500" /> Increase Difficulty
                        </button>
                        <button className="text-[10px] font-bold text-white bg-red-500 px-3 py-1.5 rounded hover:bg-red-600 flex items-center gap-1 shadow-sm shadow-red-200">
                            <Trash2 size={12} /> Delete
                        </button>
                    </div>
                  </div>

                  {/* 2. Progress Bars */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white border border-slate-100 p-3 rounded-xl shadow-sm">
                        <div className="flex justify-between text-[11px] font-bold text-slate-700 mb-2">
                            <span>Skills Progress</span>
                            <span>0%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full w-[5%] bg-blue-500 rounded-full"></div>
                        </div>
                        <div className="text-[10px] font-bold text-slate-900 mt-1">0/7</div>
                    </div>
                    <div className="bg-white border border-slate-100 p-3 rounded-xl shadow-sm">
                        <div className="flex justify-between text-[11px] font-bold text-slate-700 mb-2">
                            <span>Projects Progress</span>
                            <span>0%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full w-0 bg-purple-500 rounded-full"></div>
                        </div>
                        <div className="text-[10px] font-bold text-slate-900 mt-1">0/4</div>
                    </div>
                  </div>
                </div>

                {/* 3. Task List Body */}
                <div className="p-5 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-sm font-bold text-slate-900">Skills to Learn</h4>
                    <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold">7</span>
                  </div>

                  {/* Task Item 1 */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
                    <div>
                        <h5 className="text-xs font-bold text-slate-900">Advanced JavaScript & TypeScript</h5>
                        <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                            Focus on modern features, asynchronous programming, and functional programming paradigms. Crucial for complex apps.
                        </p>
                    </div>
                    {/* Buttons: Mark Complete & Learn More */}
                    <div className="flex gap-2 justify-end pt-2">
                        <button className="text-[10px] font-semibold text-white bg-[#6366f1] px-4 py-1.5 rounded-md hover:bg-indigo-700 shadow-sm shadow-indigo-200">
                            Mark Complete
                        </button>
                        <button className="text-[10px] font-semibold text-[#6366f1] bg-indigo-50 px-4 py-1.5 rounded-md hover:bg-indigo-100 border border-indigo-100">
                            Learn More
                        </button>
                    </div>
                  </div>

                   {/* Task Item 2 */}
                   <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3 opacity-60">
                    <div>
                        <h5 className="text-xs font-bold text-slate-900">Mastering a Frontend Framework (React)</h5>
                        <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                            Dive deep into React.js including hooks, context API, and state management (Redux/Zustand).
                        </p>
                    </div>
                    <div className="flex gap-2 justify-end pt-2">
                        <button className="text-[10px] font-semibold text-white bg-[#6366f1] px-4 py-1.5 rounded-md">
                            Mark Complete
                        </button>
                        <button className="text-[10px] font-semibold text-[#6366f1] bg-indigo-50 px-4 py-1.5 rounded-md border border-indigo-100">
                            Learn More
                        </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. [NEW] YOUR JOURNEY SECTION */}
     <section id='how-it-works' className="py-24 relative overflow-hidden">
        
        {/* --- ADDED: LIGHT BACKGROUND GRID --- */}
        <div className="absolute inset-0 z-0 opacity-[1] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">
                Your Transformation Timeline
            </h2>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                
                {/* Step 1 */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-blue-600 group-[.is-active]:text-white text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <Map size={18} />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between space-x-2 mb-1">
                            <div className="font-bold text-slate-900">Day 1: The Blueprint</div>
                            <time className="font-mono text-xs text-slate-500">Start</time>
                        </div>
                        <div className="text-slate-600 text-sm">You chat with the AI, define your target role, and generate your custom roadmap.</div>
                    </div>
                </motion.div>

                {/* Step 2 */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-white border-slate-200 text-purple-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <CalendarCheck size={18} />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between space-x-2 mb-1">
                            <div className="font-bold text-slate-900">Day 7: The Habit</div>
                            <time className="font-mono text-xs text-slate-500">1 Week</time>
                        </div>
                        <div className="text-slate-600 text-sm">You've completed 35 specific tasks. No procrastination, just daily execution of the "Daily 5".</div>
                    </div>
                </motion.div>

                {/* Step 3 */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-white border-slate-200 text-green-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <Briefcase size={18} />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between space-x-2 mb-1">
                            <div className="font-bold text-slate-900">Day 45: The Projects</div>
                            <time className="font-mono text-xs text-slate-500">1.5 Months</time>
                        </div>
                        <div className="text-slate-600 text-sm">You move from "Learning" to "Building". Your roadmap now assigns real-world projects to build your portfolio.</div>
                    </div>
                </motion.div>

                {/* Step 4 */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-white border-slate-200 text-orange-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <GraduationCap size={18} />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between space-x-2 mb-1">
                            <div className="font-bold text-slate-900">Day 90: Job Ready</div>
                            <time className="font-mono text-xs text-slate-500">3 Months</time>
                        </div>
                        <div className="text-slate-600 text-sm">Roadmap 100% complete. You have the skills, the projects, and the confidence to crack interviews.</div>
                    </div>
                </motion.div>

            </div>
        </div>
      </section>

      {/* 5. DAILY TASKS (The Retention Hook) */}
      <section className="py-20  ">
        <div className="max-w-4xl mx-auto px-4 text-center">
           <div className="inline-block px-4 py-1 rounded-full bg-green-500/10 text-green-700 border border-green-500/30 text-sm font-semibold mb-6">
                Habit Building
           </div>
           <h2 className="text-3xl md:text-5xl font-bold mb-6">
             "What should I do today?" <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Solved.</span>
           </h2>
           <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
             Stop doom-scrolling tutorials. Every morning, CareerSathi assigns you 
             5 manageable tasks based on your active roadmap. Finish them, and you win the day.
           </p>
           
           <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-3xl mx-auto">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="bg-slate-800/10 border border-slate-300 p-4 rounded-xl flex flex-col items-center hover:bg-slate-400/30 transition-colors cursor-default group">
                    <div className="w-10 h-10 text-white rounded-full bg-indigo-600 shadow-xl shadow-blue-800 flex items-center justify-center font-bold text-sm mb-4  group-hover:scale-110 transition-transform">
                        {num}
                    </div>
                    <div className="h-1.5 w-12 bg-blue-700 rounded-full"></div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 6. TRUST FOOTER */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">
            Engineered by Zelphine
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all">
             <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                <ShieldCheck className="w-6 h-6 text-slate-900" /> Secure Data
             </div>
             <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                <BrainCircuit className="w-6 h-6 text-slate-900" /> Zelphine AI
             </div>
             <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                <Lock className="w-6 h-6 text-slate-900" /> Private
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
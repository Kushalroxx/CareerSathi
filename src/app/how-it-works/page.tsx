'use client'

import { motion } from 'framer-motion'
import { ArrowRight, MessageSquare, Map, CheckCircle2, Zap, LayoutList, BrainCircuit, UserCheck, MousePointerClick, ChevronRight, CalendarCheck, ShieldCheck, PlayCircle } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.2 } }
}

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Header />
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden bg-slate-50 border-b border-slate-100">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent opacity-60"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl mx-auto">
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-medium text-slate-600 mb-8">
              <BrainCircuit className="w-4 h-4 text-purple-600" />
              <span>The Logic Behind CareerSathi</span>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
              From Raw Data to <br />
              <span className="text-purple-600">Daily Execution.</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              We don't guess. We analyze your profile, generate a roadmap, and assign you exactly 5 tasks every morning.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* STEP 1: THE ASSESSMENT */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-purple-200">1</div>
                <h2 className="text-3xl font-bold text-slate-900">The Assessment.</h2>
              </div>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                We start by understanding your current coordinates. No vague personality quizzes—just specific data points.
              </p>
              <ul className="space-y-4">
                <li className="flex gap-3 text-slate-700">
                   <UserCheck className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                   <span>Education Level & Stream Analysis.</span>
                </li>
                <li className="flex gap-3 text-slate-700">
                   <LayoutList className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                   <span>Current Situation (Exploring vs. Clear Goal).</span>
                </li>
              </ul>
            </motion.div>

            {/* Visual Side: NON-INTERACTIVE (pointer-events-none) */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative pointer-events-none select-none" // DISABLES CLICKS
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-100 to-transparent rounded-full blur-3xl opacity-50"></div>
              <div className="relative bg-white border border-slate-200 rounded-xl shadow-xl p-8 max-w-md mx-auto">
                 <h3 className="text-xl font-bold text-slate-900 mb-6">Stage 1</h3>
                 
                 <div className="space-y-6">
                    <div>
                        <label className="text-sm font-medium text-slate-900 mb-2 block">What is your current education level?</label>
                        <div className="w-full p-3 bg-white border border-slate-300 rounded-lg text-slate-700 text-sm flex justify-between items-center">
                            Undergraduate <ChevronRight className="rotate-90 w-4 h-4 text-slate-400"/>
                        </div>
                    </div>
                    
                    <div>
                        <label className="text-sm font-medium text-slate-900 mb-2 block">Which of these best describes your situation?</label>
                        <div className="space-y-2">
                             <div className="w-full p-3 bg-white border border-slate-200 rounded-lg text-slate-600 text-sm">
                                Preparing for exams
                            </div>
                            <div className="w-full p-3 bg-purple-50 border border-purple-500 rounded-lg text-purple-700 text-sm font-medium">
                                Exploring career options
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-2">
                        <div className="bg-[#6f42c1] text-white px-6 py-2 rounded-lg font-bold text-sm">Next</div>
                    </div>
                 </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* STEP 2: PREDICTION & DECISION */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Visual Side: NON-INTERACTIVE */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              className="relative order-2 lg:order-1 pointer-events-none select-none" // DISABLES CLICKS
            >
               <div className="relative max-w-md mx-auto">
                   
                   <div className="text-center mb-4">
                       <h4 className="font-bold text-slate-900 text-lg">Your Recommended Career Paths</h4>
                   </div>

                   {/* Recommendation Card */}
                   <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-4">
                       <div className="flex items-center gap-2 mb-3">
                           <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><LayoutList size={18} /></div>
                           <h4 className="font-bold text-slate-900">Software Engineer</h4>
                       </div>
                       <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                           Develop and maintain software applications and systems, focusing on problem-solving.
                       </p>
                       <div className="space-y-2">
                           <div className="w-full py-2.5 bg-[#00a67d] text-white rounded-lg text-sm font-bold text-center">
                               Choose this path
                           </div>
                       </div>
                   </div>

                   {/* Fallback */}
                   <div className="flex items-center justify-center gap-2 mt-6">
                       <span className="text-sm text-slate-600">None of these feels right?</span>
                       <div className="text-sm font-bold text-purple-600 border border-purple-200 bg-white px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-sm">
                           Chat with <span className="text-purple-700">AI Mentor</span>
                       </div>
                   </div>

               </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="order-1 lg:order-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-200">2</div>
                <h2 className="text-3xl font-bold text-slate-900">The Decision Fork.</h2>
              </div>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Based on your assessment, we predict the top careers that fit your profile. You have two choices:
              </p>
              <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                      <h4 className="font-bold text-slate-900 flex items-center gap-2">
                          <MousePointerClick className="w-4 h-4 text-green-600" /> Option A: Choose a Path
                      </h4>
                      <p className="text-sm text-slate-600 mt-1">
                          Select a recommendation (e.g., Software Engineer) to instantly generate your roadmap.
                      </p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                      <h4 className="font-bold text-slate-900 flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-purple-600" /> Option B: Talk to AI Mentor
                      </h4>
                      <p className="text-sm text-slate-600 mt-1">
                          Don't like the predictions? Chat with the AI to explore other niches.
                      </p>
                  </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* STEP 3: THE ROADMAP */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-600 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-green-200">3</div>
                <h2 className="text-3xl font-bold text-slate-900">The Dynamic Roadmap.</h2>
              </div>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Once a path is selected, the AI generates a detailed engineering curriculum tailored to you.
              </p>
              <ul className="space-y-4">
                <li className="flex gap-3 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Skills & Project Tracking (0-100% Progress)</span>
                </li>
                <li className="flex gap-3 text-slate-700">
                    <Zap className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Adaptive Difficulty Scaling</span>
                </li>
              </ul>
            </motion.div>

            {/* Visual Side: NON-INTERACTIVE */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }}
              className="relative pointer-events-none select-none" // DISABLES CLICKS
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-green-100 to-transparent rounded-full blur-3xl opacity-50"></div>
              <div className="relative bg-[#f8f9fc] border border-slate-200 rounded-2xl shadow-2xl p-4 max-w-lg mx-auto">
                 
                 <div className="bg-white p-4 rounded-xl border border-slate-100 mb-3 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-sm font-bold text-slate-900">Freelance Full-Stack Dev</h3>
                            <div className="flex gap-2 mt-2">
                                <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full w-[20%] bg-blue-500"></div>
                                </div>
                                <span className="text-[10px] text-slate-400 font-bold">Skills 20%</span>
                            </div>
                        </div>
                        <div className="text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded flex items-center gap-1">
                            <Zap size={10} className="text-orange-500"/> Increase Difficulty
                        </div>
                    </div>
                 </div>

                 <div className="space-y-2">
                     <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex flex-col gap-2">
                         <div>
                            <div className="flex justify-between">
                                <h4 className="text-xs font-bold text-slate-900">Advanced JavaScript</h4>
                                <span className="text-[10px] text-slate-400">3-4 weeks</span>
                            </div>
                         </div>
                         <div className="flex justify-end gap-2">
                             <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded">Mark Complete</span>
                         </div>
                     </div>
                 </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* STEP 4: THE DAILY 5 (THE EXECUTION ENGINE) */}
      <section className="py-24 bg-slate-900 text-white border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Visual Side: NON-INTERACTIVE */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              className="relative order-2 lg:order-1 pointer-events-none select-none" // DISABLES CLICKS
            >
               <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl max-w-md mx-auto border border-slate-700">
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-lg text-white">Today's Protocol</h3>
                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded font-bold uppercase">Active</span>
                  </div>
                  <div className="space-y-3">
                      {[1, 2, 3].map((n) => (
                          <div key={n} className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
                             <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">{n}</div>
                             <div className="h-2 bg-slate-700 rounded w-full"></div>
                             <div className="w-4 h-4 rounded-full border border-slate-600 ml-auto"></div>
                          </div>
                      ))}
                      <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-700/50 opacity-50">
                         <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">4</div>
                         <div className="h-2 bg-slate-700 rounded w-3/4"></div>
                      </div>
                  </div>
               </div>
            </motion.div>

            {/* Text Side */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="order-1 lg:order-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-orange-500 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-orange-900/50">4</div>
                <h2 className="text-3xl font-bold text-white">The Daily 5.</h2>
              </div>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                The roadmap is the map, but this is the engine. Every morning, the AI scans your roadmap and assigns you <strong>5 specific tasks</strong>.
              </p>
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                    <PlayCircle className="w-4 h-4 text-orange-500" />
                    How it works:
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-400">
                      <li>• Complete 5 tasks = Win the day.</li>
                      <li>• Miss a day = The AI re-calibrates your schedule.</li>
                      <li>• No decision fatigue. Just execute.</li>
                  </ul>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* STEP 5: THE AI MENTOR (SUPPORT) */}
      <section className="py-24 overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             
             {/* Text Side */}
             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-200">5</div>
                <h2 className="text-3xl font-bold text-slate-900">The AI Mentor.</h2>
              </div>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Stuck on a task? The AI Mentor lives inside your dashboard to answer questions, explain concepts, and debug your career strategy.
              </p>
              <div className="inline-block px-4 py-2 bg-purple-50 text-purple-700 font-bold rounded-lg text-sm border border-purple-100">
                  Available 24/7 for Doubts & Guidance
              </div>
            </motion.div>

             {/* Visual Side: NON-INTERACTIVE */}
             <motion.div 
              initial={{ opacity: 0, x: 50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              className="relative pointer-events-none select-none" // DISABLES CLICKS
            >
               <div className="bg-white border border-slate-200 rounded-2xl shadow-xl max-w-md mx-auto p-4 overflow-hidden">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                          <BrainCircuit size={16} className="text-purple-600" />
                      </div>
                      <div>
                          <h4 className="text-sm font-bold text-slate-900">AI Mentor</h4>
                          <span className="text-[10px] text-green-500 font-bold uppercase flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online
                          </span>
                      </div>
                  </div>
                  <div className="space-y-3 text-sm">
                      <div className="bg-slate-50 p-3 rounded-xl rounded-tl-none border border-slate-100 text-slate-600">
                          Your roadmap is set!. Need help?
                      </div>
                      <div className="bg-purple-600 text-white p-3 rounded-xl rounded-tr-none ml-auto max-w-[80%]">
                          Is this possible to achieve in 6 months?
                      </div>
                  </div>
               </div>
            </motion.div>

          </div>
         </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Stop Guessing. Start Building.
          </h2>
          <Link href="/auth/signin" className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:shadow-xl transition-all hover:scale-105">
            Take the Assessment
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
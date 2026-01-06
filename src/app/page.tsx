'use client'

import { motion } from 'framer-motion'
import { MessageSquare, Map, CheckCircle2, Zap, CalendarCheck, BookOpen,  Lock, ShieldCheck, BrainCircuit, Trash2,  LayoutDashboard, Youtube, Trophy, LineChart, RefreshCw, Briefcase, GraduationCap } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import AnnouncementBar from '@/components/ui/announcementBar'


const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b to-purple-50 from-white via-indigo-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      <AnnouncementBar />
      <Header />
      <section className="relative pt-20 pb-20 lg:pt-[9.5rem] lg:pb-32 w-full">
        <div className="absolute inset-0 z-10 h-full w-full bg-white overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,transparent_70%,black)]"></div>

      {/* 3. The "Aurora" Top Glow (Adds premium depth, connects to your purple brand) */}
      <div className="absolute top-0 inset-x-0 h-[600px] w-full bg-[radial-gradient(50%_50%_at_50%_0%,rgba(120,119,198,0.15)_0%,transparent_100%)] pointer-events-none"></div>
    </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center bg-transparent">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl mx-auto">
            
            <motion.a href="https://zelphine.com" variants={fadeIn} className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/30 border border-slate-200 shadow-sm text-sm font-medium text-slate-600 mb-8 justify-center mx-auto backdrop-blur-sm">
              <span>Powered by</span> 
              <Image src="/logo.png" alt="Zelphine Logo" width={20} height={20} className="rounded-full mx-1.5" />
              <span>Zelphine</span>
            </motion.a>
            
            <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-tight md:leading-[.80]">
              Don't Just Plan Your Career. <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block md:inline mt-2 md:mt-0">
                Execute It.
              </span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed px-2">
              Meet your AI Mentor. Chat to define your goals, generate dynamic roadmaps, and receive 
              <span className="font-bold text-slate-900"> 5 custom tasks every day </span> 
              to turn ambition into action.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
              <Link href="/auth/signin" className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
                Chat with AI Mentor
                <MessageSquare className="w-5 h-5" />
              </Link>
              <Link href="/how-it-works" className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-900 hover:border-slate-800 text-slate-950 font-medium rounded-full transition-all hover:shadow-md flex items-center justify-center">
                View Sample Roadmap
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
        

      {/* 2. FEATURES GRID */}
      <section id='features' className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Scale
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto px-2">
              We replaced generic advice with engineering tools. Here is your career stack.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
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

      {/* 3. PRODUCT DEMO */}
      <section className="py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Copy */}
            <div >
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
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg mt-1 shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Actionable Tracking</h4>
                    <p className="text-slate-500 text-sm">Mark tasks complete as you go. Visual progress bars keep you motivated.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg mt-1 shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">One-Click Learning</h4>
                    <p className="text-slate-500 text-sm">Stuck? Click "Learn More" to get instant AI-curated resources for that specific task.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-2 bg-orange-50 text-orange-600 rounded-lg mt-1 shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Adaptive Difficulty</h4>
                    <p className="text-slate-500 text-sm">Use the "Increase Difficulty" button to instantly upgrade your curriculum.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: UI Mockup */}
            <div className="relative cursor-default ">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 via-purple-100 to-white rounded-full blur-3xl opacity-60 transform scale-110"></div>
              
              <div className="relative bg-[#F8F9FC] border border-slate-200 rounded-2xl shadow-2xl overflow-hidden max-w-full lg:max-w-lg mx-auto">
                
                {/* 1. Header Area */}
                <div className="bg-white p-4 md:p-5 border-b border-slate-100">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                    <div className="flex gap-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 shrink-0">
                            <LayoutDashboard className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 text-sm leading-tight max-w-[200px]">
                                Freelance Full-Stack Developer
                            </h3>
                            <p className="text-[10px] text-slate-400 mt-1">Created Today • AI Generated</p>
                        </div>
                    </div>
                    {/* Buttons */}
                    <div className="flex gap-2">
                        <button className="flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-white border border-slate-200 px-2 py-1.5 rounded hover:bg-slate-50 shadow-sm whitespace-nowrap">
                           <Zap size={12} className="text-orange-500" /> Harder
                        </button>
                        <button className="text-[10px] font-bold text-white bg-red-500 px-2 py-1.5 rounded hover:bg-red-600 flex items-center gap-1 shadow-sm shadow-red-200">
                            <Trash2 size={12} />
                        </button>
                    </div>
                  </div>

                  {/* 2. Progress Bars */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white border border-slate-100 p-3 rounded-xl shadow-sm">
                        <div className="flex justify-between text-[11px] font-bold text-slate-700 mb-2">
                            <span>Skills</span>
                            <span>0%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full w-[5%] bg-blue-500 rounded-full"></div>
                        </div>
                    </div>
                    <div className="bg-white border border-slate-100 p-3 rounded-xl shadow-sm">
                        <div className="flex justify-between text-[11px] font-bold text-slate-700 mb-2">
                            <span>Projects</span>
                            <span>0%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full w-0 bg-purple-500 rounded-full"></div>
                        </div>
                    </div>
                  </div>
                </div>

                {/* 3. Task List Body */}
                <div className="p-4 md:p-5 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-sm font-bold text-slate-900">Skills to Learn</h4>
                    <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold">7</span>
                  </div>

                  {/* Task Item 1 */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
                    <div>
                        <h5 className="text-xs font-bold text-slate-900">Advanced JavaScript</h5>
                        <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                            Focus on modern features, async/await, and prototypes.
                        </p>
                    </div>
                    <div className="flex gap-2 justify-end pt-2">
                        <button className="text-[10px] font-semibold text-white bg-[#6366f1] px-3 py-1.5 rounded-md hover:bg-indigo-700 shadow-sm">
                            Mark Complete
                        </button>
                        <button className="text-[10px] font-semibold text-[#6366f1] bg-indigo-50 px-3 py-1.5 rounded-md hover:bg-indigo-100 border border-indigo-100">
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

      {/* 4. YOUR JOURNEY SECTION */}
      <section id='how-it-works' className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[1] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">
                Your Transformation Timeline
            </h2>
            
            {/* Timeline Container */}
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                
                {/* Step 1 */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-blue-600 group-[.is-active]:text-white text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <Map size={18} />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 rounded-xl border border-slate-100 shadow-sm ml-4 md:ml-0">
                        <div className="flex items-center justify-between space-x-2 mb-1">
                            <div className="font-bold text-slate-900 text-sm md:text-base">Day 1: The Blueprint</div>
                            <time className="font-mono text-xs text-slate-500">Start</time>
                        </div>
                        <div className="text-slate-600 text-sm text-left">You chat with the AI, define your target role, and generate your custom roadmap.</div>
                    </div>
                </motion.div>

                {/* Step 2 */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-white border-slate-200 text-purple-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <CalendarCheck size={18} />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 rounded-xl border border-slate-100 shadow-sm ml-4 md:ml-0">
                        <div className="flex items-center justify-between space-x-2 mb-1">
                            <div className="font-bold text-slate-900 text-sm md:text-base">Day 7: The Habit</div>
                            <time className="font-mono text-xs text-slate-500">1 Week</time>
                        </div>
                        <div className="text-slate-600 text-sm text-left">You've completed 35 specific tasks. No procrastination, just daily execution.</div>
                    </div>
                </motion.div>

                 {/* Step 3 */}
                 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-white border-slate-200 text-green-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <Briefcase size={18} />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 rounded-xl border border-slate-100 shadow-sm ml-4 md:ml-0">
                        <div className="flex items-center justify-between space-x-2 mb-1">
                            <div className="font-bold text-slate-900 text-sm md:text-base">Day 45: The Projects</div>
                            <time className="font-mono text-xs text-slate-500">1.5 Months</time>
                        </div>
                        <div className="text-slate-600 text-sm text-left">You move from "Learning" to "Building". You build real-world projects for your portfolio.</div>
                    </div>
                </motion.div>

                {/* Step 4 */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-white border-slate-200 text-orange-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <GraduationCap size={18} />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 rounded-xl border border-slate-100 shadow-sm ml-4 md:ml-0">
                        <div className="flex items-center justify-between space-x-2 mb-1">
                            <div className="font-bold text-slate-900 text-sm md:text-base">Day 90: Job Ready</div>
                            <time className="font-mono text-xs text-slate-500">3 Months</time>
                        </div>
                        <div className="text-slate-600 text-sm text-left">Roadmap 100% complete. You have the skills and projects to crack interviews.</div>
                    </div>
                </motion.div>

            </div>
        </div>
      </section>

      {/* 5. DAILY TASKS */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
           <div className="inline-block px-4 py-1 rounded-full bg-green-500/10 text-green-700 border border-green-500/30 text-sm font-semibold mb-6">
                Habit Building
           </div>
           <h2 className="text-3xl md:text-5xl font-bold mb-6">
             "What should I do today?" <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Solved.</span>
           </h2>
           <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
             Stop doom-scrolling. Every morning, CareerSathi assigns you 
             5 manageable tasks. Finish them, and you win the day.
           </p>
           
           {/* Grid fixed for mobile scrolling/wrapping */}
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-3xl mx-auto">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="bg-slate-800/10 border border-slate-300 p-4 rounded-xl flex flex-col items-center hover:bg-slate-400/30 transition-colors cursor-default group">
                    <div className="w-10 h-10 text-white rounded-full bg-indigo-600 shadow-xl shadow-blue-800 flex items-center justify-center font-bold text-sm mb-4 group-hover:scale-110 transition-transform">
                        {num}
                    </div>
                    
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 6. TRUST FOOTER */}
      <section className="py-12 md:py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">
            Engineered by Zelphine
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all">
             <div className="flex items-center justify-center gap-2 text-slate-900 font-bold text-lg">
                <ShieldCheck className="w-6 h-6 text-slate-900" /> Secure Data
             </div>
             <div className="flex items-center justify-center gap-2 text-slate-900 font-bold text-lg">
                <BrainCircuit className="w-6 h-6 text-slate-900" /> Zelphine AI
             </div>
             <div className="flex items-center justify-center gap-2 text-slate-900 font-bold text-lg">
                <Lock className="w-6 h-6 text-slate-900" /> Private
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
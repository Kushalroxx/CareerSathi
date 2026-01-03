'use client'

import { motion } from 'framer-motion'
import { ArrowRight, BrainCircuit, Code2, Database, ShieldCheck, Terminal, Users, Target, Cpu, LineChart, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Header />
      
      {/* 1. HERO: The Manifesto */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-50 border-b border-slate-100">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent opacity-60"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl mx-auto">
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-300 text-blue-600 shadow-sm text-sm font-medium  mb-8">
              <span>Our Philosophy</span>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-4xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.15]">
              We Treat Your Career Like a <br />
              <span className="text-blue-600">Software Product.</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Most career advice is vague motivation. We believe career growth is an engineering problem—solveable with data, structure, and daily execution.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. THE ORIGIN STORY (Zelphine Connection) */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Text Side */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Born Inside a High-Performance Agency.
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  CareerSathi wasn't built by career counselors. It was built by <a href='https://zelphine.com' className="font-bold text-slate-900">Zelphine</a>, a software engineering agency.
                </p>
                <p>
                  At Zelphine, we hire top-tier talent. We noticed a pattern: most candidates were talented but lost. They had potential but no roadmap. They were "tutorial hell" victims with no structured path to production-level skills.
                </p>
                <p>
                  We built CareerSathi to fix this. We took our internal training protocols—the same ones we use to train our own engineers—and turned them into an AI platform accessible to everyone.
                </p>
              </div>
              
              <div className="mt-8 p-4 bg-slate-50 border-l-4 border-blue-600 italic text-slate-700">
                "We built the tool we wished we had when we started learning to code."
                <br/>
                <span className="text-sm font-bold text-slate-900 not-italic mt-2 block">— The Engineering Team @ Zelphine</span>
              </div>
            </motion.div>

            {/* Visual Side: The "Blueprints" */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
               <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20"></div>
                  
                  <div className="relative z-10 space-y-6">
                      <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
                          <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                              <Code2 className="text-blue-400" />
                          </div>
                          <div>
                              <h3 className="font-bold text-lg">Engineering DNA</h3>
                              <p className="text-slate-400 text-sm">No fluff. Just logic.</p>
                          </div>
                      </div>
                      
                      <div className="space-y-4 font-mono text-sm text-slate-300">
                          <div className="flex justify-between">
                              <span> Analyzing Market Data...</span>
                              <span className="text-green-400">Done</span>
                          </div>
                          <div className="flex justify-between">
                              <span> Mapping Skill Dependencies...</span>
                              <span className="text-green-400">Done</span>
                          </div>
                          <div className="flex justify-between">
                              <span> Generating Execution Plan...</span>
                              <span className="text-blue-400 animate-pulse">Running</span>
                          </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-800">
                           <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                              Parent Company
                           </div>
                           <div className="text-xl font-bold mt-1 text-white flex items-center gap-2">
                               <a href="https://zelphine.com">Zelphine</a>
                           </div>
                      </div>
                  </div>
               </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. CORE VALUES (Grid) */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">The Operating System Values</h2>
                <p className="text-lg text-slate-600">The principles that drive our algorithm and our company.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
                {[
                    {
                        icon: Target,
                        title: "Precision over Passion",
                        desc: "Passion fades. Precision lasts. We don't tell you to 'follow your dreams.' We show you the data-backed path to achieve them."
                    },
                    {
                        icon: Database,
                        title: "Data over Opinion",
                        desc: "Our roadmaps aren't written by bloggers. They are generated from real-time analysis of thousands of job descriptions and market trends."
                    },
                    {
                        icon: ShieldCheck,
                        title: "Privacy as Architecture",
                        desc: "We don't sell your data to recruiters. Your career anxieties and questions are encrypted and private between you and the AI."
                    }
                ].map((item, i) => (
                    <motion.div 
                        key={i} 
                        initial="hidden" 
                        whileInView="visible" 
                        viewport={{ once: true }} 
                        variants={fadeIn} 
                        className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all"
                    >
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                            <item.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                        <p className="text-slate-600 leading-relaxed">
                            {item.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* 4. THE TECH STACK (Subtle Flex) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
                     <h2 className="text-3xl font-bold text-slate-900 mb-6">Powered by Intelligent Architecture.</h2>
                     <p className="text-lg text-slate-600 mb-8">
                         CareerSathi combines state-of-the-art LLMs with Zelphine's structured data pipelines. We don't just pass your prompt to an AI; we inject context, history, and engineering constraints to ensure high-quality outputs.
                     </p>
                     
                     <div className="grid grid-cols-2 gap-6">
                         <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                             <Database className="w-6 h-6 text-purple-600 mb-3" />
                             <h4 className="font-bold text-slate-900">Structured Memory</h4>
                             <p className="text-xs text-slate-500 mt-1">We store your progress in our database so the AI knows exactly where you left off.</p>
                         </div>
                         <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                             <LayoutDashboard className="w-6 h-6 text-green-600 mb-3" />
                             <h4 className="font-bold text-slate-900">Adaptive UI</h4>
                             <p className="text-xs text-slate-500 mt-1">The interface changes dynamically based on the roadmap data generated by the system.</p>
                         </div>
                     </div>
                </motion.div>

                {/* Abstract Tech Visual */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    whileInView={{ opacity: 1, scale: 1 }} 
                    viewport={{ once: true }}
                    className="relative h-80 bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center"
                >
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                    <div className="text-center z-10">
                        <Cpu size={64} className="text-blue-500 mx-auto mb-4" />
                        <div className="text-slate-400 font-mono text-sm">System Integration: <span className="text-green-400">Active</span></div>
                        <div className="text-slate-500 font-mono text-xs mt-2">LLM Model: <span className="text-blue-400">Optimized</span></div>
                    </div>
                </motion.div>
            </div>
        </div>
      </section>

      {/* 5. TEAM / CTA */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Join the Engineering Class.
          </h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Stop treating your career like a lottery ticket. Start treating it like a project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signin" className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:shadow-xl transition-all hover:scale-105">
                Start Your Roadmap
                <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
          <p className="mt-8 text-sm text-slate-400 font-medium">
             Designed & Developed in India by <Link href="https://zelphine.com" className="text-blue-600 hover:underline">Zelphine</Link>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
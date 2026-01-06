// components/dashboard/dailyQuestions.tsx
"use client"
import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAtom } from 'jotai';
import { questionsAtom } from '@/lib/atom';
import { CheckCircle2, Circle } from 'lucide-react';
import Link from 'next/link';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';

export default function DailyQuestions() {
    const [questions, setQuestions] = useAtom(questionsAtom);

    // ... logic for fetch and toggleDone remains exactly same ...
    const getQuestions = async () => {
        try {
            const response = await fetch('/api/questions', {
                method: 'GET',
            });
            const data = await response.json();
            console.log(data);

            setQuestions(data.questions);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    }
    useEffect(() => {
        getQuestions()
    }, [])
    const toggleDone = async (id: string) => {
        try {
            const updatedQuestions = questions && questions.map((question: any) => {
                if (question.id === id) {
                    return {
                        ...question,
                        isAnswered: true,
                    };
                }
                return question;
            })
            setQuestions(updatedQuestions);
            const response = await fetch('/api/questions/mark-as-answered', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ questionId: id }),
            });
            if (!response.ok) {
                const updatedQuestions = questions && questions.map((question: any) => {
                    if (question.id === id) {
                        return {
                            ...question,
                            isAnswered: false,
                        };
                    }
                    return question;
                })
                setQuestions(updatedQuestions);

            }
        } catch (error) {
            const updatedQuestions = questions && questions.map((question: any) => {
                if (question.id === id) {
                    return {
                        ...question,
                        isAnswered: false,
                    };
                }
                return question;
            })
            setQuestions(updatedQuestions);
        }
    };

    const hasUnanswered = questions && questions.length > 0 && questions.some((q: any) => !q.isAnswered);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/40 border border-slate-100 h-full flex flex-col"
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900">Your Task for Today</h2>
                {hasUnanswered && (
                    <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">
                        {questions.filter((q: any) => !q.isAnswered).length} Pending
                    </span>
                )}
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                {!questions ? (
                    <div className='flex items-center justify-center h-40'>
                        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : hasUnanswered ? (
                    <AnimatePresence>
                        {questions.map((question: any, index: number) =>
                            !question.isAnswered && (
                                <motion.div
                                    key={question.id || index}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                    className="group p-4 rounded-2xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-indigo-200 shadow-sm hover:shadow-md transition-all duration-200"
                                >
                                    <div className="flex gap-4 items-start">
                                        <button
                                            onClick={() => toggleDone(question.id)}
                                            className="mt-1 text-slate-400 hover:text-indigo-600 transition-colors"
                                        >
                                            <Circle size={22} />
                                        </button>

                                        <div className="flex-1 text-sm text-slate-700 prose prose-sm max-w-none">
                                            <ReactMarkdown
                                                components={{
                                                    p: ({ children }) => <p className="mb-2 text-gray-800 leading-relaxed">{children}</p>,
                                                    ul: ({ children }) => <ul className="list-disc ml-6 mb-2 text-gray-700">{children}</ul>,
                                                    ol: ({ children }) => <ol className="list-decimal ml-6 mb-2 text-gray-700">{children}</ol>,
                                                    li: ({ children }) => <li className="mb-1">{children}</li>,
                                                    h3: ({ children }) => <h3 className="text-lg font-semibold mb-2 text-gray-900">{children}</h3>,
                                                    h4: ({ children }) => <h4 className="text-base font-medium mb-1 text-gray-900">{children}</h4>,
                                                    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                                                    em: ({ children }) => <em className="italic">{children}</em>,
                                                    a: ({ children, href }) => (
                                                        <Link
                                                            href={href || "/roadmap"}
                                                            className="inline-block text-blue-600 hover:text-blue-700 underline underline-offset-2 transition-colors"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {children}
                                                        </Link>
                                                    ),
                                                }}
                                                remarkPlugins={[remarkGfm]}
                                            >
                                                {question.questionText}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        )}
                    </AnimatePresence>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8 text-green-600 bg-green-50/50 rounded-2xl border border-green-100 border-dashed">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                        >
                            <CheckCircle2 size={48} className="mb-3" />
                        </motion.div>
                        <h3 className="font-bold text-lg mb-1">All Caught Up!</h3>
                        <p className="text-sm opacity-80">You've crushed all your daily tasks.</p>
                    </div>
                )}
            </div>
        </motion.div>
    )
}
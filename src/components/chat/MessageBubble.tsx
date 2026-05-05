"use client";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChatMessage } from "@/types/chat";
import Link from "next/link";
import { Bot } from "lucide-react";

export default function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`flex w-full mb-8 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {isUser ? (
        <div className="px-5 py-3.5 max-w-[85%] md:max-w-[75%] bg-purple-600 text-white rounded-tr-sm rounded-3xl text-[15px] md:text-base leading-relaxed shadow-sm">
          <p className="whitespace-pre-wrap">{msg.text}</p>
        </div>
      ) : (
        <div className="flex gap-4 w-full max-w-[95%] md:max-w-[85%]">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mt-1 shadow-md">
            <Bot size={16} className="text-white" />
          </div>
          <div className="flex-1 min-w-0 prose prose-slate dark:prose-invert max-w-none text-gray-800 dark:text-gray-200">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => <h1 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white tracking-tight">{children}</h1>,
                h2: ({ children }) => <h2 className="text-xl font-bold mt-8 mb-4 text-gray-900 dark:text-white tracking-tight border-b border-gray-200 dark:border-gray-800 pb-2">{children}</h2>,
                h3: ({ children }) => <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-white">{children}</h3>,
                h4: ({ children }) => <h4 className="text-base font-semibold mt-4 mb-2 text-gray-900 dark:text-white">{children}</h4>,
                p: ({ children }) => <p className="leading-relaxed mb-4 text-[15px] md:text-base text-gray-700 dark:text-gray-300 last:mb-0">{children}</p>,
                strong: ({ children }) => <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>,
                em: ({ children }) => <em className="italic text-gray-800 dark:text-gray-400">{children}</em>,
                del: ({ children }) => <del className="line-through text-gray-400 dark:text-gray-600">{children}</del>,
                ul: ({ children }) => <ul className="list-disc pl-5 space-y-2 mb-6 mt-2 marker:text-gray-400 dark:marker:text-gray-600 text-gray-700 dark:text-gray-300">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-5 space-y-2 mb-6 mt-2 marker:text-gray-400 dark:marker:text-gray-600 text-gray-700 dark:text-gray-300">{children}</ol>,
                li: ({ children }) => <li className="pl-1 leading-relaxed">{children}</li>,
                a: ({ children, href }) => (
                  <Link
                    target="_blank"
                    href={href || "/roadmap"}
                    className="text-blue-600 dark:text-blue-400 no-underline hover:underline font-medium transition-colors break-words decoration-blue-300 dark:decoration-blue-700 underline-offset-2"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </Link>
                ),
                
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-purple-500 dark:border-purple-600 bg-purple-50 dark:bg-purple-900/20 px-4 py-3 rounded-r-lg my-6 text-gray-800 dark:text-gray-300 italic">
                    {children}
                  </blockquote>
                ),

                code: ({ children }) => (
                  <code className="bg-gray-100 dark:bg-gray-800 text-pink-600 dark:text-pink-400 px-1.5 py-0.5 rounded-md text-[13px] font-mono border border-gray-200 dark:border-gray-700 before:content-[''] after:content-['']">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-[#0d1117] border border-gray-800 p-4 rounded-xl overflow-x-auto my-6 text-sm shadow-lg text-gray-300 custom-scrollbar">
                    {children}
                  </pre>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-6 border border-gray-200 dark:border-gray-800 rounded-xl">
                    <table className="w-full text-left text-sm text-gray-700 dark:text-gray-300 border-collapse">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 font-semibold border-b border-gray-200 dark:border-gray-800">{children}</thead>,
                tbody: ({ children }) => <tbody className="divide-y divide-gray-200 dark:divide-gray-800">{children}</tbody>,
                tr: ({ children }) => <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">{children}</tr>,
                th: ({ children }) => <th className="px-4 py-3 whitespace-nowrap">{children}</th>,
                td: ({ children }) => <td className="px-4 py-3">{children}</td>,
                hr: () => <hr className="my-8 border-gray-200 dark:border-gray-800" />,
              }}
            >
              {msg.text}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </motion.div>
  );
}
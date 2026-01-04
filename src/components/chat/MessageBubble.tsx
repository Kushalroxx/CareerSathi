"use client";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChatMessage } from "@/types/chat";
import Link from "next/link";
import { Bot, User } from "lucide-react";

export default function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex my-3 w-full ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className={`flex max-w-[90%] md:max-w-[85%] gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        
        {/* Avatar Icons */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? "bg-purple-600" : "bg-blue-100 dark:bg-blue-900"}`}>
            {isUser ? <User size={16} className="text-white" /> : <Bot size={18} className="text-blue-600 dark:text-blue-300" />}
        </div>

        {/* Bubble */}
        <div
          className={`px-4 py-3 rounded-2xl shadow-sm text-sm md:text-base overflow-hidden
            ${isUser
              ? "bg-purple-600 text-white rounded-tr-sm"
              : "bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-sm"
            }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900/50 prose-pre:p-2 prose-pre:rounded-lg">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ children, href }) => (
                    <Link
                      target="_blank"
                      href={href || "/roadmap"}
                      className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-600 hover:underline font-medium break-all"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </Link>
                  ),
                  ul: ({children}) => <ul className="list-disc pl-4 space-y-1 my-2">{children}</ul>,
                  ol: ({children}) => <ol className="list-decimal pl-4 space-y-1 my-2">{children}</ol>,
                  li: ({children}) => <li className="pl-1">{children}</li>
                }}
              >
                {msg.text}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
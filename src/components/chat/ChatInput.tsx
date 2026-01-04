"use client";
import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

export default function ChatInput({
  input,
  setInput,
  handleSend,
  darkMode,
  isTyping,
}: {
  input: string;
  setInput: (v: string) => void;
  handleSend: () => void;
  darkMode: boolean;
  isTyping: boolean;
}) {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="flex items-end rounded-xl overflow-hidden shadow-lg border border-gray-300 
                 focus-within:border-purple-500 relative bg-white/70 dark:bg-white/20 p-3"
    >
     <textarea
          className={`flex-1 max-h-40 min-h-[24px] py-3 px-3 resize-none outline-none text-sm md:text-base leading-relaxed bg-transparent
          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-gray-300
          [&::-webkit-scrollbar-thumb]:rounded-full
          dark:[&::-webkit-scrollbar-thumb]:bg-gray-600
          hover:[&::-webkit-scrollbar-thumb]:bg-gray-400
          dark:hover:[&::-webkit-scrollbar-thumb]:bg-gray-500
          placeholder:text-gray-400 dark:placeholder:text-gray-500 dark:text-white`}
          
          placeholder="Ask me about career paths, skills, or interviews..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = Math.min(e.target.scrollHeight, 160) + "px"; 
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          rows={1}
        />
      <button
        className="absolute right-2 bottom-2 p-2 bg-purple-100 rounded-full hover:scale-105 hover:bg-purple-200 transition disabled:opacity-50"
        onClick={handleSend}
        disabled={isTyping || input.trim() === ""}
      >
        <ArrowUp size={22} className="text-purple-600" />
      </button>
    </motion.div>
  );
}

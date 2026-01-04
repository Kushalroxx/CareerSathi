import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, PlusCircle, MessageSquare, Sparkles, Link as LinkIcon, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"; // Import Shadcn ScrollArea

export default function ChatSidebar({ darkMode, recentConversations, currentSessionId, startNewChat }:{
  darkMode: boolean;
  recentConversations: any[];
  currentSessionId: string | undefined;
  startNewChat: () => void;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      {/* Mobile Trigger Button */}
      <motion.button
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6 ,delay: 0.3}}
        className="absolute top-5 left-3 z-50 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <MessageCircle size={25} className="text-gray-700 dark:text-gray-200" />
      </motion.button>

      {/* Sidebar (lg: static, sm: drawer) */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0 , opacity: 1}}
        transition={{ delay: 0.1}}
        className={`hidden lg:flex lg:w-[35%] xl:w-1/4 pl-3 pr-5 pt-5 border-r mt-20 h-[calc(100vh-80px)] overflow-hidden flex-col 
          ${darkMode ? "border-gray-700 bg-transparent" : "border-gray-300 bg-transparent"}`}
      >
        {/* Static Header Section (Buttons/Title) */}
        <div className="flex-shrink-0 pb-2">
            <button
            onClick={startNewChat}
            className={`flex items-center gap-3 p-3 rounded-xl w-full text-left font-semibold transition-all duration-300 shadow-sm hover:shadow-md group ${darkMode
                ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700'
                : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
            }`}
            >
            <div className={`p-1 rounded-full ${darkMode ? "bg-gray-700 group-hover:bg-gray-600" : "bg-gray-100 group-hover:bg-white"}`}>
                 <PlusCircle size={18} />
            </div>
            New conversation
            </button>

            <h2 className={`text-xs font-bold uppercase tracking-wider mt-8 mb-2 px-1 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            Recent Chats
            </h2>
        </div>

        {/* Scrollable List Section */}
        <ScrollArea className="flex-1 -mr-4 pr-4">
            <div className="space-y-2">
            {recentConversations.map((conv) => (
                <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                key={conv.id}
                onClick={() => router.push(`/chat/${conv.id}`)}
                className={`group flex items-center gap-3 py-3 px-3 rounded-xl cursor-pointer transition-all border ${currentSessionId === conv.id
                    ? 'bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800'
                    : "bg-transparent border-transparent hover:bg-gray-50 dark:hover:bg-gray-900"
                }`}
                >
                <MessageSquare size={16} className={`flex-shrink-0 ${currentSessionId === conv.id ? "text-purple-600" : "text-gray-400"}`} />
                <div className="truncate flex-1">
                    <p className={`font-medium text-sm truncate ${currentSessionId === conv.id ? "text-purple-700 dark:text-purple-300" : "text-gray-700 dark:text-gray-300"}`}>
                        {conv.title || "Untitled Chat"}
                    </p>
                </div>
                </motion.div>
            ))}
            </div>
            <ScrollBar  className="w-2.5 [&>div]:!bg-zinc-500 [&>div]:hover:!bg-zinc-600" />
        </ScrollArea>
      </motion.aside>

      {/* Mobile Drawer + Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`fixed top-0 left-0 w-3/4 max-w-xs h-full z-50 p-5 border-r flex flex-col shadow-2xl
                ${darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-300"}`}
            >
              {/* Static Drawer Header */}
              <div className="flex-shrink-0 relative mb-4">
                
                
                <button
                    className="absolute -top-1 right-0 p-1"
                    onClick={() => setSidebarOpen(false)}
                >
                    <X size={24} className="text-purple-600" />
                </button>

                {/* Spacer for the absolute positioned elements above */}
                <div className="h-14"></div> 

                <button
            onClick={startNewChat}
            className={`flex items-center gap-3 p-3 rounded-xl w-full text-left font-semibold transition-all duration-300 shadow-sm hover:shadow-md group ${darkMode
                ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700'
                : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
            }`}
            >
            <div className={`p-1 rounded-full ${darkMode ? "bg-gray-700 group-hover:bg-gray-600" : "bg-gray-100 group-hover:bg-white"}`}>
                 <PlusCircle size={18} />
            </div>
            New conversation
            </button>

            <h2 className={`text-xs font-bold uppercase tracking-wider mt-8 mb-2 px-1 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            Recent Chats
            </h2>
              </div>

              {/* Scrollable Drawer List */}
              <ScrollArea className="flex-1 -mr-4 pr-4">
                <div className="space-y-2">
                    <h2 className={`text-xs font-bold uppercase tracking-wider mb-3 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                        History
                    </h2>
                    {recentConversations.map((conv) => (
                    <motion.div
                        key={conv.id}
                        onClick={() => {
                        router.push(`/chat/${conv.id}`);
                        setSidebarOpen(false);
                        }}
                        className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${currentSessionId === conv.id
                        ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                    >
                        <MessageSquare size={18} className="flex-shrink-0 opacity-70" />
                        <span className="truncate text-sm font-medium">
                            {conv.title || "Untitled Chat"}
                        </span>
                    </motion.div>
                    ))}
                </div>
                 <ScrollBar  className="w-3 [&>div]:!bg-zinc-500 [&>div]:hover:!bg-zinc-600" />
              </ScrollArea>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
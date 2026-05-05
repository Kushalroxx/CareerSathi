"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { createChatSession, saveChatMessage, updateChatSessionTitle } from "@/lib/chatStorage";
import { useChatSessions } from "@/hooks/useChatSessions";
import { useChatMessages } from "@/hooks/useChatMessages";
import Header from "@/components/layout/Header";
import ChatSidebar from "@/components/chat/chatSidebar";
import ChatWindow from "@/components/chat/ChatWindow";
import ChatInput from "@/components/chat/ChatInput";
import { ChatMessage } from "@/types/chat";
import { useParams, useRouter } from "next/navigation";

export default function ChatPage() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const id = useParams().id?.[0];
  const [darkMode, setDarkMode] = useState(false);
  const [input, setInput] = useState("");
  const [oldInput, setOldInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string|undefined>(id);
  const router = useRouter();
  const recentConversations = useChatSessions(userId);
  const { messages, loading, setMessages } = useChatMessages(userId, id);


  const startNewChat = () => {
    router.push("/chat");
    setMessages([]);
    setInput("");
    setCurrentSessionId(undefined);
  };

  useEffect(() => {
    if (id) {
      setCurrentSessionId(id);
    }
  }, [id]);
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: ChatMessage = { role: "user", text: input };
    let sessionId = currentSessionId;
    setOldInput(input);
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      if (!userId) throw new Error("User not logged in");
      
      // 1. Create new session if needed (Same as your old code)
      let isNewSession = false;
      if (!sessionId) {
        const generatedSessionId = await createChatSession(userId, "New Chat");
        setCurrentSessionId(generatedSessionId);
        sessionId = generatedSessionId;
        window.history.replaceState(null, "", `/chat/${generatedSessionId}`);
        isNewSession = true;
      }

      await saveChatMessage(userId, sessionId, "user", userMessage.text);

      const history = messages.slice(-3).map((m) => ({ role: m.role, text: m.text }));
      
      // 2. Fetch from the new streaming API
      const res = await fetch("/api/careersathi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text, provider: "gemini", chatId: sessionId, history }),
      });

      if (!res.ok || !res.body) {
        throw new Error("Failed to get response");
      }

      // 3. Prepare the UI for the typing effect
      setMessages((prev) => [...prev, { role: "bot", text: "" }]);

      // 4. Setup Stream Reader
      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let completeBotReply = "";
      let finalTitle = "";

      // 5. Read the stream chunk-by-chunk
      // 5. Read the stream chunk-by-chunk
      setIsTyping(false);
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunkText = decoder.decode(value, { stream: true });
        
        // CLIENT-SIDE TYPING EFFECT: Split the chunk by spaces and newlines (keeping them)
        const tokens = chunkText.split(/([ \n])/); 

        for (const token of tokens) {
          if (!token) continue;

          completeBotReply += token;
          let displayReply = completeBotReply;

          // 6. Look for the hidden Title delimiter
          if (completeBotReply.includes("__CHAT_TITLE__")) {
            const parts = completeBotReply.split("__CHAT_TITLE__");
            displayReply = parts[0]; 
            finalTitle = parts[1];   
          }

          // 7. Update the UI in real-time
          setMessages((prev) => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = { 
              ...newMessages[newMessages.length - 1], 
              text: displayReply 
            };
            return newMessages;
          });

          // The Client-Side Magic: Delay between each word
          await sleep(20); // Adjust this number to make typing faster or slower!
        }
      }

      // 8. Stream is completely finished. Clean up the final text.
      const cleanBotReply = completeBotReply.split("__CHAT_TITLE__")[0];

      // 9. Save Title to Firebase if we extracted one
      if (finalTitle && isNewSession) {
        const truncatedTitle = finalTitle.substring(0, 40) + (finalTitle.length > 40 ? "..." : "");
        document.title = finalTitle;
        await updateChatSessionTitle(userId, sessionId, truncatedTitle);
      }

      // 10. Save the final, clean Bot message to the database
      await saveChatMessage(userId, sessionId, "bot", cleanBotReply);

    } catch (err) {
      console.error("Chat error:", err);
      setInput(oldInput);
      setMessages((prev) => [...prev, { role: "bot", text: "Sorry, something went wrong." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={`transition-colors duration-500 ${darkMode ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-200" : "bg-gradient-to-br from-blue-50 to-purple-50"}`}>
      <div className=" md:ml-10 flex h-screen">
        <Header className="pl-8 lg:pl-0" />
        <ChatSidebar
          darkMode={darkMode}
          recentConversations={recentConversations}
          currentSessionId={currentSessionId}
          startNewChat={startNewChat}
        />
        <div className="flex flex-col flex-1 pt-16">
          <motion.div className="flex-1 overflow-y-auto  rounded-2xl flex flex-col " initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ChatWindow messages={messages} loading={loading} isTyping={isTyping} />
            
          </motion.div>
          <div className="mx-4 mb-2 md:mb-4 md:mx-6 lg:mx-8">

          <ChatInput input={input} setInput={setInput} handleSend={handleSend} darkMode={darkMode} isTyping={isTyping} />
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { sendChatMessage } from "@/lib/api";
import Logo from "@/components/Logo";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm MediBot, your personal health assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      const response = await sendChatMessage({ message: input });
      
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response.response,
          isUser: false,
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, botMessage]);
        setIsLoading(false);
      }, 500); // Added slight delay for a more natural feel
      
    } catch (error) {
      console.error("Error sending message:", error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble processing your request. Please try again later.",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-white rounded-2xl shadow-xl p-5 border border-slate-100 max-w-md mx-auto overflow-hidden">
      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Logo size="sm" withText={false} />
          <div>
            <h3 className="font-heading font-bold text-base">MediBot</h3>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-xs text-green-500">Online</span>
            </div>
          </div>
        </div>
        <button className="text-slate-400 hover:text-slate-600">
          <i className="ri-settings-4-line"></i>
        </button>
      </div>
      
      <div className="h-80 overflow-y-auto flex flex-col gap-4 mb-4 pr-2">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`${
                message.isUser 
                  ? "self-end bg-primary-500 text-white" 
                  : "self-start bg-slate-50 text-slate-800"
              } rounded-lg p-3 shadow-sm max-w-[80%]`}
            >
              {message.text.split("\n").map((line, i) => (
                <p key={i} className={i > 0 ? "mt-2" : ""}>
                  {line}
                </p>
              ))}
            </motion.div>
          ))}
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="self-start bg-slate-50 text-slate-800 rounded-lg p-3 shadow-sm"
            >
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                <div className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: "600ms" }}></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="relative">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
          placeholder="Type your health question..."
          disabled={isLoading}
        />
        <Button 
          type="submit"
          variant="ghost" 
          size="icon"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-500 hover:text-primary-600 bg-transparent hover:bg-transparent"
          disabled={isLoading || !input.trim()}
        >
          <i className="ri-send-plane-fill text-xl"></i>
        </Button>
      </form>
    </div>
  );
}

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Sparkles, Bot, User, RefreshCw, Cpu } from "lucide-react";
import { useSound } from "../../context/SoundContext";

interface AICopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  time: string;
}

export const AICopilotDrawer: React.FC<AICopilotDrawerProps> = ({ isOpen, onClose }) => {
  const { playClick, playHover, playSuccess } = useSound();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "model",
      text: "Greetings! I am Synapse Bot, your intelligent assistant for Synapse Club at GLA University. Ask me about upcoming events, compute grants, workshops, or research projects!",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const suggestedQuestions = [
    "How do I join Synapse Club at GLA?",
    "When is Neural Hack 2026?",
    "What workshops are offered this month?",
    "How do I get compute cluster access?",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    playClick();
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history: messages.map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      const data = await response.json();
      playSuccess();

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "model",
        text: data.response || "I am processing your query. Feel free to explore our events and resources!",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          role: "model",
          text: "I am Synapse Bot! Learn more about our weekly workshops at GLA University or apply for GPU compute grants via the Student Dashboard.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9500] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full max-w-md h-full bg-black border-l border-white/20 p-6 shadow-2xl flex flex-col justify-between z-10 text-white font-mono"
          >
            {/* Drawer Header */}
            <div className="pb-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center font-bold">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-wider uppercase">SYNAPSE AI ASSISTANT</h3>
                  <span className="text-[10px] text-gray-400 block">GLA UNIV // GEMINI 2.5</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white bg-white/5 border border-white/10 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Message Stream */}
            <div className="flex-1 overflow-y-auto my-4 space-y-4 pr-1 custom-scrollbar text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${
                    msg.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      msg.role === "user"
                        ? "bg-white text-black font-bold"
                        : "bg-white/10 text-white border border-white/20"
                    }`}
                  >
                    {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div
                    className={`p-3.5 rounded-2xl max-w-[80%] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-white text-black font-sans font-medium"
                        : "bg-white/5 border border-white/15 text-gray-200"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="text-[9px] text-gray-400 block mt-1 text-right">
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-gray-400 text-xs animate-pulse">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Synapse Bot is thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Chips */}
            <div className="space-y-2 pb-3">
              <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest block">
                SUGGESTED QUERIES
              </span>
              <div className="flex flex-wrap gap-1.5">
                {suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    onMouseEnter={playHover}
                    className="text-[10px] bg-white/5 hover:bg-white/10 border border-white/10 px-2.5 py-1 rounded-lg text-gray-300 transition-colors text-left truncate max-w-full"
                  >
                    + {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="pt-3 border-t border-white/10 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Synapse Bot..."
                className="flex-1 bg-white/5 border border-white/15 focus:border-white rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none font-mono"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="p-3 bg-white text-black hover:bg-gray-200 rounded-xl font-bold disabled:opacity-50 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

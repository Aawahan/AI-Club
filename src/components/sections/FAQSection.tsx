import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Search, HelpCircle } from "lucide-react";
import { FAQ_DATA } from "../../data/clubData";
import { useSound } from "../../context/SoundContext";

export const FAQSection: React.FC = () => {
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<string | null>(FAQ_DATA[0].id);
  const { playHover, playClick } = useSound();

  const filtered = FAQ_DATA.filter(
    (item) =>
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase())
  );

  const toggleAnswer = (id: string) => {
    playClick();
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-28 px-6 md:px-12 max-w-5xl mx-auto z-10 relative border-t border-white/10">
      <div className="space-y-4 mb-12 text-center">
        <span className="px-3 py-1 bg-white/5 border border-white/15 rounded-full text-xs font-mono text-gray-300 uppercase tracking-widest">
          FREQUENTLY ASKED QUESTIONS
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold font-mono tracking-wider text-white uppercase">
          GOT <span className="text-gray-400">QUESTIONS?</span>
        </h2>
      </div>

      <div className="relative mb-8 max-w-md mx-auto">
        <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search questions or keywords..."
          className="bg-white/5 border border-white/15 focus:border-white text-xs font-mono text-white placeholder-gray-500 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none w-full"
        />
      </div>

      <div className="space-y-4">
        {filtered.map((item) => {
          const isOpen = openId === item.id;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-black/80 border border-white/15 hover:border-white/30 rounded-2xl overflow-hidden backdrop-blur-2xl transition-all"
            >
              <button
                onClick={() => toggleAnswer(item.id)}
                onMouseEnter={playHover}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-mono font-bold text-white text-sm md:text-base"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <span>{item.question}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-6 text-xs md:text-sm text-gray-300 font-sans leading-relaxed border-t border-white/10 pt-4"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

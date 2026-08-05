import React, { useState } from "react";
import { motion } from "motion/react";
import { Pin, Bell, Volume2, Search, AlertTriangle, Calendar } from "lucide-react";
import { ANNOUNCEMENTS_DATA } from "../../data/clubData";
import { useSound } from "../../context/SoundContext";

export const AnnouncementsSection: React.FC = () => {
  const [search, setSearch] = useState("");
  const { playHover, playClick, playGlitch } = useSound();

  const filtered = ANNOUNCEMENTS_DATA.filter(
    (ann) =>
      ann.title.toLowerCase().includes(search.toLowerCase()) ||
      ann.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="announcements" className="py-28 px-6 md:px-12 max-w-7xl mx-auto z-10 relative border-t border-white/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <span className="px-3 py-1 bg-white/5 border border-white/15 rounded-full text-xs font-mono text-gray-300 uppercase tracking-widest">
            DISPATCH TIMELINE
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-mono tracking-wider text-white uppercase mt-3">
            LATEST <span className="text-gray-400">ANNOUNCEMENTS</span>
          </h2>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search announcements..."
            className="bg-white/5 border border-white/15 focus:border-white text-xs font-mono text-white placeholder-gray-500 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none w-full sm:w-64"
          />
        </div>
      </div>

      <div className="space-y-6">
        {filtered.map((ann) => (
          <motion.div
            key={ann.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onMouseEnter={playHover}
            className={`bg-black/80 border ${
              ann.pinned ? "border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.06)]" : "border-white/15"
            } rounded-3xl p-6 md:p-8 backdrop-blur-2xl transition-all duration-300 space-y-4`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
              <div className="flex items-center gap-2">
                {ann.pinned && (
                  <span className="px-3 py-1 bg-white text-black font-bold uppercase rounded-full flex items-center gap-1.5 text-[10px]">
                    <Pin className="w-3 h-3 fill-black" />
                    PINNED
                  </span>
                )}
                <span className="px-3 py-1 bg-white/10 border border-white/20 text-white font-bold uppercase rounded-full text-[10px]">
                  {ann.category}
                </span>
                {ann.priority === "High" && (
                  <span className="px-3 py-1 bg-white/5 border border-white/20 text-gray-300 font-bold uppercase rounded-full flex items-center gap-1 text-[10px]">
                    <AlertTriangle className="w-3 h-3 text-white" />
                    PRIORITY
                  </span>
                )}
              </div>

              <div className="text-gray-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{ann.date}</span>
              </div>
            </div>

            <div className="flex items-start justify-between gap-4">
              <h3 className="font-mono font-bold text-xl text-white">
                {ann.title}
              </h3>
              <button
                onClick={() => playGlitch()}
                className="p-2 bg-white/5 hover:bg-white/15 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-colors flex-shrink-0"
                title="Audio Dispatch Preview"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-gray-300 font-sans leading-relaxed">
              {ann.content}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

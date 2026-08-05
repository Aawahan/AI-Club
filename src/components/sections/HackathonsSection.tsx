import React from "react";
import { motion } from "motion/react";
import { Trophy, Calendar, Zap, Users, Code, ArrowRight } from "lucide-react";
import { HACKATHON_DATA } from "../../data/clubData";
import { useSound } from "../../context/SoundContext";

export const HackathonsSection: React.FC = () => {
  const { playHover, playClick } = useSound();

  return (
    <section id="hackathons" className="py-28 px-6 md:px-12 max-w-7xl mx-auto z-10 relative">
      {/* Main Banner Container */}
      <div className="bg-black/90 border border-white/20 rounded-3xl p-8 md:p-12 backdrop-blur-2xl shadow-[0_0_60px_rgba(255,255,255,0.06)] relative overflow-hidden space-y-12">
        {/* Background glow circle */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1 bg-white text-black font-mono font-bold text-xs uppercase rounded-full">
                {HACKATHON_DATA.status} HACKATHON
              </span>
              <span className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {HACKATHON_DATA.dates}
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold font-mono text-white tracking-wider uppercase">
              {HACKATHON_DATA.title}
            </h2>

            <p className="text-gray-400 max-w-2xl text-sm leading-relaxed">
              {HACKATHON_DATA.description}
            </p>
          </div>

          {/* Prize Pool Highlight */}
          <div className="bg-white/5 border border-white/20 rounded-2xl p-6 text-center lg:text-right font-mono space-y-1">
            <span className="text-xs text-gray-400 uppercase tracking-widest block font-bold">
              TOTAL PRIZE POOL
            </span>
            <div className="text-3xl md:text-4xl font-extrabold text-white tracking-wider shadow-sm">
              {HACKATHON_DATA.prizePool}
            </div>
            <span className="text-[10px] text-gray-400 block">+ $20,000 Cloud GPU Credits</span>
          </div>
        </div>

        {/* 4 Tracks Grid */}
        <div className="space-y-6">
          <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest font-bold">
            COMPETITION TRACKS & AWARDS
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HACKATHON_DATA.tracks.map((track, idx) => (
              <div
                key={idx}
                onMouseEnter={playHover}
                className="bg-white/5 border border-white/10 hover:border-white/30 rounded-2xl p-6 space-y-3 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="p-3 bg-white/10 rounded-xl w-fit text-white">
                  <Trophy className="w-5 h-5" />
                </div>
                <h4 className="font-mono font-bold text-white text-sm">
                  {track.name}
                </h4>
                <div className="text-xs font-mono font-bold text-white bg-white/10 px-2.5 py-1 rounded-md w-fit">
                  {track.prize}
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {track.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule & Sponsors Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-white/10">
          {/* Schedule */}
          <div className="lg:col-span-7 space-y-4 font-mono">
            <span className="text-xs text-gray-400 uppercase tracking-widest block font-bold">
              48-HOUR TIMELINE
            </span>
            <div className="space-y-2">
              {HACKATHON_DATA.schedule.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl text-xs text-gray-300"
                >
                  <span className="font-bold text-white">{item.time}</span>
                  <span>{item.event}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sponsors */}
          <div className="lg:col-span-5 space-y-4 font-mono">
            <span className="text-xs text-gray-400 uppercase tracking-widest block font-bold">
              SPONSORS & JUDGES
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {HACKATHON_DATA.sponsors.map((s, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white/5 border border-white/10 rounded-xl text-center text-xs font-bold text-gray-300 hover:text-white hover:border-white/30 transition-colors"
                >
                  {s}
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  playClick();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full py-3 bg-white text-black font-mono font-bold text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors shadow-lg"
              >
                <span>REGISTER FOR HACKATHON</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

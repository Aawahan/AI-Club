import React from "react";
import { motion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useSound } from "../../context/SoundContext";

interface HeroSectionProps {
  onExplore: () => void;
  onJoin: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore, onJoin }) => {
  const { playHover, playClick } = useSound();

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 px-6 md:px-12 flex flex-col justify-center items-center text-center overflow-hidden z-10">
      {/* Background ambient lighting halo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-white/10 to-transparent blur-[160px] pointer-events-none" />

      {/* Hero Badge Tag */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/20 backdrop-blur-xl mb-8 shadow-[0_0_20px_rgba(255,255,255,0.08)]"
      >
        <span className="w-2 h-2 rounded-full bg-white animate-ping" />
        <span className="text-xs font-mono tracking-[0.25em] text-gray-300 uppercase">
          SYNAPSE CLUB // GLA UNIVERSITY
        </span>
      </motion.div>

      {/* Main Display Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl md:text-7xl xl:text-8xl font-extrabold tracking-tight text-white max-w-6xl uppercase leading-none font-sans"
      >
        SYNAPSE CLUB <br />
        <span className="font-mono text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500 underline decoration-white/30 underline-offset-8">
          GLA UNIVERSITY
        </span>
      </motion.h1>

      {/* Subtitle Paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-6 text-base md:text-xl text-gray-400 max-w-3xl font-sans leading-relaxed"
      >
        Synapse Club is the premier artificial intelligence and tech community at GLA University. We construct frontier LLMs, autonomous multi-agent swarms, WebGL generative art, and edge robotics.
      </motion.p>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <button
          onClick={() => {
            playClick();
            onExplore();
          }}
          onMouseEnter={playHover}
          className="px-8 py-4 bg-white text-black font-mono font-bold text-sm rounded-2xl flex items-center gap-3 hover:bg-gray-200 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105"
        >
          <span>EXPLORE 3D ECOSYSTEM</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            playClick();
            onJoin();
          }}
          onMouseEnter={playHover}
          className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 text-white font-mono font-bold text-sm rounded-2xl transition-all duration-300 backdrop-blur-md hover:scale-105"
        >
          <span>JOIN CLUB & GET COMPUTE</span>
        </button>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          playClick();
          document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
        }}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="mt-16 flex flex-col items-center gap-2 text-xs font-mono text-gray-500 hover:text-white transition-colors cursor-pointer"
      >
        <span>SCROLL TO DISCOVER</span>
        <ChevronDown className="w-4 h-4" />
      </motion.a>
    </section>
  );
};

import React from "react";
import { motion } from "motion/react";
import { Cpu, ShieldCheck, Zap, Rocket, Users, Award, Code, Globe } from "lucide-react";
import { useSound } from "../../context/SoundContext";

export const AboutSection: React.FC = () => {
  const { playHover } = useSound();

  const stats = [
    { number: "500+", label: "Active Student Members", icon: Users },
    { number: "45+", label: "AI Research Projects", icon: Code },
    { number: "12", label: "Global Hackathon Wins", icon: Award },
    { number: "$50K+", label: "Annual Compute Grants", icon: Globe },
  ];

  const pillars = [
    {
      title: "01 // FRONTIER RESEARCH",
      icon: Cpu,
      description: "Dissecting transformer architectures, state-space models (Mamba), mechanical interpretability, and fine-tuning local models on custom hardware.",
    },
    {
      title: "02 // AGENT SYSTEMS ENGINEERING",
      icon: Zap,
      description: "Building production multi-agent graph swarms, zero-latency audio pipelines, and WebGL neural canvas visualizations.",
    },
    {
      title: "03 // ALIGNMENT & ETHICS",
      icon: ShieldCheck,
      description: "Investigating algorithmic fairness, watermarking generative media, privacy-preserving machine learning, and AI policy.",
    },
    {
      title: "04 // STARTUP LAUNCHPAD",
      icon: Rocket,
      description: "Incubating student AI startups with non-dilutive seed micro-grants, cloud GPU allocations, and tier-1 mentor networks.",
    },
  ];

  return (
    <section id="about" className="py-28 px-6 md:px-12 max-w-7xl mx-auto z-10 relative">
      {/* Header Title */}
      <div className="space-y-4 mb-16 text-center md:text-left">
        <span className="px-3 py-1 bg-white/5 border border-white/15 rounded-full text-xs font-mono text-gray-300 uppercase tracking-widest">
          MISSION & VISION
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold font-mono tracking-wider text-white uppercase">
          ENGINEERING THE <span className="text-gray-400">NEXT CENTURY</span>
        </h2>
        <p className="text-gray-400 max-w-2xl text-sm md:text-base leading-relaxed">
          Founded at GLA University, Synapse Club is standardizing AI education, research, and innovation across campus.
        </p>
      </div>

      {/* Key Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            onMouseEnter={playHover}
            className="bg-black/60 border border-white/10 hover:border-white/30 rounded-2xl p-6 text-center backdrop-blur-xl transition-all duration-300 group hover:scale-[1.02]"
          >
            <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white transition-colors">
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-3xl md:text-4xl font-extrabold font-mono text-white tracking-wider">
              {stat.number}
            </div>
            <div className="text-xs font-mono text-gray-400 uppercase tracking-wider mt-1">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 4 Core Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pillars.map((pillar, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            onMouseEnter={playHover}
            className="bg-black/80 border border-white/15 hover:border-white/40 rounded-3xl p-8 backdrop-blur-2xl transition-all duration-300 space-y-4 group shadow-[0_0_30px_rgba(255,255,255,0.02)]"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-gray-400 font-bold tracking-widest">
                {pillar.title}
              </span>
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-white text-white group-hover:text-black transition-all">
                <pillar.icon className="w-5 h-5" />
              </div>
            </div>

            <p className="text-sm text-gray-300 font-sans leading-relaxed">
              {pillar.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

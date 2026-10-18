import React from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Cpu,
  Calendar,
  Users,
  BookOpen,
  Bell,
  Image as ImageIcon,
  HelpCircle,
  Sparkles,
  Trophy,
  Zap,
  Layers,
  Terminal,
  Compass,
} from "lucide-react";
import { HeroSection } from "../sections/HeroSection";
import { TabId } from "../../types";
import { useSound } from "../../context/SoundContext";
import { HACKATHON_DATA } from "../../data/clubData";

interface HomeHubProps {
  onSelectTab: (tab: TabId) => void;
  onOpenAuth: () => void;
}

export const HomeHub: React.FC<HomeHubProps> = ({ onSelectTab, onOpenAuth }) => {
  const { playClick, playHover } = useSound();

  const explorePortals = [
    {
      tabId: "events" as TabId,
      title: "Events & Hackathons",
      tagline: "Neural Hack 2026 & Workshops",
      description:
        "Compete for ₹2,50,000 cash prizes, attend hands-on LLM fine-tuning labs, and earn digital event passes.",
      icon: Calendar,
      badge: "Flagship",
      actionText: "Browse Events & Labs",
    },
    {
      tabId: "tools" as TabId,
      title: "AI Tools & 3D Lab",
      tagline: "Interactive 3D Matrix & Sandbox",
      description:
        "Test frontier AI models (GPT-4o, Claude 3.5, Gemini 1.5 Pro, Llama 3) with our live prompt runner and 3D orbit viewer.",
      icon: Cpu,
      badge: "6 Models",
      actionText: "Launch 3D Lab",
    },
    {
      tabId: "team" as TabId,
      title: "Executive Committee",
      tagline: "Researchers & Domain Leads",
      description:
        "Connect with student researchers, system architects, and GLA University faculty mentors driving innovation.",
      icon: Users,
      badge: "Leadership",
      actionText: "Meet the Team",
    },
    {
      tabId: "resources" as TabId,
      title: "Knowledge Vault",
      tagline: "Colab Notebooks & Papers",
      description:
        "Download verified research datasets, Colab starter notebooks, agent architectures, and machine learning slide decks.",
      icon: BookOpen,
      badge: "25+ Assets",
      actionText: "Open Knowledge Vault",
    },
    {
      tabId: "announcements" as TabId,
      title: "Live Dispatches",
      tagline: "Club News & Deadlines",
      description:
        "Stay ahead with real-time timeline notifications, GPU cluster access schedules, and campus announcements.",
      icon: Bell,
      badge: "Realtime",
      actionText: "View Announcements",
    },
    {
      tabId: "gallery" as TabId,
      title: "Media Archive",
      tagline: "Photo & Video Showcase",
      description:
        "High-definition captures of previous GLA hackathons, hardware robotics bootcamps, and award ceremonies.",
      icon: ImageIcon,
      badge: "Captured",
      actionText: "Browse Gallery",
    },
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* 1. Grand Hero Section */}
      <HeroSection
        onExplore={() => onSelectTab("tools")}
        onJoin={onOpenAuth}
      />

      {/* 2. Key Metrics Showcase */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 md:p-8 bg-black/70 backdrop-blur-xl border border-white/15 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.8)]">
          {[
            { value: "1,200+", label: "Active Members", sub: "GLA University students" },
            { value: "45+", label: "Research Papers", sub: "Published in IEEE & NeurIPS" },
            { value: "₹2.5L", label: "Prize Pool", sub: "Neural Hack 2026" },
            { value: "80+", label: "GPU Accelerators", sub: "Nvidia A100 / H100 nodes" },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center md:text-left space-y-1 p-3 border-r last:border-r-0 border-white/10"
            >
              <span className="font-mono text-2xl md:text-4xl font-extrabold text-white tracking-tight block">
                {stat.value}
              </span>
              <span className="font-mono text-xs font-bold text-gray-300 uppercase block">
                {stat.label}
              </span>
              <span className="text-[11px] font-sans text-gray-500 hidden sm:block">
                {stat.sub}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3. Flagship Hackathon Spotlight Banner */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 via-black to-black p-8 md:p-12 shadow-[0_0_50px_rgba(255,255,255,0.08)]">
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white font-mono text-xs uppercase font-bold">
                <Trophy className="w-3.5 h-3.5 text-yellow-300" />
                <span>UPCOMING FLAGSHIP HACKATHON</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold font-mono tracking-wider text-white uppercase">
                {HACKATHON_DATA.title}
              </h2>
              <p className="text-sm md:text-base text-gray-300 font-sans leading-relaxed">
                {HACKATHON_DATA.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-300 pt-2">
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl">
                  <Calendar className="w-3.5 h-3.5 text-white" />
                  {HACKATHON_DATA.dates}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl">
                  <Zap className="w-3.5 h-3.5 text-yellow-400" />
                  Prize: {HACKATHON_DATA.prizePool}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  Free Food, Swag & Cloud Credits
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
              <button
                onClick={() => {
                  playClick();
                  onSelectTab("events");
                }}
                onMouseEnter={playHover}
                className="px-8 py-4 bg-white text-black font-mono font-bold text-xs md:text-sm rounded-2xl flex items-center justify-center gap-2.5 hover:bg-gray-200 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:scale-105"
              >
                <span>EXPLORE TRACKS & REGISTER</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  playClick();
                  onSelectTab("about");
                }}
                onMouseEnter={playHover}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-mono font-bold text-xs md:text-sm rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 backdrop-blur-md"
              >
                <span>ABOUT SYNAPSE CLUB</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Ecosystem Portals Navigation Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs font-mono tracking-widest text-gray-400 uppercase font-bold">
              PLATFORM PORTALS
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-mono tracking-wider text-white uppercase mt-1">
              NAVIGATE BY <span className="text-gray-400">CATEGORY</span>
            </h2>
          </div>
          <p className="text-xs md:text-sm font-sans text-gray-400 max-w-md">
            Each section is structured as a dedicated tab with dedicated tools, search filters, and real-time interaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {explorePortals.map((portal, idx) => {
            const Icon = portal.icon;
            return (
              <motion.div
                key={portal.tabId}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                onClick={() => {
                  playClick();
                  onSelectTab(portal.tabId);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onMouseEnter={playHover}
                className="group relative bg-black/70 hover:bg-black/90 border border-white/15 hover:border-white/40 rounded-3xl p-6 md:p-8 backdrop-blur-xl transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(255,255,255,0.06)]"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
                      <Icon className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                    </div>
                    {portal.badge && (
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-gray-300 uppercase font-bold">
                        {portal.badge}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-lg md:text-xl font-mono font-bold text-white tracking-wide group-hover:text-gray-100">
                      {portal.title}
                    </h3>
                    <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                      {portal.tagline}
                    </p>
                  </div>

                  <p className="text-xs font-sans text-gray-400 leading-relaxed">
                    {portal.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono font-bold text-white group-hover:text-gray-200">
                  <span>{portal.actionText}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

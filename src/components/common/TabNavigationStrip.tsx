import React from "react";
import { motion } from "motion/react";
import {
  Compass,
  Info,
  Cpu,
  Calendar,
  Users,
  Image as ImageIcon,
  Bell,
  BookOpen,
  HelpCircle,
} from "lucide-react";
import { TabId } from "../../types";
import { useSound } from "../../context/SoundContext";

interface TabNavigationStripProps {
  currentTab: TabId;
  onSelectTab: (tab: TabId) => void;
}

export const TAB_ITEMS: {
  id: TabId;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  description: string;
}[] = [
  {
    id: "home",
    label: "Home",
    shortLabel: "Home",
    icon: Compass,
    description: "Overview & 3D Ecosystem",
  },
  {
    id: "about",
    label: "About Club",
    shortLabel: "About",
    icon: Info,
    description: "GLA Affiliation & Vision",
  },
  {
    id: "tools",
    label: "AI Tools & 3D Lab",
    shortLabel: "AI Tools",
    icon: Cpu,
    badge: "6 Models",
    description: "Interactive AI Matrix & Prompts",
  },
  {
    id: "events",
    label: "Events & Labs",
    shortLabel: "Events",
    icon: Calendar,
    badge: "₹2.5L",
    description: "Keynotes, Workshops & Hackathons",
  },
  {
    id: "team",
    label: "Executive Team",
    shortLabel: "Team",
    icon: Users,
    description: "Board, Research Leads & Mentors",
  },
  {
    id: "gallery",
    label: "Media Gallery",
    shortLabel: "Gallery",
    icon: ImageIcon,
    description: "Campus Archives & Moments",
  },
  {
    id: "announcements",
    label: "Club Updates",
    shortLabel: "Updates",
    icon: Bell,
    badge: "Live",
    description: "Timeline & Notifications",
  },
  {
    id: "resources",
    label: "Knowledge Vault",
    shortLabel: "Vault",
    icon: BookOpen,
    badge: "25+",
    description: "Colab Notebooks & Papers",
  },
  {
    id: "contact",
    label: "Contact & FAQ",
    shortLabel: "Contact",
    icon: HelpCircle,
    description: "GLA Campus & Support",
  },
];

export const TabNavigationStrip: React.FC<TabNavigationStripProps> = ({
  currentTab,
  onSelectTab,
}) => {
  const { playClick, playHover } = useSound();

  return (
    <div className="w-full pt-24 pb-4 px-4 md:px-8 max-w-7xl mx-auto z-20 relative">
      {/* Scrollable Tabs Bar */}
      <div className="bg-black/60 backdrop-blur-xl border border-white/15 rounded-2xl p-1.5 shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-0.5 px-0.5">
          {TAB_ITEMS.map((tab) => {
            const isActive = currentTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  playClick();
                  onSelectTab(tab.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onMouseEnter={playHover}
                className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium tracking-wide whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? "text-black font-bold shadow-sm"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabStripPill"
                    className="absolute inset-0 bg-white rounded-xl -z-10 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-black" : "text-gray-400"}`} />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>

                {tab.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold leading-none ${
                      isActive
                        ? "bg-black/15 text-black"
                        : "bg-white/10 text-gray-300 border border-white/10"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

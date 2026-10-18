import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Volume2,
  VolumeX,
  Bot,
  User,
  ShieldAlert,
  Menu,
  X,
  Sparkles,
  LayoutDashboard,
  Search,
} from "lucide-react";
import { useSound } from "../../context/SoundContext";
import { useAuth } from "../../context/AuthContext";
import { TabId } from "../../types";

interface NavbarProps {
  currentTab: TabId;
  onSelectTab: (tab: TabId) => void;
  onOpenAuth: () => void;
  onOpenDashboard: () => void;
  onOpenAdmin: () => void;
  onOpenCopilot?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenAuth,
  onOpenDashboard,
  onOpenAdmin,
  onOpenCopilot,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { isMuted, toggleMute, playHover, playClick } = useSound();
  const { user, isAuthenticated, isAdmin, toggleRoleDemo } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navTabs: { id: TabId; name: string }[] = [
    { id: "home", name: "Home" },
    { id: "about", name: "About" },
    { id: "tools", name: "3D Tools" },
    { id: "events", name: "Events & Labs" },
    { id: "team", name: "Team" },
    { id: "gallery", name: "Gallery" },
    { id: "announcements", name: "Updates" },
    { id: "resources", name: "Resources" },
    { id: "contact", name: "Contact & FAQ" },
  ];

  const handleTabClick = (tabId: TabId) => {
    playClick();
    setMobileMenuOpen(false);
    onSelectTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 transition-all duration-500">
      <div
        className={`max-w-7xl mx-auto transition-all duration-500 rounded-2xl border ${
          isScrolled
            ? "bg-black/85 backdrop-blur-xl border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-2.5 px-5"
            : "bg-black/40 backdrop-blur-md border-white/10 py-3.5 px-6"
        } flex items-center justify-between`}
      >
        {/* Brand Logo -> Home Tab */}
        <button
          onClick={() => handleTabClick("home")}
          onMouseEnter={playHover}
          className="flex items-center gap-2.5 group cursor-pointer text-left"
        >
          <div className="relative w-8 h-8 rounded-lg border border-white/20 bg-white/5 flex items-center justify-center overflow-hidden group-hover:border-white transition-all duration-300">
            <span className="font-mono font-bold text-sm tracking-wider text-white">
              S
            </span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono font-bold text-base tracking-[0.25em] text-white uppercase flex items-center gap-1.5">
              SYNAPSE
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,1)]" />
            </span>
            <span className="text-[9px] font-mono tracking-widest text-gray-400 uppercase -mt-0.5">
              CLUB // GLA UNIV
            </span>
          </div>
        </button>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
          {navTabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                onMouseEnter={playHover}
                className={`relative px-3 py-1.5 text-xs font-mono tracking-wider transition-all duration-300 rounded-lg whitespace-nowrap ${
                  isActive
                    ? "text-white font-bold"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNavTabPill"
                    className="absolute inset-0 bg-white/15 rounded-lg border border-white/30 -z-10 shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Dashboards */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* AI Copilot Trigger */}
          {onOpenCopilot && (
            <button
              onClick={() => {
                playClick();
                onOpenCopilot();
              }}
              onMouseEnter={playHover}
              title="Open Synapse AI Assistant (Gemini 2.5)"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white text-white rounded-xl text-xs font-mono transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.08)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>
          )}

          {/* Sound Mute/Unmute Toggle */}
          <button
            onClick={() => {
              playClick();
              toggleMute();
            }}
            onMouseEnter={playHover}
            title={isMuted ? "Unmute Audio FX" : "Mute Audio FX"}
            className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-white" />}
          </button>

          {/* Authenticated Controls or Auth Trigger */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  playClick();
                  onOpenDashboard();
                }}
                onMouseEnter={playHover}
                className="flex items-center gap-2 px-3 py-1.5 bg-white text-black hover:bg-gray-200 rounded-xl text-xs font-mono font-bold transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Dashboard</span>
              </button>

              {/* Admin Panel Trigger if user is admin */}
              {isAdmin && (
                <button
                  onClick={() => {
                    playClick();
                    onOpenAdmin();
                  }}
                  onMouseEnter={playHover}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 border border-white/30 text-white rounded-xl text-xs font-mono transition-all duration-300 hover:bg-white/20"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-white" />
                  <span className="hidden md:inline">Admin</span>
                </button>
              )}

              {/* Quick Demo Role Toggle Switch */}
              <button
                onClick={() => {
                  playClick();
                  toggleRoleDemo();
                }}
                onMouseEnter={playHover}
                title={`Switch demo role (Current: ${user?.role})`}
                className="text-[10px] font-mono px-2 py-1 bg-white/5 hover:bg-white/15 border border-white/10 text-gray-400 hover:text-white rounded-lg transition-colors hidden xl:block"
              >
                {user?.role === "admin" ? "ADMIN MODE" : "STUDENT MODE"}
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                playClick();
                onOpenAuth();
              }}
              onMouseEnter={playHover}
              className="flex items-center gap-2 px-4 py-1.5 bg-white text-black hover:bg-gray-200 font-mono font-bold rounded-xl text-xs transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.25)]"
            >
              <User className="w-3.5 h-3.5" />
              <span>Join / Login</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            onMouseEnter={playHover}
            className="p-2 text-white bg-white/5 border border-white/10 rounded-xl lg:hidden"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden mt-3 max-w-7xl mx-auto bg-black/95 backdrop-blur-2xl border border-white/15 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 z-50"
          >
            <div className="grid grid-cols-2 gap-2">
              {navTabs.map((tab) => {
                const isActive = currentTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`px-3 py-2 text-xs font-mono text-left rounded-lg transition-colors ${
                      isActive
                        ? "bg-white text-black font-bold"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {tab.name}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
              {onOpenCopilot && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCopilot();
                  }}
                  className="w-full py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-mono text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Ask Synapse AI Assistant</span>
                </button>
              )}
              {isAuthenticated ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenDashboard();
                    }}
                    className="flex-1 py-2.5 bg-white text-black font-bold rounded-xl font-mono text-xs"
                  >
                    Student Portal
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenAdmin();
                      }}
                      className="px-4 py-2.5 bg-white/20 text-white border border-white/30 rounded-xl font-mono text-xs"
                    >
                      Admin
                    </button>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full py-2.5 bg-white text-black font-bold rounded-xl font-mono text-xs"
                >
                  Login / Register
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

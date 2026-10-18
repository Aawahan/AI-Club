import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import { motion, AnimatePresence } from "motion/react";
import { SoundProvider } from "./context/SoundContext";
import { AuthProvider } from "./context/AuthContext";
import { TabId } from "./types";

// Common UI Components
import { CustomCursor } from "./components/common/CustomCursor";
import { LoaderScreen } from "./components/common/LoaderScreen";
import { FuturisticBackground } from "./components/common/FuturisticBackground";
import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/common/Footer";
import { TabNavigationStrip } from "./components/common/TabNavigationStrip";

// Home Hub
import { HomeHub } from "./components/home/HomeHub";

// Sections
import { AboutSection } from "./components/sections/AboutSection";
import { AIToolShowcase } from "./components/sections/AIToolShowcase";
import { EventsSection } from "./components/sections/EventsSection";
import { TeamSection } from "./components/sections/TeamSection";
import { GallerySection } from "./components/sections/GallerySection";
import { AnnouncementsSection } from "./components/sections/AnnouncementsSection";
import { ResourcesSection } from "./components/sections/ResourcesSection";
import { FAQSection } from "./components/sections/FAQSection";
import { ContactSection } from "./components/sections/ContactSection";

// Dashboards & Modals
import { StudentDashboardModal } from "./components/dashboard/StudentDashboardModal";
import { AdminDashboardModal } from "./components/dashboard/AdminDashboardModal";
import { AuthModal } from "./components/auth/AuthModal";
import { AICopilotDrawer } from "./components/copilot/AICopilotDrawer";
import { Sparkles, ArrowLeft, Compass } from "lucide-react";

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabId>("home");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [studentDashboardOpen, setStudentDashboardOpen] = useState(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(false);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Handle URL hash routing and back/forward navigation
  useEffect(() => {
    const validTabs: TabId[] = [
      "home",
      "about",
      "tools",
      "events",
      "team",
      "gallery",
      "announcements",
      "resources",
      "contact",
    ];

    const initialHash = window.location.hash.replace("#", "") as TabId;
    if (validTabs.includes(initialHash)) {
      setCurrentTab(initialHash);
    }

    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "") as TabId;
      if (validTabs.includes(hash)) {
        setCurrentTab(hash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleSelectTab = (tab: TabId) => {
    setCurrentTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <SoundProvider>
      <AuthProvider>
        <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans antialiased overflow-x-hidden">
          {/* Custom Cursor */}
          <CustomCursor />

          {/* Loader Screen Curtain Reveal */}
          <LoaderScreen />

          {/* Canvas Background: Particles, Volumetric Fog, Mouse Parallax */}
          <FuturisticBackground />

          {/* Global Glassmorphic Floating Navbar */}
          <Navbar
            currentTab={currentTab}
            onSelectTab={handleSelectTab}
            onOpenAuth={() => setAuthModalOpen(true)}
            onOpenDashboard={() => setStudentDashboardOpen(true)}
            onOpenAdmin={() => setAdminDashboardOpen(true)}
            onOpenCopilot={() => setCopilotOpen(true)}
          />

          {/* Multi-Tab Switcher Navigation Strip */}
          <TabNavigationStrip
            currentTab={currentTab}
            onSelectTab={handleSelectTab}
          />

          {/* Multi-Page Tab Content with Smooth Transitions */}
          <main className="relative z-10 min-h-[70vh]">
            <AnimatePresence mode="wait">
              {currentTab === "home" && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  <HomeHub
                    onSelectTab={handleSelectTab}
                    onOpenAuth={() => setAuthModalOpen(true)}
                  />
                </motion.div>
              )}

              {currentTab === "about" && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-12"
                >
                  <AboutSection />
                  <TabBottomReturn onSelectHome={() => handleSelectTab("home")} onSelectNext={() => handleSelectTab("tools")} nextLabel="AI Tools & 3D Lab" />
                </motion.div>
              )}

              {currentTab === "tools" && (
                <motion.div
                  key="tools"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-12"
                >
                  <AIToolShowcase />
                  <TabBottomReturn onSelectHome={() => handleSelectTab("home")} onSelectNext={() => handleSelectTab("events")} nextLabel="Events & Labs" />
                </motion.div>
              )}

              {currentTab === "events" && (
                <motion.div
                  key="events"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-12"
                >
                  <EventsSection />
                  <TabBottomReturn onSelectHome={() => handleSelectTab("home")} onSelectNext={() => handleSelectTab("team")} nextLabel="Executive Team" />
                </motion.div>
              )}

              {currentTab === "team" && (
                <motion.div
                  key="team"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-12"
                >
                  <TeamSection />
                  <TabBottomReturn onSelectHome={() => handleSelectTab("home")} onSelectNext={() => handleSelectTab("gallery")} nextLabel="Media Gallery" />
                </motion.div>
              )}

              {currentTab === "gallery" && (
                <motion.div
                  key="gallery"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-12"
                >
                  <GallerySection />
                  <TabBottomReturn onSelectHome={() => handleSelectTab("home")} onSelectNext={() => handleSelectTab("announcements")} nextLabel="Club Updates" />
                </motion.div>
              )}

              {currentTab === "announcements" && (
                <motion.div
                  key="announcements"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-12"
                >
                  <AnnouncementsSection />
                  <TabBottomReturn onSelectHome={() => handleSelectTab("home")} onSelectNext={() => handleSelectTab("resources")} nextLabel="Knowledge Vault" />
                </motion.div>
              )}

              {currentTab === "resources" && (
                <motion.div
                  key="resources"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-12"
                >
                  <ResourcesSection />
                  <TabBottomReturn onSelectHome={() => handleSelectTab("home")} onSelectNext={() => handleSelectTab("contact")} nextLabel="Contact & FAQ" />
                </motion.div>
              )}

              {currentTab === "contact" && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-16"
                >
                  <FAQSection />
                  <ContactSection />
                  <TabBottomReturn onSelectHome={() => handleSelectTab("home")} onSelectNext={() => handleSelectTab("home")} nextLabel="Return to Home" />
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* Global Footer */}
          <Footer onSelectTab={handleSelectTab} />

          {/* Floating Quick AI Assistant Launcher */}
          <div className="fixed bottom-6 right-6 z-40">
            <button
              onClick={() => setCopilotOpen(true)}
              className="group relative flex items-center gap-2.5 px-4 py-3 bg-black/80 hover:bg-black text-white border border-white/20 hover:border-white rounded-2xl shadow-[0_0_25px_rgba(255,255,255,0.15)] backdrop-blur-xl transition-all duration-300 hover:scale-105"
              title="Chat with Synapse AI Copilot (Gemini 2.5)"
            >
              <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-white text-black font-bold text-xs shadow-sm">
                <Sparkles className="w-4 h-4 text-black" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-white flex items-center gap-1.5">
                  SYNAPSE AI
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </span>
                <span className="text-[10px] font-mono text-gray-400">Ask Copilot</span>
              </div>
            </button>
          </div>

          {/* Modals & Slide-over Drawers */}
          <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
          <StudentDashboardModal isOpen={studentDashboardOpen} onClose={() => setStudentDashboardOpen(false)} />
          <AdminDashboardModal isOpen={adminDashboardOpen} onClose={() => setAdminDashboardOpen(false)} />
          <AICopilotDrawer isOpen={copilotOpen} onClose={() => setCopilotOpen(false)} />
        </div>
      </AuthProvider>
    </SoundProvider>
  );
}

/**
 * Bottom navigation helper card rendered at the bottom of individual tab pages
 */
function TabBottomReturn({
  onSelectHome,
  onSelectNext,
  nextLabel,
}: {
  onSelectHome: () => void;
  onSelectNext: () => void;
  nextLabel: string;
}) {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-16">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-black/60 border border-white/15 rounded-2xl backdrop-blur-md">
        <button
          onClick={onSelectHome}
          className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home Overview</span>
        </button>

        <button
          onClick={onSelectNext}
          className="flex items-center gap-2 text-xs font-mono text-white hover:text-gray-300 font-bold px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl transition-all"
        >
          <span>Next Tab: {nextLabel}</span>
          <span className="text-gray-400">→</span>
        </button>
      </div>
    </div>
  );
}

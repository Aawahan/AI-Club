import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import { SoundProvider } from "./context/SoundContext";
import { AuthProvider } from "./context/AuthContext";

// Common UI Components
import { CustomCursor } from "./components/common/CustomCursor";
import { LoaderScreen } from "./components/common/LoaderScreen";
import { FuturisticBackground } from "./components/common/FuturisticBackground";
import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/common/Footer";

// Sections
import { HeroSection } from "./components/sections/HeroSection";
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

export default function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [studentDashboardOpen, setStudentDashboardOpen] = useState(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
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
            onOpenAuth={() => setAuthModalOpen(true)}
            onOpenDashboard={() => setStudentDashboardOpen(true)}
            onOpenAdmin={() => setAdminDashboardOpen(true)}
          />

          {/* Main Website Content Sections */}
          <main className="relative z-10 space-y-12">
            {/* 1. Hero */}
            <HeroSection
              onExplore={() => {
                document.querySelector("#showcase")?.scrollIntoView({ behavior: "smooth" });
              }}
              onJoin={() => setAuthModalOpen(true)}
            />

            {/* 2. About AI Club */}
            <AboutSection />

            {/* 3. 3D AI Tool Showcase & Matrix */}
            <AIToolShowcase />

            {/* 4. Events, Workshops & Hackathons */}
            <EventsSection />

            {/* 7. Executive Team Members */}
            <TeamSection />

            {/* 8. Media Gallery Archive */}
            <GallerySection />

            {/* 9. Timeline Announcements */}
            <AnnouncementsSection />

            {/* 10. Knowledge Vault Resources */}
            <ResourcesSection />

            {/* 11. FAQ */}
            <FAQSection />

            {/* 12. Contact Form & Location */}
            <ContactSection />
          </main>

          {/* 13. Footer */}
          <Footer />

          {/* Modals & Slide-over Drawers */}
          <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
          <StudentDashboardModal isOpen={studentDashboardOpen} onClose={() => setStudentDashboardOpen(false)} />
          <AdminDashboardModal isOpen={adminDashboardOpen} onClose={() => setAdminDashboardOpen(false)} />
        </div>
      </AuthProvider>
    </SoundProvider>
  );
}

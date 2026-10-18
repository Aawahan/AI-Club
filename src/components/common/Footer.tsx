import React, { useState, useEffect } from "react";
import { ArrowUp, Github, Twitter, Linkedin, Mail, Check, Cpu } from "lucide-react";
import { useSound } from "../../context/SoundContext";
import { TabId } from "../../types";

interface FooterProps {
  onSelectTab?: (tab: TabId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  const [time, setTime] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { playClick, playHover, playSuccess } = useSound();

  const handleLinkClick = (tabId: TabId) => {
    playClick();
    if (onSelectTab) {
      onSelectTab(tabId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toISOString().split(".")[0].replace("T", " ") + " UTC");
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    playSuccess();
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 4000);
  };

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-black text-white border-t border-white/10 pt-20 pb-12 px-6 md:px-12 overflow-hidden z-10">
      {/* Background radial highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        {/* Brand & Mission Statement */}
        <div className="md:col-span-5 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl border border-white/20 bg-white/5 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-mono font-bold text-lg tracking-[0.2em] text-white uppercase block">
                SYNAPSE CLUB
              </span>
              <span className="text-xs font-mono text-gray-400 tracking-widest uppercase">
                GLA UNIVERSITY // MATHURA
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-400 font-sans leading-relaxed max-w-md">
            Pioneering artificial intelligence research, autonomous multi-agent engineering, and student innovation at GLA University. Pushing boundary-defining latent space architectures into real-world applications.
          </p>

          {/* System Status & UTC Clock */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono pt-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)] animate-pulse" />
              <span className="text-gray-300">SYSTEMS OPERATIONAL</span>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400">
              {time || "00:00:00 UTC"}
            </div>
          </div>
        </div>

        {/* Quick Links Navigation */}
        <div className="md:col-span-3 grid grid-cols-2 gap-6 text-xs font-mono">
          <div className="space-y-3">
            <span className="text-gray-500 uppercase tracking-widest block font-bold">
              PLATFORM
            </span>
            <ul className="space-y-2">
              {[
                { name: "About", tab: "about" as TabId },
                { name: "3D Tools", tab: "tools" as TabId },
                { name: "Events", tab: "events" as TabId },
                { name: "Workshops", tab: "events" as TabId },
                { name: "Hackathons", tab: "events" as TabId },
              ].map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleLinkClick(item.tab)}
                    onMouseEnter={playHover}
                    className="text-gray-400 hover:text-white transition-colors text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-gray-500 uppercase tracking-widest block font-bold">
              RESOURCES
            </span>
            <ul className="space-y-2">
              {[
                { name: "Team", tab: "team" as TabId },
                { name: "Gallery", tab: "gallery" as TabId },
                { name: "Updates", tab: "announcements" as TabId },
                { name: "Resources", tab: "resources" as TabId },
                { name: "FAQ", tab: "contact" as TabId },
              ].map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleLinkClick(item.tab)}
                    onMouseEnter={playHover}
                    className="text-gray-400 hover:text-white transition-colors text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="md:col-span-4 space-y-4">
          <span className="text-xs font-mono text-gray-400 uppercase tracking-widest font-bold block">
            SUBSCRIBE TO AI RESEARCH DISPATCH
          </span>
          <p className="text-xs text-gray-500">
            Receive weekly breakdowns of frontier AI research papers, hackathon announcements, and GPU compute grants.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@gla.ac.in"
                required
                className="w-full bg-white/5 border border-white/15 focus:border-white rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none transition-colors font-mono"
              />
              <button
                type="submit"
                onMouseEnter={playHover}
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-white text-black font-mono font-bold text-xs rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                {subscribed ? <Check className="w-3.5 h-3.5" /> : "JOIN"}
              </button>
            </div>
            {subscribed && (
              <p className="text-[11px] font-mono text-gray-300">
                ✓ Confirmed! Welcome to Synapse Club dispatch.
              </p>
            )}
          </form>

          {/* Social Icons */}
          <div className="flex items-center gap-3 pt-2">
            {[
              { icon: Github, href: "https://github.com", label: "GitHub" },
              { icon: Twitter, href: "https://x.com", label: "X" },
              { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: Mail, href: "mailto:synapse@gla.ac.in", label: "Email" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={playHover}
                aria-label={social.label}
                className="p-2.5 bg-white/5 hover:bg-white/15 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-all duration-300"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar & Scroll to Top */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
        <div>
          © 2026 Synapse Club, GLA University. All rights reserved.
        </div>

        <button
          onClick={scrollToTop}
          onMouseEnter={playHover}
          className="flex items-center gap-2 text-gray-400 hover:text-white px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};

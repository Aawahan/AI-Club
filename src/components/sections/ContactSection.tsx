import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, MapPin, Send, Sparkles, Check, Cpu } from "lucide-react";
import { useSound } from "../../context/SoundContext";

interface ContactSectionProps {
  onOpenCopilot?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = () => {
  const { playHover, playClick, playSuccess } = useSound();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSuccess();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  };

  return (
    <section id="contact" className="py-8 md:py-12 px-6 md:px-12 max-w-7xl mx-auto z-10 relative border-t border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column Info & AURA Copilot Banner */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <span className="px-3 py-1 bg-white/5 border border-white/15 rounded-full text-xs font-mono text-gray-300 uppercase tracking-widest">
              COMMUNICATION CHANNEL
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold font-mono tracking-wider text-white uppercase">
              GET IN <span className="text-gray-400">TOUCH</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed font-sans">
              Have questions about sponsorship, research collaboration, GPU compute access, or joining the executive team? Reach out directly.
            </p>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div className="flex items-center gap-3 bg-black/80 border border-white/15 p-4 rounded-2xl">
              <MapPin className="w-5 h-5 text-white" />
              <div>
                <div className="font-bold text-white">CAMPUS LAB LOCATION</div>
                <div className="text-gray-400 text-[11px]">GLA University, Mathura - Academic Block IX</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-black/80 border border-white/15 p-4 rounded-2xl">
              <Mail className="w-5 h-5 text-white" />
              <div>
                <div className="font-bold text-white">EMAIL DISPATCH</div>
                <div className="text-gray-400 text-[11px]">synapse@gla.ac.in</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column Form */}
        <div className="lg:col-span-7 bg-black/80 border border-white/15 rounded-3xl p-8 backdrop-blur-2xl space-y-6">
          <h3 className="font-mono font-bold text-xl text-white uppercase tracking-wider">
            DISPATCH DIRECT MESSAGE
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-gray-400 text-[10px] uppercase">YOUR NAME</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Aria Sterling"
                  className="w-full bg-white/5 border border-white/15 focus:border-white rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-gray-400 text-[10px] uppercase">EMAIL ADDRESS</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="student@gla.ac.in"
                  className="w-full bg-white/5 border border-white/15 focus:border-white rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-gray-400 text-[10px] uppercase">SUBJECT / INQUIRY TYPE</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Compute Grant Request / Sponsorship Inquiry"
                className="w-full bg-white/5 border border-white/15 focus:border-white rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-400 text-[10px] uppercase">MESSAGE CONTENT</label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Detail your research project or question..."
                className="w-full bg-white/5 border border-white/15 focus:border-white rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              onMouseEnter={playHover}
              className="w-full py-4 bg-white text-black font-bold rounded-xl text-xs flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors shadow-lg"
            >
              {submitted ? (
                <>
                  <Check className="w-4 h-4 text-black" />
                  <span>DISPATCH SENT SUCCESSFULLY</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-black" />
                  <span>DISPATCH MESSAGE</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

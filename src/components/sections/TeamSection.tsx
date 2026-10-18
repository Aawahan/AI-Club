import React from "react";
import { motion } from "motion/react";
import { Github, Linkedin, Twitter, Mail, Sparkles } from "lucide-react";
import { TEAM_MEMBERS } from "../../data/clubData";
import { useSound } from "../../context/SoundContext";

export const TeamSection: React.FC = () => {
  const { playHover } = useSound();

  return (
    <section id="team" className="py-8 md:py-12 px-6 md:px-12 max-w-7xl mx-auto z-10 relative">
      <div className="space-y-4 mb-16 text-center md:text-left">
        <span className="px-3 py-1 bg-white/5 border border-white/15 rounded-full text-xs font-mono text-gray-300 uppercase tracking-widest">
          EXECUTIVE LEADERSHIP
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold font-mono tracking-wider text-white uppercase">
          RESEARCHERS & <span className="text-gray-400">LEADS</span>
        </h2>
        <p className="text-gray-400 max-w-xl text-sm font-sans">
          Meet the student directors, PhD researchers, and lab leads shaping the future of AI on campus.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TEAM_MEMBERS.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseEnter={playHover}
            className="bg-black/80 border border-white/15 hover:border-white/40 rounded-3xl p-6 backdrop-blur-2xl transition-all duration-300 space-y-4 flex flex-col justify-between group hover:scale-[1.02]"
          >
            <div className="space-y-4">
              {/* Avatar Image */}
              <div className="relative h-56 w-full rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <span className="absolute bottom-3 left-3 px-2.5 py-0.5 bg-black/80 border border-white/20 text-white font-mono text-[10px] rounded-full backdrop-blur-md font-bold uppercase">
                  {member.category}
                </span>
              </div>

              <div>
                <h3 className="font-mono font-bold text-lg text-white">
                  {member.name}
                </h3>
                <p className="text-xs font-mono text-gray-400 mt-0.5">
                  {member.role}
                </p>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed font-sans line-clamp-3">
                {member.bio}
              </p>

              {/* Projects */}
              {member.projects && (
                <div className="space-y-1 pt-2 border-t border-white/10">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block font-bold">
                    INITIATIVES
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {member.projects.map((proj, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded text-gray-300 flex items-center gap-1"
                      >
                        <Sparkles className="w-2.5 h-2.5 text-white" />
                        {proj}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Social Buttons */}
            <div className="pt-4 border-t border-white/10 flex items-center gap-2">
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={playHover}
                  className="p-2 bg-white/5 hover:bg-white/20 border border-white/10 rounded-xl text-gray-300 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={playHover}
                  className="p-2 bg-white/5 hover:bg-white/20 border border-white/10 rounded-xl text-gray-300 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {member.twitter && (
                <a
                  href={member.twitter}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={playHover}
                  className="p-2 bg-white/5 hover:bg-white/20 border border-white/10 rounded-xl text-gray-300 hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              <a
                href={`mailto:${member.email}`}
                onMouseEnter={playHover}
                className="p-2 bg-white/5 hover:bg-white/20 border border-white/10 rounded-xl text-gray-300 hover:text-white transition-colors ml-auto"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

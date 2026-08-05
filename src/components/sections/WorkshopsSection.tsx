import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, ChevronDown, CheckCircle, UserCheck, Sparkles, Clock, Calendar } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useSound } from "../../context/SoundContext";

export const WorkshopsSection: React.FC = () => {
  const { user, workshopsList, registerForWorkshop } = useAuth();
  const { playHover, playClick, playSuccess } = useSound();
  const [expandedSyllabus, setExpandedSyllabus] = useState<string | null>(null);

  const toggleSyllabus = (id: string) => {
    playClick();
    setExpandedSyllabus((prev) => (prev === id ? null : id));
  };

  return (
    <section id="workshops" className="py-28 px-6 md:px-12 max-w-7xl mx-auto z-10 relative border-t border-white/10">
      {/* Header */}
      <div className="space-y-4 mb-16 text-center md:text-left">
        <span className="px-3 py-1 bg-white/5 border border-white/15 rounded-full text-xs font-mono text-gray-300 uppercase tracking-widest">
          TECHNICAL LABS
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold font-mono tracking-wider text-white uppercase">
          HANDS-ON <span className="text-gray-400">WORKSHOPS</span>
        </h2>
        <p className="text-gray-400 max-w-xl text-sm font-sans">
          Intensive coding sessions taught by PhD researchers and industry engineers. Code provided in Jupyter notebooks & Google Colab.
        </p>
      </div>

      {/* Workshops List */}
      <div className="space-y-6">
        {workshopsList.map((ws) => {
          const isRegistered = user?.registeredWorkshopIds.includes(ws.id);
          const isExpanded = expandedSyllabus === ws.id;

          return (
            <motion.div
              key={ws.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-black/80 border border-white/15 hover:border-white/30 rounded-3xl p-6 md:p-8 backdrop-blur-2xl transition-all duration-300 space-y-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 bg-white/10 border border-white/20 text-white font-mono text-xs font-bold uppercase rounded-full">
                      {ws.level}
                    </span>
                    <span className="text-xs font-mono text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {ws.date}
                    </span>
                    <span className="text-xs font-mono text-gray-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {ws.duration}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold font-mono text-white">
                    {ws.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs font-mono text-gray-300">
                    <span className="text-gray-500">INSTRUCTOR:</span>
                    <span className="font-bold text-white">{ws.instructor}</span>
                    <span className="text-gray-400">({ws.role})</span>
                  </div>
                </div>

                {/* Right Side Stats & Registration */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <div className="text-right font-mono text-xs hidden sm:block">
                    <div className="text-gray-400">ENROLLED STUDENTS</div>
                    <div className="text-lg font-bold text-white">
                      {ws.registered} / {ws.maxSeats}
                    </div>
                  </div>

                  {isRegistered ? (
                    <div className="px-6 py-3 bg-white/10 border border-white/20 text-white font-mono font-bold text-xs rounded-xl flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4 text-white" />
                      <span>ENROLLED</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        playSuccess();
                        registerForWorkshop(ws.id);
                      }}
                      onMouseEnter={playHover}
                      className="px-6 py-3 bg-white text-black hover:bg-gray-200 font-mono font-bold text-xs rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>RSVP WORKSHOP</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Prerequisites & Syllabus Toggle */}
              <div className="pt-4 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest font-bold">
                    PREREQUISITES:
                  </span>
                  {ws.prerequisites.map((req, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-gray-300"
                    >
                      {req}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => toggleSyllabus(ws.id)}
                  className="text-xs font-mono text-gray-400 hover:text-white flex items-center gap-1 self-start md:self-auto"
                >
                  <span>{isExpanded ? "HIDE SYLLABUS" : "VIEW DETAILED SYLLABUS"}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                </button>
              </div>

              {/* Expanded Syllabus Details */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-4 space-y-2 border-t border-white/10 font-mono text-xs text-gray-300"
                  >
                    <span className="text-gray-500 uppercase tracking-wider block font-bold">
                      CURRICULUM BREAKDOWN
                    </span>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {ws.syllabus.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
                          <Sparkles className="w-3.5 h-3.5 text-white flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

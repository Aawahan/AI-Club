import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Check,
  QrCode,
  ArrowRight,
  Ticket,
  Trophy,
  Zap,
  Code,
  BookOpen,
  ChevronDown,
  CheckCircle,
  Sparkles,
  ExternalLink,
  Layers,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useSound } from "../../context/SoundContext";
import { ClubEvent } from "../../types";
import { HACKATHON_DATA } from "../../data/clubData";
import { Modal } from "../common/Modal";

type FilterTab = "all" | "events" | "workshops" | "hackathons";

export const EventsSection: React.FC = () => {
  const { user, eventsList, workshopsList, registerForEvent, cancelEventRegistration, registerForWorkshop } =
    useAuth();
  const { playHover, playClick, playSuccess } = useSound();

  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [selectedTicketEvent, setSelectedTicketEvent] = useState<ClubEvent | null>(null);
  const [expandedSyllabus, setExpandedSyllabus] = useState<string | null>(null);

  // Time remaining calculator
  const calculateDaysLeft = (dateStr: string) => {
    const target = new Date(dateStr).getTime();
    const now = new Date().getTime();
    const diff = target - now;
    if (diff <= 0) return "EVENT LIVE";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${days} DAYS LEFT`;
  };

  const toggleSyllabus = (id: string) => {
    playClick();
    setExpandedSyllabus((prev) => (prev === id ? null : id));
  };

  const tabs: { id: FilterTab; label: string; count: number }[] = [
    { id: "all", label: "ALL ACTIVITIES", count: eventsList.length + workshopsList.length + 1 },
    { id: "events", label: "EVENTS & KEYNOTES", count: eventsList.length },
    { id: "workshops", label: "HANDS-ON WORKSHOPS", count: workshopsList.length },
    { id: "hackathons", label: "HACKATHONS", count: 1 },
  ];

  return (
    <section id="events" className="py-24 px-6 md:px-12 max-w-7xl mx-auto z-10 relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3">
          <span className="px-3.5 py-1 bg-white/5 border border-white/15 rounded-full text-xs font-mono text-gray-300 uppercase tracking-widest inline-flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-white" />
            SYNAPSE HUB // EVENTS, WORKSHOPS & HACKATHONS
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-mono tracking-wider text-white uppercase">
            EVENTS, LABS <span className="text-gray-400">& HACKATHONS</span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-sm font-sans leading-relaxed">
            All-in-one activity portal for keynotes, hands-on AI workshops, and hackathons at GLA University. Reserve seat passes, access Colab notebooks, and join hackathon tracks.
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex flex-wrap gap-2 bg-black/80 p-1.5 rounded-2xl border border-white/15 backdrop-blur-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playClick();
                setActiveTab(tab.id);
              }}
              onMouseEnter={playHover}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-300 flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-white text-black shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono ${
                  activeTab === tab.id ? "bg-black/10 text-black" : "bg-white/10 text-gray-300"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Container Content */}
      <div className="space-y-16">
        {/* 1. UPCOMING EVENTS */}
        {(activeTab === "all" || activeTab === "events") && (
          <div className="space-y-6">
            {activeTab === "all" && (
              <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                <Ticket className="w-5 h-5 text-white" />
                <h3 className="text-lg font-mono font-bold text-white uppercase tracking-wider">
                  KEYNOTES & SYMPOSIUMS
                </h3>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {eventsList.map((event) => {
                const isRegistered = user?.registeredEventIds.includes(event.id);
                const isFull = event.seatsLeft <= 0;

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`bg-black/80 border ${
                      event.isFeatured ? "border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.08)]" : "border-white/15"
                    } rounded-3xl overflow-hidden backdrop-blur-2xl flex flex-col justify-between group hover:border-white/50 transition-all duration-300`}
                  >
                    {/* Image Banner */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-3 py-1 bg-black/80 border border-white/20 text-white font-mono text-[10px] font-bold uppercase rounded-full backdrop-blur-md">
                          {event.category}
                        </span>
                        {event.isFeatured && (
                          <span className="px-3 py-1 bg-white text-black font-mono text-[10px] font-bold uppercase rounded-full">
                            FEATURED
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-3 right-4 font-mono text-xs font-bold text-white bg-black/80 px-2.5 py-1 rounded-lg border border-white/20">
                        {calculateDaysLeft(event.date)}
                      </div>
                    </div>

                    {/* Event Info */}
                    <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                        <h4 className="font-mono font-bold text-lg text-white leading-snug group-hover:text-gray-200">
                          {event.title}
                        </h4>

                        <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                          {event.description}
                        </p>

                        <div className="space-y-2 text-xs font-mono text-gray-300 pt-2 border-t border-white/10">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-gray-400" />
                            <span className="truncate">{event.location}</span>
                          </div>
                        </div>

                        {/* Speaker Card */}
                        <div className="flex items-center gap-3 bg-white/5 p-2.5 rounded-2xl border border-white/10">
                          <img
                            src={event.speaker.avatar}
                            alt={event.speaker.name}
                            className="w-8 h-8 rounded-full object-cover border border-white/20"
                          />
                          <div className="text-xs font-mono">
                            <div className="text-white font-bold">{event.speaker.name}</div>
                            <div className="text-[10px] text-gray-400">
                              {event.speaker.role} @ {event.speaker.company}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Seat Capacity Bar */}
                      <div className="space-y-1.5 pt-2">
                        <div className="flex justify-between text-[10px] font-mono text-gray-400">
                          <span>SEAT AVAILABILITY</span>
                          <span className="text-white font-bold">
                            {event.seatsLeft} / {event.totalSeats} LEFT
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-white transition-all duration-500"
                            style={{
                              width: `${((event.totalSeats - event.seatsLeft) / event.totalSeats) * 100}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="pt-2">
                        {isRegistered ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                playClick();
                                setSelectedTicketEvent(event);
                              }}
                              onMouseEnter={playHover}
                              className="flex-1 py-2.5 bg-white text-black font-mono font-bold text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors shadow-md"
                            >
                              <QrCode className="w-3.5 h-3.5" />
                              <span>VIEW QR PASS</span>
                            </button>

                            <button
                              onClick={() => {
                                playClick();
                                cancelEventRegistration(event.id);
                              }}
                              onMouseEnter={playHover}
                              className="px-3 py-2.5 bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white font-mono text-xs rounded-xl border border-white/20 transition-colors"
                              title="Cancel Registration"
                            >
                              CANCEL
                            </button>
                          </div>
                        ) : (
                          <button
                            disabled={isFull}
                            onClick={() => {
                              playSuccess();
                              registerForEvent(event.id);
                            }}
                            onMouseEnter={playHover}
                            className={`w-full py-3 font-mono font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${
                              isFull
                                ? "bg-white/10 text-gray-500 cursor-not-allowed border border-white/10"
                                : "bg-white/10 hover:bg-white text-white hover:text-black border border-white/20"
                            }`}
                          >
                            {isFull ? (
                              <span>EVENT FULL</span>
                            ) : (
                              <>
                                <span>REGISTER RSVP</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. HANDS-ON WORKSHOPS */}
        {(activeTab === "all" || activeTab === "workshops") && (
          <div className="space-y-6">
            {activeTab === "all" && (
              <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                <BookOpen className="w-5 h-5 text-white" />
                <h3 className="text-lg font-mono font-bold text-white uppercase tracking-wider">
                  HANDS-ON TECHNICAL WORKSHOPS
                </h3>
              </div>
            )}

            <div className="space-y-6">
              {workshopsList.map((ws) => {
                const isRegistered = user?.registeredWorkshopIds.includes(ws.id);
                const isExpanded = expandedSyllabus === ws.id;

                return (
                  <motion.div
                    key={ws.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
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

                        <h4 className="text-xl md:text-2xl font-mono font-bold text-white leading-snug">
                          {ws.title}
                        </h4>

                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <span className="text-[10px] font-mono text-gray-500 uppercase font-bold">PREREQUISITES:</span>
                          {ws.prerequisites.map((req, i) => (
                            <span key={i} className="text-[10px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-gray-300">
                              {req}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-3 pt-2 text-xs font-mono text-gray-300">
                          <span className="text-gray-500 uppercase">INSTRUCTOR:</span>
                          <span className="text-white font-bold">{ws.instructor}</span>
                          <span className="text-gray-400">({ws.role})</span>
                        </div>
                      </div>

                      {/* Workshop Actions */}
                      <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[200px]">
                        <div className="text-center font-mono text-xs mb-1">
                          <span className="text-gray-400 block text-[10px]">ENROLLED SEATS</span>
                          <span className="text-white font-bold">{ws.registered} / {ws.maxSeats}</span>
                        </div>

                        {isRegistered ? (
                          <div className="py-3 px-4 bg-white/10 border border-white/20 rounded-xl font-mono font-bold text-xs text-white text-center flex items-center justify-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                            <span>ENROLLED IN LAB</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              playSuccess();
                              registerForWorkshop(ws.id);
                            }}
                            onMouseEnter={playHover}
                            className="py-3 px-6 bg-white hover:bg-gray-200 text-black font-mono font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>ENROLL IN WORKSHOP</span>
                          </button>
                        )}

                        <button
                          onClick={() => toggleSyllabus(ws.id)}
                          onMouseEnter={playHover}
                          className="py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/15 text-gray-300 hover:text-white font-mono text-xs rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                          <span>SYLLABUS</span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform duration-300 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Expandable Syllabus Accordion */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="pt-6 border-t border-white/10 space-y-4 overflow-hidden"
                        >
                          <div className="space-y-2 font-mono text-xs">
                            <span className="text-gray-400 font-bold uppercase tracking-wider block">
                              CURRICULUM SYLLABUS BREAKDOWN:
                            </span>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {ws.syllabus.map((topic, i) => (
                                <div key={i} className="flex items-center gap-2 text-gray-300 bg-white/5 p-2 rounded-lg border border-white/10">
                                  <span className="text-gray-500 font-mono">0{i + 1}.</span>
                                  <span>{topic}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. HACKATHON SHOWCASE */}
        {(activeTab === "all" || activeTab === "hackathons") && (
          <div className="space-y-6">
            {activeTab === "all" && (
              <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                <Trophy className="w-5 h-5 text-white" />
                <h3 className="text-lg font-mono font-bold text-white uppercase tracking-wider">
                  ANNUAL HACKATHON
                </h3>
              </div>
            )}

            <div className="bg-black/90 border border-white/20 rounded-3xl p-8 md:p-12 backdrop-blur-2xl shadow-[0_0_60px_rgba(255,255,255,0.06)] relative overflow-hidden space-y-10">
              {/* Background glow circle */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />

              {/* Top Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3.5 py-1 bg-white text-black font-mono font-bold text-xs uppercase rounded-full">
                      {HACKATHON_DATA.status} HACKATHON
                    </span>
                    <span className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {HACKATHON_DATA.dates}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-5xl font-extrabold font-mono text-white tracking-wider uppercase">
                    {HACKATHON_DATA.title}
                  </h3>

                  <p className="text-gray-400 max-w-2xl text-sm leading-relaxed">
                    {HACKATHON_DATA.description}
                  </p>
                </div>

                {/* Prize Pool Highlight */}
                <div className="bg-white/5 border border-white/20 rounded-2xl p-6 text-center lg:text-right font-mono space-y-1">
                  <span className="text-xs text-gray-400 uppercase tracking-widest block font-bold">
                    TOTAL PRIZE POOL
                  </span>
                  <div className="text-3xl md:text-4xl font-extrabold text-white tracking-wider shadow-sm">
                    {HACKATHON_DATA.prizePool}
                  </div>
                  <span className="text-[10px] text-gray-400 block">+ $20,000 Cloud GPU Credits</span>
                </div>
              </div>

              {/* 4 Tracks Grid */}
              <div className="space-y-6">
                <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest font-bold">
                  COMPETITION TRACKS & AWARDS
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {HACKATHON_DATA.tracks.map((track, idx) => (
                    <div
                      key={idx}
                      className="bg-white/5 border border-white/10 hover:border-white/30 rounded-2xl p-5 space-y-3 transition-colors"
                    >
                      <div className="p-2.5 bg-white/10 rounded-xl w-fit text-white">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div className="font-mono font-bold text-sm text-white">{track.name}</div>
                      <p className="text-xs text-gray-400 leading-relaxed">{track.description}</p>
                      <div className="text-xs font-mono text-white font-bold pt-2 border-t border-white/10">
                        PRIZE: {track.prize}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hackathon CTA Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-white" />
                    <span>Teams 1–4 Hackers</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Code className="w-4 h-4 text-white" />
                    <span>GLA Campus Auditorium</span>
                  </div>
                </div>

                <a
                  href="#contact"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-gray-200 text-black font-mono font-bold text-xs rounded-xl transition-all shadow-xl text-center flex items-center justify-center gap-2 uppercase"
                >
                  <span>REGISTER TEAM FOR HACKATHON</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* QR Ticket Pass Modal */}
      {selectedTicketEvent && (
        <Modal
          isOpen={!!selectedTicketEvent}
          onClose={() => setSelectedTicketEvent(null)}
          title="EVENT QR ENTRY TICKET"
          maxWidth="md"
        >
          <div className="text-center space-y-6 font-mono">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1">
              <h3 className="text-lg font-bold text-white">{selectedTicketEvent.title}</h3>
              <p className="text-xs text-gray-400">{selectedTicketEvent.date} // {selectedTicketEvent.time}</p>
              <p className="text-xs text-gray-400">{selectedTicketEvent.location}</p>
            </div>

            {/* QR Code Visual */}
            <div className="bg-white p-6 rounded-2xl inline-block shadow-[0_0_30px_rgba(255,255,255,0.4)]">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=SYNAPSE-EVENT-${selectedTicketEvent.id}-${user?.memberId}`}
                alt="QR Code"
                className="w-44 h-44 mx-auto"
              />
              <div className="text-black text-[10px] font-bold tracking-widest mt-2 uppercase">
                MEMBER PASS: {user?.memberId}
              </div>
            </div>

            <div className="text-xs text-gray-400">
              Present this QR pass at the event check-in desk for entry and attendance verification.
            </div>

            <button
              onClick={() => {
                playClick();
                setSelectedTicketEvent(null);
              }}
              className="w-full py-3 bg-white text-black font-bold rounded-xl text-xs uppercase"
            >
              CLOSE PASS
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
};

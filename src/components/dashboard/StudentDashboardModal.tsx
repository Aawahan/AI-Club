import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { useAuth } from "../../context/AuthContext";
import { useSound } from "../../context/SoundContext";
import {
  User,
  Award,
  Calendar,
  Bookmark,
  QrCode,
  Zap,
  TrendingUp,
  CheckCircle,
  FileText,
  LogOut,
  Sparkles,
} from "lucide-react";

interface StudentDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentDashboardModal: React.FC<StudentDashboardModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { user, logout, eventsList, resourcesList, cancelEventRegistration, toggleSaveResource } = useAuth();
  const { playClick, playHover } = useSound();
  const [activeTab, setActiveTab] = useState<"profile" | "events" | "certificates" | "bookmarks" | "leaderboard">("profile");

  if (!user) return null;

  const myEvents = eventsList.filter((e) => user.registeredEventIds.includes(e.id));
  const mySavedResources = resourcesList.filter((r) => user.savedResourceIds.includes(r.id));

  // Leaderboard mock students
  const leaderboard = [
    { rank: 1, name: "Aria Sterling", xp: 3200, level: 8, badge: "Master Researcher" },
    { rank: 2, name: "Kai Takahashi", xp: 2850, level: 7, badge: "Agent Architect" },
    { rank: 3, name: "Sofia Al-Mansoor", xp: 2400, level: 6, badge: "Ethics Guild Lead" },
    { rank: 4, name: user.name, xp: user.xp, level: user.level, badge: "Active Pioneer", isCurrent: true },
    { rank: 5, name: "Marcus Vance", xp: 1200, level: 3, badge: "Workshop Dev" },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="STUDENT PORTAL // DASHBOARD" maxWidth="4xl">
      <div className="space-y-6 font-mono">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 custom-scrollbar">
          {[
            { id: "profile", label: "Profile & Pass", icon: User },
            { id: "events", label: `My Events (${myEvents.length})`, icon: Calendar },
            { id: "certificates", label: `Certificates (${user.certificates.length})`, icon: Award },
            { id: "bookmarks", label: `Saved (${mySavedResources.length})`, icon: Bookmark },
            { id: "leaderboard", label: "XP Leaderboard", icon: TrendingUp },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playClick();
                setActiveTab(tab.id as any);
              }}
              onMouseEnter={playHover}
              className={`px-4 py-2 text-xs rounded-xl flex items-center gap-2 transition-all flex-shrink-0 ${
                activeTab === tab.id
                  ? "bg-white text-black font-bold shadow-md"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: Profile & QR Pass */}
        {activeTab === "profile" && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-5 bg-white/5 border border-white/15 p-6 rounded-3xl space-y-4 text-center">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-white/40 shadow-lg"
              />
              <div>
                <h3 className="text-xl font-bold text-white">{user.name}</h3>
                <span className="text-xs text-gray-400">{user.email}</span>
              </div>

              <div className="inline-block px-3 py-1 bg-white/10 border border-white/20 text-white text-xs font-bold rounded-full uppercase">
                MEMBER ID: {user.memberId}
              </div>

              {/* XP & Level Status */}
              <div className="bg-black/60 p-4 rounded-2xl border border-white/10 text-left space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">XP PROGRESS</span>
                  <span className="text-white font-bold">LEVEL {user.level} ({user.xp} XP)</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)]"
                    style={{ width: `${(user.xp % 400) / 4}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  playClick();
                  logout();
                  onClose();
                }}
                className="w-full py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-gray-300 hover:text-white rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>

            <div className="md:col-span-7 space-y-4">
              <div className="bg-white/5 border border-white/15 p-6 rounded-3xl space-y-3">
                <h4 className="text-xs text-gray-400 uppercase font-bold tracking-widest">
                  ACADEMIC & CLUB DETAILS
                </h4>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  {user.rollNo && (
                    <div className="bg-black/40 p-3 rounded-xl border border-white/10">
                      <span className="text-gray-500 block text-[10px]">ROLL NO</span>
                      <span className="text-white font-bold">{user.rollNo}</span>
                    </div>
                  )}
                  {user.branch && (
                    <div className="bg-black/40 p-3 rounded-xl border border-white/10">
                      <span className="text-gray-500 block text-[10px]">BRANCH</span>
                      <span className="text-white font-bold">{user.branch}</span>
                    </div>
                  )}
                  <div className="bg-black/40 p-3 rounded-xl border border-white/10">
                    <span className="text-gray-500 block text-[10px]">MAJOR</span>
                    <span className="text-white font-bold">{user.major}</span>
                  </div>
                  <div className="bg-black/40 p-3 rounded-xl border border-white/10">
                    <span className="text-gray-500 block text-[10px]">GRADUATION</span>
                    <span className="text-white font-bold">{user.gradYear}</span>
                  </div>
                  <div className="bg-black/40 p-3 rounded-xl border border-white/10">
                    <span className="text-gray-500 block text-[10px]">ATTENDANCE</span>
                    <span className="text-white font-bold">{user.attendanceCount} EVENTS</span>
                  </div>
                  <div className="bg-black/40 p-3 rounded-xl border border-white/10">
                    <span className="text-gray-500 block text-[10px]">ROLE</span>
                    <span className="text-white font-bold uppercase">{user.role}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-gray-500 block text-[10px] mb-1">EARNED BADGES</span>
                  <div className="flex flex-wrap gap-1.5">
                    {user.badges.map((badge, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-white/10 border border-white/20 px-2.5 py-1 rounded-lg text-white flex items-center gap-1"
                      >
                        <Sparkles className="w-3 h-3 text-white" />
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Registered Events */}
        {activeTab === "events" && (
          <div className="space-y-4">
            {myEvents.length === 0 ? (
              <div className="text-center py-12 text-gray-400 text-xs">
                You haven't registered for any events yet. Explore the calendar above to RSVP!
              </div>
            ) : (
              myEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="bg-white/5 border border-white/15 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] px-2 py-0.5 bg-white/10 rounded text-white uppercase font-bold">
                      {evt.category}
                    </span>
                    <h4 className="font-bold text-white text-base">{evt.title}</h4>
                    <p className="text-xs text-gray-400">{evt.date} • {evt.time} • {evt.location}</p>
                  </div>

                  <button
                    onClick={() => {
                      playClick();
                      cancelEventRegistration(evt.id);
                    }}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-gray-300 hover:text-white rounded-xl text-xs"
                  >
                    Cancel RSVP
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 3: Certificates */}
        {activeTab === "certificates" && (
          <div className="space-y-4">
            {user.certificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-white/5 border border-white/15 p-6 rounded-3xl space-y-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <span className="text-[10px] px-2.5 py-0.5 bg-white/10 border border-white/20 text-white rounded-full uppercase font-bold">
                    {cert.type}
                  </span>
                  <h4 className="text-base font-bold text-white mt-1">{cert.title}</h4>
                  <p className="text-xs text-gray-400">ISSUED: {cert.issueDate} • VERIFICATION CODE: {cert.code}</p>
                </div>

                <div className="px-4 py-2 bg-white text-black font-bold rounded-xl text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-black" />
                  VERIFIED CERTIFICATE
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Bookmarks */}
        {activeTab === "bookmarks" && (
          <div className="space-y-3">
            {mySavedResources.length === 0 ? (
              <div className="text-center py-12 text-gray-400 text-xs">
                No saved resources yet. Click the bookmark icon on any paper or deck to save it here!
              </div>
            ) : (
              mySavedResources.map((res) => (
                <div
                  key={res.id}
                  className="bg-white/5 border border-white/15 p-4 rounded-2xl flex items-center justify-between gap-4 text-xs"
                >
                  <div>
                    <h4 className="font-bold text-white">{res.title}</h4>
                    <span className="text-[10px] text-gray-400">{res.type.toUpperCase()} • BY {res.author}</span>
                  </div>

                  <button
                    onClick={() => {
                      playClick();
                      toggleSaveResource(res.id);
                    }}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 5: XP Leaderboard */}
        {activeTab === "leaderboard" && (
          <div className="space-y-3">
            {leaderboard.map((student) => (
              <div
                key={student.rank}
                className={`p-4 rounded-2xl border flex items-center justify-between text-xs ${
                  student.isCurrent
                    ? "bg-white/15 border-white shadow-md text-white font-bold"
                    : "bg-white/5 border-white/10 text-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold w-6 text-center text-gray-400">#{student.rank}</span>
                  <div>
                    <div className="text-white font-bold">{student.name} {student.isCurrent && "(YOU)"}</div>
                    <div className="text-[10px] text-gray-400">{student.badge}</div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-white font-bold">{student.xp} XP</span>
                  <span className="text-[10px] text-gray-400 block">LEVEL {student.level}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { useAuth } from "../../context/AuthContext";
import { useSound } from "../../context/SoundContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  Calendar,
  Plus,
  ShieldCheck,
  Search,
  Check,
  Trash2,
  Bell,
  FilePlus,
  BarChart2,
} from "lucide-react";
import { ClubEvent, Resource } from "../../types";

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { eventsList, addNewEvent, addNewResource } = useAuth();
  const { playClick, playSuccess } = useSound();
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "events" | "resources">("overview");

  // Event creation form state
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState("2026-10-25");
  const [newEventSeats, setNewEventSeats] = useState(100);
  const [newEventLocation, setNewEventLocation] = useState("Turing Hall");
  const [newEventCategory, setNewEventCategory] = useState<"Keynote" | "Symposium" | "Summit" | "Social" | "Competition">("Keynote");

  // Analytics mock data for Recharts
  const monthlyRegistrations = [
    { month: "May", students: 120 },
    { month: "Jun", students: 240 },
    { month: "Jul", students: 380 },
    { month: "Aug", students: 512 },
  ];

  const categoryBreakdown = [
    { name: "LLMs", value: 40 },
    { name: "Agents", value: 30 },
    { name: "Vision", value: 15 },
    { name: "Ethics", value: 15 },
  ];

  const COLORS = ["#FFFFFF", "#D1D5DB", "#9CA3AF", "#4B5563"];

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle) return;

    const newEvt: ClubEvent = {
      id: `evt-${Date.now()}`,
      title: newEventTitle,
      date: newEventDate,
      time: "06:00 PM EST",
      location: newEventLocation,
      category: newEventCategory,
      seatsLeft: newEventSeats,
      totalSeats: newEventSeats,
      description: "Newly published university AI event.",
      speaker: {
        name: "Guest Speaker",
        role: "Lead Researcher",
        company: "Synapse Club",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      },
      tags: ["AI", "Research"],
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80",
    };

    addNewEvent(newEvt);
    playSuccess();
    setNewEventTitle("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="EXECUTIVE ADMIN PANEL // SYSTEM OVERVIEW" maxWidth="6xl">
      <div className="space-y-6 font-mono">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 custom-scrollbar">
          {[
            { id: "overview", label: "Analytics & System", icon: BarChart2 },
            { id: "users", label: "Member Management (512)", icon: Users },
            { id: "events", label: "Create / Edit Events", icon: Calendar },
            { id: "resources", label: "Resource Uploader", icon: FilePlus },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playClick();
                setActiveTab(tab.id as any);
              }}
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

        {/* Tab 1: Overview Analytics */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                <span className="text-gray-400 text-[10px] uppercase block">TOTAL MEMBERS</span>
                <span className="text-2xl font-bold text-white">512</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                <span className="text-gray-400 text-[10px] uppercase block">ACTIVE EVENT RSVPS</span>
                <span className="text-2xl font-bold text-white">284</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                <span className="text-gray-400 text-[10px] uppercase block">COMPUTE ALLOCATIONS</span>
                <span className="text-2xl font-bold text-white">32 H100 Nodes</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                <span className="text-gray-400 text-[10px] uppercase block">RESOURCE DOWNLOADS</span>
                <span className="text-2xl font-bold text-white">2,492</span>
              </div>
            </div>

            {/* Recharts Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
                <h4 className="text-xs text-gray-400 uppercase font-bold">
                  STUDENT MEMBERSHIP GROWTH (2026)
                </h4>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyRegistrations}>
                      <XAxis dataKey="month" stroke="#9CA3AF" fontSize={11} />
                      <YAxis stroke="#9CA3AF" fontSize={11} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#000000", borderColor: "#374151", fontSize: "11px" }}
                      />
                      <Bar dataKey="students" fill="#FFFFFF" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="lg:col-span-4 bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
                <h4 className="text-xs text-gray-400 uppercase font-bold">
                  RESEARCH FOCUS BREAKDOWN
                </h4>
                <div className="h-64 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryBreakdown}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        innerRadius={40}
                      >
                        {categoryBreakdown.map((_entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: "#000000", borderColor: "#374151", fontSize: "11px" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: User Management */}
        {activeTab === "users" && (
          <div className="space-y-4 text-xs">
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center justify-between">
              <span className="text-gray-300 font-bold">STUDENT REGISTRATION QUEUE</span>
              <span className="text-gray-500">Auto-Approve Enabled</span>
            </div>

            <div className="space-y-2">
              {[
                { name: "Devon Vance", email: "devon@univ.edu", role: "Student", id: "AURA-9821" },
                { name: "Maya Lin", email: "maya@univ.edu", role: "Student", id: "AURA-7712" },
                { name: "Chen Wei", email: "chen@univ.edu", role: "Researcher", id: "AURA-4410" },
              ].map((u, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between gap-4"
                >
                  <div>
                    <span className="font-bold text-white">{u.name}</span> ({u.id})
                    <span className="block text-[10px] text-gray-400">{u.email} • ROLE: {u.role}</span>
                  </div>

                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-white text-black font-bold rounded-lg text-[10px]">
                      APPROVED
                    </button>
                    <button className="px-3 py-1 bg-white/10 text-gray-400 hover:text-white rounded-lg text-[10px]">
                      EDIT ROLE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Create Events */}
        {activeTab === "events" && (
          <div className="space-y-6">
            <form onSubmit={handleCreateEvent} className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4 text-xs">
              <h4 className="text-sm font-bold text-white">PUBLISH NEW EVENT</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 block mb-1">EVENT TITLE</label>
                  <input
                    type="text"
                    required
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    placeholder="e.g., Quantum Machine Learning Keynote"
                    className="w-full bg-black/60 border border-white/20 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">DATE</label>
                  <input
                    type="date"
                    required
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    className="w-full bg-black/60 border border-white/20 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">TOTAL SEAT CAPACITY</label>
                  <input
                    type="number"
                    value={newEventSeats}
                    onChange={(e) => setNewEventSeats(Number(e.target.value))}
                    className="w-full bg-black/60 border border-white/20 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">LOCATION</label>
                  <input
                    type="text"
                    value={newEventLocation}
                    onChange={(e) => setNewEventLocation(e.target.value)}
                    className="w-full bg-black/60 border border-white/20 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>PUBLISH EVENT TO CALENDAR</span>
              </button>
            </form>

            <div className="space-y-2">
              <h4 className="text-xs text-gray-400 uppercase font-bold">LIVE EVENTS ({eventsList.length})</h4>
              {eventsList.map((e) => (
                <div key={e.id} className="p-3 bg-white/5 border border-white/10 rounded-xl flex justify-between items-center text-xs">
                  <div>
                    <span className="text-white font-bold">{e.title}</span>
                    <span className="block text-[10px] text-gray-400">{e.date} • {e.seatsLeft} seats left</span>
                  </div>
                  <span className="text-gray-400 text-[10px]">{e.category}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Resource Uploader */}
        {activeTab === "resources" && (
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4 text-xs">
            <h4 className="text-sm font-bold text-white">UPLOAD RESEARCH PAPERS & SLIDES</h4>
            <p className="text-gray-400">Upload PDF lecture decks, research whitepapers, or repository links to the Knowledge Vault.</p>

            <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center space-y-2">
              <FilePlus className="w-8 h-8 text-white mx-auto" />
              <div className="text-white font-bold">Drag and drop PDF / PPT files here</div>
              <div className="text-[10px] text-gray-500">Supports files up to 50MB</div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

import React, { useState } from "react";
import { motion } from "motion/react";
import { Search, FileText, Video, Github, Link as LinkIcon, Download, Bookmark, Check } from "lucide-react";
import { RESOURCES_DATA } from "../../data/clubData";
import { Resource } from "../../types";
import { useAuth } from "../../context/AuthContext";
import { useSound } from "../../context/SoundContext";

export const ResourcesSection: React.FC = () => {
  const { user, resourcesList, toggleSaveResource } = useAuth();
  const { playHover, playClick, playSuccess } = useSound();
  const [selectedType, setSelectedType] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const types = ["All", "pdf", "github", "ppt", "video", "paper"];

  const filtered = resourcesList.filter((res) => {
    const matchesType = selectedType === "All" || res.type === selectedType;
    const matchesSearch =
      res.title.toLowerCase().includes(search.toLowerCase()) ||
      res.author.toLowerCase().includes(search.toLowerCase()) ||
      res.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-4 h-4 text-white" />;
      case "github":
        return <Github className="w-4 h-4 text-white" />;
      case "video":
        return <Video className="w-4 h-4 text-white" />;
      default:
        return <LinkIcon className="w-4 h-4 text-white" />;
    }
  };

  const handleCopyLink = (res: Resource) => {
    playSuccess();
    navigator.clipboard.writeText(window.location.origin + "#resources");
    setCopiedId(res.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="resources" className="py-28 px-6 md:px-12 max-w-7xl mx-auto z-10 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="px-3 py-1 bg-white/5 border border-white/15 rounded-full text-xs font-mono text-gray-300 uppercase tracking-widest">
            KNOWLEDGE VAULT
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-mono tracking-wider text-white uppercase mt-3">
            RESEARCH & <span className="text-gray-400">RESOURCES</span>
          </h2>
          <p className="text-gray-400 max-w-xl text-sm font-sans mt-2">
            Open-access lecture decks, fine-tuning notebooks, paper slide decks, and code repositories.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search papers, code, decks..."
              className="bg-white/5 border border-white/15 focus:border-white text-xs font-mono text-white placeholder-gray-500 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none w-full sm:w-60"
            />
          </div>

          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 overflow-x-auto">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => {
                  playClick();
                  setSelectedType(t);
                }}
                onMouseEnter={playHover}
                className={`px-3 py-1.5 text-xs font-mono uppercase rounded-lg transition-all ${
                  selectedType === t
                    ? "bg-white text-black font-bold shadow-md"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((res) => {
          const isSaved = user?.savedResourceIds.includes(res.id);

          return (
            <motion.div
              key={res.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onMouseEnter={playHover}
              className="bg-black/80 border border-white/15 hover:border-white/40 rounded-3xl p-6 backdrop-blur-2xl transition-all duration-300 space-y-4 flex flex-col justify-between group hover:scale-[1.01]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 bg-white/10 rounded-xl border border-white/20 flex items-center justify-center">
                    {getIcon(res.type)}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300 uppercase">
                      {res.category}
                    </span>
                    <button
                      onClick={() => {
                        playClick();
                        toggleSaveResource(res.id);
                      }}
                      className={`p-2 rounded-xl border transition-colors ${
                        isSaved
                          ? "bg-white text-black border-white"
                          : "bg-white/5 text-gray-400 border-white/10 hover:text-white"
                      }`}
                      title="Bookmark Resource"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="font-mono font-bold text-base text-white group-hover:text-gray-200">
                  {res.title}
                </h3>

                <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 pt-1">
                  <span>BY: {res.author}</span>
                  <span>{res.downloads} DOWNLOADS</span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {res.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded text-gray-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center gap-2">
                <a
                  href={res.url}
                  onClick={() => playClick()}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 bg-white/10 hover:bg-white text-white hover:text-black font-mono font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>DOWNLOAD RESOURCE</span>
                </a>

                <button
                  onClick={() => handleCopyLink(res)}
                  className="p-2.5 bg-white/5 hover:bg-white/20 border border-white/10 text-gray-400 hover:text-white rounded-xl transition-colors"
                  title="Copy Link"
                >
                  {copiedId === res.id ? <Check className="w-4 h-4 text-white" /> : <LinkIcon className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

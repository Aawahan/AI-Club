import React, { useState } from "react";
import { Hero3DOrbit } from "../3d/Hero3DOrbit";
import { AI_TOOLS_DATA } from "../../data/clubData";
import { AITool } from "../../types";
import { Search, ExternalLink, Sparkles, BookOpen } from "lucide-react";
import { useSound } from "../../context/SoundContext";

export const AIToolShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { playHover, playClick } = useSound();

  const categories = ["All", "LLM", "Code", "Media", "Agent", "Audio"];

  const filteredTools = AI_TOOLS_DATA.filter((tool) => {
    const matchesCat =
      selectedCategory === "All" || tool.category === selectedCategory;
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <section id="showcase" className="py-24 relative z-10 border-t border-b border-white/10 bg-black/60">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="px-3 py-1 bg-white/5 border border-white/15 rounded-full text-xs font-mono text-gray-300 uppercase tracking-widest">
              3D TOOL MATRIX
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold font-mono tracking-wider text-white uppercase mt-3">
              FRONTIER <span className="text-gray-400">AI STACK</span>
            </h2>
            <p className="text-gray-400 max-w-xl text-sm font-sans mt-2">
              Explore the core suite of AI engines integrated into university research labs, hackathons, and coursework.
            </p>
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools, models, features..."
                className="bg-white/5 border border-white/15 focus:border-white text-xs font-mono text-white placeholder-gray-500 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none w-full sm:w-64"
              />
            </div>

            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    playClick();
                    setSelectedCategory(cat);
                  }}
                  onMouseEnter={playHover}
                  className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${
                    selectedCategory === cat
                      ? "bg-white text-black font-bold shadow-md"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3D Orbit Interactive Engine Component */}
      <Hero3DOrbit />

      {/* Filtered Grid Catalog */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 space-y-6">
        <h3 className="text-sm font-mono text-gray-400 uppercase tracking-widest font-bold">
          COMPLETE TOOL DIRECTORY ({filteredTools.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="bg-black/80 border border-white/15 hover:border-white/40 rounded-3xl p-6 backdrop-blur-xl transition-all duration-300 space-y-4 group flex flex-col justify-between hover:scale-[1.01]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 p-1.5 bg-black/60 border border-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <img
                        src={tool.logo}
                        alt={tool.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="font-mono font-bold text-white text-base">
                        {tool.name}
                      </h4>
                      <span className="text-[10px] font-mono text-gray-400 uppercase">
                        {tool.category}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300">
                    {tool.stats}
                  </span>
                </div>

                <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                  {tool.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {tool.features.map((feat, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-gray-400 flex items-center gap-1"
                    >
                      <Sparkles className="w-2.5 h-2.5 text-white/70" />
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                <a
                  href={tool.link}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={playHover}
                  className="flex-1 py-2 bg-white/10 hover:bg-white text-white hover:text-black font-mono font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <span>LAUNCH</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href={tool.docsUrl}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={playHover}
                  className="p-2 bg-white/5 hover:bg-white/20 border border-white/15 text-gray-300 hover:text-white rounded-xl transition-colors"
                  title="Docs"
                >
                  <BookOpen className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

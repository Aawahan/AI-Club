import React, { useState } from "react";
import { motion } from "motion/react";
import { GALLERY_DATA } from "../../data/clubData";
import { GalleryItem } from "../../types";
import { Modal } from "../common/Modal";
import { Calendar, Tag } from "lucide-react";
import { useSound } from "../../context/SoundContext";

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const { playHover, playClick } = useSound();

  const categories = ["All", "Hackathons", "Workshops", "Guest Talks", "Projects"];

  const filteredGallery = GALLERY_DATA.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  );

  return (
    <section id="gallery" className="py-8 md:py-12 px-6 md:px-12 max-w-7xl mx-auto z-10 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="px-3 py-1 bg-white/5 border border-white/15 rounded-full text-xs font-mono text-gray-300 uppercase tracking-widest">
            MEDIA ARCHIVE
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-mono tracking-wider text-white uppercase mt-3">
            CLUB <span className="text-gray-400">GALLERY</span>
          </h2>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playClick();
                setSelectedCategory(cat);
              }}
              onMouseEnter={playHover}
              className={`px-3.5 py-1.5 text-xs font-mono rounded-lg transition-all ${
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

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredGallery.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            onClick={() => {
              playClick();
              setLightboxItem(item);
            }}
            onMouseEnter={playHover}
            className="group relative h-64 rounded-3xl overflow-hidden border border-white/15 cursor-pointer bg-black/60 shadow-lg"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            <div className="absolute bottom-4 left-4 right-4 space-y-1 font-mono text-white">
              <div className="flex items-center gap-2 text-[10px] text-gray-300 uppercase">
                <Tag className="w-3 h-3" />
                <span>{item.category}</span>
                <span>•</span>
                <span>{item.date}</span>
              </div>
              <h3 className="font-bold text-sm tracking-wider">{item.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <Modal
          isOpen={!!lightboxItem}
          onClose={() => setLightboxItem(null)}
          maxWidth="2xl"
        >
          <div className="space-y-4 font-mono">
            <div className="relative h-80 rounded-2xl overflow-hidden border border-white/20">
              <img
                src={lightboxItem.imageUrl}
                alt={lightboxItem.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="px-2.5 py-0.5 bg-white/10 border border-white/20 text-white font-bold rounded-full uppercase">
                  {lightboxItem.category}
                </span>
                <span>{lightboxItem.date}</span>
              </div>
              <h3 className="text-xl font-bold text-white">{lightboxItem.title}</h3>
              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                {lightboxItem.caption}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

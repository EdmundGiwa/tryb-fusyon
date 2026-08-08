"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LazyVideo from "./LazyVideo";

const galleryItems = [
  { id: 1, video: "/videos/green-dress-lady.mp4", title: "Emerald Grace", category: "Womenswear", span: "md:col-span-2 md:row-span-2" },
  { id: 2, video: "/videos/blue-adire.mp4", title: "The Indigo Royale", category: "Heritage", span: "md:col-span-1 md:row-span-1" },
  { id: 3, video: "/videos/brown-male.mp4", title: "Adire Cargo", category: "Menswear", span: "md:col-span-1 md:row-span-2" },
  { id: 4, video: "/videos/blue-long-adire.mp4", title: "Azure Sweep", category: "Ceremonial", span: "md:col-span-1 md:row-span-1" },
  { id: 5, video: "/videos/brown-adire.mp4", title: "Earthly Elegance", category: "Womenswear", span: "md:col-span-2 md:row-span-1" },
  { id: 6, video: "/videos/green-jacket.mp4", title: "Forest Authority", category: "Menswear", span: "md:col-span-1 md:row-span-1" },
  { id: 7, video: "/videos/technical-flats.mp4", title: "Architectural Precision", category: "Studio", span: "md:col-span-3 md:row-span-2" },
];

export default function Gallery() {
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);

  return (
    <section className="bg-[#020202] min-h-screen pt-32 pb-24 px-6 md:px-14 lg:px-20 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{
        background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 60%)"
      }} />

      {/* Header */}
      <div className="relative z-10 mb-16 md:mb-24 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-white/20" />
            <span className="text-[0.55rem] uppercase tracking-[0.4em] text-white/90 font-sans">Visual Archive</span>
            <div className="w-12 h-px bg-white/20" />
          </div>
          <h1 className="font-serif font-extralight text-white tracking-tight" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            The <em className="italic font-light">Gallery</em>
          </h1>
          <p className="mt-6 text-white/90 text-[0.85rem] max-w-lg mx-auto font-light leading-relaxed">
            A curated visual journey through the Tryb Fusyon atelier. Witness the fluidity, precision, and soul of our pieces in motion.
          </p>
        </motion.div>
      </div>

      {/* Masonry-like Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-[1400px] mx-auto auto-rows-[250px] md:auto-rows-[300px]">
        {galleryItems.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`relative group overflow-hidden rounded-2xl md:rounded-[2rem] cursor-pointer bg-[#0a0a0a] border border-white/5 ${item.span}`}
            onClick={() => setSelectedItem(item)}
          >
            <LazyVideo 
              src={item.video} 
              className="w-full h-full" 
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
            
            {/* Hover Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out pointer-events-none">
              <span className="text-[0.45rem] uppercase tracking-[0.4em] text-white/90 mb-2">{item.category}</span>
              <h3 className="font-serif text-2xl text-white italic tracking-wide">{item.title}</h3>
            </div>
            
            {/* Play Indicator */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-white/20 flex items-center justify-center bg-black/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-90 group-hover:scale-100">
              <svg className="w-4 h-4 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
            
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-8 right-8 z-30 w-12 h-12 rounded-full border border-white/15 flex items-center justify-center text-white/90 hover:text-white hover:border-white/40 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 10 10" fill="none"><path d="M1 1l8 8M9 1l-8 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
            </button>

            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-20 w-full max-w-6xl max-h-[85vh] h-full rounded-[2rem] overflow-hidden bg-black shadow-[0_0_100px_rgba(0,0,0,1)] border border-white/10 flex flex-col md:flex-row"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative flex-1 h-full bg-[#050505]">
                <video 
                  src={selectedItem.video} 
                  autoPlay 
                  loop 
                  muted={false} 
                  controls
                  playsInline 
                  className="absolute inset-0 w-full h-full object-contain" 
                />
              </div>
              <div className="md:w-80 p-8 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 bg-black/50 backdrop-blur-lg">
                 <span className="text-[0.45rem] uppercase tracking-[0.4em] text-white/90 mb-3">{selectedItem.category}</span>
                 <h2 className="font-serif text-3xl text-white italic mb-4">{selectedItem.title}</h2>
                 <p className="text-sm text-white/90 font-light leading-relaxed">
                   Experience the meticulous craftsmanship and fluid motion that defines this piece. 
                 </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

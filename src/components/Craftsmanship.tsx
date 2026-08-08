"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LazyVideo from "./LazyVideo";

export default function Craftsmanship() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={containerRef} id="craftsmanship" className="relative w-full bg-[#020202] text-white py-32 md:py-48 px-6 md:px-12 lg:px-20 overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0 flex items-center justify-center">
        <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-tr from-[#1e1410] to-[#0a0f12] blur-[140px] opacity-60 mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col gap-20 md:gap-32">
        
        {/* Header */}
        <div className="flex flex-col gap-6 items-center text-center max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4"
          >
            <div className="w-10 h-px bg-white/20" />
            <span className="text-[0.55rem] uppercase tracking-[0.4em] text-white/90 font-sans">
              The Atelier
            </span>
            <div className="w-10 h-px bg-white/20" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-extralight text-4xl md:text-6xl lg:text-7xl tracking-[-0.02em]"
          >
            Artisanal <span className="italic text-white/90">Precision</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl text-[0.95rem] md:text-[1.05rem] text-white/90 font-sans font-light leading-[1.8]"
          >
            Every garment is a study in uncompromising quality. From the hand-drawn technical flats to the final resist-dye bath in Lagos, our process honors both structure and spirit.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[350px] md:auto-rows-[400px]">
          
          {/* Card 1: Studio Flats (Large) */}
          <motion.div 
            style={{ y: y1 }}
            className="md:col-span-7 md:row-span-2 rounded-[2rem] overflow-hidden relative group shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5"
          >
            <LazyVideo
              src="/videos/technical-flats.mp4"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[3s] group-hover:scale-105 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/30 to-transparent transition-opacity duration-700" />
            <div className="absolute inset-8 md:inset-12 flex flex-col justify-end items-start">
              <span className="px-4 py-1.5 rounded-full border border-white/20 bg-black/30 backdrop-blur-md text-[0.45rem] uppercase tracking-[0.3em] text-white/90 mb-5">
                01 / The Blueprint
              </span>
              <h3 className="font-serif font-light text-3xl md:text-5xl text-white mb-4">Architectural <br/> Precision.</h3>
              <p className="text-[0.85rem] text-white/90 font-sans font-light max-w-sm leading-relaxed">
                Before the stitch comes the vision. Hand-drafted technical flats guide our tailoring, ensuring utility, balance, and flawless draping.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Italian Wool (Tall) */}
          <motion.div 
            style={{ y: y2 }}
            className="md:col-span-5 md:row-span-1 rounded-[2rem] overflow-hidden relative group shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5"
          >
            <LazyVideo
              src="/videos/green-jacket.mp4"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[3s] group-hover:scale-105 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020202]/90 via-[#020202]/20 to-transparent" />
            <div className="absolute inset-8 flex flex-col justify-end items-start">
              <span className="px-3 py-1 rounded-full border border-white/10 bg-black/20 backdrop-blur-md text-[0.45rem] uppercase tracking-[0.3em] text-white/90 mb-4">
                02 / Structure
              </span>
              <h3 className="font-serif font-light text-2xl md:text-3xl text-white mb-2">Full Canvas Construction</h3>
            </div>
          </motion.div>

          {/* Card 3: The Adire Dye (Wide) */}
          <motion.div 
            style={{ y: y3 }}
            className="md:col-span-5 md:row-span-1 rounded-[2rem] overflow-hidden relative group shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5"
          >
            <LazyVideo
              src="/videos/blue-adire.mp4"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[3s] group-hover:scale-105 pointer-events-none"
              style={{ objectPosition: "50% 30%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/50 to-transparent" />
            <div className="absolute inset-8 flex flex-col justify-end items-start">
              <span className="px-3 py-1 rounded-full border border-white/10 bg-black/20 backdrop-blur-md text-[0.45rem] uppercase tracking-[0.3em] text-white/90 mb-4">
                03 / The Craft
              </span>
              <h3 className="font-serif font-light text-2xl md:text-3xl text-white mb-2">Heritage Indigo</h3>
              <p className="text-[0.75rem] text-white/90 font-sans font-light leading-relaxed line-clamp-2 mt-1">
                Hand-drawn with cassava paste and submerged in organic indigo baths in Nigeria.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Showcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect for the image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const textY = useTransform(scrollYProgress, [0.1, 0.5], [20, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full aspect-[4/5] md:aspect-[16/11] lg:aspect-[16/10] flex items-center justify-center overflow-hidden bg-[#020202]"
    >
      {/* Background Image - with Reveal Animation */}
      <motion.div 
        style={{ y }} 
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="absolute inset-0 w-full h-[105%] z-0"
      >
        <img 
          src="/all_designs.webp" 
          alt="The Tryb Fusyon Collection" 
          className="w-full h-full object-cover object-top"
          loading="lazy"
        />
      </motion.div>

      {/* Reduced Overlays */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 z-10 bg-gradient-to-t from-[#020202] via-[#020202]/40 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-1/5 z-10 bg-gradient-to-b from-[#020202] to-transparent pointer-events-none" />
      
      {/* Shortened Text Content */}
      <motion.div 
        style={{ y: textY }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-20 flex flex-col items-center text-center px-6 md:px-12 mx-auto mt-auto mb-10 md:mb-16"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-8 h-px bg-[#E5D5C5]/40" />
          <span className="text-[0.55rem] md:text-[0.6rem] uppercase tracking-[0.4em] text-[#E5D5C5] font-mono drop-shadow-md">
            The Complete Vision
          </span>
          <div className="w-8 h-px bg-[#E5D5C5]/40" />
        </div>

        <h2 className="font-serif italic font-light text-3xl md:text-5xl text-white tracking-wide drop-shadow-lg">
          Mastery in <span className="text-[#E5D5C5]">Motion.</span>
        </h2>
      </motion.div>
    </section>
  );
}

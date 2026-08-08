"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Grain() {
  return (
    <svg className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.05] z-10" aria-hidden>
      <filter id="preloader-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="matrix" values="
          0.3 0.3 0.3 0 0
          0.3 0.3 0.3 0 0
          0.3 0.3 0.3 0 0
          0 0 0 1 0" 
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#preloader-grain)" />
    </svg>
  );
}

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 5 + 1;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = "";
        }, 1200); 
      }
      setProgress(Math.min(current, 100));
    }, 200);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          // Rich, warm obsidian/espresso base instead of harsh black
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#0a0807] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.05,
            filter: "blur(20px)",
            transition: { duration: 1.6, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          <Grain />

          {/* Luxurious Ambient Glow (Champagne / Bronze) */}
          <motion.div 
            className="absolute inset-0 pointer-events-none z-0"
            animate={{ 
              background: [
                "radial-gradient(circle at 40% 30%, rgba(163, 138, 107, 0.12) 0%, transparent 55%)",
                "radial-gradient(circle at 60% 70%, rgba(133, 98, 68, 0.15) 0%, transparent 65%)",
                "radial-gradient(circle at 40% 30%, rgba(163, 138, 107, 0.12) 0%, transparent 55%)"
              ] 
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Subtle center spotlight */}
          <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,rgba(229,213,197,0.05)_0%,transparent_60%)]" />

          <div className="relative z-20 flex flex-col items-center">
            {/* Split Typography Reveal - Champagne / Alabaster tones */}
            <div className="flex flex-col items-center overflow-hidden mb-12">
              <motion.span
                className="font-serif font-extralight text-[3.5rem] md:text-[5rem] tracking-[0.2em] text-[#E5D5C5] leading-none"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                style={{ textShadow: "0 4px 24px rgba(229,213,197,0.2)" }}
              >
                TRYB
              </motion.span>
              <motion.span
                className="font-serif italic font-light text-[3.5rem] md:text-[5rem] tracking-[0.1em] text-[#A38A6B] leading-none -mt-4 md:-mt-6 ml-12"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              >
                Fusyon
              </motion.span>
            </div>

            {/* Elegant Progress Indicator */}
            <motion.div 
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <div className="relative w-px h-16 bg-[#A38A6B]/20 overflow-hidden">
                <motion.div
                  className="absolute bottom-0 w-full bg-[#E5D5C5]"
                  style={{ height: `${progress}%`, boxShadow: "0 0 10px rgba(229,213,197,0.5)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>

              <div className="flex flex-col items-center gap-2">
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.5em] text-[#A38A6B]/70">
                  Initializing Atelier
                </span>
                <span className="font-mono text-[0.65rem] tracking-[0.2em] text-[#E5D5C5]">
                  {Math.round(progress)}%
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

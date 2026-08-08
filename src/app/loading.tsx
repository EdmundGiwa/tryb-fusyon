"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#010101]">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing ring */}
        <motion.div
          className="absolute inset-0 rounded-full border border-white/20"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
        />
        
        {/* Inner spinning diamond/square */}
        <motion.div
          className="w-12 h-12 border border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          initial={{ rotate: 0 }}
          animate={{ rotate: 180 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.span 
        className="mt-8 font-mono text-[0.55rem] uppercase tracking-[0.4em] text-white/90"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        Loading
      </motion.span>
    </div>
  );
}

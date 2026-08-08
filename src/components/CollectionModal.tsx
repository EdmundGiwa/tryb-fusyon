"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface CollectionItem {
  tag: string;
  name: string;
  video: string;
  desc: string;
  detail: string;
  index: string;
  accent: string;
}

export default function CollectionModal({ item, onClose }: { item: CollectionItem; onClose: () => void }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPreordering, setIsPreordering] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-y-auto overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClose}
    >
      <div className="min-h-[100dvh] flex flex-col items-center justify-center p-6 py-24 md:py-10">
        <div className="absolute inset-0 bg-black/85 backdrop-blur-2xl" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 45% at 50% 40%, rgba(${item.accent}, 0.22) 0%, transparent 70%)` }}
        />

        <button
          onClick={onClose}
          aria-label="Close"
          className="fixed top-6 right-6 md:absolute md:top-10 md:right-10 z-50 w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/90 hover:text-white hover:border-white/40 bg-black/50 backdrop-blur-md transition-colors"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 10 10" fill="none">
            <path d="M1 1l8 8M9 1l-8 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.97 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 max-w-4xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="relative overflow-hidden rounded-[1.75rem] md:rounded-[2rem] flex-shrink-0 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] bg-[#050505]"
            style={{ width: "clamp(260px, 85vw, 440px)", height: "clamp(300px, 45vh, 560px)", maxWidth: "100%" }}
          >
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/40">
                <motion.div
                  className="w-10 h-10 border border-white/20 border-t-white/80 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
            )}
            <video 
              src={item.video} 
              autoPlay 
              loop 
              muted 
              playsInline 
              onLoadedData={() => setIsLoaded(true)}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000" 
              style={{ opacity: isLoaded ? 1 : 0 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div
              className="absolute inset-[9px] rounded-[1.5rem] md:rounded-[1.7rem] pointer-events-none"
              style={{ border: `1px solid rgba(${item.accent}, 0.5)` }}
            />
          </div>

          <div
            className="rounded-[1.4rem] p-7 md:p-9 flex flex-col gap-5 shadow-[0_20px_60px_rgba(0,0,0,0.7)] relative overflow-hidden"
            style={{
              width: "clamp(260px, 30vw, 380px)",
              background: "rgba(6, 6, 6, 0.72)",
              backdropFilter: "blur(28px) saturate(160%)",
              border: "1px solid rgba(255,255,255,0.09)",
            }}
          >
            <AnimatePresence mode="wait">
              {!isPreordering ? (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex flex-col gap-5"
                >
                  <span className="text-[0.44rem] uppercase tracking-[0.4em] text-white/90 font-sans">{item.tag}</span>

                  <div className="flex items-center gap-4">
                    <div className="w-9 h-px" style={{ background: `rgba(${item.accent}, 0.7)` }} />
                    <h4 className="font-serif italic font-light text-2xl md:text-[1.9rem] text-white tracking-wide">{item.name}</h4>
                  </div>

                  <p className="text-[0.8rem] text-white/90 font-sans font-light leading-[1.85]">{item.desc}</p>

                  <div className="flex items-center gap-4 pt-1">
                    <div className="w-9 h-px bg-white/15" />
                    <span className="text-[0.46rem] uppercase tracking-[0.28em] text-white/90 font-sans">{item.detail}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-px bg-white/5" />
                    <span className="text-[0.46rem] uppercase tracking-[0.28em] text-white/90 font-sans">Lagos, Nigeria · 2026</span>
                  </div>

                  <button
                    onClick={() => setIsPreordering(true)}
                    className="mt-2 flex items-center justify-center w-full py-3.5 rounded-full relative group/cta overflow-hidden transition-all duration-500"
                    style={{
                      background: `rgba(${item.accent}, 0.1)`,
                      border: `1px solid rgba(${item.accent}, 0.4)`,
                      boxShadow: `0 0 15px rgba(${item.accent}, 0.1)`,
                    }}
                  >
                    <div className="absolute inset-0 bg-white/5 translate-y-[100%] group-hover/cta:translate-y-[0%] transition-transform duration-500 ease-out" />
                    <span className="relative z-10 text-[0.55rem] uppercase tracking-[0.3em] text-white font-medium group-hover/cta:text-white transition-colors duration-300 flex items-center gap-2">
                      Preorder Now
                      <svg className="w-3 h-3 group-hover/cta:translate-x-1 transition-transform duration-300" viewBox="0 0 10 10" fill="none">
                        <path d="M1 5h8M6 2l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                </motion.div>
              ) : isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-10 gap-4 text-center"
                >
                  <div className="w-12 h-12 rounded-full border border-green-500/30 flex items-center justify-center text-green-400 mb-2" style={{ background: "rgba(34, 197, 94, 0.05)" }}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="font-serif italic text-2xl text-white">Reserved.</h4>
                  <p className="text-white/90 text-[0.8rem] font-light">Your preorder request for the {item.name} has been received. Our atelier will contact you shortly.</p>
                  <button onClick={onClose} className="mt-4 text-[0.5rem] uppercase tracking-[0.2em] text-white/90 hover:text-white transition-colors border-b border-white/20 pb-0.5">
                    Return to Collections
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <button onClick={() => setIsPreordering(false)} className="text-white/90 hover:text-white transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <h4 className="font-serif italic text-xl text-white">Preorder Form</h4>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[0.45rem] uppercase tracking-[0.2em] text-white/90 mb-1.5 ml-1">Full Name</label>
                      <input type="text" placeholder="Jane Doe" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[0.45rem] uppercase tracking-[0.2em] text-white/90 mb-1.5 ml-1">Email Address</label>
                      <input type="email" placeholder="jane@example.com" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[0.45rem] uppercase tracking-[0.2em] text-white/90 mb-1.5 ml-1">Preferred Size (Optional)</label>
                      <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-colors appearance-none">
                        <option value="">Select Size / Bespoke</option>
                        <option value="xs">US 2 - 4 (XS)</option>
                        <option value="s">US 6 - 8 (S)</option>
                        <option value="m">US 10 - 12 (M)</option>
                        <option value="l">US 14 - 16 (L)</option>
                        <option value="bespoke">Bespoke (Custom Measurements)</option>
                      </select>
                    </div>
                    
                    <button
                      onClick={() => {
                        // simulate form submission
                        setTimeout(() => setIsSubmitted(true), 600);
                      }}
                      className="mt-2 w-full py-3.5 rounded-full text-[0.55rem] uppercase tracking-[0.3em] text-black font-medium transition-transform active:scale-95"
                      style={{ background: `rgb(${item.accent})` }}
                    >
                      Confirm Preorder
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

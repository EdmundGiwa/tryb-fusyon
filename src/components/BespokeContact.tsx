"use client";

import { motion } from "framer-motion";
import LazyVideo from "./LazyVideo";

export default function BespokeContact() {
  return (
    <section id="bespoke" className="relative w-full bg-[#050505] text-white py-32 md:py-48 overflow-hidden">
      
      {/* Background Split */}
      <div className="absolute inset-0 flex pointer-events-none z-0">
        <div className="w-full lg:w-[45%] h-full bg-[#020202]" />
        <div className="w-full lg:w-[55%] h-full bg-[#050505] hidden lg:block relative">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#18120e] to-transparent blur-[120px] mix-blend-screen opacity-50" />
        </div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        
        {/* Left Side: Imagery & Text */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-12 justify-center lg:col-span-5"
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-px bg-white/30" />
              <span className="text-[0.55rem] uppercase tracking-[0.4em] text-white/90 font-sans">
                Atelier Services
              </span>
            </div>
            <h2 className="font-serif font-light text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-[-0.02em]">
              Commission <br />
              <span className="italic text-white/90">the</span> Extraordinary.
            </h2>
            <p className="max-w-md text-[0.95rem] md:text-[1.05rem] text-white/90 font-sans font-light leading-[1.8] mt-2">
              True luxury is tailored to the individual. Our bespoke service offers an intimate collaboration to create a Tryb Fusyon piece exclusively for you—from initial sketch to final fitting.
            </p>
          </div>

          <div className="relative w-full aspect-[4/3] rounded-2xl md:rounded-[2rem] overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <LazyVideo
              src="/videos/brown-adire.mp4"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[3s] group-hover:scale-105 pointer-events-none"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700" />
            <div className="absolute inset-4 border border-white/10 rounded-xl md:rounded-2xl pointer-events-none transition-all duration-700 group-hover:inset-3 group-hover:border-white/20" />
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center lg:col-span-7 lg:px-12"
        >
          <div className="bg-[#080808]/80 backdrop-blur-3xl border border-white/5 rounded-[2rem] p-8 md:p-14 shadow-[0_30px_80px_rgba(0,0,0,0.6)] relative overflow-hidden">
            
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 100% 0%, rgba(255,255,255,0.03) 0%, transparent 50%)" }} />
            
            <h3 className="font-serif font-light text-3xl md:text-4xl text-white mb-10 tracking-tight">Begin an Inquiry</h3>
            
            <form className="flex flex-col gap-10 relative z-10">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="relative group">
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full bg-transparent border-b border-white/15 pb-4 text-white focus:outline-none focus:border-white/60 peer transition-colors text-sm font-sans font-light"
                    placeholder=" "
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-0 top-0 text-white/90 text-[0.65rem] uppercase tracking-[0.2em] transform -translate-y-5 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-[0.8rem] peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal transition-all duration-300 pointer-events-none"
                  >
                    Full Name
                  </label>
                </div>

                <div className="relative group">
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full bg-transparent border-b border-white/15 pb-4 text-white focus:outline-none focus:border-white/60 peer transition-colors text-sm font-sans font-light"
                    placeholder=" "
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 top-0 text-white/90 text-[0.65rem] uppercase tracking-[0.2em] transform -translate-y-5 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-[0.8rem] peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal transition-all duration-300 pointer-events-none"
                  >
                    Email Address
                  </label>
                </div>
              </div>

              <div className="relative group">
                <input
                  type="text"
                  id="location"
                  className="w-full bg-transparent border-b border-white/15 pb-4 text-white focus:outline-none focus:border-white/60 peer transition-colors text-sm font-sans font-light"
                  placeholder=" "
                />
                <label
                  htmlFor="location"
                  className="absolute left-0 top-0 text-white/90 text-[0.65rem] uppercase tracking-[0.2em] transform -translate-y-5 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-[0.8rem] peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal transition-all duration-300 pointer-events-none"
                >
                  City / Country
                </label>
              </div>

              <div className="relative group mt-2">
                <textarea
                  id="details"
                  rows={4}
                  className="w-full bg-transparent border-b border-white/15 pb-4 text-white focus:outline-none focus:border-white/60 peer transition-colors text-sm font-sans font-light resize-none"
                  placeholder=" "
                ></textarea>
                <label
                  htmlFor="details"
                  className="absolute left-0 top-0 text-white/90 text-[0.65rem] uppercase tracking-[0.2em] transform -translate-y-5 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-[0.8rem] peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal transition-all duration-300 pointer-events-none"
                >
                  Project Details or Inquiry
                </label>
              </div>

              <button
                type="button"
                className="mt-4 w-full py-5 rounded-sm bg-white text-black font-sans text-[0.7rem] uppercase tracking-[0.3em] font-medium hover:bg-white/90 transition-colors flex items-center justify-center gap-3 group"
              >
                Submit Inquiry
                <svg className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" viewBox="0 0 10 10" fill="none">
                  <path d="M1 5h8M6 2l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

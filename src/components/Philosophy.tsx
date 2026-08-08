"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import LazyVideo from "./LazyVideo";

const stats = [
  { value: "12+", label: "Years of Craft" },
  { value: "100%", label: "Hand-Finished" },
  { value: "Lagos", label: "Origin" },
];

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const leftX = useTransform(scrollYProgress, [0, 0.5], [-60, 0]);
  const rightX = useTransform(scrollYProgress, [0, 0.5], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  return (
    <section
      id="philosophy"
      ref={containerRef}
      className="relative w-full bg-[#030303] text-white overflow-hidden"
      style={{ paddingTop: "clamp(5rem, 12vh, 10rem)", paddingBottom: "clamp(5rem, 12vh, 10rem)" }}
    >
      {/* Ambient top glow */}
      <div
        className="absolute inset-x-0 top-0 h-[1px] pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent)" }}
      />

      {/* Floating background number */}
      <div className="absolute right-[-2vw] top-1/2 -translate-y-1/2 font-mono text-[22vw] font-bold text-white/[0.018] leading-none select-none pointer-events-none">
        TF
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">
        {/* ── Left: Video ── */}
        <motion.div
          style={{ x: leftX, opacity, aspectRatio: "3/4" }}
          className="relative w-full overflow-hidden rounded-2xl md:rounded-[2rem]"
        >
          <LazyVideo
            src="/videos/technical-flats.mp4"
            className="absolute inset-0 w-full h-full object-cover opacity-70 pointer-events-none"
            style={{ filter: "sepia(0.15) grayscale(0.1)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-70" />
          <div className="absolute inset-5 border border-white/8 rounded-xl md:rounded-2xl pointer-events-none" />
          
          {/* Floating stat card */}
          <div
            className="absolute bottom-8 left-8 rounded-xl px-5 py-4"
            style={{
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(24px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <p className="text-[0.42rem] uppercase tracking-[0.35em] text-white/90 mb-1">Est.</p>
            <p className="font-serif text-xl text-white font-light">Lagos, Nigeria</p>
          </div>
        </motion.div>

        {/* ── Right: Text ── */}
        <motion.div style={{ x: rightX, opacity }} className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-px bg-white/25" />
            <span className="text-[0.5rem] uppercase tracking-[0.42em] text-white/90 font-sans">
              The Philosophy
            </span>
          </div>

          <h2
            className="font-serif font-extralight leading-[1.08] tracking-[-0.025em]"
            style={{ fontSize: "clamp(2.2rem, 5vw, 5rem)" }}
          >
            Where heritage <br />
            <em className="italic font-light text-white/90">breathes in</em> <br />
            every thread.
          </h2>

          <div className="space-y-5 max-w-[480px]">
            <p className="text-[0.88rem] md:text-[0.95rem] text-white/90 font-sans font-light leading-[1.85]">
              Founded in the heart of Lagos, Tryb Fusyon is more than a couture house — it is a reclamation of West African narrative. True luxury is not manufactured; it is cultivated over generations, spoken through the hands of artisans.
            </p>
            <p className="text-[0.88rem] md:text-[0.95rem] text-white/90 font-sans font-light leading-[1.85]">
              Each garment is an intimate dialogue between centuries-old Adire craftsmanship and modern architectural precision.
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/8">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1.5">
                <span className="font-serif text-2xl md:text-3xl text-white font-extralight">{s.value}</span>
                <span className="text-[0.48rem] uppercase tracking-[0.3em] text-white/90 font-sans">{s.label}</span>
              </div>
            ))}
          </div>

          <a href="#craftsmanship" className="inline-flex items-center gap-4 group w-fit mt-2">
            <span className="text-[0.58rem] uppercase tracking-[0.28em] text-white/90 group-hover:text-white transition-colors duration-300">
              Discover the Craft
            </span>
            <div className="w-8 h-px bg-white/30 group-hover:w-14 group-hover:bg-white transition-all duration-500" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

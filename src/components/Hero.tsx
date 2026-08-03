"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

const slides = [
  {
    video: "/videos/blue-adire.mp4",
    index: "01",
    title: ["The Indigo", "Royale"],
    sub: "Heritage Adire · Lagos",
    description:
      "Deep hues of traditional Adire crafted into a modern masterpiece. A statement of heritage and bold elegance.",
    bgColor: "#020617",
    glowColor: "#1e3a8a",
    accentColor: "rgba(30, 58, 138, 0.6)",
  },
  {
    video: "/videos/blue-long-adire.mp4",
    index: "02",
    title: ["Azure", "Sweep"],
    sub: "Flowing Silhouette · Collection II",
    description:
      "Flowing lines and intricate patterns. This long silhouette commands attention in every room.",
    bgColor: "#082f49",
    glowColor: "#0c4a6e",
    accentColor: "rgba(12, 74, 110, 0.6)",
  },
  {
    video: "/videos/brown-adire.mp4",
    index: "03",
    title: ["Earthly", "Elegance"],
    sub: "Terracotta Couture · Atelier",
    description:
      "Rich terracotta and cocoa tones blended perfectly. The true essence of grounded sophistication.",
    bgColor: "#1c0a00",
    glowColor: "#92400e",
    accentColor: "rgba(146, 64, 14, 0.6)",
  },
  {
    video: "/videos/green-dress-lady.mp4",
    index: "04",
    title: ["Emerald", "Grace"],
    sub: "Nature's Brilliance · Womenswear",
    description:
      "A silhouette that dances with the wind. The emerald dress brings nature's brilliance to life.",
    bgColor: "#022c22",
    glowColor: "#065f46",
    accentColor: "rgba(6, 95, 70, 0.6)",
  },
  {
    video: "/videos/green-jacket.mp4",
    index: "05",
    title: ["Forest", "Authority"],
    sub: "Structured Power · Menswear",
    description:
      "Tailored to perfection. The green jacket merges formal structure with contemporary flair.",
    bgColor: "#052e16",
    glowColor: "#14532d",
    accentColor: "rgba(20, 83, 45, 0.6)",
  },
  {
    video: "/videos/technical-flats.mp4",
    index: "06",
    title: ["Architectural", "Precision"],
    sub: "Technical Excellence · Studio",
    description:
      "Every seam meticulously planned. The foundation of modern Yoruba couture.",
    bgColor: "#09090b",
    glowColor: "#27272a",
    accentColor: "rgba(39, 39, 42, 0.6)",
  },
];

// --- Sub-components for clean structure ---

function GrainOverlay() {
  return (
    <svg className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.035] z-[1]" aria-hidden>
      <filter id="grain-filter">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-filter)" />
    </svg>
  );
}

function VideoSlide({
  slide,
  isActive,
  isExiting,
  onVideoEnd,
}: {
  slide: (typeof slides)[0];
  isActive: boolean;
  isExiting: boolean;
  onVideoEnd: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isActive) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  }, [isActive]);

  const handleEnded = useCallback(() => {
    if (isActive) onVideoEnd();
  }, [isActive, onVideoEnd]);

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0, scale: 1.12 }}
      animate={
        isActive && !isExiting
          ? { opacity: 1, scale: 1, transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } }
          : isExiting
          ? { opacity: 0, scale: 0.96, transition: { duration: 1.0, ease: [0.7, 0, 0.84, 0] } }
          : { opacity: 0, scale: 1.12 }
      }
    >
      <video
        ref={videoRef}
        muted
        playsInline
        onEnded={handleEnded}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={slide.video} type="video/mp4" />
      </video>

      {/* Multi-layer cinematic vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/20" />
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundColor: slide.accentColor }}
        transition={{ duration: 2, ease: "easeInOut" }}
        style={{ mixBlendMode: "multiply" }}
      />
    </motion.div>
  );
}

// Individual word reveal animation
function AnimatedTitle({ lines, isVisible }: { lines: string[]; isVisible: boolean }) {
  return (
    <div className="overflow-visible">
      {lines.map((line, lineIdx) => (
        <div key={lineIdx} className="overflow-hidden leading-[0.95]">
          <motion.span
            className="block font-serif font-light tracking-tight text-white"
            style={{ fontSize: "clamp(3.5rem, 9vw, 9rem)" }}
            initial={{ y: "110%", opacity: 0 }}
            animate={
              isVisible
                ? { y: 0, opacity: 1 }
                : { y: "110%", opacity: 0 }
            }
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
              delay: lineIdx * 0.08 + 0.2,
            }}
          >
            {lineIdx === lines.length - 1 ? (
              <span className="italic font-extralight text-white/90">{line}</span>
            ) : (
              line
            )}
          </motion.span>
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitingIndex, setExitingIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [textVisible, setTextVisible] = useState(true);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    const nextIndex = (currentIndex + 1) % slides.length;

    setIsTransitioning(true);
    // 1. First hide text
    setTextVisible(false);

    // 2. After text exits, start video crossfade
    setTimeout(() => {
      setExitingIndex(currentIndex);
      setCurrentIndex(nextIndex);

      // 3. After crossfade begins, show new text
      setTimeout(() => {
        setTextVisible(true);
        setExitingIndex(null);
        setIsTransitioning(false);
      }, 800);
    }, 400);
  }, [currentIndex, isTransitioning]);

  const goToSlide = useCallback(
    (idx: number) => {
      if (idx === currentIndex || isTransitioning) return;
      const direction = idx > currentIndex ? 1 : -1;
      void direction;

      setIsTransitioning(true);
      setTextVisible(false);

      setTimeout(() => {
        setExitingIndex(currentIndex);
        setCurrentIndex(idx);

        setTimeout(() => {
          setTextVisible(true);
          setExitingIndex(null);
          setIsTransitioning(false);
        }, 800);
      }, 400);
    },
    [currentIndex, isTransitioning]
  );

  const slide = slides[currentIndex];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <GrainOverlay />

      {/* === VIDEOS LAYER === */}
      <div className="absolute inset-0">
        {slides.map((s, idx) => {
          const isActive = idx === currentIndex;
          const isExiting = idx === exitingIndex;
          if (!isActive && !isExiting) return null;
          return (
            <VideoSlide
              key={idx}
              slide={s}
              isActive={isActive}
              isExiting={isExiting}
              onVideoEnd={goToNext}
            />
          );
        })}
      </div>

      {/* === AMBIENT BG GLOW (behind everything) === */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-[55%] pointer-events-none z-[2]"
        animate={{
          background: `radial-gradient(ellipse 80% 60% at 20% 100%, ${slide.glowColor}55 0%, transparent 70%)`,
        }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      />

      {/* === NAVBAR === */}
      <motion.header
        className="absolute inset-x-0 top-0 z-50 px-6 lg:px-14 flex justify-between items-center"
        style={{ height: 88 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {/* Logo */}
        <a href="/" className="flex flex-col leading-none group">
          <span className="font-serif text-lg md:text-2xl tracking-[0.28em] font-medium text-white group-hover:opacity-75 transition-opacity duration-300">
            TRYB FUSYON
          </span>
          <span className="mt-0.5 text-[0.5rem] md:text-[0.55rem] uppercase tracking-[0.4em] text-white/40">
            Heritage Couture
          </span>
        </a>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {["Collections", "About", "Services", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[0.7rem] md:text-xs font-medium tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Order CTA */}
        <a href="#contact" className="hidden md:block">
          <span className="relative inline-flex rounded-full p-px"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.25) 100%)" }}>
            <span className="inline-flex items-center justify-center rounded-full bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-2.5 text-[0.65rem] font-medium tracking-[0.2em] uppercase text-white hover:bg-white/15 transition-colors duration-300">
              Order Now
            </span>
          </span>
        </a>
      </motion.header>

      {/* === MAIN CONTENT === */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end px-6 md:px-14 lg:px-20 pb-20 md:pb-24">

        {/* Index + Divider Row */}
        <motion.div
          className="flex items-center gap-5 mb-8"
          animate={textVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: textVisible ? 0.1 : 0 }}
        >
          <span className="font-mono text-[0.6rem] tracking-[0.35em] text-white/40 uppercase">
            {slide.index} / 0{slides.length}
          </span>
          <div className="w-16 h-[1px] bg-white/20" />
          <motion.span
            key={currentIndex + "-sub"}
            className="text-[0.6rem] md:text-[0.65rem] tracking-[0.3em] uppercase text-white/50"
            animate={textVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {slide.sub}
          </motion.span>
        </motion.div>

        {/* Title */}
        <div className="mb-8">
          <AnimatedTitle lines={slide.title} isVisible={textVisible} />
        </div>

        {/* Description + CTA row */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16 max-w-5xl"
          animate={textVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 20, filter: "blur(6px)" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: textVisible ? 0.45 : 0 }}
        >
          {/* Description */}
          <p className="text-sm md:text-base text-white/60 max-w-xs md:max-w-sm font-light leading-relaxed">
            {slide.description}
          </p>

          {/* Vertical rule */}
          <div className="hidden md:block w-[1px] h-14 bg-white/15 self-end mb-1" />

          {/* CTA Buttons */}
          <div className="flex items-center gap-5">
            <a href="#collections">
              {/* Glassmorphic primary CTA */}
              <span
                className="relative inline-flex rounded-full p-px group"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.25) 100%)",
                }}
              >
                <span className="relative inline-flex items-center gap-2.5 justify-center rounded-full bg-black/40 backdrop-blur-2xl border border-white/10 px-8 py-4 text-[0.7rem] font-medium tracking-[0.25em] uppercase text-white transition-all duration-500 group-hover:bg-white/15 group-hover:border-white/20">
                  <span>Explore</span>
                  <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </span>
            </a>

            <a
              href="#about"
              className="text-[0.65rem] tracking-[0.25em] uppercase text-white/45 hover:text-white/80 transition-colors duration-300 border-b border-white/20 pb-0.5 hover:border-white/50"
            >
              Our Story
            </a>
          </div>
        </motion.div>
      </div>

      {/* === SLIDE INDICATORS — vertical progress bars === */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            aria-label={`Collection ${idx + 1}`}
            className="group relative flex items-center justify-center py-1.5 px-1"
          >
            <span className="block w-[1.5px] h-6 rounded-full overflow-hidden bg-white/15 relative">
              {idx === currentIndex && (
                <motion.span
                  className="absolute top-0 left-0 w-full bg-white rounded-full"
                  initial={{ height: "0%" }}
                  animate={{ height: "100%" }}
                  transition={{ duration: 8, ease: "linear" }}
                />
              )}
              {idx !== currentIndex && (
                <motion.span
                  className="absolute inset-0 bg-white/0 group-hover:bg-white/40 rounded-full transition-colors duration-300"
                />
              )}
            </span>
          </button>
        ))}
      </div>

      {/* === COLLECTION NAME — right side vertical === */}
      <motion.div
        className="absolute right-20 md:right-28 top-1/2 -translate-y-1/2 z-30 hidden lg:flex items-center"
        animate={textVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span
          className="font-mono text-[0.5rem] tracking-[0.4em] uppercase text-white/25"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          {slide.title.join(" ")}
        </span>
      </motion.div>

      {/* === SCROLL CTA — bottom center === */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <span className="text-[0.5rem] tracking-[0.45em] uppercase text-white/30">Scroll</span>
        <motion.div
          className="w-[1px] h-10 bg-gradient-to-b from-white/40 to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: "top" }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* === GLASSMORPHIC BOTTOM INFO BAR === */}
      <motion.div
        className="absolute bottom-0 inset-x-0 z-20 hidden md:flex items-center justify-between px-14 pb-7 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <div className="flex items-center gap-6">
          {/* Social proof pill */}
          <div
            className="flex items-center gap-3 rounded-full px-4 py-2.5 border"
            style={{
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(20px)",
              borderColor: "rgba(255,255,255,0.08)",
            }}
          >
            <div className="flex -space-x-1.5">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-5 h-5 rounded-full border border-black/60 bg-gradient-to-br from-white/30 to-white/10"
                />
              ))}
            </div>
            <span className="text-[0.6rem] tracking-[0.15em] text-white/50">
              Crafted in Lagos
            </span>
          </div>
        </div>

        {/* Next collection preview pill */}
        <div
          className="flex items-center gap-3 rounded-full px-4 py-2.5 border pointer-events-auto cursor-pointer hover:border-white/20 transition-colors duration-300 group"
          onClick={goToNext}
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(20px)",
            borderColor: "rgba(255,255,255,0.08)",
          }}
        >
          <span className="text-[0.6rem] tracking-[0.15em] text-white/40 group-hover:text-white/60 transition-colors">
            Next —
          </span>
          <span className="text-[0.6rem] tracking-[0.15em] text-white/60 group-hover:text-white/80 transition-colors font-medium">
            {slides[(currentIndex + 1) % slides.length].title.join(" ")}
          </span>
          <svg className="w-3 h-3 text-white/30 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all duration-300" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </motion.div>
    </section>
  );
}

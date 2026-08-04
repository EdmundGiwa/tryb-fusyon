"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────
   SLIDE DATA
───────────────────────────────────────────── */
const slides = [
  {
    video: "/videos/green-dress-lady.mp4",
    index: "01",
    tag: "Womenswear",
    title: ["Emerald", "Grace"],
    quote: "She does not enter a room — she transforms it.",
    description:
      "An ode to feminine power and natural brilliance. The Emerald Grace moves like water — fluid, magnetic, impossible to ignore. Cut from a single bolt of hand-loomed silk-cotton blend.",
    detail: "Silk-Cotton Blend · Hand-beaded Neckline",
    rgb: "6, 78, 59",
    bg: "#010f08",
  },
  {
    video: "/videos/blue-adire.mp4",
    index: "02",
    tag: "Heritage Edition",
    title: ["The Indigo", "Royale"],
    quote: "Where heritage breathes in every thread.",
    description:
      "Steeped in the centuries-old craft of Adire indigo dyeing, this piece transforms tradition into an unmistakable statement of power. Each fold carries the mastery of generations — hand-crafted in Lagos.",
    detail: "Hand-dyed Adire Cotton · Resist-dye Batik",
    rgb: "30, 58, 138",
    bg: "#010c22",
  },
  {
    video: "/videos/brown-male.mp4",
    index: "03",
    tag: "Utility Series",
    title: ["Adire", "Cargo Set"],
    quote: "Rooted in heritage, engineered for motion.",
    description:
      "A masterclass in functional elegance. Featuring hand-dyed Earth Adire motifs across a relaxed utility silhouette. Engineered with premium cotton and finished with matte black hardware for the modern journey.",
    detail: "Earth Adire · Relaxed Utility Fit",
    rgb: "158, 107, 82",
    bg: "#100906",
  },
  {
    video: "/videos/blue-long-adire.mp4",
    index: "04",
    tag: "Atelier Reserve",
    title: ["Azure", "Sweep"],
    quote: "Length is authority. Elegance is earned.",
    description:
      "This floor-sweeping silhouette commands every room it enters. Woven from the finest sky-blue Adire cloth, the Azure Sweep redefines the boundary between ceremonial and contemporary.",
    detail: "Premium Adire Linen · Floor-length Agbada",
    rgb: "2, 44, 80",
    bg: "#010d1a",
  },
  {
    video: "/videos/brown-adire.mp4",
    index: "05",
    tag: "Earth Series",
    title: ["Earthly", "Elegance"],
    quote: "Rooted in the soil. Rising in glory.",
    description:
      "Rich terracotta and sun-baked cocoa tones collide in a celebration of West African earth — grounded in nature, elevated through precision tailoring and hand-embroidered 24k gold threadwork.",
    detail: "Terracotta Adire · 24k Gold Embroidery",
    rgb: "120, 53, 15",
    bg: "#150800",
  },
  {
    video: "/videos/green-jacket.mp4",
    index: "06",
    tag: "Power Dressing",
    title: ["Forest", "Authority"],
    quote: "Structure is a statement. Wear it well.",
    description:
      "Precision-tailored for the man who understands that clothing is architecture for the body. Full canvas Italian wool construction with silk jacquard lining — a garment that speaks first.",
    detail: "Italian Wool-blend · Full Canvas Construction",
    rgb: "20, 83, 45",
    bg: "#010c05",
  },
  {
    video: "/videos/technical-flats.mp4",
    index: "07",
    tag: "Studio Series",
    title: ["Architectural", "Precision"],
    quote: "Before the stitch — the vision.",
    description:
      "Every masterpiece begins here, in the quiet discipline of the atelier. Each line a decision, each measurement a commitment to perfection — this is where Tryb Fusyon begins.",
    detail: "Hand-drafted Patterns · 3-phase Quality Review",
    rgb: "80, 80, 95",
    bg: "#08080c",
  },
];

const FALLBACK_MS = 14000;
const PLAYBACK_RATE = 0.65;

/* ─────────────────────────────────────────────
   FILM GRAIN
───────────────────────────────────────────── */
function Grain() {
  return (
    <svg className="pointer-events-none fixed inset-0 w-full h-full opacity-[0.032] z-[200]" aria-hidden>
      <filter id="g2">
        <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#g2)" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   TITLE REVEAL — each word slides from below
───────────────────────────────────────────── */
function HeroTitle({ lines, show }: { lines: string[]; show: boolean }) {
  return (
    <div className="mb-5 md:mb-6">
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden" style={{ lineHeight: 0.88 }}>
          <motion.h1
            className="block font-serif font-extralight text-white tracking-[-0.025em] pb-[0.07em]"
            style={{ fontSize: "clamp(3.2rem, 7.8vw, 10rem)" }}
            initial={{ y: "112%", opacity: 0 }}
            animate={
              show
                ? {
                    y: 0,
                    opacity: 1,
                    transition: { duration: 1.25, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.13 },
                  }
                : {
                    y: "112%",
                    opacity: 0,
                    transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1], delay: i * 0.05 },
                  }
            }
          >
            {i === lines.length - 1 ? (
              <em className="italic font-light" style={{ color: "rgba(255,255,255,0.8)" }}>
                {line}
              </em>
            ) : (
              line
            )}
          </motion.h1>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   VIDEO LAYER
───────────────────────────────────────────── */
function VideoLayer({
  slide,
  isActive,
  isExiting,
  onEnded,
}: {
  slide: (typeof slides)[0];
  isActive: boolean;
  isExiting: boolean;
  onEnded: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (isActive) {
      v.currentTime = 0;
      v.playbackRate = PLAYBACK_RATE;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [isActive]);

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0, scale: 1.07 }}
      animate={
        isExiting
          ? { opacity: 0, scale: 0.98, transition: { duration: 1.4, ease: [0.76, 0, 0.24, 1] } }
          : isActive
          ? { opacity: 1, scale: 1, transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] } }
          : { opacity: 0, scale: 1.07 }
      }
    >
      <video
        ref={ref}
        muted
        playsInline
        onEnded={onEnded}
        className="absolute inset-0 h-full w-full object-cover object-center rounded-[2rem] shadow-[0_20px_100px_rgba(0,0,0,0.8)] border border-white/10"
        style={{ transform: "scale(0.82)", transformOrigin: "center center" }}
      >
        <source src={slide.video} type="video/mp4" />
      </video>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN HERO
───────────────────────────────────────────── */
export default function Hero() {
  const [cur, setCur] = useState(0);
  const [exiting, setExiting] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [textOn, setTextOn] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback(
    (to?: number) => {
      if (busy) return;
      const next = to !== undefined ? to : (cur + 1) % slides.length;
      if (next === cur) return;

      if (timerRef.current) clearTimeout(timerRef.current);
      setBusy(true);
      setTextOn(false);

      setTimeout(() => {
        setExiting(cur);
        setCur(next);
        setTimeout(() => {
          setTextOn(true);
          setExiting(null);
          setBusy(false);
        }, 1100);
      }, 500);
    },
    [busy, cur]
  );

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => go(), FALLBACK_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [cur, go]);

  const s = slides[cur];
  const nextSlide = slides[(cur + 1) % slides.length];

  return (
    <>
      <Grain />

      <section
        className="relative w-full overflow-hidden"
        style={{
          height: "100svh",
          minHeight: 640,
          background: s?.bg ?? "#000",
          transition: "background 2s ease",
        }}
      >
        {/* ─── AMBIENT GLOW ─── */}
        <div
          className="absolute inset-0 pointer-events-none z-[1] transition-all duration-[2500ms]"
          style={{
            background: `radial-gradient(ellipse 70% 65% at 50% 100%, rgba(${s?.rgb ?? "0,0,0"}, 0.4) 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none z-[1] transition-all duration-[2500ms]"
          style={{
            background: `radial-gradient(ellipse 50% 50% at 12% 60%, rgba(${s?.rgb ?? "0,0,0"}, 0.22) 0%, transparent 65%)`,
          }}
        />

        {/* ─── VIDEO LAYERS ─── */}
        <div className="absolute inset-0 z-0">
          {slides.map((sl, i) => {
            if (i !== cur && i !== exiting) return null;
            return (
              <VideoLayer
                key={i}
                slide={sl}
                isActive={i === cur}
                isExiting={i === exiting}
                onEnded={go}
              />
            );
          })}
        </div>




        {/* ═══════════════════════════════════════
            BOTTOM CONTENT PANEL
        ═══════════════════════════════════════ */}
        <div className="absolute inset-x-0 bottom-0 z-20 px-5 md:px-10 lg:px-14 pb-10 md:pb-14">

          {/* ── Tag + Index ── */}
          <AnimatePresence mode="wait">
            {textOn && (
              <motion.div
                key={cur + "-meta"}
                className="mb-5 md:mb-6 flex flex-wrap items-center gap-3"
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay: 0.06 }}
                exit={{ opacity: 0, x: -10, transition: { duration: 0.22 } }}
              >
                {/* Glowing tag */}
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.48rem] uppercase tracking-[0.3em] text-white/80 font-sans"
                  style={{
                    background: `rgba(${s?.rgb ?? "255,255,255"}, 0.18)`,
                    border: `1px solid rgba(${s?.rgb ?? "255,255,255"}, 0.32)`,
                    backdropFilter: "blur(12px)",
                    boxShadow: `0 0 20px -6px rgba(${s?.rgb ?? "255,255,255"}, 0.4)`,
                  }}
                >
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: `rgb(${s?.rgb ?? "255,255,255"})` }}
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  {s?.tag}
                </span>

                <div className="w-6 h-px bg-white/15" />

                <span className="font-mono text-[0.45rem] text-white/28 tracking-[0.3em]">
                  {s?.index} / 0{slides.length}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Big Title ── */}
          <HeroTitle lines={s?.title ?? []} show={textOn} />

          {/* ── Glassmorphic content panel ── */}
          <AnimatePresence mode="wait">
            {textOn && (
              <motion.div
                key={cur + "-panel"}
                className="rounded-2xl md:rounded-3xl overflow-hidden"
                style={{
                  background: "rgba(0,0,0,0.32)",
                  backdropFilter: "blur(32px) saturate(160%)",
                  WebkitBackdropFilter: "blur(32px) saturate(160%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 -8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
                  maxWidth: 780,
                }}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{
                  opacity: 1, y: 0, filter: "blur(0px)",
                  transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.36 },
                }}
                exit={{ opacity: 0, y: 12, filter: "blur(8px)", transition: { duration: 0.3 } }}
              >
                {/* Top section: quote + description */}
                <div className="px-6 md:px-8 pt-5 md:pt-6 pb-4 md:pb-5">
                  {/* Quote */}
                  <p className="font-serif italic text-white/55 text-[0.9rem] md:text-[1rem] lg:text-[1.05rem] font-light leading-relaxed mb-3">
                    &ldquo;{s?.quote}&rdquo;
                  </p>

                  {/* Accent divider */}
                  <div
                    className="mb-4 h-px"
                    style={{
                      background: `linear-gradient(to right, rgba(${s?.rgb ?? "255,255,255"}, 0.5), rgba(255,255,255,0.07) 40%, transparent)`,
                    }}
                  />

                  {/* Description — full readable text */}
                  <p className="text-[0.8rem] md:text-[0.88rem] text-white/72 font-sans font-light leading-[1.85] max-w-lg">
                    {s?.description}
                  </p>
                </div>

                {/* Bottom section: detail + CTAs */}
                <div
                  className="px-6 md:px-8 py-4 md:py-5 flex flex-wrap items-center justify-between gap-4"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}
                >
                  {/* Detail spec */}
                  <p className="text-[0.52rem] uppercase tracking-[0.28em] text-white/35 font-sans">
                    {s?.detail}
                  </p>

                  {/* Buttons */}
                  <div className="flex items-center gap-3 flex-wrap">


                    {/* Text link */}
                    <a
                      href="#about"
                      className="text-[0.54rem] tracking-[0.22em] uppercase text-white/32 hover:text-white/65 transition-colors duration-400 border-b border-white/12 pb-px hover:border-white/35"
                    >
                      Our Story
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ─── RIGHT SIDE: vertical bar indicators ─── */}
        <div className="absolute right-4 md:right-7 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2.5">
          {slides.map((_, i) => (
            <button key={i} onClick={() => go(i)} aria-label={`Collection ${i + 1}`} className="py-0.5 px-1">
              <motion.span
                className="block rounded-full"
                animate={{
                  width: 1.5,
                  height: i === cur ? 32 : 10,
                  background: i === cur
                    ? "rgba(255,255,255,0.88)"
                    : "rgba(255,255,255,0.2)",
                }}
                whileHover={{ height: 18, background: "rgba(255,255,255,0.5)" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </button>
          ))}
        </div>

        {/* ─── BOTTOM dot indicators ─── */}
        <div className="absolute bottom-5 left-5 md:left-10 lg:left-14 z-30 flex items-center gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => go(i)} aria-label={`Slide ${i + 1}`}>
              <motion.span
                className="block rounded-full"
                animate={{
                  width: i === cur ? 24 : 5,
                  height: 4,
                  background: i === cur
                    ? `rgb(${s?.rgb ?? "255,255,255"})`
                    : "rgba(255,255,255,0.2)",
                }}
                whileHover={{ background: "rgba(255,255,255,0.5)" }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              />
            </button>
          ))}
        </div>

        {/* ─── BOTTOM RIGHT: next preview card ─── */}
        <motion.div
          className="absolute bottom-6 right-6 md:right-10 z-30 hidden md:block"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1 }}
        >
          <motion.button
            onClick={() => go()}
            className="group relative flex items-center justify-center overflow-hidden rounded-xl cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
            style={{ width: 150, height: 85 }}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.3 }}
          >
            {/* Next Video Preview */}
            <video
              key={nextSlide.video}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
            >
              <source src={nextSlide.video} type="video/mp4" />
            </video>

            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-70" />
            
            {/* Frosted Inner Border */}
            <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none group-hover:border-white/30 transition-colors duration-500" />
            
            {/* Text Overlay */}
            <div className="absolute bottom-3 left-4 flex flex-col items-start pointer-events-none drop-shadow-lg z-10">
               <span className="text-[0.4rem] uppercase tracking-[0.3em] text-white/70 font-sans mb-0.5">Up next</span>
               <span className="text-[0.55rem] text-white font-medium tracking-wide">{nextSlide?.title?.join(" ")}</span>
            </div>

            {/* Glowing Dot Indicator (like screenshot) */}
            <motion.div
              className="absolute bottom-3.5 right-3.5 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
              animate={{ opacity: [1, 0.4, 1], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.button>
        </motion.div>

        {/* ─── Scroll pulse ─── */}
        <motion.div
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.3 }}
        >
          <motion.div
            className="w-px h-8 rounded-full"
            style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)" }}
            animate={{ scaleY: [0, 1, 0], opacity: [0, 0.65, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
          />
          <span className="text-[0.36rem] tracking-[0.55em] uppercase text-white/18 font-sans">Scroll</span>
        </motion.div>

        {/* ─── Vertical brand text (right edge desktop) ─── */}
        <motion.div
          className="absolute right-14 md:right-[4.5rem] top-1/2 -translate-y-1/2 z-20 hidden lg:flex"
          animate={{ opacity: textOn ? 0.16 : 0 }}
          transition={{ duration: 0.8 }}
        >
          <span
            className="font-mono text-[0.35rem] uppercase tracking-[0.6em] text-white"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            {s?.title?.join(" ")} · Tryb Fusyon
          </span>
        </motion.div>
      </section>
    </>
  );
}

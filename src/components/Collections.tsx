"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CollectionModal from "./CollectionModal";

const collections = [
  { tag: "Womenswear", name: "Emerald Grace", video: "/videos/green-dress-lady.mp4",
    desc: "An ode to feminine power and natural brilliance. The Emerald Grace moves like water — fluid, magnetic, impossible to ignore. Cut from a single bolt of hand-loomed silk-cotton blend.",
    detail: "Silk-Cotton Blend · Hand-beaded Neckline", index: "01", accent: "6, 78, 59" },
  { tag: "Heritage Edition", name: "The Indigo Royale", video: "/videos/blue-adire.mp4",
    desc: "Steeped in the centuries-old craft of Adire indigo dyeing, this piece transforms tradition into an unmistakable statement of power. Each fold carries the mastery of generations — hand-crafted in Lagos.",
    detail: "Hand-dyed Adire Cotton · Resist-dye Batik", index: "02", accent: "30, 58, 138" },
  { tag: "Utility Series", name: "Adire Cargo Set", video: "/videos/brown-male.mp4",
    desc: "A masterclass in functional elegance. Featuring hand-dyed Earth Adire motifs across a relaxed utility silhouette. Engineered with premium cotton and finished with matte black hardware for the modern journey.",
    detail: "Earth Adire · Relaxed Utility Fit", index: "03", accent: "158, 107, 82" },
  { tag: "Atelier Reserve", name: "Azure Sweep", video: "/videos/blue-long-adire.mp4",
    desc: "This floor-sweeping silhouette commands every room it enters. Woven from the finest sky-blue Adire cloth, the Azure Sweep redefines the boundary between ceremonial and contemporary.",
    detail: "Premium Adire Linen · Floor-length Agbada", index: "04", accent: "2, 44, 80" },
  { tag: "Earth Series", name: "Earthly Elegance", video: "/videos/brown-adire.mp4",
    desc: "Rich terracotta and sun-baked cocoa tones collide in a celebration of West African earth — grounded in nature, elevated through precision tailoring and hand-embroidered 24k gold threadwork.",
    detail: "Terracotta Adire · 24k Gold Embroidery", index: "05", accent: "120, 53, 15" },
  { tag: "Power Dressing", name: "Forest Authority", video: "/videos/green-jacket.mp4",
    desc: "Precision-tailored for the man who understands that clothing is architecture for the body. Full canvas Italian wool construction with silk jacquard lining — a garment that speaks first.",
    detail: "Italian Wool-blend · Full Canvas Construction", index: "06", accent: "20, 83, 45" },
  { tag: "Studio Series", name: "Architectural Precision", video: "/videos/technical-flats.mp4",
    desc: "Every masterpiece begins here, in the quiet discipline of the atelier. Each line a decision, each measurement a commitment to perfection — this is where Tryb Fusyon begins.",
    detail: "Hand-drafted Patterns · 3-phase Quality Review", index: "07", accent: "80, 80, 95" },
];

/* ─────────────────────────────────────────
   Eased scroll helper — slow, cinematic glide
───────────────────────────────────────── */
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function smoothScrollTo(el: HTMLElement, target: number, duration = 1100) {
  const start = el.scrollLeft;
  const change = target - start;
  const startTime = performance.now();
  function tick(now: number) {
    const elapsed = now - startTime;
    const t = Math.min(1, elapsed / duration);
    el.scrollLeft = start + change * easeInOutCubic(t);
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ─────────────────────────────────────────
   CARD — coverflow tilt/scale/fade driven
   purely by distance from the active index
───────────────────────────────────────── */
function Card({
  item,
  index,
  activeIndex,
  onClick,
}: {
  item: (typeof collections)[0];
  index: number;
  activeIndex: number;
  onClick: () => void;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const offset = index - activeIndex;
  const isActive = offset === 0;
  const isNear = Math.abs(offset) <= 1; // Load only current and adjacent
  const abs = Math.abs(offset);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isActive) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isActive]);

  const rotateY = Math.max(-38, Math.min(38, offset * -16));
  const scale = isActive ? 1.08 : Math.max(0.78, 1 - abs * 0.09);
  const opacity = Math.max(0.28, 1 - abs * 0.22);
  const z = 50 - abs;

  return (
    <motion.div
      className="relative flex-shrink-0 snap-center cursor-pointer"
      style={{ width: "clamp(190px, 18vw, 290px)", zIndex: z }}
      animate={{ rotateY, scale, opacity }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      onClick={onClick}
    >
      <div
        className="relative overflow-hidden rounded-[1.4rem] md:rounded-[1.6rem]"
        style={{
          height: "clamp(260px, 44vh, 420px)",
          boxShadow: isActive
            ? `0 26px 65px -18px rgba(${item.accent}, 0.55)`
            : "0 14px 32px -20px rgba(0,0,0,0.6)",
          transition: "box-shadow 0.7s ease",
          background: "#050505",
        }}
      >
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/40">
            <motion.div
              className="w-8 h-8 border border-white/20 border-t-white/70 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        )}
        {/* Only render src if it's near to save bandwidth */}
        <video
          ref={videoRef}
          src={isNear ? item.video : undefined}
          loop
          muted
          playsInline
          preload={isActive ? "auto" : "none"}
          onLoadedData={() => setIsLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{
            filter: isActive ? "brightness(0.85)" : "brightness(0.55)",
            transition: "filter 0.9s ease, opacity 0.7s ease",
            opacity: isLoaded ? 1 : 0,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-black/10" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 85% 55% at 50% 115%, rgba(${item.accent}, 0.5) 0%, transparent 65%)`,
            opacity: isActive ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        />
        <div
          className="absolute inset-[8px] rounded-[1.15rem] md:rounded-[1.35rem] pointer-events-none"
          style={{
            border: isActive ? `1px solid rgba(${item.accent}, 0.55)` : "1px solid rgba(255,255,255,0.08)",
            transition: "border-color 0.6s ease",
          }}
        />

        <div className="absolute top-5 right-5 flex items-baseline gap-1 font-mono">
          <span className="text-[0.55rem] tracking-[0.28em]" style={{ color: isActive ? `rgb(${item.accent})` : "rgba(255,255,255,0.3)", transition: "color 0.5s ease" }}>
            {item.index}
          </span>
          <span className="text-[0.42rem] tracking-[0.28em] text-white/90">/0{collections.length}</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6" style={{ opacity: isActive ? 1 : 0.7, transition: "opacity 0.6s ease" }}>
          <span className="block text-[0.4rem] uppercase tracking-[0.36em] text-white/90 mb-1.5">{item.tag}</span>
          <h3 className="font-serif font-light text-lg md:text-xl text-white leading-tight tracking-tight">{item.name}</h3>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   SECTION
───────────────────────────────────────── */
export default function Collections() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const isAutoScrolling = useRef(false);

  const scrollToCard = useCallback((i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const cards = Array.from(el.children[0]?.children ?? []) as HTMLElement[];
    const card = cards[i];
    if (!card) return;
    isAutoScrolling.current = true;
    smoothScrollTo(el, card.offsetLeft - (el.clientWidth - card.clientWidth) / 2, 1100);
    setActiveIndex(i);
    window.setTimeout(() => { isAutoScrolling.current = false; }, 1150);
  }, []);

  const scrollByCard = (dir: 1 | -1) => {
    const next = Math.min(collections.length - 1, Math.max(0, activeIndex + dir));
    scrollToCard(next);
  };

  // Slow auto-advance, pauses on hover / touch / when a card is clicked
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startAuto = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % collections.length;
        scrollToCard(next);
        return next;
      });
    }, 5200);
  }, [scrollToCard]);
  const stopAuto = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [startAuto, stopAuto]);

  // Keep activeIndex in sync if the user manually drags/scrolls the track
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      if (isAutoScrolling.current) return;
      const cards = Array.from(el.children[0]?.children ?? []) as HTMLElement[];
      const center = el.scrollLeft + el.clientWidth / 2;
      let closest = 0;
      let closestDist = Infinity;
      cards.forEach((c, i) => {
        const dist = Math.abs(c.offsetLeft + c.clientWidth / 2 - center);
        if (dist < closestDist) { closestDist = dist; closest = i; }
      });
      setActiveIndex(closest);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const active = collections[activeIndex];

  return (
    <section
      id="collections"
      className="relative bg-[#010101] py-24 md:py-32 overflow-hidden"
      onMouseEnter={stopAuto}
      onMouseLeave={startAuto}
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
      <motion.div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 55% 35% at 50% 0%, rgba(${active.accent}, 0.16) 0%, transparent 70%)`,
        transition: "background 1s ease" }} />

      <div className="relative z-20 flex items-end justify-between px-6 md:px-14 lg:px-20 mb-12 md:mb-16">
        <div>
          <div className="flex items-center gap-4 mb-3">
            <div className="w-10 h-px bg-white/20" />
            <span className="text-[0.46rem] uppercase tracking-[0.44em] text-white/90 font-sans">The Archives</span>
          </div>
          <h2 className="font-serif font-extralight text-white tracking-[-0.025em] leading-none" style={{ fontSize: "clamp(2rem, 4.2vw, 4.2rem)" }}>
            Featured <em className="italic font-light text-white/90">Collections</em>
          </h2>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <span className="font-mono text-[0.6rem] tracking-[0.3em] text-white/90">
            {active.index}<span className="text-white/90"> / 0{collections.length}</span>
          </span>
          <div className="flex items-center gap-2">
            <button onClick={() => scrollByCard(-1)} aria-label="Previous" disabled={activeIndex === 0}
              className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/90 hover:text-white hover:border-white/40 transition-colors disabled:opacity-30">
              <svg className="w-3.5 h-3.5" viewBox="0 0 10 10" fill="none"><path d="M9 5H1M4 2L1 5l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button onClick={() => scrollByCard(1)} aria-label="Next" disabled={activeIndex === collections.length - 1}
              className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/90 hover:text-white hover:border-white/40 transition-colors disabled:opacity-30">
              <svg className="w-3.5 h-3.5" viewBox="0 0 10 10" fill="none"><path d="M1 5h8M6 2l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Coverflow track — perspective lives here so rotateY reads as real 3D */}
      <div
        ref={trackRef}
        className="relative z-10 flex overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", paddingLeft: "clamp(1.5rem, 6vw, 5rem)", paddingRight: "clamp(1.5rem, 6vw, 5rem)" }}
      >
        <div className="flex gap-6 md:gap-10 items-center" style={{ perspective: "1400px" }}>
          {collections.map((item, index) => (
            <Card
              key={item.name}
              item={item}
              index={index}
              activeIndex={activeIndex}
              onClick={() => { scrollToCard(index); setModalIndex(index); }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-20 flex items-center justify-center gap-2.5 mt-12">
        {collections.map((c, i) => (
          <button key={i} onClick={() => scrollToCard(i)} aria-label={`Jump to ${c.name}`} className="py-2 cursor-pointer">
            <div className="h-[2px] rounded-full transition-all duration-500 ease-out" style={{
              width: i === activeIndex ? 26 : 12,
              background: i === activeIndex ? `rgb(${c.accent})` : "rgba(255,255,255,0.22)" }} />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {modalIndex !== null && (
          <CollectionModal item={collections[modalIndex]} onClose={() => setModalIndex(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const offset = index - activeIndex;
  const isActive = offset === 0;
  const abs = Math.abs(offset);

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
        }}
      >
        <video
          src={item.video}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: isActive ? "brightness(0.85)" : "brightness(0.55)",
            transition: "filter 0.9s ease",
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
          <span className="text-[0.42rem] tracking-[0.28em] text-white/20">/0{collections.length}</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6" style={{ opacity: isActive ? 1 : 0.7, transition: "opacity 0.6s ease" }}>
          <span className="block text-[0.4rem] uppercase tracking-[0.36em] text-white/40 mb-1.5">{item.tag}</span>
          <h3 className="font-serif font-light text-lg md:text-xl text-white leading-tight tracking-tight">{item.name}</h3>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   MODAL — glassmorphic lightbox on click
───────────────────────────────────────── */
function CollectionModal({ item, onClose }: { item: (typeof collections)[0]; onClose: () => void }) {
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
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-2xl" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 60% 45% at 50% 40%, rgba(${item.accent}, 0.22) 0%, transparent 70%)` }}
      />

      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-7 right-7 md:top-10 md:right-10 z-20 w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
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
        className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative overflow-hidden rounded-[1.75rem] md:rounded-[2rem] flex-shrink-0 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
          style={{ width: "clamp(260px, 34vw, 440px)", height: "clamp(340px, 58vh, 560px)" }}
        >
          <video src={item.video} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div
            className="absolute inset-[9px] rounded-[1.5rem] md:rounded-[1.7rem] pointer-events-none"
            style={{ border: `1px solid rgba(${item.accent}, 0.5)` }}
          />
        </div>

        <div
          className="rounded-[1.4rem] p-7 md:p-9 flex flex-col gap-5 shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
          style={{
            width: "clamp(260px, 30vw, 380px)",
            background: "rgba(6, 6, 6, 0.72)",
            backdropFilter: "blur(28px) saturate(160%)",
            border: "1px solid rgba(255,255,255,0.09)",
          }}
        >
          <span className="text-[0.44rem] uppercase tracking-[0.4em] text-white/40 font-sans">{item.tag}</span>

          <div className="flex items-center gap-4">
            <div className="w-9 h-px" style={{ background: `rgba(${item.accent}, 0.7)` }} />
            <h4 className="font-serif italic font-light text-2xl md:text-[1.9rem] text-white tracking-wide">{item.name}</h4>
          </div>

          <p className="text-[0.8rem] text-white/65 font-sans font-light leading-[1.85]">{item.desc}</p>

          <div className="flex items-center gap-4 pt-1">
            <div className="w-9 h-px bg-white/15" />
            <span className="text-[0.46rem] uppercase tracking-[0.28em] text-white/45 font-sans">{item.detail}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-9 h-px bg-white/5" />
            <span className="text-[0.46rem] uppercase tracking-[0.28em] text-white/30 font-sans">Lagos, Nigeria · 2026</span>
          </div>

          <a
            href="#bespoke"
            onClick={onClose}
            className="mt-2 inline-flex items-center gap-2 group/cta"
          >
            <span className="text-[0.5rem] uppercase tracking-[0.3em] text-white/75 group-hover/cta:text-white transition-colors duration-300">
              Inquire About This Piece
            </span>
            <svg className="w-3 h-3 opacity-60 group-hover/cta:translate-x-1 transition-transform duration-300" viewBox="0 0 10 10" fill="none">
              <path d="M1 5h8M6 2l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </motion.div>

      <button
        onClick={onClose}
        className="absolute bottom-9 left-1/2 -translate-x-1/2 z-10 px-6 py-2.5 rounded-full text-[0.6rem] uppercase tracking-[0.28em] text-white/70 hover:text-white transition-colors"
        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(12px)" }}
      >
        See All Collections
      </button>
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
            <span className="text-[0.46rem] uppercase tracking-[0.44em] text-white/40 font-sans">The Archives</span>
          </div>
          <h2 className="font-serif font-extralight text-white tracking-[-0.025em] leading-none" style={{ fontSize: "clamp(2rem, 4.2vw, 4.2rem)" }}>
            Featured <em className="italic font-light text-white/30">Collections</em>
          </h2>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <span className="font-mono text-[0.6rem] tracking-[0.3em] text-white/50">
            {active.index}<span className="text-white/20"> / 0{collections.length}</span>
          </span>
          <div className="flex items-center gap-2">
            <button onClick={() => scrollByCard(-1)} aria-label="Previous" disabled={activeIndex === 0}
              className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors disabled:opacity-30">
              <svg className="w-3.5 h-3.5" viewBox="0 0 10 10" fill="none"><path d="M9 5H1M4 2L1 5l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button onClick={() => scrollByCard(1)} aria-label="Next" disabled={activeIndex === collections.length - 1}
              className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors disabled:opacity-30">
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
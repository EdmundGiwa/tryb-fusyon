"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    video: "/videos/blue-adire.mp4",
    title: "The Indigo Royale",
    description:
      "Deep hues of traditional Adire crafted into a modern masterpiece. A statement of heritage and bold elegance.",
    accent: "from-blue-900/80",
  },
  {
    video: "/videos/blue-long-adire.mp4",
    title: "Azure Sweep",
    description:
      "Flowing lines and intricate patterns. This long silhouette commands attention in every room.",
    accent: "from-sky-900/80",
  },
  {
    video: "/videos/brown-adire.mp4",
    title: "Earthly Elegance",
    description:
      "Rich terracotta and cocoa tones blended perfectly. The true essence of grounded sophistication.",
    accent: "from-amber-900/80",
  },
  {
    video: "/videos/green-dress-lady.mp4",
    title: "Emerald Grace",
    description:
      "A silhouette that dances with the wind. The emerald dress brings nature's brilliance to life.",
    accent: "from-emerald-900/80",
  },
  {
    video: "/videos/green-jacket.mp4",
    title: "Forest Authority",
    description:
      "Tailored to perfection. The green jacket merges formal structure with contemporary flair.",
    accent: "from-green-950/80",
  },
  {
    video: "/videos/technical-flats.mp4",
    title: "Architectural Precision",
    description:
      "Every seam meticulously planned. The foundation of modern Yoruba couture.",
    accent: "from-zinc-900/80",
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 8000); // Change every 8 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Navbar overlaying the hero */}
      <header className="absolute inset-x-0 top-0 z-50 p-6 lg:px-12 flex justify-between items-center bg-transparent">
        <a className="flex flex-col leading-none" href="/">
          <span className="font-serif text-xl md:text-3xl tracking-[0.25em] font-medium text-white">
            TRYB FUSYON
          </span>
          <span className="mt-1 text-[0.55rem] md:text-[0.6rem] uppercase tracking-[0.35em] text-white/50">
            Heritage Couture
          </span>
        </a>
        <nav className="hidden md:flex gap-10">
          {["Collections", "About", "Services", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium tracking-widest uppercase text-white/70 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>
      </header>

      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover object-center"
          >
            <source src={slides[currentIndex].video} type="video/mp4" />
          </video>
          
          {/* Blend Gradients */}
          <div className="absolute inset-0 bg-black/20" />
          <div
            className={`pointer-events-none absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t ${slides[currentIndex].accent} via-black/50 to-transparent`}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex items-end justify-start px-6 pt-12 pb-16 md:p-12 lg:p-24 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="max-w-2xl"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-white/70 mb-4 font-sans">
              Collection No. {currentIndex + 1}
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1] tracking-tight text-white">
              {slides[currentIndex].title}
            </h1>
            <p className="mt-6 text-base md:text-lg text-white/80 max-w-lg font-sans font-light leading-relaxed">
              {slides[currentIndex].description}
            </p>
            <div className="mt-10 flex gap-4">
              <a href="#collections">
                <span className="group relative inline-flex rounded-full p-px bg-gradient-to-tr from-white/30 via-white/5 to-white/30">
                  <span className="relative inline-flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md px-8 py-4 text-sm font-medium tracking-wider uppercase text-white transition-colors duration-300 group-hover:bg-white/10">
                    Discover More
                  </span>
                </span>
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Indicators */}
      <div className="absolute right-6 bottom-16 md:right-12 md:bottom-24 z-20 flex flex-col gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className="group py-2 px-1 relative flex items-center justify-center"
          >
            <span
              className={`block w-1 transition-all duration-500 ease-out ${
                idx === currentIndex
                  ? "h-12 bg-white"
                  : "h-3 bg-white/30 group-hover:bg-white/60 group-hover:h-6"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

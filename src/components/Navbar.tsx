"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(1, 12, 5, 0.65)"]
  );
  
  const navBackdropFilter = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(24px) saturate(180%)"]
  );

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 px-5 md:px-10 lg:px-14 flex items-center justify-between transition-colors duration-500"
      style={{ 
        height: 90,
        background: navBackground,
        backdropFilter: navBackdropFilter,
        WebkitBackdropFilter: navBackdropFilter,
        borderBottom: isScrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent"
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Logo */}
      <a href="/" className="group flex flex-col leading-none z-10">
        <span className="font-serif text-[1.1rem] md:text-[1.3rem] tracking-[0.32em] font-bold text-white transition-opacity duration-500">
          TRYB FUSYON
        </span>
        <span className="text-[0.4rem] uppercase tracking-[0.55em] text-white/30 mt-0.5 font-sans">
          Heritage Couture · Lagos
        </span>
      </a>

      {/* Glassmorphic center nav pill */}
      <nav
        className="hidden md:flex items-center gap-1 rounded-full px-2 py-2 transition-all duration-500"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(28px) saturate(160%)",
          WebkitBackdropFilter: "blur(28px) saturate(160%)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {["Philosophy", "Collections", "Craftsmanship", "Bespoke"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="relative px-4 py-1.5 text-[0.58rem] uppercase tracking-[0.18em] text-white/50 hover:text-white/90 transition-colors duration-400 rounded-full hover:bg-white/5 font-sans"
          >
            {item}
          </a>
        ))}
      </nav>

      {/* Order CTA — gradient border pill */}
      <a href="#bespoke" className="z-10 group">
        <motion.span
          className="relative inline-flex items-center gap-2 rounded-full px-5 md:px-6 py-2.5 md:py-3 text-[0.58rem] md:text-[0.6rem] font-sans font-medium tracking-[0.22em] uppercase text-white overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
            border: "1px solid rgba(255,255,255,0.2)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            boxShadow: "0 0 28px -6px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.1)",
            transition: "box-shadow 0.6s ease, background 0.6s ease, border-color 0.6s ease",
          }}
          whileHover={{ scale: 1.04, filter: "brightness(1.2)" }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.18 }}
        >
          <span className="hidden md:inline">Order Bespoke</span>
          <span className="md:hidden">Order</span>
          <svg className="w-2.5 h-2.5 opacity-60" viewBox="0 0 10 10" fill="none">
            <path d="M1 5h8M6 2l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.span>
      </a>
    </motion.header>
  );
}

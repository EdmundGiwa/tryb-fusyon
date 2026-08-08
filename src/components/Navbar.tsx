"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const navLinks = ["Philosophy", "Collections", "Craftsmanship", "Gallery", "Bespoke"];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

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
    <>
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
        <a href="/" className="group flex flex-col leading-none z-10" onClick={() => setMobileMenuOpen(false)}>
          <span className="font-serif text-[1.1rem] md:text-[1.3rem] tracking-[0.32em] font-bold text-white transition-opacity duration-500">
            TRYB FUSYON
          </span>
          <span className="text-[0.4rem] uppercase tracking-[0.55em] text-white/90 mt-0.5 font-sans">
            Heritage Couture · Lagos
          </span>
        </a>

        {/* Desktop: Glassmorphic center nav pill */}
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
          {navLinks.map((item) => (
            <a
              key={item}
              href={item === "Gallery" ? "/gallery" : `/#${item.toLowerCase()}`}
              className="relative px-4 py-1.5 text-[0.58rem] uppercase tracking-[0.18em] text-white/90 hover:text-white/90 transition-colors duration-400 rounded-full hover:bg-white/5 font-sans"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 z-10">
          {/* Order CTA — gradient border pill */}
          <a href="/#bespoke" className="group hidden md:block" onClick={() => setMobileMenuOpen(false)}>
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

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <div className="flex flex-col gap-1.5 items-center justify-center">
              <motion.div animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="w-4 h-[1px] bg-white transition-transform origin-center" />
              <motion.div animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }} className="w-4 h-[1px] bg-white" />
              <motion.div animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="w-4 h-[1px] bg-white transition-transform origin-center" />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#0a0807]/95 backdrop-blur-3xl flex flex-col items-center justify-center px-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="flex flex-col items-center gap-8 text-center w-full max-w-sm mt-10">
              {navLinks.map((item, i) => (
                <motion.a
                  key={item}
                  href={item === "Gallery" ? "/gallery" : `/#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                  className="text-2xl font-serif tracking-widest text-[#E5D5C5] hover:text-white transition-colors uppercase w-full py-2 border-b border-white/10"
                >
                  {item}
                </motion.a>
              ))}
            </nav>
            
            <motion.div 
              className="mt-16 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.4em] text-[#A38A6B]">
                Lagos · Nigeria
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

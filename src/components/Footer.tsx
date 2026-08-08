"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#020202] text-white pt-32 pb-12 px-6 md:px-12 lg:px-20 border-t border-white/5 overflow-hidden">
      
      {/* Background Graphic */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.02]">
        <h1 className="font-serif font-bold text-[25vw] leading-none whitespace-nowrap select-none">FUSYON</h1>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 lg:gap-16">
        
        {/* Brand Col */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-1 flex flex-col gap-6"
        >
          <a href="/" className="group flex flex-col leading-none w-fit">
            <span className="font-serif text-[1.4rem] tracking-[0.32em] font-bold text-white transition-opacity duration-500">
              TRYB FUSYON
            </span>
            <span className="text-[0.45rem] uppercase tracking-[0.55em] text-white/90 mt-2 font-sans">
              Heritage Couture · Lagos
            </span>
          </a>
          <p className="text-[0.8rem] text-white/90 font-sans font-light max-w-xs mt-2 leading-[1.8]">
            Bridging centuries of Adire craftsmanship with modern architectural tailoring. Designed and handcrafted in Lagos, Nigeria.
          </p>
        </motion.div>

        {/* Links Col 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-1 flex flex-col gap-5"
        >
          <span className="text-[0.55rem] uppercase tracking-[0.3em] text-white/90 mb-2">Explore</span>
          {["Philosophy", "Collections", "Craftsmanship", "Atelier"].map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-[0.85rem] text-white/90 hover:text-white transition-colors w-fit group flex items-center gap-3">
              <span className="w-0 h-[1px] bg-white/40 transition-all duration-300 group-hover:w-4" />
              {link}
            </a>
          ))}
        </motion.div>

        {/* Links Col 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-1 flex flex-col gap-5"
        >
          <span className="text-[0.55rem] uppercase tracking-[0.3em] text-white/90 mb-2">Legal</span>
          {["Privacy Policy", "Terms of Service", "Shipping & Returns", "Care Guide"].map((link) => (
            <a key={link} href="#" className="text-[0.85rem] text-white/90 hover:text-white transition-colors w-fit group flex items-center gap-3">
              <span className="w-0 h-[1px] bg-white/40 transition-all duration-300 group-hover:w-4" />
              {link}
            </a>
          ))}
        </motion.div>

        {/* Newsletter Col */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-1 flex flex-col gap-5"
        >
          <span className="text-[0.55rem] uppercase tracking-[0.3em] text-white/90 mb-2">The List</span>
          <p className="text-[0.8rem] text-white/90 font-sans font-light leading-[1.8]">
            Subscribe to receive invitations to private views and exclusive collection releases.
          </p>
          <form className="mt-4 flex items-center border-b border-white/15 pb-3 focus-within:border-white/60 transition-colors group">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="bg-transparent text-[0.85rem] text-white placeholder-white/30 focus:outline-none w-full"
            />
            <button type="button" className="text-[0.55rem] uppercase tracking-[0.2em] text-white/90 group-hover:text-white transition-colors ml-4 flex items-center gap-2">
              Join
            </button>
          </form>
        </motion.div>

      </div>

      {/* Bottom Bar */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="relative z-10 max-w-[1400px] mx-auto mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <p className="text-[0.65rem] text-white/90 uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} Tryb Fusyon. All Rights Reserved.
        </p>
        <div className="flex items-center gap-8">
          {["Instagram", "Twitter", "Pinterest"].map((social) => (
            <a key={social} href="#" className="text-[0.65rem] uppercase tracking-[0.2em] text-white/90 hover:text-white transition-colors">
              {social}
            </a>
          ))}
        </div>
      </motion.div>

    </footer>
  );
}

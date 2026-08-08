"use client";

import { useRef, useEffect, useState } from "react";
import { useInView, motion } from "framer-motion";

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

export default function LazyVideo({ src, className, style, ...props }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { margin: "200px 0px" });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    
    if (isInView) {
      const playPromise = ref.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      ref.current.pause();
    }
  }, [isInView]);

  return (
    <div className={`relative ${className || ""}`} style={style}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/40">
          <motion.div
            className="w-8 h-8 border border-white/20 border-t-white/70 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}
      <video
        ref={ref}
        src={src}
        muted
        loop
        playsInline
        preload={isInView ? "auto" : "none"}
        onLoadedData={() => setIsLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        style={{ opacity: isLoaded ? 1 : 0 }}
        {...props}
        autoPlay={false}
      />
    </div>
  );
}

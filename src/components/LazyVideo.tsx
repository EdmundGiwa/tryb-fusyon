"use client";

import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

export default function LazyVideo({ src, ...props }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { margin: "200px 0px" }); // Preload a bit before it enters the viewport

  useEffect(() => {
    if (!ref.current) return;
    
    // Play when in view, pause when out of view to save GPU and battery
    if (isInView) {
      // Small timeout ensures the video is ready to play
      const playPromise = ref.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play was prevented
        });
      }
    } else {
      ref.current.pause();
    }
  }, [isInView]);

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      {...props}
      autoPlay={false} // We handle autoplay manually
    />
  );
}

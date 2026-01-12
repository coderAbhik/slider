// components/SlideDeck.tsx
"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Play, Pause, Home as HomeIcon } from "lucide-react";

const TOTAL_SLIDES = 10;
const SLIDES = Array.from({ length: TOTAL_SLIDES }, (_, i) => i + 1);

export default function SlideDeck() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- AUTO PLAY LOGIC ---
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let animationFrameId: number;

    const autoScroll = () => {
      // "2" is the speed. Increase for faster, decrease for slower.
      window.scrollBy({ top: 2, behavior: "auto" });

      // Stop if we reach bottom
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        setIsPlaying(false);
      } else {
        animationFrameId = requestAnimationFrame(autoScroll);
      }
    };

    if (isPlaying) {
      animationFrameId = requestAnimationFrame(autoScroll);
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying]);

  const scrollToTop = () => {
    setIsPlaying(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="bg-black relative">
      {SLIDES.map((slide, index) => (
        <Card
          key={slide}
          index={index}
          total={TOTAL_SLIDES}
          globalProgress={scrollYProgress}
        />
      ))}

      {/* --- CONTROL BAR --- */}
      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-6 py-3 bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <button
          onClick={scrollToTop}
          className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"
          title="Back to Top"
        >
          <HomeIcon size={20} />
        </button>

        <div className="w-px h-4 bg-white/20" />

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full hover:bg-neutral-200 transition-colors font-medium text-sm tracking-wide"
        >
          {isPlaying ? (
            <>
              <Pause size={16} className="fill-current" />
              <span>PAUSE</span>
            </>
          ) : (
            <>
              <Play size={16} className="fill-current" />
              <span>AUTO PLAY</span>
            </>
          )}
        </button>
      </motion.div>

      {/* Progress Line */}
      <motion.div
        className="fixed bottom-0 left-0 h-1.5 bg-white z-50 origin-left mix-blend-difference"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}

function Card({
  index,
  total,
  globalProgress
}: {
  index: number;
  total: number;
  globalProgress: MotionValue<number>;
}) {
  const step = 1 / total;
  const startOfNext = (index + 1) * step;

  // Scale down from 1 to 0.9 as the *next* slides come in
  const scale = useTransform(globalProgress, [startOfNext, 1], [1, 0.9]);
  const opacity = useTransform(globalProgress, [startOfNext, 1], [1, 0.4]);

  return (
    <div
      className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        className="relative w-full h-full bg-black flex items-center justify-center shadow-2xl"
        style={{
          scale: index === total - 1 ? 1 : scale,
          opacity: index === total - 1 ? 1 : opacity
        }}
      >
         <div className="relative w-full h-full md:w-[95%] md:h-[95%] bg-neutral-900 md:rounded-3xl overflow-hidden border border-white/10">
            <Image
              src={`/slides/slides${index + 1}.jpg`}
              alt={`Slide ${index + 1}`}
              fill
              className="object-contain"
              priority={index < 2}
              quality={90}
            />

            <div className="absolute top-8 left-8 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white font-mono text-xs z-20">
              SLIDE 0{index + 1}
            </div>
         </div>
      </motion.div>
    </div>
  );
}
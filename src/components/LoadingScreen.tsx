import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WORDS = ["Design", "Create", "Inspire"];

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [exiting, setExiting] = useState(false);
  const startTime = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const wordInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    wordInterval.current = setInterval(() => {
      setWordIndex((i) => (i + 1) % WORDS.length);
    }, 900);

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / 2700, 1);
      const eased =
        progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress;
      const newCount = Math.floor(eased * 100);
      setCount(newCount);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(100);
        if (!completedRef.current) {
          completedRef.current = true;
          setTimeout(() => {
            setExiting(true);
            setTimeout(() => onComplete(), 500);
          }, 300);
        }
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (wordInterval.current) clearInterval(wordInterval.current);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-bg flex flex-col"
      style={{
        transition: "opacity 0.5s ease, transform 0.5s ease",
        opacity: exiting ? 0 : 1,
        transform: exiting ? "translateY(-20px)" : "translateY(0)",
        pointerEvents: exiting ? "none" : "auto",
      }}
    >
      {/* Top-left label */}
      <div className="absolute top-8 left-8 text-xs text-muted uppercase tracking-[0.3em]">
        Portfolio
      </div>

      {/* Center rotating words */}
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80 select-none"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Bottom-right counter */}
      <div className="absolute bottom-16 right-8">
        <span className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums counter-font">
          {String(count).padStart(3, "0")}
        </span>
      </div>

      {/* Bottom progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-stroke/50">
        <div
          className="h-full accent-gradient origin-left"
          style={{
            transform: `scaleX(${count / 100})`,
            boxShadow: "0 0 8px rgba(137, 170, 204, 0.35)",
            transformOrigin: "left",
          }}
        />
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WORDS = [
  "Оптовые цены",
  "Ростовки 16–37",
  "Отгрузка за 24ч",
  "Доставка по РФ",
];

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  const startTime = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const completedRef = useRef(false);

  // Map current count (0-100) exactly to 4 word indices without loop or repetition
  const wordIndex = Math.min(
    Math.floor((count / 100) * WORDS.length),
    WORDS.length - 1
  );

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      // Increased total duration to 4400ms (~1.1 seconds per word) for smooth, elegant transitions
      const progress = Math.min(elapsed / 4400, 1);
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
            setTimeout(() => onComplete(), 600);
          }, 400);
        }
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-bg flex flex-col"
      style={{
        transition: "opacity 0.6s ease, transform 0.6s ease",
        opacity: exiting ? 0 : 1,
        transform: exiting ? "translateY(-20px)" : "translateY(0)",
        pointerEvents: exiting ? "none" : "auto",
      }}
    >
      {/* Top-left label */}
      <div className="absolute top-8 left-8 text-xs text-muted uppercase tracking-[0.3em] font-semibold">
        Корона и Карусель
      </div>

      {/* Center rotating words synchronized smoothly with count 0-100 */}
      <div className="flex-1 flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            className="text-3xl sm:text-5xl md:text-7xl font-display italic text-text-primary select-none text-center block font-semibold"
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
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
          className="h-full accent-gradient origin-left transition-transform duration-100 ease-out"
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

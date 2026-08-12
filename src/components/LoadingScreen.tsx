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
  const [wordIndex, setWordIndex] = useState(0);
  const [exiting, setExiting] = useState(false);
  const startTime = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const completedRef = useRef(false);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const TOTAL_DURATION = 4400; // 4.4 seconds total duration
      const linearProgress = Math.min(elapsed / TOTAL_DURATION, 1);

      // Linear count for perfectly uniform counter progression
      const newCount = Math.floor(linearProgress * 100);
      setCount(newCount);

      // 100% UNIFORM word index mapping: exactly 25% (1.1s) allocated to EACH word
      const currentWordIdx = Math.min(
        Math.floor(linearProgress * WORDS.length),
        WORDS.length - 1
      );
      setWordIndex(currentWordIdx);

      if (linearProgress < 1) {
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
      <div className="absolute top-8 left-8 text-xs text-muted uppercase tracking-[0.3em] font-semibold">
        Корона и Карусель
      </div>

      {/* Center rotating words synchronized 100% UNIFORMLY with linear time (1.1s per word) */}
      <div className="flex-1 flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            className="text-3xl sm:text-5xl md:text-7xl font-display italic text-text-primary select-none text-center block font-semibold"
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
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

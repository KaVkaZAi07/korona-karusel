import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function ThemeTogglePill() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      id="theme-toggle-3d-pill"
      onClick={toggleTheme}
      className={`group relative flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border transition-all duration-500 focus:outline-none cursor-pointer select-none shadow-lg ${
        isDark
          ? "bg-indigo-950/80 border-indigo-500/40 text-indigo-200 shadow-indigo-950/50 hover:border-indigo-400"
          : "bg-amber-100/90 border-amber-400/50 text-amber-900 shadow-amber-200/50 hover:border-amber-500"
      }`}
      title={isDark ? "Переключить на Дневной режим (День)" : "Переключить на Ночной режим (Ночь)"}
      aria-label="Switch Theme Day Night"
    >
      {/* Dynamic 3D Track background glow */}
      <span
        className={`absolute inset-0 rounded-full opacity-30 blur-sm transition-opacity duration-500 ${
          isDark ? "bg-indigo-500 group-hover:opacity-60" : "bg-amber-400 group-hover:opacity-70"
        }`}
      />

      {/* Text label */}
      <span className="relative z-10 text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-colors duration-300">
        {isDark ? "Ночь" : "День"}
      </span>

      {/* 3D Animated Sliding Orb Capsule */}
      <div
        className={`relative w-8 h-4 sm:w-10 sm:h-5 rounded-full p-0.5 transition-colors duration-500 flex items-center ${
          isDark ? "bg-indigo-900/90 border border-indigo-400/30" : "bg-amber-200/90 border border-amber-400/60"
        }`}
      >
        <motion.div
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center text-[8px] sm:text-[10px] shadow-md transition-shadow duration-300 ${
            isDark
              ? "bg-gradient-to-tr from-indigo-400 to-purple-300 text-indigo-950 shadow-indigo-500/50"
              : "bg-gradient-to-tr from-amber-400 to-yellow-200 text-amber-950 shadow-amber-500/50"
          }`}
          animate={{
            x: isDark ? 0 : 16,
            rotate: isDark ? 0 : 360,
            scale: [1, 1.15, 1],
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
        >
          {isDark ? "🌙" : "☀️"}
        </motion.div>
      </div>
    </button>
  );
}

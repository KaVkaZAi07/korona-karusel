import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const MARQUEE_TEXT = "ОПТОВАЯ ПРОДАЖА • ДЕТСКАЯ ОБУВЬ • ";
const SOCIAL_LINKS = [
  { id: "link-wa", label: "WhatsApp", href: "https://wa.me/79165372315" },
  { id: "link-tg", label: "Telegram", href: "https://t.me/" },
  { id: "link-call", label: "8-916-537-23-15", href: "tel:+79165372315" },
];

export default function Contact() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const marqueeRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Marquee scroll animation
  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        xPercent: -50,
        ease: "none",
        duration: 18,
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  // Ensure mobile video playback & high visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.playsInline = true;
    video.play().catch(() => {});

    const handleTouch = () => {
      if (video.paused) {
        video.play().catch(() => {});
      }
    };
    window.addEventListener("touchstart", handleTouch, { passive: true });
    window.addEventListener("scroll", handleTouch, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouch);
      window.removeEventListener("scroll", handleTouch);
    };
  }, []);

  return (
    <section
      id="contact"
      className="relative bg-bg py-16 md:py-24 overflow-hidden transition-colors duration-500"
    >
      {/* Background Video — Full Edge-to-Edge High Visibility */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <video
          ref={videoRef}
          src="video/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          className={`w-full h-full object-cover object-center transition-opacity duration-500 ${
            isLight ? "opacity-45 mix-blend-multiply" : "opacity-75"
          }`}
        />
        {/* Subtle overlay so video is crisp & clearly visible */}
        <div
          className={`absolute inset-0 transition-colors duration-500 ${
            isLight
              ? "bg-gradient-to-b from-white/70 via-purple-50/60 to-white/80 backdrop-blur-[1px]"
              : "bg-black/40"
          }`}
        />
      </div>

      {/* Top transition line */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-bg to-transparent z-10" />

      {/* SLEEK, ELEGANT COMPACT MARQUEE TICKER */}
      <div className="relative z-10 w-full overflow-hidden mb-10 select-none py-2 border-y border-stroke/30 bg-black/10 backdrop-blur-[2px]">
        <div
          ref={marqueeRef}
          className={`whitespace-nowrap inline-block font-display italic text-xl sm:text-3xl md:text-4xl font-normal tracking-[0.25em] uppercase transition-colors duration-500 ${
            isLight ? "text-purple-900/40" : "text-text-primary/45"
          }`}
        >
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className="inline-block mr-8">
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>

      {/* CTA & Authentic Business Card Banner Container */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span
              className={`text-xs uppercase tracking-[0.3em] font-semibold block mb-4 ${
                isLight ? "text-purple-700" : "text-teal-400"
              }`}
            >
              Корона × Карусель • Детская обувь оптом
            </span>
            <h2
              className={`text-4xl md:text-6xl lg:text-7xl font-display italic leading-tight mb-8 ${
                isLight ? "text-slate-900" : "text-text-primary"
              }`}
            >
              Готовы оформить оптовый заказ?
            </h2>

            {/* Authentic Contact Card Box (Matching Business Banner) */}
            <div className="bg-surface/80 backdrop-blur-md border border-stroke rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto shadow-2xl text-left mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stroke/60">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-display italic text-text-primary font-bold">
                    Абубакр
                  </h3>
                  <p className="text-xs sm:text-sm text-teal-400 font-semibold tracking-wide">
                    Прямые поставки от производителя
                  </p>
                </div>
                <a
                  href="tel:+79165372315"
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-extrabold text-sm sm:text-base shadow-lg shadow-teal-500/30 hover:scale-105 transition-all"
                >
                  📞 8-916-537-23-15
                </a>
              </div>

              <div className="pt-6 space-y-3">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-text-primary">
                  <span className="w-7 h-7 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">📍</span>
                  <span><strong>ТЯК «Москва»</strong> • 11 вход • павильон 4ст-16-17-18</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-muted">
                  <span className="w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">🚇</span>
                  <span>м. Люблино, Тихорецкий б-р, 1</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-muted">
                  <span className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">✨</span>
                  <span className="italic">«Шагаем вместе в счастливое детство!»</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-stroke/40">
                <a
                  href="https://wa.me/79165372315"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm text-center transition-all shadow-md shadow-emerald-600/30"
                >
                  💬 WhatsApp
                </a>
                <a
                  href="https://t.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm text-center transition-all shadow-md shadow-sky-600/30"
                >
                  ✈️ Telegram
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer bar */}
        <div className="border-t border-stroke/60 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Highlighted Social links */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.id}
                id={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs uppercase tracking-[0.12em] transition-all duration-300 shadow-sm hover:scale-105 ${
                  isLight
                    ? "bg-white/90 border-slate-200 text-slate-800 hover:border-purple-400 shadow-slate-200/50"
                    : "bg-surface/70 border-white/10 text-text-primary hover:border-white/30 shadow-black/30"
                }`}
              >
                <span className="relative z-10 flex items-center gap-1.5 font-medium">
                  {link.label === "WhatsApp" && <span className="text-emerald-500 text-[10px]">●</span>}
                  {link.label === "Telegram" && <span className="text-sky-500 text-[10px]">●</span>}
                  {link.label.includes("8-916") && <span className="text-teal-400 text-[10px]">●</span>}
                  <span>{link.label}</span>
                  <span className="text-[10px] text-muted group-hover:text-purple-600 dark:group-hover:text-white transition-colors">↗</span>
                </span>
              </a>
            ))}
          </div>

          {/* Status dot */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className={`text-xs font-medium ${isLight ? "text-slate-700" : "text-muted"}`}>
              КАЧЕСТВО • КОМФОРТ • ЗАБОТА О ДЕТЯХ ♡
            </span>
          </div>

          {/* Copyright */}
          <span className={`text-xs font-medium ${isLight ? "text-slate-500" : "text-muted"}`}>
            © 2026 Корона × Карусель
          </span>
        </div>
      </div>
    </section>
  );
}

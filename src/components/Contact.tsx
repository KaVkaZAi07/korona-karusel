import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import SpecularButton from "./SpecularButton";

const MARQUEE_TEXT = "ОПТОВАЯ ПРОДАЖА • ";
const SOCIAL_LINKS = [
  { id: "link-wa", label: "WhatsApp", href: "https://wa.me/" },
  { id: "link-tg", label: "Telegram", href: "https://t.me/" },
  { id: "link-max", label: "Max", href: "#" },
  { id: "link-call", label: "Позвонить", href: "tel:+79000000000" },
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
        duration: 15,
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
      className="relative bg-bg py-20 md:py-32 overflow-hidden transition-colors duration-500"
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

      {/* FULL SCREEN WIDTH MARQUEE TICKER (Edge-to-Edge 100% Viewport Width) */}
      <div className="relative z-10 w-full overflow-hidden mb-16 select-none py-2">
        <div
          ref={marqueeRef}
          className={`whitespace-nowrap inline-block font-display italic text-6xl sm:text-8xl md:text-9xl font-bold tracking-tight transition-colors duration-500 ${
            isLight ? "text-purple-900/40" : "text-text-primary/70"
          }`}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="inline-block mr-6">
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>

      {/* CTA & Footer Bar Container */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span
              className={`text-xs uppercase tracking-[0.3em] font-semibold block mb-4 ${
                isLight ? "text-purple-700" : "text-muted"
              }`}
            >
              Сотрудничество
            </span>
            <h2
              className={`text-4xl md:text-6xl lg:text-7xl font-display italic leading-tight mb-10 ${
                isLight ? "text-slate-900" : "text-text-primary"
              }`}
            >
              Готовы оформить оптовый заказ?
            </h2>

            {/* SpecularButton CTA */}
            <div className="flex justify-center w-full px-2 overflow-hidden">
              <SpecularButton
                id="footer-email-cta"
                size="md"
                radius={9999}
                lineColor={isLight ? "#7C3AED" : "#89AACC"}
                baseColor={isLight ? "#C4B5FD" : "#4E85BF"}
                textColor={isLight ? "#1E1B4B" : "#ffffff"}
                intensity={isLight ? 2.0 : 3.0}
                speed={1.0}
                autoAnimate={false}
                followMouse
                onClick={() => {
                  window.location.href = "mailto:opt@korona-karusel.ru";
                }}
              >
                <span className="flex items-center gap-2 whitespace-nowrap text-xs sm:text-sm md:text-base font-semibold">
                  <span>Получить оптовый прайс-лист</span>
                  <span className="text-sm sm:text-lg">↗</span>
                </span>
              </SpecularButton>
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
                  {link.label === "Max" && <span className="text-purple-500 text-[10px]">●</span>}
                  {link.label === "Позвонить" && <span className="text-amber-500 text-[10px]">●</span>}
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
              Принимаем заказы 2026
            </span>
          </div>

          {/* Copyright */}
          <span className={`text-xs font-medium ${isLight ? "text-slate-500" : "text-muted"}`}>
            © 2026 Корона и Карусель
          </span>
        </div>
      </div>
    </section>
  );
}

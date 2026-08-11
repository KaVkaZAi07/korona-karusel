import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import SpecularButton from "./SpecularButton";

const MARQUEE_TEXT = "ОПТОВАЯ ПРОДАЖА • ";
const SOCIAL_LINKS = [
  { id: "footer-whatsapp", label: "WhatsApp", href: "https://wa.me/" },
  { id: "footer-telegram", label: "Telegram", href: "https://t.me/" },
  { id: "footer-max", label: "Max", href: "#" },
  { id: "footer-phone", label: "Позвонить", href: "tel:" },
];

export default function Contact() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // GSAP Marquee animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!marqueeRef.current) return;
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  // Ensure mobile video autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.playsInline = true;
    video.play().catch(() => {});
  }, []);

  return (
    <footer id="contact" className="bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden relative">
      {/* Background Video — flipped vertically */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <video
          ref={videoRef}
          src="/video/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
          style={{ transform: "translate(-50%, -50%) scaleY(-1)" }}
        />
        {/* Heavier overlay */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-bg to-transparent" />
      </div>

      <div className="relative z-10">
        {/* GSAP Marquee */}
        <div className="overflow-hidden mb-16 md:mb-24 py-4">
          <div
            ref={marqueeRef}
            className="flex whitespace-nowrap"
            style={{ width: "max-content" }}
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <span
                key={i}
                className="text-3xl md:text-5xl lg:text-6xl font-display italic text-text-primary/45 tracking-tight pr-4"
              >
                {MARQUEE_TEXT}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <p className="text-xs text-muted uppercase tracking-[0.3em] mb-6">
              Сотрудничество
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary leading-tight mb-10">
              Готовы оформить оптовый заказ?
            </h2>
            <div className="flex justify-center w-full px-2 overflow-hidden">
              <SpecularButton
                id="footer-email-cta"
                size="md"
                radius={9999}
                lineColor="#89AACC"
                baseColor="#4E85BF"
                intensity={3.0}
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
                  className="group relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface/70 hover:bg-surface border border-white/10 hover:border-white/30 text-xs text-text-primary uppercase tracking-[0.12em] transition-all duration-300 shadow-md shadow-black/30 hover:scale-105"
                >
                  <span
                    className="absolute inset-[-1px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)",
                      zIndex: 0,
                    }}
                  />
                  <span className="relative z-10 flex items-center gap-1.5">
                    {link.label === "WhatsApp" && <span className="text-emerald-400 text-[10px]">●</span>}
                    {link.label === "Telegram" && <span className="text-sky-400 text-[10px]">●</span>}
                    {link.label === "Max" && <span className="text-purple-400 text-[10px]">●</span>}
                    {link.label === "Позвонить" && <span className="text-amber-400 text-[10px]">●</span>}
                    <span className="font-medium">{link.label}</span>
                    <span className="text-[10px] text-muted group-hover:text-white transition-colors">↗</span>
                  </span>
                </a>
              ))}
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs text-muted">Принимаем заказы 2026</span>
            </div>

            {/* Copyright */}
            <p className="text-xs text-muted">
              © 2026 Корона и Карусель
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import SpecularButton from "./SpecularButton";

const ROLES = ["качества", "надежности", "стиля", "комфорта"];

interface HeroProps {
  isReady?: boolean;
}

export default function Hero({ isReady = true }: HeroProps) {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [roleIndex, setRoleIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Cycle roles every 2s
  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  // Ensure mobile video autoplay
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

  // GSAP entrance animation — triggered when loading completes
  useEffect(() => {
    if (!isReady) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ ease: "power3.out" });

      tl.fromTo(
        ".name-reveal",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      ).fromTo(
        ".blur-in",
        { opacity: 0, filter: "blur(10px)", y: 20 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 1,
          stagger: 0.12,
        },
        "-=0.8"
      );
    }, sectionRef.current ?? undefined);

    return () => ctx.revert();
  }, [isReady]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-bg transition-colors duration-500"
    >
      {/* Background Video — 1708x1212 Ultra HD Original Mux Video */}
      <video
        ref={videoRef}
        src="video/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        className={`absolute top-1/2 left-1/2 min-w-full min-h-full object-cover object-center -translate-x-1/2 -translate-y-1/2 z-0 transition-opacity duration-500 ${
          isLight ? "opacity-35 mix-blend-multiply" : "opacity-90"
        }`}
      />

      {/* Overlay — Light Mode soft bright aura / Dark Mode dark vignette */}
      <div
        className={`absolute inset-0 z-[1] transition-colors duration-500 ${
          isLight
            ? "bg-gradient-to-b from-purple-100/40 via-white/60 to-purple-50/80 backdrop-blur-[1px]"
            : "bg-black/20"
        }`}
      />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent z-[2]" />

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Eyebrow */}
        <p
          className={`blur-in text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-8 whitespace-nowrap font-semibold ${
            isLight ? "text-purple-700" : "text-muted"
          }`}
          style={{ opacity: 0 }}
        >
          Оптовая продажа сезон 2026
        </p>

        {/* Name */}
        <h1
          className={`name-reveal text-3xl sm:text-6xl md:text-8xl lg:text-9xl font-display italic leading-[1] tracking-tight mb-6 whitespace-nowrap drop-shadow-sm ${
            isLight ? "text-slate-900" : "text-text-primary"
          }`}
          style={{ opacity: 0 }}
        >
          Корона и Карусель
        </h1>

        {/* Role line */}
        <p
          className={`blur-in text-sm md:text-base font-medium mb-4 ${
            isLight ? "text-slate-700" : "text-muted"
          }`}
          style={{ opacity: 0 }}
        >
          Стандарт{" "}
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              className={`font-display italic inline-block font-semibold ${
                isLight ? "text-purple-700" : "text-text-primary"
              }`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {ROLES[roleIndex]}
            </motion.span>
          </AnimatePresence>{" "}
          в каждой детали
        </p>

        {/* Description */}
        <p
          className={`blur-in text-[11px] sm:text-sm md:text-base max-w-[340px] sm:max-w-xl md:max-w-2xl mx-auto mb-12 leading-relaxed font-medium ${
            isLight ? "text-slate-600" : "text-muted"
          }`}
          style={{ opacity: 0 }}
        >
          Оптовая платформа детской обуви по ценам производителя.
          <br />
          Быстрая отгрузка коробами и доставка по всей РФ.
        </p>

        {/* CTA Buttons */}
        <div className="blur-in flex items-center justify-center gap-3 sm:gap-4">
          {/* Каталог Button */}
          <SpecularButton
            id="hero-cta-works"
            size="md"
            radius={9999}
            lineColor={isLight ? "#7C3AED" : "#89AACC"}
            baseColor={isLight ? "#C4B5FD" : "#4E85BF"}
            textColor={isLight ? "#1E1B4B" : "#ffffff"}
            intensity={isLight ? 1.8 : 2.8}
            speed={1.0}
            autoAnimate={false}
            followMouse
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("journal")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="flex items-center gap-1.5 whitespace-nowrap font-semibold">
              <span>Каталог</span>
              <span>↓</span>
            </span>
          </SpecularButton>

          {/* Заказать Button */}
          <SpecularButton
            id="hero-cta-contact"
            size="md"
            radius={9999}
            lineColor={isLight ? "#6366F1" : "#ffffff"}
            baseColor={isLight ? "#E0E7FF" : "#89AACC"}
            textColor={isLight ? "#1E1B4B" : "#ffffff"}
            intensity={isLight ? 1.8 : 2.5}
            speed={1.0}
            autoAnimate={false}
            followMouse
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="flex items-center gap-1.5 whitespace-nowrap font-semibold">
              <span>Заказать</span>
              <span>↗</span>
            </span>
          </SpecularButton>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className={`text-xs uppercase tracking-[0.2em] font-semibold ${isLight ? "text-purple-800" : "text-muted"}`}>
          SCROLL
        </span>
        <div className="relative w-px h-10 bg-stroke overflow-hidden">
          <span className="absolute inset-0 w-full accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}

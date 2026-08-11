import { useState } from "react";
import { useScrollY } from "../hooks/useScrollY";

const NAV_LINKS = ["Дом", "Каталог", "Отзывы"];

const SECTION_IDS: Record<string, string> = {
  Дом: "hero",
  Каталог: "journal",
  Отзывы: "stats",
};

export default function Navbar() {
  const scrollY = useScrollY();
  const [active, setActive] = useState("Дом");
  const [logoHovered, setLogoHovered] = useState(false);
  const elevated = scrollY > 100;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none">
      <nav
        className={`pointer-events-auto inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface/80 px-2 py-2 transition-shadow duration-300 ${
          elevated ? "shadow-md shadow-black/30" : ""
        }`}
      >
        {/* Logo */}
        <button
          id="nav-logo"
          className="relative w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 focus:outline-none"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          onClick={() => {
            setActive("Дом");
            scrollTo("hero");
          }}
          aria-label="Go to top"
        >
          {/* Gradient ring */}
          <span
            className="absolute inset-0 rounded-full p-[2px]"
            style={{
              background: logoHovered
                ? "linear-gradient(270deg, #4E85BF 0%, #89AACC 100%)"
                : "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)",
              transition: "background 0.4s ease",
            }}
          >
            <span className="w-full h-full rounded-full bg-bg flex items-center justify-center">
              <span className="font-display italic text-[13px] text-text-primary leading-none select-none">
                КК
              </span>
            </span>
          </span>
        </button>

        {/* Divider */}
        <div className="hidden sm:block w-px h-5 bg-stroke mx-2" />

        {/* Nav Links */}
        {NAV_LINKS.map((link) => (
          <button
            key={link}
            id={`nav-${link.toLowerCase()}`}
            onClick={() => {
              setActive(link);
              scrollTo(SECTION_IDS[link]);
            }}
            className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 focus:outline-none ${
              active === link
                ? "text-text-primary bg-stroke/50"
                : "text-muted hover:text-text-primary hover:bg-stroke/50"
            }`}
          >
            {link}
          </button>
        ))}

        {/* Divider */}
        <div className="hidden sm:block w-px h-5 bg-stroke mx-2" />

        {/* Say Hi -> Связаться button */}
        <a
          id="nav-say-hi"
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="group relative text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-muted hover:text-text-primary transition-all duration-200 focus:outline-none"
        >
          {/* Gradient border on hover */}
          <span
            className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)",
              zIndex: 0,
            }}
          />
          <span className="relative z-10 flex items-center gap-1 bg-surface rounded-full px-3 sm:px-4 py-1.5 sm:py-2 -mx-3 sm:-mx-4 -my-1.5 sm:-my-2 backdrop-blur-md">
            Связаться <span className="text-base leading-none">↗</span>
          </span>
        </a>
      </nav>
    </header>
  );
}

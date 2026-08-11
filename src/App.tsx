import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import LoadingScreen from "./components/LoadingScreen";
import GooeyNav from "./components/GooeyNav";
import Hero from "./components/Hero";
import SelectedWorks from "./components/SelectedWorks";
import Journal from "./components/Journal";
import Explorations from "./components/Explorations";
import Stats from "./components/Stats";
import Contact from "./components/Contact";

const navItems = [
  { label: "Дом", href: "#hero" },
  { label: "Каталог", href: "#journal" },
  { label: "Отзывы", href: "#stats" },
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ThemeProvider>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div
        className={`min-h-screen bg-bg transition-opacity duration-700 ${
          isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <GooeyNav
          items={navItems}
          particleCount={15}
          particleDistances={[90, 10]}
          particleR={100}
          initialActiveIndex={0}
          animationTime={600}
          timeVariance={300}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
        />

        <main>
          <Hero isReady={!isLoading} />
          <SelectedWorks />
          <Journal />
          <Explorations />
          <Stats />
          <Contact />
        </main>
      </div>
    </ThemeProvider>
  );
}

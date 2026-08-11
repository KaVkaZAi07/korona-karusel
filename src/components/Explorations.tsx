import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import SpecularButton from "./SpecularButton";

gsap.registerPlugin(ScrollTrigger);

interface StoryCard {
  id: string;
  storeName: string;
  city: string;
  growth: string;
  quote: string;
  fullReview: string;
  image: string;
  rotation: number;
  col: number;
}

const stories: StoryCard[] = [
  {
    id: "story-1",
    storeName: "Шоурум «Baby Step»",
    city: "г. Москва",
    growth: "+180% к выручке",
    quote: "«Обувь раскупают за 2 недели. Клиенты в восторге!»",
    fullReview:
      "Сотрудничаем с «Корона и Карусель» уже второй год. Качество натуральной кожи и аккуратность коробок — на высоте. Ростовки продаются полностью без неликвидных остатков.",
    image: "/images/story_store_1.jpg",
    rotation: -3,
    col: 0,
  },
  {
    id: "story-2",
    storeName: "Сеть «Обувайка»",
    city: "г. Екатеринбург",
    growth: "+145% прирост",
    quote: "«3 года работы. Ни одного возврата или брака.»",
    fullReview:
      "Заказываем демисезонную и летнюю линейку коробами. Точная посадка по стопе, дети довольны, родители возвращаются именно за этими моделями.",
    image: "/images/story_store_2.jpg",
    rotation: 2,
    col: 1,
  },
  {
    id: "story-3",
    storeName: "Бутик «Мини Мода»",
    city: "г. Краснодар",
    growth: "+210% маржинальность",
    quote: "«Ростовки улетают мгновенно. Кожа мягкая!»",
    fullReview:
      "Оптовые цены позволяют ставить высокую наценку и оставаться в хорошем плюсе. Отдельное спасибо за оперативность менеджеров.",
    image: "/images/story_store_3.jpg",
    rotation: -2,
    col: 0,
  },
  {
    id: "story-4",
    storeName: "Магазин «Детский Стиль»",
    city: "г. Новосибирск",
    growth: "24ч отгрузка",
    quote: "«Отгружают за 24 часа. Очень выручают в пик сезона.»",
    fullReview:
      "В разгар школьного сезона привозили дополнительный ассортимент за пару дней. Удобная доставка транспортной компанией без задержек.",
    image: "/images/story_store_4.jpg",
    rotation: 3,
    col: 1,
  },
  {
    id: "story-5",
    storeName: "Сеть «Топ-Топ»",
    city: "г. Казань",
    growth: "+160% оборачиваемость",
    quote: "«Натуральные материалы и анатомическая стелька.»",
    fullReview:
      "Покупатели отмечают удобство колодки и супинатора. Для детской ноги это главное. Продавать такой товар — одно удовольствие.",
    image: "/images/story_store_5.jpg",
    rotation: -1,
    col: 0,
  },
  {
    id: "story-6",
    storeName: "Шоурум «Little Star»",
    city: "г. Санкт-Петербург",
    growth: "99% повторных заказов",
    quote: "«Постоянно дозаказываем новые коллекции!»",
    fullReview:
      "Очень красивый дизайн обуви, стильные цвета. Короба приходят идеального качества. Планируем расширять объем закупок на следующий сезон.",
    image: "/images/story_store_6.jpg",
    rotation: 2,
    col: 1,
  },
];

const col0 = stories.filter((e) => e.col === 0);
const col1 = stories.filter((e) => e.col === 1);

export default function Explorations() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const col0Ref = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const [activeStory, setActiveStory] = useState<StoryCard | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !contentRef.current) return;

      // Pin the center content
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: contentRef.current,
        pinSpacing: false,
      });

      // Parallax col 0 — moves up
      gsap.to(col0Ref.current, {
        y: "-30%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Parallax col 1 — moves down
      gsap.to(col1Ref.current, {
        y: "30%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="explorations"
      ref={sectionRef}
      className="relative bg-bg"
      style={{ minHeight: "300vh" }}
    >
      {/* Layer 1: Pinned center text (z-10) */}
      <div
        ref={contentRef}
        className="relative z-10 h-screen flex items-center justify-center pointer-events-none"
      >
        <div className="text-center px-6 max-w-xl">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              Истории успеха
            </span>
            <div className="w-8 h-px bg-stroke" />
          </div>
          <h2 className="text-4xl md:text-6xl font-body font-light text-text-primary leading-tight mb-4">
            Доверие{" "}
            <em className="font-display italic not-italic">наших партнёров</em>
          </h2>
          <p className="text-xs sm:text-sm text-muted max-w-md mx-auto mb-8 leading-relaxed">
            Реальные кейсы розничных магазинов и шоурумов, успешно зарабатывающих с «Корона и Карусель».
          </p>
          <div className="pointer-events-auto flex justify-center">
            <SpecularButton
              id="explorations-cta-partner"
              size="md"
              radius={9999}
              lineColor="#89AACC"
              baseColor="#4E85BF"
              intensity={2.8}
              speed={1.0}
              autoAnimate={false}
              followMouse
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="flex items-center gap-2">
                <span>Стать партнёром</span>
                <span>↗</span>
              </span>
            </SpecularButton>
          </div>
        </div>
      </div>

      {/* Layer 2: Parallax columns (z-20, absolute overlay) */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        <div className="max-w-[1400px] mx-auto h-full flex items-start px-4 sm:px-8 md:px-16">
          <div className="w-full grid grid-cols-2 gap-4 sm:gap-12 md:gap-40 pt-[10vh]">
            {/* Column 0 */}
            <div ref={col0Ref} className="flex flex-col gap-6 sm:gap-10 items-end">
              {col0.map((item) => (
                <motion.div
                  key={item.id}
                  className="pointer-events-auto relative aspect-[4/5] w-full max-w-[240px] sm:max-w-[280px] md:max-w-[320px] rounded-2xl overflow-hidden cursor-pointer bg-surface/80 border border-white/10 p-3 sm:p-4 shadow-xl backdrop-blur-md flex flex-col justify-between group"
                  style={{ rotate: item.rotation }}
                  whileHover={{ scale: 1.04, rotate: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setActiveStory(item)}
                >
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3">
                    <img
                      src={item.image}
                      alt={item.storeName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <span className="absolute top-2 right-2 text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-bg/80 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
                      {item.growth}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted uppercase tracking-wider block">
                      {item.city}
                    </span>
                    <h4 className="text-sm sm:text-base font-display italic text-text-primary mb-1 truncate">
                      {item.storeName}
                    </h4>
                    <p className="text-xs text-muted/90 line-clamp-2 italic">
                      {item.quote}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Column 1 */}
            <div ref={col1Ref} className="flex flex-col gap-6 sm:gap-10 items-start mt-[15vh]">
              {col1.map((item) => (
                <motion.div
                  key={item.id}
                  className="pointer-events-auto relative aspect-[4/5] w-full max-w-[240px] sm:max-w-[280px] md:max-w-[320px] rounded-2xl overflow-hidden cursor-pointer bg-surface/80 border border-white/10 p-3 sm:p-4 shadow-xl backdrop-blur-md flex flex-col justify-between group"
                  style={{ rotate: item.rotation }}
                  whileHover={{ scale: 1.04, rotate: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setActiveStory(item)}
                >
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3">
                    <img
                      src={item.image}
                      alt={item.storeName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <span className="absolute top-2 right-2 text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-bg/80 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
                      {item.growth}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted uppercase tracking-wider block">
                      {item.city}
                    </span>
                    <h4 className="text-sm sm:text-base font-display italic text-text-primary mb-1 truncate">
                      {item.storeName}
                    </h4>
                    <p className="text-xs text-muted/90 line-clamp-2 italic">
                      {item.quote}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Story Modal */}
      <AnimatePresence>
        {activeStory && (
          <motion.div
            className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveStory(null)}
          >
            <motion.div
              className="relative max-w-lg w-full bg-surface border border-white/15 rounded-3xl p-6 sm:p-8 cursor-default shadow-2xl overflow-hidden"
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top image */}
              <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden mb-6 border border-stroke">
                <img
                  src={activeStory.image}
                  alt={activeStory.storeName}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 text-xs uppercase font-semibold px-3 py-1 rounded-full bg-bg/85 text-emerald-400 border border-emerald-500/40 backdrop-blur-md">
                  {activeStory.growth}
                </span>
              </div>

              {/* Story text */}
              <span className="text-xs text-muted uppercase tracking-[0.2em] block mb-1">
                {activeStory.city}
              </span>
              <h3 className="text-2xl sm:text-3xl font-display italic text-text-primary mb-4">
                {activeStory.storeName}
              </h3>
              <blockquote className="text-sm sm:text-base font-display italic text-text-primary/90 border-l-2 border-accent pl-4 mb-4 leading-relaxed">
                {activeStory.quote}
              </blockquote>
              <p className="text-xs sm:text-sm text-muted leading-relaxed mb-6">
                {activeStory.fullReview}
              </p>

              {/* Close Button */}
              <button
                className="w-full py-3 rounded-full bg-bg border border-stroke text-sm font-medium text-text-primary hover:border-white/40 transition-colors"
                onClick={() => setActiveStory(null)}
              >
                Закрыть окно
              </button>

              <button
                className="absolute top-4 right-4 text-muted hover:text-white text-xl p-2 transition-colors"
                onClick={() => setActiveStory(null)}
                aria-label="Close story"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

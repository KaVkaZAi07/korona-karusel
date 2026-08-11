import { motion } from "framer-motion";

const collections = [
  {
    id: "collection-winter",
    title: "Зимняя коллекция обуви и мембранных дутиков",
    subtitle: "Размеры: 21-26, 27-31, 31-36 • Натуральный мех и овчина",
    image: "/images/kids_winter_boots_1786224772633.jpg",
    badge: "Зима 2026",
    details: "от 1 короба",
  },
  {
    id: "collection-spring",
    title: "Весенняя и осенняя демисезонная обувь",
    subtitle: "Размеры: 16-20, 21-26, 26-31 • Влагозащита и кожа",
    image: "/images/kids_spring_sneakers_1786224784565.jpg",
    badge: "Весна/Осень",
    details: "от 1 короба",
  },
  {
    id: "collection-summer",
    title: "Летняя коллекция сандалий и босоножек",
    subtitle: "Размеры: 16-20, 21-26, 26-31 • Анатомическая стелька",
    image: "/images/kids_summer_sandals_1786224792253.jpg",
    badge: "Лето 2026",
    details: "от 1 короба",
  },
  {
    id: "collection-school",
    title: "Школьная обувь и спортивные кроссовки",
    subtitle: "Размеры: 26-31, 31-36 • Износостойкая подошва",
    image: "/images/kids_sport_shoes_1786224824116.jpg",
    badge: "Школа/Спорт",
    details: "от 1 короба",
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" as const },
  },
};

export default function Journal() {
  return (
    <section id="journal" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-6"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">
                Коллекции
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-body font-light text-text-primary leading-tight">
              Сезонные{" "}
              <em className="font-display italic not-italic">линейки обуви</em>
            </h2>
            <p className="text-sm text-muted mt-3 max-w-sm">
              Оптовые поставки детской обуви полными ростовками с 16 по 36 размер.
            </p>
          </div>

          <a
            id="journal-view-all"
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative hidden md:inline-flex items-center gap-2 rounded-full text-sm px-6 py-3 text-muted hover:text-text-primary border border-stroke hover:border-transparent transition-all duration-300 focus:outline-none shrink-0"
          >
            <span
              className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)",
                zIndex: 0,
              }}
            />
            <span className="relative z-10 bg-bg rounded-full px-6 py-3 -mx-6 -my-3 flex items-center gap-2">
              Запросить каталог <span>→</span>
            </span>
          </a>
        </motion.div>

        {/* Collections entries */}
        <div className="flex flex-col gap-3">
          {collections.map((item, i) => (
            <motion.a
              key={item.id}
              id={item.id}
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group flex items-center gap-4 sm:gap-6 p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-[28px] sm:rounded-full transition-all duration-300 cursor-pointer no-underline"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Thumbnail */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shrink-0 border border-white/10">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Title & Subtitle */}
              <div className="flex-1 min-w-0">
                <p className="text-sm md:text-base text-text-primary font-medium truncate group-hover:text-text-primary transition-colors">
                  {item.title}
                </p>
                <p className="text-xs text-muted truncate mt-0.5">
                  {item.subtitle}
                </p>
              </div>

              {/* Meta */}
              <div className="hidden sm:flex items-center gap-4 shrink-0 text-xs text-muted">
                <span className="bg-surface px-3 py-1 rounded-full border border-stroke">
                  {item.badge}
                </span>
                <span className="w-px h-4 bg-stroke" />
                <span className="text-text-primary/80 font-medium">{item.details}</span>
              </div>

              {/* Arrow */}
              <span className="text-muted group-hover:text-text-primary transition-colors shrink-0 text-lg mr-2">
                →
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

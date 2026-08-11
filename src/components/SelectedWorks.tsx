import { motion } from "framer-motion";

const features = [
  {
    id: "guarantee-margin",
    title: "Высокая маржинальность от 100%",
    category: "Выгода для розницы",
    description:
      "Прямые фабричные цены без посредников позволят вам делать высокую наценку и получать максимальную чистую прибыль с каждого короба.",
    image: "/images/card_margin_b2b.jpg",
    span: "col-span-12 md:col-span-7",
    aspect: "aspect-[16/10]",
    badge: "Доходность",
  },
  {
    id: "guarantee-sizes",
    title: "Ходовые ростовки без неликвида",
    category: "Ассортимент",
    description:
      "Формируем короба только из ходовых размеров с 16 по 36. Никаких «зависающих» остатков на вашем складе.",
    image: "/images/card_sizes_b2b.jpg",
    span: "col-span-12 md:col-span-5",
    aspect: "aspect-[4/3]",
    badge: "Ростовки",
  },
  {
    id: "guarantee-shipping",
    title: "Быстрая отгрузка за 24 часа",
    category: "Логистика по РФ",
    description:
      "Ваш магазин не потеряет покупателей в сезон. Отправка любой транспортной компанией в день поступления оплаты.",
    image: "/images/card_shipping_b2b.jpg",
    span: "col-span-12 md:col-span-5",
    aspect: "aspect-[4/3]",
    badge: "Скорость",
  },
  {
    id: "guarantee-quality",
    title: "Надёжность и контроль качества",
    category: "Гарантия и сервис",
    description:
      "Строгий фабричный контроль каждой пары. В случае выявления любого брака — оперативная замена или возврат по вашей первой обратной связи.",
    image: "/images/card_quality_b2b.jpg",
    span: "col-span-12 md:col-span-7",
    aspect: "aspect-[16/10]",
    badge: "Надежность",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

export default function SelectedWorks() {
  return (
    <section id="works" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              Гарантии партнёрам
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-body font-light text-text-primary leading-tight">
            Почему выбирают{" "}
            <em className="font-display italic not-italic">«Корона и Карусель»</em>
          </h2>
          <p className="text-sm text-muted mt-3 max-w-lg">
            4 ключевых преимущества для устойчивого и прибыльного розничного бизнеса детской обуви.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-12 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {features.map((item) => (
            <motion.div
              key={item.id}
              id={item.id}
              className={`${item.span} group relative cursor-pointer overflow-hidden rounded-3xl bg-surface border border-stroke`}
              variants={itemVariants}
            >
              {/* Image container */}
              <div className={`relative w-full ${item.aspect} overflow-hidden`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent opacity-90 group-hover:opacity-85 transition-opacity duration-500" />

                {/* Halftone texture overlay */}
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay"
                  style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
                    backgroundSize: "8px 8px",
                  }}
                />

                {/* Badge top-left */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-bg/80 backdrop-blur-md border border-white/10 text-muted">
                    {item.badge}
                  </span>
                </div>
              </div>

              {/* Content overlay */}
              <div className="p-6 sm:p-8 flex flex-col justify-end bg-surface/50 border-t border-stroke/50">
                <span className="text-xs text-muted uppercase tracking-[0.2em] mb-1">
                  {item.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-display italic text-text-primary mb-2 group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-xl">
                  {item.description}
                </p>
              </div>

              {/* Gradient ring hover indicator */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: "inset 0 0 0 1.5px rgba(137, 170, 204, 0.4)",
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

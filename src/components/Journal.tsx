import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SEASONAL_COLLECTIONS,
  CATALOG_PRODUCTS,
  type SeasonalCollection,
  type ProductModel,
} from "../data/catalogData";
import ProductModal from "./ProductModal";

const CATEGORY_FILTERS = [
  { id: "all", label: "Все" },
  { id: "girls", label: "Для девочек" },
  { id: "boys", label: "Для мальчиков" },
  { id: "school", label: "Школьная" },
  { id: "sneakers", label: "Кроссовки" },
  { id: "shoes", label: "Туфли" },
  { id: "sandals", label: "Сандалии" },
];

const ALL_SIZES = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 37];

export default function Journal() {
  // Currently opened Seasonal Category Modal (Photo 2)
  const [activeCollection, setActiveCollection] = useState<SeasonalCollection | null>(null);

  // Filter states inside Photo 2 modal
  const [activeSubFilter, setActiveSubFilter] = useState("all");
  const [selectedSize, setSelectedSize] = useState<number | null>(20);

  // Currently opened Product Detail Modal (Photo 1)
  const [activeProduct, setActiveProduct] = useState<ProductModel | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Products belonging to the selected collection (Winter, Demi, Summer, School)
  const categoryProducts = activeCollection
    ? CATALOG_PRODUCTS.filter((prod) => prod.category === activeCollection.id)
    : [];

  const filteredProducts = categoryProducts.filter((prod) => {
    if (activeSubFilter !== "all" && prod.target !== activeSubFilter) {
      return false;
    }
    if (selectedSize !== null && !prod.sizeRange.includes(selectedSize)) {
      return false;
    }
    return true;
  });

  return (
    <section id="journal" className="bg-bg py-16 md:py-24 border-t border-stroke/40">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10">
        {/* Header (Wider container & Turquoise Glowing Highlighted 'Каталог') */}
        <motion.div
          className="mb-10 md:mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px bg-teal-400/60" />
            <span className="text-xs text-teal-400 dark:text-teal-300 uppercase tracking-[0.3em] font-semibold">
              Оптовый Каталог 2026
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-body font-light text-text-primary leading-tight mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-emerald-400 font-display italic font-normal drop-shadow-[0_0_25px_rgba(45,212,191,0.4)]">
              Каталог
            </span>{" "}
            сезонных линеек обуви
          </h2>
          <p className="text-sm sm:text-base text-muted max-w-2xl">
            Оптовые поставки детской обуви полными ростовками с 16 по 36 размер.
          </p>
        </motion.div>

        {/* 4 Seasonal Collection Horizontal Pill Cards (Matching User Screenshot) */}
        <div className="space-y-4 sm:space-y-5">
          {SEASONAL_COLLECTIONS.map((col, idx) => (
            <motion.div
              key={col.id}
              className="group relative cursor-pointer overflow-hidden rounded-full bg-surface/90 border border-stroke p-3.5 sm:p-5 flex items-center justify-between gap-4 sm:gap-6 transition-all duration-300 hover:border-purple-500/60 hover:scale-[1.01] hover:shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              onClick={() => {
                setActiveCollection(col);
                setActiveSubFilter("all");
                setSelectedSize(20);
              }}
            >
              {/* Left Circular Image Thumbnail */}
              <div className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-full overflow-hidden shrink-0 border border-stroke/60 bg-black/20">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Middle Title & Subtitle */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-xl font-display italic text-text-primary truncate group-hover:text-purple-500 transition-colors mb-0.5 sm:mb-1">
                  {col.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted truncate">
                  {col.subtitle}
                </p>
              </div>

              {/* Right Arrow Button */}
              <div className="shrink-0 mr-1 sm:mr-2">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-stroke flex items-center justify-center text-text-primary text-base sm:text-lg group-hover:border-purple-500 group-hover:bg-purple-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                  →
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- SUB-CATALOG MODAL (PHOTO 2) --- */}
      <AnimatePresence>
        {activeCollection && (
          <div
            className="fixed inset-0 z-[1500] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
            onClick={() => setActiveCollection(null)}
          >
            <motion.div
              className="relative max-w-5xl w-full bg-surface border border-stroke rounded-3xl p-5 sm:p-8 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col cursor-default"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-muted hover:text-text-primary text-xl w-9 h-9 rounded-full bg-bg/80 flex items-center justify-center border border-stroke transition-colors z-20"
                onClick={() => setActiveCollection(null)}
                aria-label="Close sub-catalog"
              >
                ✕
              </button>

              {/* Photo 2 Sub-catalog Header */}
              <div className="mb-6 border-b border-stroke/60 pb-4">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-300 inline-block mb-2">
                  {activeCollection.badge}
                </span>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <h2 className="text-2xl sm:text-4xl font-display italic text-text-primary">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-emerald-400">
                      Каталог:
                    </span>{" "}
                    {activeCollection.title}
                  </h2>
                  <span className="text-xs sm:text-sm text-muted">
                    Выберите модель и перейдите в мессенджер ♡
                  </span>
                </div>
              </div>

              {/* Photo 2 Filters Bar */}
              <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-3 scrollbar-none shrink-0">
                {CATEGORY_FILTERS.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveSubFilter(cat.id)}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-all ${
                      activeSubFilter === cat.id
                        ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                        : "bg-bg text-text-primary hover:bg-purple-50 dark:hover:bg-purple-900/30 border border-stroke/60"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Photo 2 Size Selector Bar */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-6 scrollbar-none shrink-0">
                {ALL_SIZES.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(selectedSize === sz ? null : sz)}
                    className={`w-8 h-8 min-w-[32px] text-xs font-semibold rounded-lg transition-all ${
                      selectedSize === sz
                        ? "bg-purple-600 text-white shadow-md shadow-purple-600/30 scale-105"
                        : "bg-bg text-text-primary border border-stroke/60"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>

              {/* Photo 2: 6 Product Cards Grid */}
              <div className="overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.map((item) => (
                  <div
                    key={item.id}
                    className="group relative bg-bg border border-stroke rounded-2xl p-4 flex flex-col justify-between hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1"
                    onClick={() => setActiveProduct(item)}
                  >
                    {/* Image */}
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-white/5 mb-3 border border-stroke/40 flex items-center justify-center p-2">
                      <img
                        src={item.mainImage}
                        alt={item.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                      <button
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-surface/80 backdrop-blur-md border border-stroke/60 flex items-center justify-center text-xs"
                        onClick={(e) => toggleFavorite(item.id, e)}
                        aria-label="Add to favorites"
                      >
                        <span className={favorites[item.id] ? "text-pink-500" : "text-muted"}>
                          {favorites[item.id] ? "♥" : "♡"}
                        </span>
                      </button>
                    </div>

                    {/* Details */}
                    <div>
                      <h4 className="text-sm font-semibold text-text-primary mb-0.5 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {item.name}
                      </h4>
                      <span className="text-[11px] text-muted block mb-2">
                        16–37 размеры
                      </span>
                      <div className="text-base font-bold text-text-primary mb-3">
                        {item.price.toLocaleString()} ₽
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      className="w-full py-2 rounded-xl bg-surface border border-stroke text-xs font-semibold text-purple-600 dark:text-purple-300 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white transition-all"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveProduct(item);
                      }}
                    >
                      Подробнее
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- PRODUCT DETAIL MODAL (PHOTO 1) --- */}
      <ProductModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
      />
    </section>
  );
}

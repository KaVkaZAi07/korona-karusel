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
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header on Main Page */}
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
              Коллекции 2026
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-body font-light text-text-primary leading-tight">
            Сезонные{" "}
            <em className="font-display italic not-italic">линейки обуви</em>
          </h2>
          <p className="text-sm text-muted mt-3 max-w-lg">
            Нажмите на интересующий сезон, чтобы открыть полный каталог из 6 актуальных моделей с ценами и размерами.
          </p>
        </motion.div>

        {/* 4 Main Seasonal Collection Cards on Main Page */}
        <div className="space-y-6">
          {SEASONAL_COLLECTIONS.map((col, idx) => (
            <motion.div
              key={col.id}
              className="group relative cursor-pointer overflow-hidden rounded-3xl bg-surface border border-stroke p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-500 hover:border-purple-500/50 hover:shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              onClick={() => {
                setActiveCollection(col);
                setActiveSubFilter("all");
                setSelectedSize(20);
              }}
            >
              {/* Image Preview */}
              <div className="relative w-full md:w-64 aspect-[16/10] md:aspect-[4/3] rounded-2xl overflow-hidden shrink-0 border border-stroke/60">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-3 left-3 text-[10px] uppercase font-semibold px-3 py-1 rounded-full bg-bg/80 text-purple-600 dark:text-purple-300 backdrop-blur-md border border-white/10">
                  {col.badge}
                </span>
              </div>

              {/* Text Info */}
              <div className="flex-1">
                <span className="text-xs text-muted uppercase tracking-[0.2em] block mb-1">
                  {col.details}
                </span>
                <h3 className="text-2xl sm:text-3xl font-display italic text-text-primary mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {col.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted">
                  {col.subtitle}
                </p>
              </div>

              {/* Action Pill CTA */}
              <div className="shrink-0 w-full md:w-auto">
                <button className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md shadow-purple-600/30 group-hover:scale-105">
                  <span>Открыть каталог (6 моделей)</span>
                  <span>↗</span>
                </button>
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
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 inline-block mb-2">
                  {activeCollection.badge}
                </span>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <h2 className="text-2xl sm:text-4xl font-display italic text-text-primary">
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

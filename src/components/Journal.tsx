import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SEASONAL_COLLECTIONS,
  CATALOG_PRODUCTS,
  type SeasonalCollection,
  type ProductModel,
} from "../data/catalogData";
import ProductModal from "./ProductModal";

export default function Journal() {
  // Currently opened Seasonal Category Modal (Photo 2)
  const [activeCollection, setActiveCollection] = useState<SeasonalCollection | null>(null);

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

  return (
    <section id="journal" className="bg-bg py-16 md:py-24 border-t border-stroke/40">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10">
        {/* Header */}
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

        {/* 4 Seasonal Collection Horizontal Pill Cards */}
        <div className="space-y-4 sm:space-y-5">
          {SEASONAL_COLLECTIONS.map((col, idx) => (
            <motion.div
              key={col.id}
              className="group relative cursor-pointer overflow-hidden rounded-full bg-surface/90 border border-stroke p-3.5 sm:p-5 flex items-center justify-between gap-4 sm:gap-6 transition-all duration-300 hover:border-purple-500/60 hover:scale-[1.01] hover:shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              onClick={() => setActiveCollection(col)}
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

      {/* --- SUB-CATALOG MODAL (CLEAN 6-CARD GRID 1-TO-1 MATCHING USER PHOTO) --- */}
      <AnimatePresence>
        {activeCollection && (
          <div
            className="fixed inset-0 z-[1500] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
            onClick={() => setActiveCollection(null)}
          >
            <motion.div
              className="relative max-w-2xl w-full bg-surface border border-stroke rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden my-auto max-h-[85vh] flex flex-col cursor-default"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-muted hover:text-text-primary text-xl w-8 h-8 rounded-full bg-bg/80 flex items-center justify-center border border-stroke transition-colors z-20"
                onClick={() => setActiveCollection(null)}
                aria-label="Close sub-catalog"
              >
                ✕
              </button>

              {/* Title Header - Clean Collection Name */}
              <h3 className="text-xl sm:text-2xl font-display italic text-text-primary mb-4 pr-10">
                {activeCollection.title}
              </h3>

              {/* 2-Column Product Cards Grid (Matching User Photo 1-to-1) */}
              <div className="overflow-y-auto pr-1 grid grid-cols-2 gap-3.5 sm:gap-5 max-h-[72vh]">
                {categoryProducts.map((item) => (
                  <div
                    key={item.id}
                    className="group relative bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-stroke rounded-3xl p-3 sm:p-4 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
                    onClick={() => setActiveProduct(item)}
                  >
                    {/* Image container */}
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-50 dark:bg-white/5 mb-3 flex items-center justify-center p-2">
                      <img
                        src={item.mainImage}
                        alt={item.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Favorite Heart Button */}
                      <button
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 dark:bg-surface/80 backdrop-blur-md border border-slate-200 dark:border-stroke/60 flex items-center justify-center text-xs transition-transform active:scale-90"
                        onClick={(e) => toggleFavorite(item.id, e)}
                        aria-label="Add to favorites"
                      >
                        <span className={favorites[item.id] ? "text-pink-500" : "text-slate-400 dark:text-muted"}>
                          {favorites[item.id] ? "♥" : "♡"}
                        </span>
                      </button>
                    </div>

                    {/* Details */}
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-text-primary mb-0.5 line-clamp-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {item.name}
                      </h4>
                      <span className="text-[10px] sm:text-xs text-slate-400 dark:text-muted block mb-1">
                        16–37 размеры
                      </span>
                      <div className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-text-primary mb-3">
                        {item.price.toLocaleString()} ₽
                      </div>
                    </div>

                    {/* Action Button: Подробнее */}
                    <button
                      className="w-full py-2 rounded-2xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-800/50 text-xs font-semibold text-purple-600 dark:text-purple-300 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white transition-all duration-200"
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

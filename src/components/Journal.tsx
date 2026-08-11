import { useState } from "react";
import { motion } from "framer-motion";
import { CATALOG_PRODUCTS, type ProductModel } from "../data/catalogData";
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
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedSize, setSelectedSize] = useState<number | null>(20);
  const [activeProduct, setActiveProduct] = useState<ProductModel | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredProducts = CATALOG_PRODUCTS.filter((prod) => {
    if (activeCategory !== "all" && prod.target !== activeCategory) {
      return false;
    }
    if (selectedSize !== null && !prod.sizeRange.includes(selectedSize)) {
      return false;
    }
    return true;
  });

  return (
    <section id="journal" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Header (Photo 2 Header) */}
        <motion.div
          className="mb-8 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              Оптовый каталог
            </span>
          </div>
          <div className="flex items-baseline gap-3 flex-wrap">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display italic text-text-primary leading-tight">
              Каталог обуви
            </h2>
            <span className="text-xs sm:text-sm text-muted">
              Выберите модель и перейдите в мессенджер ♡
            </span>
          </div>
        </motion.div>

        {/* Category Filters Row (Photo 2 Pill Bar) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
          {CATEGORY_FILTERS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-2xl whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30 scale-105"
                  : "bg-surface text-text-primary hover:bg-purple-50 dark:hover:bg-purple-900/30 border border-stroke/60"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Size Selection Row (Photo 2 Size Pills) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {ALL_SIZES.map((sz) => (
            <button
              key={sz}
              onClick={() => setSelectedSize(selectedSize === sz ? null : sz)}
              className={`w-9 h-9 min-w-[36px] text-xs font-semibold rounded-xl transition-all duration-200 ${
                selectedSize === sz
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30 scale-110"
                  : "bg-surface text-text-primary hover:border-purple-400 border border-stroke/60"
              }`}
            >
              {sz}
            </button>
          ))}
        </div>

        {/* 6 Product Cards Grid (Photo 2 Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((item) => (
            <motion.div
              key={item.id}
              className="group relative bg-surface border border-stroke rounded-3xl p-4 sm:p-5 flex flex-col justify-between hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => setActiveProduct(item)}
            >
              {/* Image box */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white/5 mb-4 border border-stroke/50 flex items-center justify-center p-2">
                <img
                  src={item.mainImage}
                  alt={item.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />

                {/* Favorite Heart Button */}
                <button
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface/80 backdrop-blur-md border border-stroke/60 flex items-center justify-center text-sm transition-transform active:scale-90"
                  onClick={(e) => toggleFavorite(item.id, e)}
                  aria-label="Add to favorites"
                >
                  <span className={favorites[item.id] ? "text-pink-500" : "text-muted"}>
                    {favorites[item.id] ? "♥" : "♡"}
                  </span>
                </button>
              </div>

              {/* Title & Size Range */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-0.5 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {item.name}
                </h3>
                <span className="text-xs text-muted block mb-3">
                  16–37 размеры
                </span>

                {/* Price */}
                <div className="text-lg font-bold text-text-primary mb-4">
                  {item.price.toLocaleString()} ₽
                </div>
              </div>

              {/* Action Button */}
              <button
                className="w-full py-2.5 rounded-2xl bg-bg border border-stroke text-xs sm:text-sm font-semibold text-purple-600 dark:text-purple-300 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveProduct(item);
                }}
              >
                Подробнее
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Product Details Modal (Photo 1) */}
      <ProductModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
      />
    </section>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ProductModel } from "../data/catalogData";

interface ProductModalProps {
  product: ProductModel | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(
    product.gallery[0] || product.mainImage
  );
  const [selectedSize, setSelectedSize] = useState(20);
  const [showSizeChart, setShowSizeChart] = useState(false);

  const whatsappLink = `https://wa.me/79165372315?text=${encodeURIComponent(
    `Здравствуйте! Хочу оформить оптовый заказ на модель: "${product.name}", размер ${selectedSize}, цена ${product.price} ₽.`
  )}`;

  const telegramLink = `https://t.me/share/url?url=${encodeURIComponent(
    window.location.href
  )}&text=${encodeURIComponent(
    `Здравствуйте! Хочу оформить оптовый заказ на модель: "${product.name}", размер ${selectedSize}, цена ${product.price} ₽.`
  )}`;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[2000] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-2xl w-full bg-surface border border-stroke rounded-3xl p-5 sm:p-8 shadow-2xl overflow-hidden my-auto cursor-default"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-muted hover:text-text-primary text-xl w-9 h-9 rounded-full bg-bg/80 flex items-center justify-center border border-stroke transition-colors z-20"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>

          {/* Main Large Image Viewer */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 border border-stroke/60 bg-white/5 flex items-center justify-center">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-contain p-2"
            />
          </div>

          {/* 4 Thumbnail Angles */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            {product.gallery.map((img, idx) => (
              <button
                key={idx}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all p-1 bg-white/5 ${
                  selectedImage === img
                    ? "border-purple-600 scale-105 shadow-md shadow-purple-500/20"
                    : "border-stroke/60 opacity-70 hover:opacity-100"
                }`}
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img}
                  alt={`${product.name} angle ${idx + 1}`}
                  className="w-full h-full object-contain"
                />
              </button>
            ))}
          </div>

          {/* New Badge & Rating */}
          <div className="flex items-center gap-3 mb-2">
            {product.badge && (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300">
                {product.badge}
              </span>
            )}
            <div className="flex items-center gap-1.5 text-xs font-medium text-amber-400">
              <span>★</span>
              <span className="text-text-primary font-semibold">
                {product.rating}
              </span>
              <span className="text-muted">| {product.reviewsCount} отзывов</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-display italic text-text-primary mb-3">
            {product.name}
          </h2>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-2xl sm:text-3xl font-bold text-text-primary">
              {product.price.toLocaleString()} ₽
            </span>
            <span className="text-sm sm:text-base text-muted line-through">
              {product.oldPrice.toLocaleString()} ₽
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-300">
              {product.discount}
            </span>
          </div>

          {/* Sizes Row */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                Размеры в коробе:
              </span>
              <button
                className="text-xs text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 font-medium"
                onClick={() => setShowSizeChart(!showSizeChart)}
              >
                <span>📏</span>
                <span>Таблица размеров</span>
              </button>
            </div>

            {/* Size Pills */}
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1 border border-stroke/40 rounded-xl bg-bg/50">
              {product.sizeRange.map((sz) => (
                <button
                  key={sz}
                  className={`min-w-[32px] h-8 text-xs font-semibold rounded-lg transition-all ${
                    selectedSize === sz
                      ? "bg-purple-600 text-white shadow-md shadow-purple-600/30 scale-105"
                      : "bg-surface hover:bg-purple-50 dark:hover:bg-purple-900/30 text-text-primary border border-stroke/60"
                  }`}
                  onClick={() => setSelectedSize(sz)}
                >
                  {sz}
                </button>
              ))}
            </div>

            {/* Size chart modal drop */}
            {showSizeChart && (
              <div className="mt-3 p-3 rounded-xl bg-bg border border-stroke text-xs text-muted leading-relaxed animate-fade-in">
                <strong>Размерная сетка обуви «Корона и Карусель»:</strong>
                <ul className="mt-1 space-y-0.5">
                  <li>• 16-20 (Ясельная группа): 10.5 — 12.5 см</li>
                  <li>• 21-26 (Малодетская группа): 13.0 — 16.5 см</li>
                  <li>• 27-31 (Дошкольная группа): 17.0 — 19.5 см</li>
                  <li>• 31-37 (Школьная группа): 20.0 — 23.5 см</li>
                </ul>
              </div>
            )}
          </div>

          {/* Specifications */}
          <div className="space-y-2 mb-6 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted">Цвет:</span>
              <span className="w-3 h-3 rounded-full border border-stroke" style={{ backgroundColor: product.colorHex }} />
              <span className="font-medium text-text-primary">{product.color}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted">Материал:</span>
              <span className="font-medium text-text-primary">🍃 {product.material}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-muted leading-relaxed mb-6 border-t border-stroke/40 pt-4">
            {product.description}
          </p>

          {/* WhatsApp & Telegram Order CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/30 hover:scale-[1.02]"
            >
              <span>💬</span>
              <span>Заказать в WhatsApp</span>
            </a>

            <a
              href={telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-sky-600/30 hover:scale-[1.02]"
            >
              <span>✈️</span>
              <span>Заказать в Telegram</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

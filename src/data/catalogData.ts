export interface ProductModel {
  id: string;
  name: string;
  category: "winter" | "demi" | "summer" | "school";
  target: "girls" | "boys" | "school" | "sneakers" | "shoes" | "sandals";
  price: number;
  oldPrice: number;
  discount: string;
  rating: number;
  reviewsCount: number;
  sizeRange: number[];
  color: string;
  colorHex: string;
  material: string;
  description: string;
  badge?: string;
  mainImage: string;
  gallery: string[];
}

export const CATALOG_PRODUCTS: ProductModel[] = [
  {
    id: "mini-step-classic",
    name: "Туфли MiniStep Classic",
    category: "school",
    target: "girls",
    price: 2990,
    oldPrice: 3590,
    discount: "-17%",
    rating: 4.9,
    reviewsCount: 128,
    sizeRange: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 36, 37],
    color: "Коричневый",
    colorHex: "#5C3A21",
    material: "Экокожа (Мягкая и прочная, легко чистится)",
    description:
      "Классические туфли Mary Jane для девочек. Лёгкие, удобные и на каждый день — для школы, прогулок и особых случаев. Надёжная подошва и мягкая стелька обеспечивают комфорт в течение всего дня.",
    badge: "New",
    mainImage: "images/shoe_classic_brown_1.jpg",
    gallery: [
      "images/shoe_classic_brown_1.jpg",
      "images/shoe_classic_brown_2.jpg",
      "images/shoe_classic_brown_3.jpg",
      "images/shoe_classic_brown_1.jpg",
    ],
  },
  {
    id: "mini-step-air",
    name: "Сандалии MiniStep Air",
    category: "summer",
    target: "sandals",
    price: 2590,
    oldPrice: 3190,
    discount: "-18%",
    rating: 4.8,
    reviewsCount: 94,
    sizeRange: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 36, 37],
    color: "Белый",
    colorHex: "#F3F4F6",
    material: "Дышащий текстиль + Анатомическая стелька",
    description:
      "Лёгкие и устойчивые сандалии на регулируемых липучках. Фирменная анатомическая подушечка поддерживает стопу ребенка во время активных летних игр.",
    badge: "Хит",
    mainImage: "images/shoe_sandals_white_1.jpg",
    gallery: [
      "images/shoe_sandals_white_1.jpg",
      "images/shoe_sandals_white_1.jpg",
      "images/shoe_sandals_white_1.jpg",
      "images/shoe_sandals_white_1.jpg",
    ],
  },
  {
    id: "mini-step-light",
    name: "Кроссовки MiniStep Light",
    category: "school",
    target: "sneakers",
    price: 2790,
    oldPrice: 3390,
    discount: "-17%",
    rating: 4.9,
    reviewsCount: 156,
    sizeRange: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 36, 37],
    color: "Розовый с белым",
    colorHex: "#F472B6",
    material: "Экокожа + Износостойкая гибкая подошва",
    description:
      "Стильные спортивные кроссовки для физкультуры и прогулок. Усиленный носок защищает от потертостей, а амортизирующая подошва снижает нагрузку на суставы.",
    badge: "New",
    mainImage: "images/shoe_sneakers_pink_1.jpg",
    gallery: [
      "images/shoe_sneakers_pink_1.jpg",
      "images/shoe_sneakers_pink_1.jpg",
      "images/shoe_sneakers_pink_1.jpg",
      "images/shoe_sneakers_pink_1.jpg",
    ],
  },
  {
    id: "mini-step-school",
    name: "Лоферы MiniStep School",
    category: "school",
    target: "school",
    price: 2890,
    oldPrice: 3490,
    discount: "-17%",
    rating: 5.0,
    reviewsCount: 88,
    sizeRange: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 36, 37],
    color: "Тёмно-синий",
    colorHex: "#1E3A8A",
    material: "Натуральная гладкая кожа",
    description:
      "Строгие школьные лоферы премиального класса. Изготовлены из натуральной кожи высшего качества. Подходят под любую школьную форму.",
    badge: "Премиум",
    mainImage: "images/shoe_loafers_navy_1.jpg",
    gallery: [
      "images/shoe_loafers_navy_1.jpg",
      "images/shoe_loafers_navy_1.jpg",
      "images/shoe_loafers_navy_1.jpg",
      "images/shoe_loafers_navy_1.jpg",
    ],
  },
  {
    id: "mini-step-white",
    name: "Кроссовки MiniStep White",
    category: "school",
    target: "sneakers",
    price: 2690,
    oldPrice: 3290,
    discount: "-18%",
    rating: 4.9,
    reviewsCount: 112,
    sizeRange: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 36, 37],
    color: "Белоснежный",
    colorHex: "#FFFFFF",
    material: "Экокожа + Усиленный супинатор",
    description:
      "Универсальные белые кроссовки на двоиной липучке. Удобно обувать самостоятельно даже самым маленьким детям.",
    badge: "New",
    mainImage: "images/kids_spring_sneakers_1786224784565.jpg",
    gallery: [
      "images/kids_spring_sneakers_1786224784565.jpg",
      "images/kids_spring_sneakers_1786224784565.jpg",
      "images/kids_spring_sneakers_1786224784565.jpg",
      "images/kids_spring_sneakers_1786224784565.jpg",
    ],
  },
  {
    id: "mini-step-beige",
    name: "Сандалии MiniStep Beige",
    category: "summer",
    target: "sandals",
    price: 2490,
    oldPrice: 2990,
    discount: "-16%",
    rating: 4.8,
    reviewsCount: 79,
    sizeRange: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 36, 37],
    color: "Бежевый",
    colorHex: "#D97706",
    material: "Натуральная замша + Кожаная стелька",
    description:
      "Мягкие сандалии в натуральных бежевых тонах. Качественная замшевая отделка и гибкая нескользящая подошва.",
    badge: "Лето",
    mainImage: "images/shoe_sandals_beige_1.jpg",
    gallery: [
      "images/shoe_sandals_beige_1.jpg",
      "images/shoe_sandals_beige_1.jpg",
      "images/shoe_sandals_beige_1.jpg",
      "images/shoe_sandals_beige_1.jpg",
    ],
  },
];

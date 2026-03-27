import type { FilterState } from "../components/FilterBar";

/* ─── Types ──────────────────────────────────────────────────── */
export type Badge = "new" | "sale" | "hot" | null;

export interface Review {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
}

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  badge: Badge;
  image: string;
  gallery: string[];
  colors: string[];
  colorIds: string[];
  sizes: string[];
  rating: number;
  reviews: number;
  description: string;
  material: string;
  warranty: string;
  category: string;
  mockReviews: Review[];
}

/* ─── Shared gallery images ──────────────────────────────────── */
const G1 = "https://images.unsplash.com/photo-1768647417374-5a31c61dc5d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VyJTIwc2hvZSUyMGRldGFpbCUyMGNsb3NlJTIwdXAlMjBwcm9kdWN0JTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzczNDY3MjA2fDA&ixlib=rb-4.1.0&q=80&w=600";
const G2 = "https://images.unsplash.com/photo-1689020188062-086bcae2b17b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VyJTIwc2lkZSUyMHZpZXclMjB3aGl0ZSUyMGJhY2tncm91bmQlMjBjbGVhbnxlbnwxfHx8fDE3NzM0NjcyMDd8MA&ixlib=rb-4.1.0&q=80&w=600";
const G3 = "https://images.unsplash.com/photo-1669159423685-4fa4e23faaad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjB3ZWFyaW5nJTIwc25lYWtlcnMlMjBzdHJlZXQlMjBzdHlsZSUyMGZlZXR8ZW58MXx8fHwxNzczNDY3MjEwfDA&ixlib=rb-4.1.0&q=80&w=600";
const G4 = "https://images.unsplash.com/photo-1710317959021-36dfca8a9abd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VyJTIwYm94JTIwcGFja2FnaW5nJTIwdW5ib3hpbmclMjBsaWZlc3R5bGV8ZW58MXx8fHwxNzczNDY3MjExfDA&ixlib=rb-4.1.0&q=80&w=600";

/* ─── Badge config ───────────────────────────────────────────── */
export const BADGE_STYLE: Record<NonNullable<Badge>, { label: string; bg: string; color: string }> = {
  new:  { label: "Mới",    bg: "#0077CC", color: "#fff" },
  sale: { label: "Sale",   bg: "#FF6A00", color: "#fff" },
  hot:  { label: "🔥 Hot", bg: "#CC0000", color: "#fff" },
};

/* ─── Mock reviews ───────────────────────────────────────────── */
const REVIEWS_1: Review[] = [
  { id: 1, author: "Minh Khôi", avatar: "MK", rating: 5, date: "10/03/2026", text: "Giày quá chất luôn! Đi cực êm chân, form chuẩn, giao hàng nhanh. Mình size 41 lấy 41 vừa đẹp.", verified: true },
  { id: 2, author: "Thuỳ Linh", avatar: "TL", rating: 5, date: "08/03/2026", text: "Mua lần 2 rồi, lần nào cũng hài lòng. Chất lượng hàng tốt, đúng mô tả. ZayZepZone uy tín!", verified: true },
  { id: 3, author: "Hoàng Nam", avatar: "HN", rating: 4, date: "05/03/2026", text: "Giày đẹp, đi êm. Màu ngoài đời đẹp hơn ảnh một chút. Minus 1 sao vì hộp hơi móp.", verified: false },
];

const REVIEWS_2: Review[] = [
  { id: 4, author: "Bảo Nguyên", avatar: "BN", rating: 5, date: "12/03/2026", text: "Sản phẩm chất lượng cao, đóng gói cẩn thận. Đi thể thao rất thoải mái.", verified: true },
  { id: 5, author: "Hà My", avatar: "HM", rating: 4, date: "09/03/2026", text: "Nhìn chung ok, giày nhẹ và êm. Recommend cho các bạn thích chạy bộ buổi sáng.", verified: true },
];

/* ─── Products ───────────────────────────────────────────────── */
export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Air Urban Classic",
    brand: "KickZone",
    price: 1_290_000,
    badge: "new",
    image: "https://images.unsplash.com/photo-1641687589434-a86e8de59855?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyME5pa2UlMjBzbmVha2VyJTIwcHJvZHVjdCUyMGZsYXQlMjBsYXl8ZW58MXx8fHwxNzczMjc3MTcwfDA&ixlib=rb-4.1.0&q=80&w=600",
    gallery: ["https://images.unsplash.com/photo-1641687589434-a86e8de59855?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyME5pa2UlMjBzbmVha2VyJTIwcHJvZHVjdCUyMGZsYXQlMjBsYXl8ZW58MXx8fHwxNzczMjc3MTcwfDA&ixlib=rb-4.1.0&q=80&w=800", G1, G2, G3],
    colors: ["#FFFFFF", "#1A1A1A", "#0077CC"],
    colorIds: ["white", "black", "blue"],
    sizes: ["38", "39", "40", "41", "42", "43"],
    rating: 4.8,
    reviews: 234,
    description: "Air Urban Classic là đôi giày sneaker lifestyle đỉnh cao từ KickZone, được thiết kế dành riêng cho giới trẻ năng động TP.HCM. Đế EVA siêu nhẹ, đế ngoài cao su chống trượt.",
    material: "Upper: Da tổng hợp cao cấp + Lưới thoáng khí | Đế giữa: EVA siêu nhẹ | Đế ngoài: Cao su tự nhiên",
    warranty: "Bảo hành 12 tháng lỗi sản xuất",
    category: "Lifestyle",
    mockReviews: REVIEWS_1,
  },
  {
    id: 2,
    name: "Street Runner Pro",
    brand: "SpeedX",
    price: 890_000,
    originalPrice: 1_190_000,
    badge: "sale",
    image: "https://images.unsplash.com/photo-1629955282615-8e86ac499410?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZGlkYXMlMjBydW5uaW5nJTIwc2hvZSUyMHByb2R1Y3QlMjBwaG90b3xlbnwxfHx8fDE3NzMyNzcxNzB8MA&ixlib=rb-4.1.0&q=80&w=600",
    gallery: ["https://images.unsplash.com/photo-1629955282615-8e86ac499410?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZGlkYXMlMjBydW5uaW5nJTIwc2hvZSUyMHByb2R1Y3QlMjBwaG90b3xlbnwxfHx8fDE3NzMyNzcxNzB8MA&ixlib=rb-4.1.0&q=80&w=800", G2, G3, G4],
    colors: ["#FF6A00", "#FFFFFF", "#222"],
    colorIds: ["orange", "white", "black"],
    sizes: ["36", "37", "38", "39", "40"],
    rating: 4.6,
    reviews: 187,
    description: "Street Runner Pro thiết kế cho những tâm hồn đam mê tốc độ và phong cách đường phố. Công nghệ đệm ProFoam giảm chấn tối ưu, form ôm chân tự nhiên.",
    material: "Upper: Lưới Flyknit thoáng khí | Đế giữa: ProFoam+ | Đế ngoài: Cao su Continental",
    warranty: "Bảo hành 6 tháng lỗi sản xuất",
    category: "Running",
    mockReviews: REVIEWS_2,
  },
  {
    id: 3,
    name: "Court Legacy Hi",
    brand: "Jumpman",
    price: 2_150_000,
    badge: "hot",
    image: "https://images.unsplash.com/photo-1576606252828-4f240d409de8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMEpvcmRhbiUyMGJhc2tldGJhbGwlMjBzbmVha2VyJTIwc3R1ZGlvfGVufDF8fHx8MTc3MzI3NzE3MXww&ixlib=rb-4.1.0&q=80&w=600",
    gallery: ["https://images.unsplash.com/photo-1576606252828-4f240d409de8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMEpvcmRhbiUyMGJhc2tldGJhbGwlMjBzbmVha2VyJTIwc3R1ZGlvfGVufDF8fHx8MTc3MzI3NzE3MXww&ixlib=rb-4.1.0&q=80&w=800", G1, G3, G4],
    colors: ["#CC0000", "#1A1A1A", "#C8A96E"],
    colorIds: ["red", "black"],
    sizes: ["40", "41", "42", "43", "44"],
    rating: 4.9,
    reviews: 412,
    description: "Court Legacy Hi là biểu tượng bóng rổ được tái sinh thành văn hóa đường phố. Cổ cao bảo vệ mắt cá, đế Air Unit huyền thoại.",
    material: "Upper: Da thật full-grain cao cấp | Đế giữa: Air-Cushion Unit | Đế ngoài: Cao su multi-pattern",
    warranty: "Bảo hành 12 tháng lỗi sản xuất",
    category: "Basketball",
    mockReviews: REVIEWS_1,
  },
  {
    id: 4,
    name: "Midnight Edge",
    brand: "DarkStep",
    price: 1_050_000,
    originalPrice: 1_350_000,
    badge: "sale",
    image: "https://images.unsplash.com/photo-1676838179247-6e60dba67d5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGxlYXRoZXIlMjBzbmVha2VyJTIwbWluaW1hbGlzdCUyMHByb2R1Y3R8ZW58MXx8fHwxNzczMjc3MTcxfDA&ixlib=rb-4.1.0&q=80&w=600",
    gallery: ["https://images.unsplash.com/photo-1676838179247-6e60dba67d5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGxlYXRoZXIlMjBzbmVha2VyJTIwbWluaW1hbGlzdCUyMHByb2R1Y3R8ZW58MXx8fHwxNzczMjc3MTcxfDA&ixlib=rb-4.1.0&q=80&w=800", G2, G1, G4],
    colors: ["#111", "#555", "#0077CC"],
    colorIds: ["black", "blue"],
    sizes: ["38", "39", "40", "41", "42"],
    rating: 4.5,
    reviews: 98,
    description: "Midnight Edge mang vẻ đẹp tối giản và bí ẩn. Thiết kế monochrome hoàn hảo cho những buổi tối dạo phố.",
    material: "Upper: Da PU premium chống thấm | Đế giữa: Memory foam | Đế ngoài: Cao su non-marking",
    warranty: "Bảo hành 6 tháng lỗi sản xuất",
    category: "Lifestyle",
    mockReviews: REVIEWS_2,
  },
  {
    id: 5,
    name: "Cloud Drift Retro",
    brand: "AeroStep",
    price: 1_680_000,
    badge: "new",
    image: "https://images.unsplash.com/photo-1748354815017-94c4be51dea9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRybyUyMGNodW5reSUyMHNuZWFrZXIlMjBwYXN0ZWwlMjBmYXNoaW9ufGVufDF8fHx8MTc3MzI3NzE3NHww&ixlib=rb-4.1.0&q=80&w=600",
    gallery: ["https://images.unsplash.com/photo-1748354815017-94c4be51dea9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRybyUyMGNodW5reSUyMHNuZWFrZXIlMjBwYXN0ZWwlMjBmYXNoaW9ufGVufDF8fHx8MTc3MzI3NzE3NHww&ixlib=rb-4.1.0&q=80&w=800", G1, G2, G3],
    colors: ["#FFD1DC", "#B5EAD7", "#C9C0E3"],
    colorIds: ["pink", "green"],
    sizes: ["36", "37", "38", "39"],
    rating: 4.7,
    reviews: 156,
    description: "Cloud Drift Retro là sự hòa quyện giữa thẩm mỹ retro 90s và công nghệ đế chunky hiện đại. Màu pastel trendy dành cho các bạn nữ yêu phong cách Y2K.",
    material: "Upper: Suede + Lưới mesh | Đế giữa: Foam chunky 3cm | Đế ngoài: EVA cao su tổng hợp",
    warranty: "Bảo hành 6 tháng lỗi sản xuất",
    category: "Lifestyle",
    mockReviews: REVIEWS_1,
  },
  {
    id: 6,
    name: "Skate Classic OG",
    brand: "Vans",
    price: 950_000,
    badge: null,
    image: "https://images.unsplash.com/photo-1596742797871-b12e5e6b4b1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWYW5zJTIwb2xkJTIwc2tvb2wlMjBza2F0ZWJvYXJkJTIwc2hvZSUyMHByb2R1Y3R8ZW58MXx8fHwxNzczMjc3MTc0fDA&ixlib=rb-4.1.0&q=80&w=600",
    gallery: ["https://images.unsplash.com/photo-1596742797871-b12e5e6b4b1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWYW5zJTIwb2xkJTIwc2tvb2wlMjBza2F0ZWJvYXJkJTIwc2hvZSUyMHByb2R1Y3R8ZW58MXx8fHwxNzczMjc3MTc0fDA&ixlib=rb-4.1.0&q=80&w=800", G3, G1, G4],
    colors: ["#1A1A1A", "#FFFFFF", "#CC0000"],
    colorIds: ["black", "white", "red"],
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    rating: 4.7,
    reviews: 302,
    description: "Skate Classic OG là huyền thoại skateboarding từ 1966 đến nay. Form giày low-top classic, đế waffle grip huyền thoại, phù hợp với mọi phong cách từ skate đến daily wear.",
    material: "Upper: Canvas/Da tổng hợp | Đế giữa: Foam chuẩn | Đế ngoài: Cao su Waffle grip",
    warranty: "Bảo hành 6 tháng lỗi sản xuất",
    category: "Skate",
    mockReviews: REVIEWS_2,
  },
  {
    id: 7,
    name: "Flame High-Top",
    brand: "BlazeKick",
    price: 1_450_000,
    originalPrice: 1_750_000,
    badge: "sale",
    image: "https://images.unsplash.com/photo-1592081253197-c1a3b3158701?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBoaWdoJTIwdG9wJTIwc25lYWtlciUyMHN0cmVldCUyMHN0eWxlfGVufDF8fHx8MTc3MzI3NzE3NXww&ixlib=rb-4.1.0&q=80&w=600",
    gallery: ["https://images.unsplash.com/photo-1592081253197-c1a3b3158701?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBoaWdoJTIwdG9wJTIwc25lYWtlciUyMHN0cmVldCUyMHN0eWxlfGVufDF8fHx8MTc3MzI3NzE3NXww&ixlib=rb-4.1.0&q=80&w=800", G1, G3, G2],
    colors: ["#CC0000", "#FF6A00"],
    colorIds: ["red", "orange"],
    sizes: ["39", "40", "41", "42"],
    rating: 4.6,
    reviews: 89,
    description: "Flame High-Top cháy bỏng như ngọn lửa đường phố. Cổ cao bold statement, màu đỏ/cam nổi bật, dành cho những ai không ngại tạo điểm nhấn.",
    material: "Upper: Da tổng hợp flame-treated | Đế giữa: Gel cushion | Đế ngoài: Carbon rubber",
    warranty: "Bảo hành 6 tháng lỗi sản xuất",
    category: "Lifestyle",
    mockReviews: REVIEWS_1,
  },
  {
    id: 8,
    name: "Neon Sprint X",
    brand: "PacePro",
    price: 1_120_000,
    badge: "new",
    image: "https://images.unsplash.com/photo-1715692965448-770874c71e7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMFB1bWElMjBzcG9ydCUyMHNob2UlMjBwcm9kdWN0JTIwY2xlYW4lMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc3MzI3NzE3NXww&ixlib=rb-4.1.0&q=80&w=600",
    gallery: ["https://images.unsplash.com/photo-1715692965448-770874c71e7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMFB1bWElMjBzcG9ydCUyMHNob2UlMjBwcm9kdWN0JTIwY2xlYW4lMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc3MzI3NzE3NXww&ixlib=rb-4.1.0&q=80&w=800", G2, G1, G3],
    colors: ["#00CC66", "#111", "#FFD600"],
    colorIds: ["green", "black", "yellow"],
    sizes: ["40", "41", "42", "43", "44", "45"],
    rating: 4.4,
    reviews: 63,
    description: "Neon Sprint X bứt phá giới hạn với màu neon táo bạo và công nghệ SprintTech. Thiết kế khí động học, phù hợp cho cả tập luyện và street style.",
    material: "Upper: Lưới kỹ thuật Aeroknit | Đế giữa: SprintFoam | Đế ngoài: High-traction rubber",
    warranty: "Bảo hành 6 tháng lỗi sản xuất",
    category: "Running",
    mockReviews: REVIEWS_2,
  },
];

/* ─── Helpers ────────────────────────────────────────────────── */
export function formatVND(n: number): string {
  return n.toLocaleString("vi-VN") + "₫";
}

export function discountPct(price: number, original: number): number {
  return Math.round(((original - price) / original) * 100);
}

export function matchesPrice(price: number, rangeId: string): boolean {
  if (!rangeId) return true;
  if (rangeId === "under1m")   return price < 1_000_000;
  if (rangeId === "1mto1_5m")  return price >= 1_000_000 && price < 1_500_000;
  if (rangeId === "1_5mto2m")  return price >= 1_500_000 && price < 2_000_000;
  if (rangeId === "over2m")    return price >= 2_000_000;
  return true;
}

export function applyFilters(products: Product[], f: FilterState): Product[] {
  return products.filter((p) => {
    if (f.search) {
      const q = f.search.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.brand.toLowerCase().includes(q)) return false;
    }
    if (f.sizes.length && !f.sizes.some((s) => p.sizes.includes(s))) return false;
    if (f.brands.length && !f.brands.includes(p.brand)) return false;
    if (f.priceRange && !matchesPrice(p.price, f.priceRange)) return false;
    if (f.colors.length && !f.colors.some((c) => p.colorIds.includes(c))) return false;
    if (f.saleOnly && !p.originalPrice) return false;
    return true;
  });
}

export function getRelatedProducts(id: number, count = 4): Product[] {
  const others = PRODUCTS.filter((p) => p.id !== id);
  const shuffled = [...others].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

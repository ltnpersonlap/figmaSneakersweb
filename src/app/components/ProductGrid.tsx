import { useState } from "react";
import { useNavigate } from "react-router";
import { toast, Toaster } from "sonner";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { FilterState } from "./FilterBar";
import { PRODUCTS, BADGE_STYLE, applyFilters, formatVND, discountPct } from "../data/products";

/* ─── Fly-to-cart animation ──────────────────────────────────── */
function flyToCart(startRect: DOMRect, imageUrl: string) {
  const cartEl = document.getElementById("navbar-cart-icon");
  if (!cartEl) return;
  const cartRect = cartEl.getBoundingClientRect();

  const fly = document.createElement("div");
  fly.setAttribute("aria-hidden", "true");
  const startX = startRect.left + startRect.width / 2 - 24;
  const startY = startRect.top + startRect.height / 2 - 24;

  fly.style.cssText = `
    position: fixed;
    z-index: 9999;
    pointer-events: none;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-image: url(${imageUrl});
    background-size: cover;
    background-position: center;
    border: 2.5px solid #FF6A00;
    box-shadow: 0 4px 20px rgba(255,106,0,0.5);
    left: ${startX}px;
    top: ${startY}px;
    transition: left 0.7s cubic-bezier(0.2, 0.8, 0.6, 1), top 0.7s cubic-bezier(0.2, 0.8, 0.6, 1), transform 0.7s ease, opacity 0.7s ease;
    transform: scale(1);
    opacity: 1;
  `;
  document.body.appendChild(fly);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const endX = cartRect.left + cartRect.width / 2 - 24;
      const endY = cartRect.top + cartRect.height / 2 - 24;
      fly.style.left = `${endX}px`;
      fly.style.top = `${endY}px`;
      fly.style.transform = "scale(0.25)";
      fly.style.opacity = "0";
    });
  });

  setTimeout(() => { fly.remove(); }, 780);
}

/* ─── Star row ───────────────────────────────────────────────── */
function StarRow({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-1.5 mt-1" aria-label={`${rating} sao, ${reviews} đánh giá`}>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((s) => (
          <svg key={s} width="11" height="11" viewBox="0 0 24 24"
            fill={s <= Math.round(rating) ? "#FF6A00" : "#E0E0E0"} aria-hidden="true">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
      <span className="text-gray-400" style={{ fontSize: "0.72rem" }}>({reviews})</span>
    </div>
  );
}

/* ─── Cart button ────────────────────────────────────────────── */
function CartButton({ added, name, image, onClick, size }: {
  added: boolean; name: string; image: string; onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; size: "sm" | "base";
}) {
  const py = size === "sm" ? "py-2.5" : "py-2.5";
  return (
    <button
      onClick={onClick}
      disabled={added}
      className={`w-full ${py} rounded-xl text-white text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-orange-400 disabled:opacity-80`}
      style={{
        background: added ? "#22C55E" : "linear-gradient(90deg, #FF6A00, #FF8C38)",
        boxShadow: added ? "none" : "0 4px 14px rgba(255,106,0,0.35)",
      }}
      aria-label={added ? "Đã thêm vào giỏ" : `Thêm ${name} vào giỏ hàng`}
    >
      <span className="flex items-center justify-center gap-1.5">
        {added ? (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            Đã thêm
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            Thêm vào giỏ
          </>
        )}
      </span>
    </button>
  );
}

/* ─── Product Card ───────────────────────────────────────────── */
function ProductCard({ product }: { product: typeof PRODUCTS[0] }) {
  const navigate = useNavigate();
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  function handleAddToCart(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    flyToCart(rect, product.image);
    setAdded(true);
    toast.success("Đã thêm vào giỏ hàng!", {
      description: product.name,
      icon: "🛒",
      duration: 2500,
      style: { fontFamily: "'Inter', sans-serif" },
    });
    setTimeout(() => setAdded(false), 2600);
  }

  function handleWishlist(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setWished((w) => !w);
  }

  const badgeCfg = product.badge ? BADGE_STYLE[product.badge] : null;

  return (
    <article
      onClick={() => navigate(`/san-pham/${product.id}`)}
      className="group relative bg-white rounded-2xl overflow-hidden flex flex-col cursor-pointer"
      style={{
        boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        transition: "box-shadow 0.25s ease, transform 0.25s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,119,204,0.16)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.07)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") navigate(`/san-pham/${product.id}`); }}
      aria-label={`Xem chi tiết ${product.name} – ${product.brand}`}
    >
      {/* ── Image 1:1 ── */}
      <div className="relative w-full" style={{ paddingBottom: "100%" }}>
        <div className="absolute inset-0 bg-gray-50 overflow-hidden">
          <ImageWithFallback
            src={product.image}
            alt={`${product.name} – ${product.brand}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(0,40,100,0.08) 0%, transparent 60%)" }}
          />
        </div>

        {/* Badge top-left */}
        {badgeCfg && (
          <span
            className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-xs font-bold z-10 select-none"
            style={{ background: badgeCfg.bg, color: badgeCfg.color, letterSpacing: "0.02em" }}
            aria-label={`Badge: ${badgeCfg.label}`}
          >
            {badgeCfg.label}
          </span>
        )}

        {/* Discount % */}
        {product.originalPrice && (
          <span
            className="absolute top-2.5 right-10 px-2 py-1 rounded-full text-xs font-bold z-10 select-none"
            style={{ background: "rgba(255,106,0,0.12)", color: "#FF6A00" }}
            aria-label={`Giảm ${discountPct(product.price, product.originalPrice)}%`}
          >
            -{discountPct(product.price, product.originalPrice)}%
          </span>
        )}

        {/* Wishlist */}
        <button
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          style={{
            background: wished ? "#FF6A00" : "rgba(255,255,255,0.92)",
            boxShadow: "0 1px 6px rgba(0,0,0,0.12)",
          }}
          onClick={handleWishlist}
          aria-label={wished ? `Bỏ yêu thích ${product.name}` : `Yêu thích ${product.name}`}
          aria-pressed={wished}
        >
          <svg width="15" height="15" viewBox="0 0 24 24"
            fill={wished ? "white" : "none"}
            stroke={wished ? "none" : "#999"}
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Add to cart – desktop hover */}
        <div className="
          absolute bottom-0 left-0 right-0 px-3 pb-3
          translate-y-full opacity-0
          group-hover:translate-y-0 group-hover:opacity-100
          transition-all duration-300 ease-out
          hidden sm:block z-10
        ">
          <CartButton added={added} name={product.name} image={product.image} onClick={handleAddToCart} size="sm" />
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-3 pt-2.5">
        <p className="text-gray-400 uppercase tracking-widest" style={{ fontSize: "0.68rem", fontWeight: 600 }}>
          {product.brand}
        </p>
        <h3
          className="text-gray-800 mt-0.5 leading-snug line-clamp-2"
          style={{ fontSize: "0.92rem", fontWeight: 700 }}
          title={product.name}
        >
          {product.name}
        </h3>
        <StarRow rating={product.rating} reviews={product.reviews} />

        {/* Color swatches */}
        <div className="flex items-center gap-1.5 mt-2" aria-label="Màu sắc có sẵn">
          {product.colors.map((c, i) => (
            <span
              key={i}
              className="w-3.5 h-3.5 rounded-full border border-gray-200 flex-shrink-0"
              style={{ background: c }}
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-2">
          <span
            className="font-black"
            style={{ color: "#0077CC", fontSize: "clamp(0.95rem, 2vw, 1.05rem)" }}
            aria-label={`Giá: ${formatVND(product.price)}`}
          >
            {formatVND(product.price)}
          </span>
          {product.originalPrice && (
            <span className="line-through text-gray-400" style={{ fontSize: "0.8rem" }}
              aria-label={`Giá gốc: ${formatVND(product.originalPrice)}`}>
              {formatVND(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Add to cart – mobile always visible */}
        <div className="mt-3 sm:hidden">
          <CartButton added={added} name={product.name} image={product.image} onClick={handleAddToCart} size="base" />
        </div>
      </div>
    </article>
  );
}

/* ─── Sort options ───────────────────────────────────────────── */
type SortKey = "default" | "price_asc" | "price_desc" | "rating" | "newest";
const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "default",    label: "Mặc định" },
  { value: "price_asc",  label: "Giá tăng dần" },
  { value: "price_desc", label: "Giá giảm dần" },
  { value: "rating",     label: "Đánh giá cao" },
  { value: "newest",     label: "Mới nhất" },
];

function sortProducts(products: typeof PRODUCTS, sort: SortKey): typeof PRODUCTS {
  const arr = [...products];
  switch (sort) {
    case "price_asc":  return arr.sort((a, b) => a.price - b.price);
    case "price_desc": return arr.sort((a, b) => b.price - a.price);
    case "rating":     return arr.sort((a, b) => b.rating - a.rating);
    case "newest":     return arr.filter((p) => p.badge === "new").concat(arr.filter((p) => p.badge !== "new"));
    default:           return arr;
  }
}

/* ─── Category tabs ──────────────────────────────────────────── */
const TABS = ["Tất cả", "Mới nhất", "Sale", "Dưới 1tr", "Trên 1tr"];

/* ─── Main Grid ──────────────────────────────────────────────── */
interface ProductGridProps {
  filterState: FilterState;
}

export function ProductGrid({ filterState }: ProductGridProps) {
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [sort, setSort] = useState<SortKey>("default");

  function getTabProducts(): typeof PRODUCTS {
    switch (activeTab) {
      case "Mới nhất": return PRODUCTS.filter((p) => p.badge === "new");
      case "Sale":     return PRODUCTS.filter((p) => p.badge === "sale");
      case "Dưới 1tr": return PRODUCTS.filter((p) => p.price < 1_000_000);
      case "Trên 1tr": return PRODUCTS.filter((p) => p.price >= 1_000_000);
      default:         return PRODUCTS;
    }
  }

  const filtered = applyFilters(getTabProducts(), filterState);
  const displayed = sortProducts(filtered, sort);

  return (
    <section
      className="py-14 md:py-18 px-4 md:px-10"
      style={{ background: "#fff", fontFamily: "'Inter', sans-serif" }}
      aria-labelledby="products-heading"
      id="products"
    >
      <Toaster
        position="bottom-right"
        toastOptions={{ style: { fontFamily: "'Inter', sans-serif" } }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <p className="uppercase tracking-widest mb-1"
              style={{ color: "#FF6A00", fontSize: "0.72rem", fontWeight: 700 }}>
              Bộ sưu tập
            </p>
            <h2 id="products-heading" className="text-gray-900"
              style={{ fontSize: "clamp(1.5rem, 4vw, 2.1rem)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Sneakers <span style={{ color: "#0077CC" }}>nổi bật</span>
            </h2>
          </div>

          {/* Result bar: count + sort */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400 font-medium whitespace-nowrap">
              <span className="font-bold" style={{ color: "#0077CC" }}>{displayed.length}</span> sản phẩm
            </span>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="pl-3 pr-8 py-2 rounded-lg text-sm font-medium outline-none cursor-pointer appearance-none transition-all duration-150 focus:ring-2 focus:ring-blue-400"
                style={{
                  background: "#F7F8FA",
                  border: "1.5px solid #E5E7EB",
                  color: "#444",
                }}
                aria-label="Sắp xếp sản phẩm"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m6 9 6 6 6-6" /></svg>
              </span>
            </div>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 mb-6"
          role="tablist" aria-label="Phân loại sản phẩm" style={{ scrollbarWidth: "none" }}>
          {TABS.map((f) => {
            const isActive = f === activeTab;
            return (
              <button key={f} role="tab" aria-selected={isActive}
                onClick={() => setActiveTab(f)}
                className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                style={{
                  background: isActive ? "#0077CC" : "#F0F6FF",
                  color: isActive ? "#fff" : "#555",
                  boxShadow: isActive ? "0 4px 12px rgba(0,119,204,0.3)" : "none",
                }}>
                {f}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: "16px" }}
          role="list" aria-label="Danh sách sản phẩm">
          {displayed.map((product) => (
            <div key={product.id} role="listitem">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {displayed.length === 0 && (
          <div className="py-24 text-center">
            <p style={{ fontSize: "3rem" }} aria-hidden="true">👟</p>
            <p className="mt-3 text-gray-500 font-medium">Không tìm thấy sản phẩm phù hợp</p>
            <p className="text-sm text-gray-400 mt-1">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          </div>
        )}

        {/* Mobile see all */}
        <div className="mt-10 flex justify-center sm:hidden">
          <a href="/san-pham"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-white font-semibold text-sm"
            style={{ background: "#0077CC" }}>
            Xem tất cả sản phẩm
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

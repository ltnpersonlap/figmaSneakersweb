import { useState, useRef } from "react";
import { useParams, useNavigate, NavLink } from "react-router";
import { toast, Toaster } from "sonner";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { PRODUCTS, BADGE_STYLE, formatVND, discountPct, getRelatedProducts } from "../data/products";
import type { Product } from "../data/products";
import { ProductSchema, BreadcrumbSchema } from "../components/StructuredData";
import { SEOMetadata } from "../components/SEOMetadata";

/* ─── Fly-to-cart ────────────────────────────────────────────── */
function flyToCart(startRect: DOMRect, imageUrl: string) {
  const cartEl = document.getElementById("navbar-cart-icon");
  if (!cartEl) return;
  const cartRect = cartEl.getBoundingClientRect();
  const fly = document.createElement("div");
  fly.setAttribute("aria-hidden", "true");
  fly.style.cssText = `
    position: fixed; z-index: 9999; pointer-events: none;
    width: 60px; height: 60px; border-radius: 50%;
    background-image: url(${imageUrl}); background-size: cover; background-position: center;
    border: 3px solid #FF6A00; box-shadow: 0 6px 24px rgba(255,106,0,0.5);
    left: ${startRect.left + startRect.width / 2 - 30}px;
    top: ${startRect.top + startRect.height / 2 - 30}px;
    transition: left 0.75s cubic-bezier(0.2, 0.8, 0.6, 1), top 0.75s cubic-bezier(0.2, 0.8, 0.6, 1), transform 0.75s ease, opacity 0.75s ease;
    transform: scale(1); opacity: 1;
  `;
  document.body.appendChild(fly);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      fly.style.left = `${cartRect.left + cartRect.width / 2 - 30}px`;
      fly.style.top = `${cartRect.top + cartRect.height / 2 - 30}px`;
      fly.style.transform = "scale(0.2)";
      fly.style.opacity = "0";
    });
  });
  setTimeout(() => fly.remove(), 820);
}

/* ─── Star display ───────────────────────────────────────────── */
function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} sao`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width={size} height={size} viewBox="0 0 24 24"
          fill={s <= Math.round(rating) ? "#FF6A00" : "#E0E0E0"} aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

/* ─── Mini product card for related products ─────────────────── */
function RelatedCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  const badgeCfg = product.badge ? BADGE_STYLE[product.badge] : null;
  return (
    <article
      onClick={() => navigate(`/san-pham/${product.id}`)}
      className="group bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-250"
      style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(0,119,204,0.16)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.07)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
      aria-label={`Xem ${product.name}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") navigate(`/san-pham/${product.id}`); }}
    >
      <div className="relative w-full" style={{ paddingBottom: "100%" }}>
        <div className="absolute inset-0 bg-gray-50 overflow-hidden">
          <ImageWithFallback src={product.image} alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
        {badgeCfg && (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold z-10"
            style={{ background: badgeCfg.bg, color: badgeCfg.color }}>
            {badgeCfg.label}
          </span>
        )}
      </div>
      <div className="p-3">
        <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">{product.brand}</p>
        <p className="text-sm font-bold text-gray-800 mt-0.5 line-clamp-1">{product.name}</p>
        <div className="flex items-baseline gap-1.5 mt-1">
          <span className="font-black text-sm" style={{ color: "#0077CC" }}>{formatVND(product.price)}</span>
          {product.originalPrice && (
            <span className="line-through text-gray-400" style={{ fontSize: "0.75rem" }}>{formatVND(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </article>
  );
}

/* ─── Color names map ────────────────────────────────────────── */
const COLOR_NAMES: Record<string, string> = {
  white: "Trắng", black: "Đen", blue: "Xanh dương", red: "Đỏ",
  orange: "Cam", green: "Xanh lá", yellow: "Vàng", pink: "Hồng",
};

/* ─── Main Page ──────────────────────────────────────────────── */
export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find((p) => p.id === Number(id));
  const related = product ? getRelatedProducts(product.id) : [];

  const [activeGallery, setActiveGallery] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  if (!product) {
    return (
      <div className="pt-[65px] min-h-screen flex flex-col items-center justify-center px-6"
        style={{ fontFamily: "'Inter', sans-serif" }}>
        <p style={{ fontSize: "4rem" }}>👟</p>
        <h1 className="text-gray-800 mt-4" style={{ fontWeight: 800, fontSize: "1.5rem" }}>
          Sản phẩm không tồn tại
        </h1>
        <p className="text-gray-500 mt-2 text-sm">Sản phẩm bạn đang tìm kiếm đã bị xóa hoặc chưa được thêm vào.</p>
        <button
          onClick={() => navigate("/san-pham")}
          className="mt-6 px-8 py-3 rounded-full text-white font-bold transition-all hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
          style={{ background: "#0077CC" }}
        >
          Xem tất cả sản phẩm
        </button>
      </div>
    );
  }

  const badgeCfg = product.badge ? BADGE_STYLE[product.badge] : null;

  // Build canonical URL and breadcrumb data
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://zayzepzone.com";
  const canonicalUrl = `${baseUrl}/san-pham/${product.id}`;
  const breadcrumbItems = [
    { name: "Trang chủ", url: baseUrl },
    { name: "Sản phẩm", url: `${baseUrl}/san-pham` },
    { name: product.name, url: canonicalUrl },
  ];

  function handleAddToCart() {
    if (!selectedSize) {
      toast.error("Vui lòng chọn size trước!", { icon: "📏", duration: 2000 });
      return;
    }
    if (!added) {
      setAdded(true);
      if (galleryRef.current) {
        const rect = galleryRef.current.getBoundingClientRect();
        flyToCart(rect, product.gallery[activeGallery]);
      }
      toast.success(`Đã thêm ${quantity} đôi vào giỏ hàng!`, {
        description: `${product.name} – Size ${selectedSize}`,
        icon: "🛒",
        duration: 3000,
      });
      setTimeout(() => setAdded(false), 3200);
    }
  }

  return (
    <>
      {/* SEO & Structured Data */}
      <SEOMetadata
        title={product.name}
        description={product.description}
        keywords={`${product.name}, ${product.brand}, giày ${product.category.toLowerCase()}, sneakers ${product.brand}`}
        canonicalUrl={canonicalUrl}
        ogImage={product.image}
        ogType="product"
        author="ZayZepZone"
      />
      <ProductSchema product={product} url={canonicalUrl} />
      <BreadcrumbSchema items={breadcrumbItems} />

      <div className="pt-[65px] pb-32 md:pb-0" style={{ background: "#F8FAFF", fontFamily: "'Inter', sans-serif" }}>
        <Toaster position="bottom-right" toastOptions={{ style: { fontFamily: "'Inter', sans-serif" } }} />

      {/* ── Breadcrumb ── */}
      <div className="px-4 md:px-10 py-4 max-w-7xl mx-auto">
        <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
          <NavLink to="/" style={{ color: "#0077CC" }} className="hover:underline focus:outline-none focus-visible:underline">
            Trang chủ
          </NavLink>
          <span className="text-gray-300">/</span>
          <NavLink to="/san-pham" style={{ color: "#0077CC" }} className="hover:underline focus:outline-none focus-visible:underline">
            Sản phẩm
          </NavLink>
          <span className="text-gray-300">/</span>
          <span className="text-gray-500 line-clamp-1" style={{ maxWidth: "180px" }}>{product.name}</span>
        </nav>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 pb-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14">

          {/* ── Gallery ── */}
          <div className="flex flex-col gap-4">
            {/* Main image */}
            <div
              ref={galleryRef}
              className="relative w-full rounded-2xl overflow-hidden bg-white"
              style={{ paddingBottom: "100%", boxShadow: "0 4px 24px rgba(0,0,0,0.10)" }}
            >
              <div className="absolute inset-0">
                <ImageWithFallback
                  src={product.gallery[activeGallery]}
                  alt={`${product.name} – Ảnh ${activeGallery + 1}`}
                  className="w-full h-full object-cover"
                  style={{ transition: "opacity 0.3s ease" }}
                />
                {/* Color overlay on selected color */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-2xl"
                  style={{
                    background: `${product.colors[selectedColorIdx]}18`,
                    transition: "background 0.3s ease",
                  }}
                />
              </div>
              {badgeCfg && (
                <span
                  className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-sm font-bold z-10"
                  style={{ background: badgeCfg.bg, color: badgeCfg.color }}
                >
                  {badgeCfg.label}
                </span>
              )}
              {product.originalPrice && (
                <span
                  className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-sm font-bold z-10"
                  style={{ background: "#FF6A00", color: "#fff" }}
                >
                  -{discountPct(product.price, product.originalPrice)}%
                </span>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
              {product.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveGallery(i)}
                  className="flex-shrink-0 rounded-xl overflow-hidden transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  style={{
                    width: "72px",
                    height: "72px",
                    border: `2.5px solid ${activeGallery === i ? "#0077CC" : "transparent"}`,
                    boxShadow: activeGallery === i ? "0 0 0 1px #0077CC" : "0 1px 6px rgba(0,0,0,0.1)",
                  }}
                  aria-label={`Xem ảnh ${i + 1}`}
                  aria-pressed={activeGallery === i}
                >
                  <ImageWithFallback src={img} alt={`Thumbnail ${i + 1}`}
                    className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* ── Product Info ── */}
          <div className="flex flex-col gap-5">
            {/* Brand + Category */}
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{ background: "#EBF5FF", color: "#0077CC" }}
              >
                {product.brand}
              </span>
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: "#FFF3EC", color: "#FF6A00" }}
              >
                {product.category}
              </span>
            </div>

            {/* Name */}
            <h1 className="text-gray-900" style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <Stars rating={product.rating} size={16} />
              <span className="font-bold" style={{ color: "#FF6A00" }}>{product.rating}</span>
              <span className="text-gray-400 text-sm">({product.reviews} đánh giá)</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: "#E8FFF1", color: "#16A34A" }}>
                ✓ Còn hàng
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span
                className="font-black"
                style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", color: "#0077CC", lineHeight: 1 }}
              >
                {formatVND(product.price)}
              </span>
              {product.originalPrice && (
                <span className="line-through text-gray-400" style={{ fontSize: "1.1rem" }}>
                  {formatVND(product.originalPrice)}
                </span>
              )}
              {product.originalPrice && (
                <span className="text-sm font-bold px-2 py-0.5 rounded-lg" style={{ background: "#FFF3EC", color: "#FF6A00" }}>
                  Tiết kiệm {formatVND(product.originalPrice - product.price)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed text-sm">
              {product.description}
            </p>

            {/* Color selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-gray-700">
                  Màu sắc: <span style={{ color: "#0077CC" }}>{COLOR_NAMES[product.colorIds[selectedColorIdx]] ?? product.colorIds[selectedColorIdx]}</span>
                </p>
              </div>
              <div className="flex items-center gap-3" role="group" aria-label="Chọn màu sắc">
                {product.colors.map((hex, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColorIdx(i)}
                    className="relative flex-shrink-0 transition-transform duration-150 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400"
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                    }}
                    aria-pressed={selectedColorIdx === i}
                    aria-label={`Màu ${COLOR_NAMES[product.colorIds[i]] ?? product.colorIds[i]}`}
                  >
                    <span
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: hex,
                        border: `1.5px solid ${hex === "#FFFFFF" || hex === "#FFD1DC" || hex === "#B5EAD7" || hex === "#C9C0E3" ? "#D1D5DB" : "transparent"}`,
                        boxShadow: selectedColorIdx === i ? `0 0 0 3px #fff, 0 0 0 5px #0077CC` : "0 1px 6px rgba(0,0,0,0.15)",
                        transition: "box-shadow 0.15s",
                      }}
                    />
                    {selectedColorIdx === i && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                          stroke={hex === "#FFFFFF" || hex === "#FFD1DC" || hex === "#B5EAD7" || hex === "#C9C0E3" ? "#555" : "white"}
                          strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-gray-700">
                  Kích thước: {selectedSize ? (
                    <span style={{ color: "#0077CC" }}>EU {selectedSize}</span>
                  ) : (
                    <span className="text-gray-400 font-normal">Chưa chọn</span>
                  )}
                </p>
                <button className="text-xs font-semibold focus:outline-none hover:underline" style={{ color: "#0077CC" }}>
                  Hướng dẫn chọn size
                </button>
              </div>
              <div
                className="grid gap-2"
                style={{ gridTemplateColumns: "repeat(auto-fill, minmax(52px, 1fr))" }}
                role="group"
                aria-label="Chọn size giày"
              >
                {product.sizes.map((s) => {
                  const isSelected = selectedSize === s;
                  return (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className="py-3 rounded-xl text-sm font-semibold transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 active:scale-95"
                      style={{
                        background: isSelected ? "#0077CC" : "#F3F4F6",
                        color: isSelected ? "#fff" : "#444",
                        border: `2px solid ${isSelected ? "#0077CC" : "transparent"}`,
                        boxShadow: isSelected ? "0 4px 12px rgba(0,119,204,0.3)" : "none",
                        transform: isSelected ? "scale(1.05)" : "scale(1)",
                      }}
                      aria-pressed={isSelected}
                      aria-label={`Size ${s}`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
              {!selectedSize && (
                <p className="text-xs text-red-400 mt-1.5 font-medium">* Vui lòng chọn size để thêm vào giỏ</p>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <p className="text-sm font-semibold text-gray-700">Số lượng:</p>
              <div
                className="flex items-center rounded-xl overflow-hidden"
                style={{ border: "1.5px solid #E5E7EB" }}
              >
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  aria-label="Giảm số lượng"
                  disabled={quantity <= 1}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14" /></svg>
                </button>
                <span
                  className="w-12 text-center font-bold text-gray-800 select-none"
                  style={{ borderLeft: "1px solid #E5E7EB", borderRight: "1px solid #E5E7EB", lineHeight: "40px" }}
                  aria-live="polite"
                  aria-label={`Số lượng: ${quantity}`}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  aria-label="Tăng số lượng"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                </button>
              </div>
            </div>

            {/* Add to cart + Wishlist */}
            <div className="hidden md:flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                disabled={added}
                className="flex-1 py-4 rounded-xl text-white font-bold text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 disabled:opacity-80"
                style={{
                  background: added ? "#22C55E" : "linear-gradient(90deg, #FF6A00, #FF8C38)",
                  boxShadow: added ? "none" : "0 6px 20px rgba(255,106,0,0.35)",
                }}
                aria-label={added ? "Đã thêm vào giỏ" : "Thêm vào giỏ hàng"}
              >
                <span className="flex items-center justify-center gap-2">
                  {added ? (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                      Đã thêm vào giỏ!
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                      </svg>
                      Thêm vào giỏ hàng
                    </>
                  )}
                </span>
              </button>
              <button
                className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
                style={{ background: "#F3F4F6", color: "#888" }}
                aria-label="Thêm vào yêu thích"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>

            {/* Specs table */}
            <div
              className="rounded-2xl p-4 mt-1"
              style={{ background: "#F8FAFF", border: "1px solid #E8F0FE" }}
            >
              <h3 className="text-sm font-bold text-gray-700 mb-3">Thông số sản phẩm</h3>
              <dl className="space-y-2">
                {[
                  { label: "Chất liệu", value: product.material },
                  { label: "Bảo hành", value: product.warranty },
                  { label: "Danh mục", value: product.category },
                  { label: "Sizes có sẵn", value: `EU ${product.sizes.join(", ")}` },
                  { label: "Xuất xứ", value: "Việt Nam / Nhập khẩu" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col sm:flex-row sm:items-start gap-0.5 sm:gap-4">
                    <dt className="text-xs text-gray-400 font-semibold uppercase tracking-wider flex-shrink-0" style={{ minWidth: "100px" }}>
                      {item.label}
                    </dt>
                    <dd className="text-sm text-gray-700">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Shipping & policies */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: "🚀", text: "Giao nhanh 2h nội thành" },
                { icon: "↩️", text: "Đổi trả 30 ngày" },
                { icon: "✅", text: "Hàng chính hãng 100%" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700"
                  style={{ background: "#F3F4F6" }}>
                  <span aria-hidden="true">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Reviews ── */}
        <section className="mt-14 md:mt-16" aria-labelledby="reviews-heading">
          <div className="flex items-center justify-between mb-6">
            <h2 id="reviews-heading" className="text-gray-900" style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.01em" }}>
              Đánh giá từ khách hàng
            </h2>
            <div className="flex items-center gap-2">
              <Stars rating={product.rating} size={16} />
              <span className="font-bold" style={{ color: "#FF6A00" }}>{product.rating}</span>
              <span className="text-gray-400 text-sm">/ 5 ({product.reviews})</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.mockReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl p-5"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0 font-bold"
                    style={{ background: "linear-gradient(135deg, #0077CC, #004EB0)", fontSize: "0.82rem" }}
                    aria-hidden="true"
                  >
                    {review.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-gray-800 text-sm">{review.author}</p>
                      {review.verified && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "#E8FFF1", color: "#16A34A" }}>
                          ✓ Đã mua
                        </span>
                      )}
                    </div>
                    <Stars rating={review.rating} size={12} />
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{review.date}</span>
                </div>
                <p className="text-sm text-gray-600 mt-3 leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <section className="mt-14 md:mt-16" aria-labelledby="related-heading">
            <div className="flex items-center justify-between mb-6">
              <h2 id="related-heading" className="text-gray-900" style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.01em" }}>
                Sản phẩm liên quan
              </h2>
              <NavLink
                to="/san-pham"
                className="text-sm font-semibold hover:opacity-70 transition-opacity flex items-center gap-1"
                style={{ color: "#0077CC" }}
              >
                Xem tất cả
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </NavLink>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((p) => (
                <RelatedCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ── Mobile sticky add-to-cart bar ── */}
      <div
        className="fixed left-0 right-0 z-40 md:hidden px-4 pb-2"
        style={{ bottom: "64px", background: "linear-gradient(to top, rgba(248,250,255,1) 0%, rgba(248,250,255,0.95) 80%, transparent 100%)" }}
      >
        <div
          className="flex items-center gap-2 p-3 rounded-2xl"
          style={{ background: "white", boxShadow: "0 -4px 24px rgba(0,0,0,0.1)", border: "1px solid #E8F0FE" }}
        >
          <div className="flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden">
            <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 font-medium truncate">{product.name}</p>
            <p className="font-black text-sm" style={{ color: "#0077CC" }}>{formatVND(product.price)}</p>
            {!selectedSize && <p className="text-xs text-red-400">Chọn size ↑</p>}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={added}
            className="flex-shrink-0 px-5 py-3 rounded-xl text-white text-sm font-bold transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            style={{
              background: added ? "#22C55E" : "linear-gradient(90deg, #FF6A00, #FF8C38)",
              boxShadow: "0 4px 14px rgba(255,106,0,0.35)",
            }}
            aria-label={added ? "Đã thêm" : "Thêm vào giỏ"}
          >
            {added ? "Đã thêm ✓" : "Thêm vào giỏ"}
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

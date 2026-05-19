import { useState, useEffect, useRef } from "react";
import { FilterBar, DEFAULT_FILTER, type FilterState } from "../components/FilterBar";
import { ProductGrid } from "../components/ProductGrid";
import { SkeletonGrid } from "../components/SkeletonGrid";
import { PRODUCTS, applyFilters } from "../data/products";
import { SEOMetadata, SEO_PRESETS } from "../components/SEOMetadata";
import { BreadcrumbSchema } from "../components/StructuredData";

/* ─── URL Sync Developer Note ────────────────────────────────── */
function DevNote() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div
      className="mx-4 md:mx-10 mt-4 rounded-xl flex items-start gap-3 p-4"
      style={{
        background: "#1E1E2E",
        border: "1px solid rgba(0,119,204,0.3)",
        fontFamily: "monospace",
        maxWidth: "860px",
      }}
      role="note"
      aria-label="Developer annotation: URL sync"
    >
      <span className="flex-shrink-0 px-1.5 py-0.5 rounded text-xs font-bold mt-0.5"
        style={{ background: "#0077CC", color: "#fff" }}>
        DEV
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold mb-1" style={{ color: "#FF6A00" }}>
          📌 URL Sync – useSearchParams
        </p>
        <p className="text-xs leading-relaxed" style={{ color: "#8B9EB5" }}>
          Sync filters/sort with URL query params using <span style={{ color: "#7DD3FC" }}>useSearchParams</span>. Example:
        </p>
        <code className="block mt-1.5 text-xs" style={{ color: "#86EFAC" }}>
          ?q=sneakers&sort=price_asc&brand=nike&size=42&sale=1
        </code>
        <p className="text-xs mt-1.5" style={{ color: "#6B7280" }}>
          Filter state → URL → shareable links, back/forward browser navigation.
        </p>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="flex-shrink-0 w-6 h-6 rounded flex items-center justify-center text-gray-500 hover:text-gray-300 transition-colors focus:outline-none"
        aria-label="Đóng ghi chú"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export function ProductsPage() {
  const [filterState, setFilterState] = useState<FilterState>(DEFAULT_FILTER);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const delay = 400 + Math.random() * 200;
    setShowSkeleton(true);
    const timer = setTimeout(() => setShowSkeleton(false), delay);
    return () => clearTimeout(timer);
  }, [filterState]);

  const resultCount = applyFilters(PRODUCTS, filterState).length;
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://zayzepzone.com";
  const breadcrumbItems = [
    { name: "Trang chủ", url: baseUrl },
    { name: "Sản phẩm", url: `${baseUrl}/san-pham` },
  ];

  return (
    <>
      {/* SEO & Structured Data */}
      <SEOMetadata
        title={SEO_PRESETS.products.title}
        description={SEO_PRESETS.products.description}
        keywords={SEO_PRESETS.products.keywords}
        canonicalUrl={`${baseUrl}/san-pham`}
        ogImage={`${baseUrl}/og-products.jpg`}
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      <article className="pt-[65px]" style={{ fontFamily: "'Inter', sans-serif" }}>
        {/* Page header */}
        <header
        className="px-6 md:px-10 py-10 md:py-14"
        style={{ background: "linear-gradient(135deg, #002472 0%, #0077CC 100%)" }}
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">
            ZayZepZone
          </p>
          <h1
            className="text-white"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", fontWeight: 900, letterSpacing: "-0.02em" }}
          >
            Tất cả <span style={{ color: "#FF6A00" }}>Sản phẩm</span>
          </h1>
          <p className="text-white/70 mt-2 text-sm">
            Khám phá hơn 500+ mẫu sneakers chính hãng – cập nhật liên tục.
          </p>
        </div>
      </header>

      {/* Dev annotation */}
      <DevNote />

      <section aria-label="Bộ lọc và danh sách sản phẩm">
        <FilterBar filterState={filterState} onChange={setFilterState} resultCount={resultCount} />
        {showSkeleton ? <SkeletonGrid count={8} /> : <ProductGrid filterState={filterState} />}
      </section>
    </article>
    </>
  );
}

import { useState, useEffect, useRef } from "react";
import { HeroSection } from "../components/HeroSection";
import { FilterBar, DEFAULT_FILTER, type FilterState } from "../components/FilterBar";
import { ProductGrid } from "../components/ProductGrid";
import { SkeletonGrid } from "../components/SkeletonGrid";
import { FAQSection, DEFAULT_FAQS } from "../components/FAQSection";
import { PRODUCTS, applyFilters } from "../data/products";
import { SEOMetadata, SEO_PRESETS } from "../components/SEOMetadata";
import { FAQSchema, OrganizationSchema, WebSiteSchema } from "../components/StructuredData";

export function HomePage() {
  const [filterState, setFilterState] = useState<FilterState>(DEFAULT_FILTER);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // Show skeleton for 400–600ms when filter changes
    const delay = 400 + Math.random() * 200;
    setShowSkeleton(true);
    const timer = setTimeout(() => setShowSkeleton(false), delay);
    return () => clearTimeout(timer);
  }, [filterState]);

  const resultCount = applyFilters(PRODUCTS, filterState).length;
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://zayzepzone.com";

  return (
    <>
      {/* SEO & Structured Data */}
      <SEOMetadata
        title={SEO_PRESETS.home.title}
        description={SEO_PRESETS.home.description}
        keywords={SEO_PRESETS.home.keywords}
        canonicalUrl={baseUrl}
        ogImage={`${baseUrl}/og-image.jpg`}
      />
      <OrganizationSchema url={baseUrl} />
      <WebSiteSchema url={baseUrl} />
      <FAQSchema faqs={DEFAULT_FAQS} />

      {/* Main Content */}
      <article>
        <header>
          <HeroSection />
        </header>
        <section aria-label="Bộ lọc và danh sách sản phẩm">
          <FilterBar filterState={filterState} onChange={setFilterState} resultCount={resultCount} />
          {showSkeleton ? <SkeletonGrid count={8} /> : <ProductGrid filterState={filterState} />}
        </section>
      </article>

      {/* FAQ Section */}
      <FAQSection faqs={DEFAULT_FAQS} />
    </>
  );
}

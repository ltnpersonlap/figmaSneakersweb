import { useState, useEffect, useRef } from "react";
import { HeroSection } from "../components/HeroSection";
import { FilterBar, DEFAULT_FILTER, type FilterState } from "../components/FilterBar";
import { ProductGrid } from "../components/ProductGrid";
import { SkeletonGrid } from "../components/SkeletonGrid";
import { PRODUCTS, applyFilters } from "../data/products";

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

  return (
    <>
      <HeroSection />
      <FilterBar filterState={filterState} onChange={setFilterState} resultCount={resultCount} />
      {showSkeleton ? <SkeletonGrid count={8} /> : <ProductGrid filterState={filterState} />}
    </>
  );
}

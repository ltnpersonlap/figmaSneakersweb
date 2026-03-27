/* ─── SkeletonGrid: shimmer placeholder matching 4→2 col product grid ── */

function SkeletonCard() {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden flex flex-col"
      style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}
      aria-hidden="true"
    >
      {/* Image placeholder 1:1 */}
      <div className="relative w-full" style={{ paddingBottom: "100%" }}>
        <div className="absolute inset-0 shimmer-bg" />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-3 pt-2.5 gap-2">
        {/* Brand */}
        <div className="shimmer-bg rounded" style={{ height: "10px", width: "40%" }} />
        {/* Name */}
        <div className="shimmer-bg rounded" style={{ height: "14px", width: "80%" }} />
        <div className="shimmer-bg rounded" style={{ height: "14px", width: "60%" }} />
        {/* Stars */}
        <div className="shimmer-bg rounded" style={{ height: "10px", width: "50%", marginTop: "4px" }} />
        {/* Swatches */}
        <div className="flex gap-1.5 mt-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="shimmer-bg rounded-full" style={{ width: "14px", height: "14px" }} />
          ))}
        </div>
        {/* Price */}
        <div className="shimmer-bg rounded" style={{ height: "16px", width: "55%", marginTop: "4px" }} />
        {/* Button - mobile */}
        <div className="shimmer-bg rounded-xl sm:hidden" style={{ height: "38px", marginTop: "6px" }} />
      </div>
    </div>
  );
}

interface SkeletonGridProps {
  count?: number;
}

export function SkeletonGrid({ count = 8 }: SkeletonGridProps) {
  return (
    <section
      className="py-14 md:py-18 px-4 md:px-10"
      style={{ background: "#fff", fontFamily: "'Inter', sans-serif" }}
      aria-label="Đang tải sản phẩm..."
      aria-busy="true"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div className="flex flex-col gap-2">
            <div className="shimmer-bg rounded" style={{ height: "10px", width: "80px" }} />
            <div className="shimmer-bg rounded" style={{ height: "28px", width: "220px" }} />
          </div>
          <div className="shimmer-bg rounded" style={{ height: "16px", width: "80px" }} />
        </div>

        {/* Tabs skeleton */}
        <div className="flex items-center gap-2 mb-6">
          {[90, 80, 60, 80, 70].map((w, i) => (
            <div key={i} className="shimmer-bg rounded-full flex-shrink-0" style={{ height: "34px", width: `${w}px` }} />
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: "16px" }}>
          {Array.from({ length: count }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>

      <style>{`
        .shimmer-bg {
          background: linear-gradient(90deg, #f0f2f5 25%, #e4e6ea 50%, #f0f2f5 75%);
          background-size: 200% 100%;
          animation: shimmerAnim 1.6s ease-in-out infinite;
        }
        @keyframes shimmerAnim {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
}

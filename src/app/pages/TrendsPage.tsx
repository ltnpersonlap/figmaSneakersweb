import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const TREND_IMG   = "https://images.unsplash.com/photo-1730829807437-97fb05b2bcac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VyJTIwc3RyZWV0d2VhciUyMHRyZW5kJTIwY29sbGVjdGlvbiUyMDIwMjR8ZW58MXx8fHwxNzczMzYyNTc0fDA&ixlib=rb-4.1.0&q=80&w=1080";
const HYPE_IMG    = "https://images.unsplash.com/photo-1771710863119-04aca824c76d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VyJTIwaHlwZSUyMGxpbWl0ZWQlMjBlZGl0aW9uJTIwZHJvcCUyMHVyYmFufGVufDF8fHx8MTc3MzM2MjU3N3ww&ixlib=rb-4.1.0&q=80&w=1080";

const TRENDS = [
  {
    id: 1,
    tag: "🔥 Đang viral",
    title: "Chunky & Retro",
    desc: "Đế bánh mì, màu pastel, và silhouette oversized đang chiếm lĩnh đường phố TP.HCM mùa này.",
    color: "#FF6A00",
    bgLight: "#FFF4ED",
  },
  {
    id: 2,
    tag: "✨ Xu hướng mới",
    title: "Monochrome All-White",
    desc: "Sneakers trắng tinh từ đầu đến đế – clean, minimal, dễ mix đồ mọi phong cách.",
    color: "#0077CC",
    bgLight: "#EBF5FF",
  },
  {
    id: 3,
    tag: "⚡ Limited Drop",
    title: "Tech Runner",
    desc: "Thiết kế lấy cảm hứng từ giày chạy bộ cao cấp – nhẹ, thoáng, hợp với lifestyle năng động.",
    color: "#7C3AED",
    bgLight: "#F5F3FF",
  },
  {
    id: 4,
    tag: "🌊 Street Style",
    title: "Y2K Comeback",
    desc: "Phong cách những năm 2000 trở lại mạnh mẽ: reflective panels, chunky soles, neon accents.",
    color: "#CC0066",
    bgLight: "#FFF0F7",
  },
];

const WEEKLY = [
  { rank: 1, name: "Air Urban Classic",  brand: "KickZone",  views: "12.4K", up: true },
  { rank: 2, name: "Court Legacy Hi",    brand: "Jumpman",   views: "9.8K",  up: true },
  { rank: 3, name: "Cloud Drift Retro",  brand: "AeroStep",  views: "8.1K",  up: false },
  { rank: 4, name: "Neon Sprint X",      brand: "PacePro",   views: "6.7K",  up: true },
  { rank: 5, name: "Skate Classic OG",   brand: "Vans",      views: "5.9K",  up: false },
];

export function TrendsPage() {
  return (
    <div className="pt-[65px] bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── HERO BANNER ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "420px" }}>
        <div className="absolute inset-0">
          <ImageWithFallback
            src={TREND_IMG}
            alt="Xu hướng sneaker mùa này"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(90deg, rgba(0,20,70,0.95) 0%, rgba(0,80,180,0.75) 55%, transparent 100%)" }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-white mb-5"
            style={{ background: "rgba(255,106,0,0.85)" }}
          >
            🔥 SPRING / SUMMER 2026
          </span>
          <h1
            className="text-white mb-4"
            style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            Xu hướng <span style={{ color: "#FF6A00" }}>nổi bật</span><br />
            mùa này
          </h1>
          <p className="text-white/75 max-w-lg" style={{ fontSize: "clamp(0.95rem, 2vw, 1.1rem)", lineHeight: 1.65 }}>
            Cập nhật liên tục những style đang hot nhất tại TP.HCM — từ đường phố đến sân chơi.
          </p>
        </div>
      </section>

      {/* ── TREND CARDS ── */}
      <section className="py-14 px-6 md:px-10 bg-white" aria-label="Xu hướng nổi bật">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#FF6A00" }}>
                Trends
              </p>
              <h2 style={{ fontSize: "clamp(1.4rem, 3.5vw, 2rem)", fontWeight: 900, color: "#111", letterSpacing: "-0.02em" }}>
                Đang <span style={{ color: "#0077CC" }}>trending</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TRENDS.map((t) => (
              <article
                key={t.id}
                className="group rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                style={{
                  background: t.bgLight,
                  border: `1.5px solid ${t.color}22`,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                }}
              >
                <span
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold mb-3"
                  style={{ background: `${t.color}18`, color: t.color }}
                >
                  {t.tag}
                </span>
                <h3
                  className="mb-2"
                  style={{ fontSize: "1.05rem", fontWeight: 800, color: "#111", letterSpacing: "-0.01em" }}
                >
                  {t.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{t.desc}</p>
                <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold transition-colors" style={{ color: t.color }}>
                  Khám phá
                  <svg
                    className="transition-transform group-hover:translate-x-1"
                    width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPLIT: Hype drop + weekly chart ── */}
      <section className="py-14 px-6 md:px-10" style={{ background: "#F5F9FF" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Hype drop feature */}
          <div className="relative rounded-3xl overflow-hidden" style={{ minHeight: "360px" }}>
            <ImageWithFallback
              src={HYPE_IMG}
              alt="Limited drop sneaker"
              className="w-full h-full object-cover absolute inset-0"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(0,10,40,0.9) 0%, rgba(0,10,40,0.4) 60%, transparent 100%)" }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white mb-3"
                style={{ background: "#CC0000" }}
              >
                ⚡ LIMITED DROP
              </span>
              <h3
                className="text-white mb-2"
                style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.015em" }}
              >
                Hype Drops tháng 3
              </h3>
              <p className="text-white/70 text-sm mb-4">
                Số lượng cực hạn — đặt trước ngay trước khi hết.
              </p>
              <a
                href="/san-pham"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-bold transition-all hover:scale-105"
                style={{ background: "#FF6A00", boxShadow: "0 4px 14px rgba(255,106,0,0.45)" }}
              >
                Xem ngay
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Weekly chart */}
          <div
            className="rounded-3xl p-6 md:p-8"
            style={{ background: "white", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#111" }}>
                🏆 Top xem tuần này
              </h3>
              <span className="text-xs font-medium text-gray-400">
                Cập nhật 13/03
              </span>
            </div>
            <ol className="space-y-3">
              {WEEKLY.map((item) => (
                <li
                  key={item.rank}
                  className="flex items-center gap-3 p-3 rounded-xl transition-colors cursor-pointer"
                  style={{ background: item.rank === 1 ? "#FFF4ED" : "#F8F9FB" }}
                >
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black"
                    style={{
                      background: item.rank === 1 ? "#FF6A00" : "#E5E7EB",
                      color: item.rank === 1 ? "#fff" : "#555",
                    }}
                  >
                    {item.rank}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-800 truncate">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.brand}</p>
                  </div>
                  <div className="flex flex-col items-end flex-shrink-0">
                    <span className="text-xs font-bold" style={{ color: "#0077CC" }}>{item.views}</span>
                    <span className="text-xs" style={{ color: item.up ? "#22C55E" : "#EF4444" }}>
                      {item.up ? "▲" : "▼"}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-16 px-6 md:px-10 text-center"
        style={{ background: "linear-gradient(135deg, #002472 0%, #0077CC 100%)" }}
      >
        <div className="max-w-xl mx-auto">
          <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-3">ZayZepZone</p>
          <h2
            className="text-white mb-4"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 900, letterSpacing: "-0.02em" }}
          >
            Đừng bỏ lỡ bất kỳ<br />xu hướng nào
          </h2>
          <p className="text-white/70 mb-8 text-sm">
            Đăng ký nhận thông báo drop mới và ưu đãi độc quyền mỗi tuần.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="Email của bạn..."
              className="flex-1 w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: "rgba(255,255,255,0.12)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.2)" }}
            />
            <button
              className="w-full sm:w-auto px-6 py-3 rounded-xl text-white text-sm font-bold whitespace-nowrap transition-all hover:scale-105"
              style={{ background: "#FF6A00", boxShadow: "0 4px 14px rgba(255,106,0,0.4)" }}
            >
              Đăng ký
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

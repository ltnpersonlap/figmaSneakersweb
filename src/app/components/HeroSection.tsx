import { useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const HERO_BG =
  "https://images.unsplash.com/photo-1768118422953-1a58060d8610?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VycyUyMHN0cmVldCUyMHN0eWxlJTIweW91dGglMjB1cmJhbiUyMEhvJTIwQ2hpJTIwTWluaCUyMENpdHl8ZW58MXx8fHwxNzczMjc2NzM5fDA&ixlib=rb-4.1.0&q=80&w=1080";

const SNEAKER_IMG =
  "https://images.unsplash.com/photo-1612902377753-5c40d21ba865?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const LIFESTYLE_IMG =
  "https://images.unsplash.com/photo-1624353061763-b003fd3b84dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHBlb3BsZSUyMGZhc2hpb24lMjBzbmVha2VycyUyMGNpdHklMjBsaWZlc3R5bGV8ZW58MXx8fHwxNzczMjc2NzQyfDA&ixlib=rb-4.1.0&q=80&w=1080";

const BADGES = [
  { icon: "🔥", label: "HOT TREND" },
  { icon: "✨", label: "NEW DROP" },
  { icon: "⚡", label: "LIMITED" },
];

const STATS = [
  { value: "500+", label: "Mẫu giày" },
  { value: "50K+", label: "Khách hàng" },
  { value: "4.9★", label: "Đánh giá" },
];

export function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        aria-labelledby="hero-heading"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src={HERO_BG}
            alt="Giới trẻ TP.HCM với sneakers trên đường phố"
            className="w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,60,130,0.92) 0%, rgba(0,119,204,0.80) 40%, rgba(0,60,130,0.88) 100%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            }}
          />
        </div>

        {/* Decorative circles */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: "#FF6A00" }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: "#00AAFF" }}
        />

        {/* ── CONTENT ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pt-28 pb-24 md:pt-36 md:pb-32">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* Left / Text column */}
            <div
              className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(32px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
              }}
            >
              {/* Badge row */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
                {BADGES.map((b, i) => (
                  <span
                    key={b.label}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white border border-white/25 backdrop-blur-sm"
                    style={{ background: "rgba(255,255,255,0.12)", animationDelay: `${i * 0.1}s` }}
                  >
                    <span role="img" aria-hidden="true">{b.icon}</span>
                    {b.label}
                  </span>
                ))}
              </div>

              {/* Headline */}
              <h1
                id="hero-heading"
                className="mb-5"
                style={{
                  fontSize: "clamp(2.6rem, 7vw, 5rem)",
                  fontWeight: 900,
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                }}
              >
                <span style={{ color: "#fff", textShadow: "0 2px 24px rgba(0,0,0,0.25)" }}>Aiiiiii </span>
                <span
                  style={{
                    color: "#FF6A00",
                    fontWeight: 900,
                    fontSize: "clamp(3rem, 8vw, 5.6rem)",
                    textShadow: "0 4px 32px rgba(255,106,0,0.55), 0 2px 8px rgba(0,0,0,0.2)",
                  }}
                >
                  Zay Zep
                </span>
                <span style={{ color: "#fff", textShadow: "0 2px 24px rgba(0,0,0,0.25)" }}> Hommmm!</span>
              </h1>

              {/* Subtitle */}
              <p
                className="text-white/80 mb-8 max-w-md"
                style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: 1.65 }}
              >
                Phong cách đường phố TP.HCM — Giày chuẩn swag, giao hàng nhanh tận tay, giá hợp lí.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
                <a
                  href="/san-pham"
                  className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-white font-bold transition-all duration-200 hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-400"
                  style={{ background: "#FF6A00", boxShadow: "0 8px 32px rgba(255,106,0,0.45)", fontSize: "1.05rem" }}
                  aria-label="Mua ngay – Khám phá bộ sưu tập sneakers"
                >
                  Mua ngay
                  <svg className="transition-transform group-hover:translate-x-1"
                    width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="/xu-huong"
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white border-2 border-white/40 hover:border-white hover:bg-white/10 transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60"
                  style={{ fontSize: "1.05rem" }}
                >
                  Khám phá
                  <svg className="opacity-70 group-hover:opacity-100"
                    width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
                  </svg>
                </a>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 sm:gap-8">
                {STATS.map((s, i) => (
                  <div key={s.label} className="flex flex-col items-center lg:items-start">
                    <span
                      className="text-white font-black"
                      style={{ fontSize: "clamp(1.2rem, 3vw, 1.6rem)", lineHeight: 1 }}
                    >
                      {s.value}
                    </span>
                    <span className="text-white/60 text-xs mt-0.5 font-medium">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right / Image column */}
            <div
              className="flex-1 flex items-center justify-center relative w-full max-w-sm lg:max-w-none"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.96)",
                transition: "opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s",
              }}
            >
              <div
                className="absolute inset-8 rounded-3xl blur-2xl opacity-40 pointer-events-none"
                style={{ background: "radial-gradient(circle, #FF6A00 0%, #0077CC 70%)" }}
              />

              <div
                className="relative rounded-3xl overflow-hidden shadow-2xl w-full aspect-[4/5]"
                style={{ border: "2px solid rgba(255,255,255,0.15)" }}
              >
                <ImageWithFallback
                  src={SNEAKER_IMG}
                  alt="Bộ sưu tập sneakers mới nhất tại ZayZepZone"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0,40,100,0.75) 0%, transparent 55%)" }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-white/70 text-xs font-medium mb-0.5 uppercase tracking-widest">New Drop</p>
                      <p className="text-white font-bold text-lg leading-tight">Air Urban Series</p>
                      <p className="text-white/80 text-sm mt-0.5">
                        từ{" "}
                        <span style={{ color: "#FF9940" }} className="font-bold">890.000₫</span>
                      </p>
                    </div>
                    <a
                      href="/san-pham"
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      style={{ background: "#FF6A00" }}
                      aria-label="Xem sản phẩm Air Urban Series"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="white" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
                <div
                  className="absolute top-4 right-4 px-3 py-1 rounded-full text-white text-xs font-bold"
                  style={{ background: "#FF6A00" }}
                >
                  🔥 Mới nhất
                </div>
              </div>

              {/* Floating lifestyle thumbnail */}
              <div
                className="absolute -bottom-4 -left-4 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-xl border-2 border-white/20"
                style={{ animation: "heroFloat 4s ease-in-out infinite" }}
              >
                <ImageWithFallback
                  src={LIFESTYLE_IMG}
                  alt="Street style lifestyle – giới trẻ TP.HCM"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 opacity-30"
                  style={{ background: "linear-gradient(135deg, #0077CC, transparent)" }}
                />
              </div>

              {/* Floating review pill */}
              <div
                className="absolute -top-3 -left-3 sm:-left-6 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl shadow-xl"
                style={{
                  background: "rgba(255,255,255,0.97)",
                  animation: "heroFloat 5s ease-in-out infinite 1s",
                  minWidth: "160px",
                }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "#0077CC" }}
                  aria-hidden="true"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="white" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-800 leading-tight">Minh Khôi</p>
                  <div className="flex gap-0.5 mt-0.5" aria-label="5 sao">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="#FF6A00" aria-hidden="true">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: visible ? 0.7 : 0, transition: "opacity 1s ease 1s" }}
          aria-hidden="true"
        >
          <span className="text-white/60 text-xs font-medium tracking-widest uppercase">Cuộn xuống</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <path d="M7 10l5 5 5-5" />
          </svg>
        </div>
      </section>

      {/* ── MARQUEE STRIP ── */}
      <div className="py-3 overflow-hidden" style={{ background: "#FF6A00" }} aria-hidden="true">
        <div
          className="flex gap-0 whitespace-nowrap"
          style={{ animation: "heroMarquee 18s linear infinite" }}
        >
          {[...Array(3)].map((_, outerIdx) => (
            <div key={outerIdx} className="flex items-center gap-8 px-8">
              {[
                "🔥 NEW ARRIVALS",
                "✨ FREE SHIP NỘI THÀNH",
                "⚡ FLASH SALE MỖI NGÀY",
                "🎯 SIZE ĐA DẠNG 36–46",
                "💎 HÀNG CHÍNH HÃNG 100%",
              ].map((item, i) => (
                <span key={`${outerIdx}-${i}`} className="text-white font-bold text-sm tracking-wider">
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── CATEGORY CHIPS ── */}
      <section
        className="py-16 md:py-20 px-6 md:px-10"
        style={{ background: "#F5F9FF" }}
        aria-label="Danh mục sản phẩm"
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-center mb-3"
            style={{ color: "#0077CC", fontSize: "clamp(1.5rem, 4vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.01em" }}
          >
            Phong cách của bạn
          </h2>
          <p className="text-center text-gray-500 mb-10 max-w-md mx-auto text-sm">
            Từ casual đến sporty — tìm đúng đôi giày thể hiện cá tính bạn.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: "Lifestyle", icon: "👟", count: "120+" },
              { name: "Running",   icon: "🏃", count: "85+" },
              { name: "Basketball",icon: "🏀", count: "60+" },
              { name: "Skate",     icon: "🛹", count: "45+" },
              { name: "Collab",    icon: "🤝", count: "30+" },
            ].map((cat) => (
              <a
                key={cat.name}
                href="/san-pham"
                className="group flex flex-col items-center gap-3 p-5 rounded-2xl border-2 border-transparent hover:border-blue-200 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                style={{ background: "white" }}
                aria-label={`${cat.name} – ${cat.count} sản phẩm`}
              >
                <span className="text-3xl" role="img" aria-hidden="true">{cat.icon}</span>
                <div className="text-center">
                  <p className="font-bold text-gray-800 text-sm">{cat.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{cat.count} sản phẩm</p>
                </div>
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ background: "#0077CC" }}
                  aria-hidden="true"
                >
                  Xem ngay
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes heroMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}
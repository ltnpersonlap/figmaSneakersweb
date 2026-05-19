import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { SEOMetadata, SEO_PRESETS } from "../components/SEOMetadata";
import { BreadcrumbSchema, ArticleSchema } from "../components/StructuredData";

const STORE_IMG = "https://images.unsplash.com/photo-1637666573804-746f69e79463?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzbmVha2VyJTIwc3RvcmUlMjBpbnRlcmlvciUyMGRlc2lnbnxlbnwxfHx8fDE3NzMzNjI1NzR8MA&ixlib=rb-4.1.0&q=80&w=1080";
const TEAM_IMG  = "https://images.unsplash.com/photo-1586288280768-3d9abb7d42bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHRlYW0lMjBmYXNoaW9uJTIwYnJhbmQlMjBzdGFydHVwJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczMzYyNTc3fDA&ixlib=rb-4.1.0&q=80&w=1080";

const STATS = [
  { value: "2016",    label: "Năm thành lập" },
  { value: "500+",    label: "Mẫu sneakers" },
  { value: "50K+",    label: "Khách hàng tin yêu" },
  { value: "4.9 ★",   label: "Đánh giá trung bình" },
];

const VALUES = [
  {
    icon: "💎",
    title: "Chính hãng 100%",
    desc: "Mỗi đôi giày được kiểm định nguồn gốc và chất lượng trước khi đến tay khách hàng.",
  },
  {
    icon: "⚡",
    title: "Giao hàng siêu tốc",
    desc: "Nội thành TP.HCM 2-3 giờ, toàn quốc 1-2 ngày làm việc.",
  },
  {
    icon: "🔄",
    title: "Đổi trả dễ dàng",
    desc: "30 ngày đổi trả không cần lý do — chúng tôi luôn đứng về phía bạn.",
  },
  {
    icon: "💬",
    title: "Hỗ trợ 24/7",
    desc: "Đội ngũ tư vấn nhiệt tình sẵn sàng giúp bạn chọn đôi giày phù hợp nhất.",
  },
];

const TEAM = [
  { name: "Lê Thành N", role: "Co-founder & CEO", emoji: "👨‍💼" },
  { name: "Trần Thị Lan A", role: "Head of Design",  emoji: "👩‍🎨" },
  { name: "Lê Hoàng B",     role: "Head of Tech",    emoji: "👨‍💻" },
];

export function AboutUsPage() {
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://zayzepzone.com";
  const breadcrumbItems = [
    { name: "Trang chủ", url: baseUrl },
    { name: "Về chúng tôi", url: `${baseUrl}/ve-chung-toi` },
  ];

  return (
    <>
      {/* SEO & Structured Data */}
      <SEOMetadata
        title={SEO_PRESETS.about.title}
        description={SEO_PRESETS.about.description}
        keywords={SEO_PRESETS.about.keywords}
        canonicalUrl={`${baseUrl}/ve-chung-toi`}
        ogImage={STORE_IMG}
        ogType="article"
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <ArticleSchema
        title="Về ZayZepZone - Câu chuyện thương hiệu giày sneakers"
        description="Câu chuyện ra đời và phát triển của ZayZepZone từ năm 2019, mang đến giày sneakers chính hãng cho giới trẻ TP.HCM."
        url={`${baseUrl}/ve-chung-toi`}
        datePublished="2019-01-01"
        dateModified="2026-05-13"
        authorName="ZayZepZone Team"
        images={[STORE_IMG, TEAM_IMG]}
      />

      <article className="pt-[65px] bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
        {/* ── HERO ── */}
        <header className="relative overflow-hidden" style={{ minHeight: "460px" }}>
        <div className="absolute inset-0">
          <ImageWithFallback
            src={STORE_IMG}
            alt="ZayZepZone store"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(0,20,80,0.93) 0%, rgba(0,80,180,0.78) 55%, rgba(0,119,204,0.6) 100%)" }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32 text-center">
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-white mb-5"
            style={{ background: "rgba(255,106,0,0.85)" }}
          >
            👟 Kể từ 2019
          </span>
          <h1
            className="text-white mb-5 mx-auto"
            style={{
              fontSize: "clamp(2.2rem, 6vw, 3.8rem)",
              fontWeight: 900,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              maxWidth: "700px",
            }}
          >
            Chúng tôi yêu{" "}
            <span style={{ color: "#FF6A00" }}>sneakers</span>
            <br />như bạn vậy.
          </h1>
          <p
            className="text-white/75 mx-auto"
            style={{ fontSize: "clamp(0.95rem, 2vw, 1.1rem)", lineHeight: 1.7, maxWidth: "560px" }}
          >
            ZayZepZone ra đời từ niềm đam mê sneakers và giấc mơ mang những đôi giày đẹp nhất
            đến với giới trẻ TP.HCM — với giá cả hợp lí và dịch vụ tận tâm.
          </p>
        </div>
      </header>

      {/* ── STATS ── */}
      <section
        className="py-14 px-6 md:px-10"
        style={{ background: "linear-gradient(90deg, #002472 0%, #004EB0 48%, #0077CC 100%)" }}
        aria-label="Thống kê"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <span
                className="text-white font-black"
                style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", letterSpacing: "-0.03em", lineHeight: 1 }}
              >
                {s.value}
              </span>
              <span className="text-white/60 text-sm mt-1.5 font-medium">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="py-16 md:py-24 px-6 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#FF6A00" }}>
              Câu chuyện của chúng tôi
            </p>
            <h2
              className="mb-5"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 900, color: "#111", letterSpacing: "-0.02em", lineHeight: 1.2 }}
            >
              Bắt đầu từ{" "}
              <span style={{ color: "#0077CC" }}>một garage</span>{" "}
              nhỏ
            </h2>
            <div className="space-y-4 text-gray-600" style={{ lineHeight: 1.75, fontSize: "0.97rem" }}>
              <p>
                Năm 2026, Tôi cùng với nhóm bạn được thầy giao đề tài làm 1 web bán giày trên figma. 
                Từ đó Tôi quyết định thành lập ZayZepZone trong một garage nhỏ ở Quận 8, TP.HCM. 
                Với số vốn ban đầu chỉ từ 30 triệu đồng và kho hàng vỏn vẹn 1 đôi giày và 1 đôi chân trần, chúng tôi bắt đầu.
              </p>
              <p>
                Sau 10 năm, ZayZepZone đã trở thành địa chỉ tin cậy của hơn <strong className="text-gray-800">50.000 khách hàng</strong> trên toàn quốc
                — từ dân hype đến bạn trẻ văn phòng, từ runner chuyên nghiệp đến skater thường ngày.
              </p>
              <p>
                Chúng tôi tin rằng một đôi giày tốt không chỉ là thời trang — đó là sự tự tin,
                là câu chuyện, là bản sắc của bạn.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <ImageWithFallback
                src={TEAM_IMG}
                alt="Đội ngũ ZayZepZone"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating badge */}
            <div
              className="absolute -bottom-5 -left-5 px-5 py-3 rounded-2xl shadow-xl"
              style={{ background: "#fff" }}
            >
              <p className="text-xs text-gray-400 font-medium">Được yêu thích nhất</p>
              <p className="font-black" style={{ color: "#0077CC", fontSize: "1.05rem" }}>
                TP.HCM 2026 🏆
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section
        className="py-16 px-6 md:px-10"
        style={{ background: "#F5F9FF" }}
        aria-label="Giá trị cốt lõi"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#FF6A00" }}>
              Cam kết
            </p>
            <h2
              style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", fontWeight: 900, color: "#111", letterSpacing: "-0.02em" }}
            >
              Vì sao chọn{" "}
              <span style={{ color: "#0077CC" }}>ZayZepZone?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "#EBF5FF", fontSize: "1.5rem" }}
                >
                  {v.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-2" style={{ fontSize: "0.97rem" }}>
                  {v.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-16 px-6 md:px-10 bg-white" aria-label="Đội ngũ sáng lập">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#FF6A00" }}>
            Đội ngũ
          </p>
          <h2
            className="mb-10"
            style={{ fontSize: "clamp(1.4rem, 3.5vw, 2rem)", fontWeight: 900, color: "#111", letterSpacing: "-0.02em" }}
          >
            Những người tạo nên{" "}
            <span style={{ color: "#0077CC" }}>ZayZepZone</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {TEAM.map((m) => (
              <div
                key={m.name}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl transition-all duration-200 hover:-translate-y-1"
                style={{ background: "#F5F9FF", minWidth: "180px" }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #0077CC, #004EB0)",
                    fontSize: "1.8rem",
                  }}
                >
                  {m.emoji}
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{m.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-16 px-6 md:px-10 text-center"
        style={{ background: "linear-gradient(135deg, #FF6A00 0%, #E85500 100%)" }}
      >
        <div className="max-w-lg mx-auto">
          <h2
            className="text-white mb-3"
            style={{ fontSize: "clamp(1.5rem, 4vw, 2.1rem)", fontWeight: 900, letterSpacing: "-0.02em" }}
          >
            Sẵn sàng tìm đôi giày hoàn hảo?
          </h2>
          <p className="text-white/80 mb-7 text-sm">
            Hơn 500 mẫu sneakers chính hãng đang chờ bạn.
          </p>
          <a
            href="/san-pham"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-white font-bold transition-all hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60"
            style={{ background: "rgba(255,255,255,0.18)", border: "2px solid rgba(255,255,255,0.4)", fontSize: "0.97rem" }}
          >
            Mua sắm ngay
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>
    </article>
    </>
  );
}

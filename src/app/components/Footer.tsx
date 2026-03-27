import { useState } from "react";
import { NavLink } from "react-router";

/* ─── Sneaker Logo (reuse) ───────────────────────────────────── */
function FooterLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: "#FF6A00", boxShadow: "0 3px 12px rgba(255,106,0,0.4)" }}
      >
        <svg width="22" height="22" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <path d="M5 30C5 30 9 27 14 27C18 27 19.5 29 24 29C28.5 29 32 27 32 27L35.5 30H5Z" fill="white" />
          <path d="M7 26L10.5 15C10.5 15 15 16.5 20 16.5C25 16.5 29.5 15 29.5 15L33 26H7Z" fill="rgba(255,255,255,0.82)" />
          <path d="M7 26C7 26 8.5 22 13 22C16 22 18 24 18 24" stroke="white" strokeWidth="1.4" strokeLinecap="round" fill="none" />
          <path d="M15 21H25M16 18.5H24" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeOpacity="0.65" />
        </svg>
      </div>
      <span className="font-black select-none" style={{ fontSize: "1.22rem", letterSpacing: "-0.025em", lineHeight: 1 }}>
        <span style={{ color: "#fff" }}>ZayZep</span>
        <span style={{ color: "#FF6A00" }}>Zone</span>
      </span>
    </div>
  );
}

/* ─── Social icon ────────────────────────────────────────────── */
function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
      style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.75)" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "#FF6A00";
        (e.currentTarget as HTMLElement).style.color = "#fff";
        (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
        (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)";
        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
      }}
    >
      {children}
    </a>
  );
}

/* ─── Footer Link ─────────────────────────────────────────────── */
function FooterNavLink({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className="text-sm transition-colors duration-150 focus:outline-none focus-visible:underline"
      style={{ color: "rgba(255,255,255,0.6)" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#FF6A00"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; }}
    >
      {label}
    </NavLink>
  );
}

/* ─── Main Footer ────────────────────────────────────────────── */
export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  }

  return (
    <footer
      className="pb-20 md:pb-0"
      style={{
        background: "linear-gradient(160deg, #001A52 0%, #002E7A 55%, #003D99 100%)",
        fontFamily: "'Inter', sans-serif",
      }}
      aria-label="Thông tin ZayZepZone"
    >
      {/* Top accent */}
      <div
        className="h-1"
        style={{ background: "linear-gradient(90deg, transparent 0%, #FF6A00 40%, #FF6A00 60%, transparent 100%)" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 md:py-16">
        {/* ── 4-col grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Col 1: Brand info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <FooterLogo />
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", maxWidth: "260px" }}>
              Sneaker store số 1 TP.HCM dành cho giới trẻ yêu phong cách đường phố. Hàng chính hãng 100%, giao nhanh nội thành.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 mt-5">
              <SocialLink href="https://facebook.com" label="Facebook ZayZepZone">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </SocialLink>
              <SocialLink href="https://instagram.com" label="Instagram ZayZepZone">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </SocialLink>
              <SocialLink href="https://tiktok.com" label="TikTok ZayZepZone">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.83 1.55V6.79a4.85 4.85 0 0 1-1.06-.1z" />
                </svg>
              </SocialLink>
              <SocialLink href="https://youtube.com" label="YouTube ZayZepZone">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                  <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
                </svg>
              </SocialLink>
            </div>

            {/* Contact */}
            <div className="mt-5 space-y-1.5">
              <a href="tel:+840123456789" className="flex items-center gap-2 text-sm transition-colors"
                style={{ color: "rgba(255,255,255,0.6)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#FF6A00"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.89 12 19.79 19.79 0 0 1 1.77 3.35 2 2 0 0 1 3.75 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.73a16 16 0 0 0 6.36 6.36l1.21-1.21a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                012 345 6789
              </a>
              <a href="mailto:hello@zayzepzone.vn" className="flex items-center gap-2 text-sm transition-colors"
                style={{ color: "rgba(255,255,255,0.6)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#FF6A00"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                hello@zayzepzone.vn
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h3 className="text-white mb-4" style={{ fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.02em", textTransform: "uppercase" }}>
              Điều hướng
            </h3>
            <ul className="space-y-2.5">
              {[
                { to: "/", label: "Trang chủ" },
                { to: "/san-pham", label: "Tất cả sản phẩm" },
                { to: "/xu-huong", label: "Xu hướng" },
                { to: "/ve-chung-toi", label: "Về chúng tôi" },
                { to: "/dang-nhap", label: "Đăng nhập" },
                { to: "/dang-ky", label: "Đăng ký" },
              ].map((item) => (
                <li key={item.to}>
                  <FooterNavLink to={item.to} label={item.label} />
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Support */}
          <div>
            <h3 className="text-white mb-4" style={{ fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.02em", textTransform: "uppercase" }}>
              Hỗ trợ
            </h3>
            <ul className="space-y-2.5">
              {[
                "Chính sách đổi trả",
                "Hướng dẫn chọn size",
                "Câu hỏi thường gặp",
                "Chính sách bảo hành",
                "Điều khoản dịch vụ",
                "Chính sách riêng tư",
              ].map((label) => (
                <li key={label}>
                  <button
                    className="text-sm text-left transition-colors duration-150 focus:outline-none focus-visible:underline"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#FF6A00"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; }}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Store locations */}
            <div className="mt-5">
              <h4 className="text-white mb-2" style={{ fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em" }}>
                Cửa hàng
              </h4>
              <div className="space-y-1.5">
                {[
                  { name: "Q.1 – Bến Thành", addr: "123 Lê Lợi, Q.1" },
                  { name: "Q.3 – Võ Văn Tần", addr: "456 Võ Văn Tần, Q.3" },
                  { name: "Q.7 – Crescent Mall", addr: "Crescent Mall, Q.7" },
                ].map((s) => (
                  <div key={s.name}>
                    <p className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.8)" }}>{s.name}</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{s.addr}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h3 className="text-white mb-2" style={{ fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.02em", textTransform: "uppercase" }}>
              Đăng ký nhận tin
            </h3>
            <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
              Nhận thông báo drop mới nhất, sale exclusive và voucher dành riêng cho subscribers.
            </p>

            {subscribed ? (
              <div
                className="flex items-center gap-2.5 p-3.5 rounded-xl"
                style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.4)" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <p className="text-sm font-semibold" style={{ color: "#22C55E" }}>Đăng ký thành công! 🎉</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@của bạn.vn"
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-150"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "1.5px solid rgba(255,255,255,0.15)",
                    color: "#fff",
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#FF6A00"; e.currentTarget.style.background = "rgba(255,255,255,0.14)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
                  aria-label="Địa chỉ email đăng ký nhận bản tin"
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-white text-sm font-bold transition-all duration-200 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                  style={{ background: "#FF6A00", boxShadow: "0 4px 14px rgba(255,106,0,0.35)" }}
                >
                  Đăng ký ngay ✨
                </button>
              </form>
            )}

            {/* App badges */}
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-wider mb-2.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                Tải app
              </p>
              <div className="flex gap-2">
                {["App Store", "Google Play"].map((store) => (
                  <button
                    key={store}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150"
                    style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.12)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.18)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)"; }}
                  >
                    {store === "App Store" ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20.5v-17c0-.83 1-.83 1.5-.42l15 8.5c.5.28.5 1.06 0 1.34L4.5 20.92C4 21.33 3 21.33 3 20.5z" /></svg>
                    )}
                    {store}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t px-6 md:px-10 py-5"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            © 2026 ZayZepZone. Tất cả quyền được bảo lưu. Made with ❤️ tại TP.HCM.
          </p>
          <div className="flex items-center gap-4">
            {["Visa", "MasterCard", "MoMo", "ZaloPay", "VNPAY"].map((method) => (
              <span
                key={method}
                className="px-2 py-1 rounded text-xs font-semibold"
                style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

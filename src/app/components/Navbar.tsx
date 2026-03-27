import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router";

/* ─── Nav items ──────────────────────────────────────────────── */
const NAV_ITEMS = [
  { label: "Trang chủ",    path: "/" },
  { label: "Sản phẩm",     path: "/san-pham" },
  { label: "Xu hướng",     path: "/xu-huong" },
  { label: "Về chúng tôi", path: "/ve-chung-toi" },
];

/* ─── Sneaker icon ───────────────────────────────────────────── */
function SneakerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      {/* Sole */}
      <path d="M5 30C5 30 9 27 14 27C18 27 19.5 29 24 29C28.5 29 32 27 32 27L35.5 30H5Z"
        fill="white" />
      {/* Upper body */}
      <path d="M7 26L10.5 15C10.5 15 15 16.5 20 16.5C25 16.5 29.5 15 29.5 15L33 26H7Z"
        fill="rgba(255,255,255,0.82)" />
      {/* Toe */}
      <path d="M7 26C7 26 8.5 22 13 22C16 22 18 24 18 24"
        stroke="white" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      {/* Laces */}
      <path d="M15 21H25M16 18.5H24" stroke="white" strokeWidth="1.3"
        strokeLinecap="round" strokeOpacity="0.65" />
    </svg>
  );
}

/* ─── Logo ───────────────────────────────────────────────────── */
function Logo({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2.5 group rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      aria-label="ZayZepZone – Trang chủ"
    >
      {/* Orange circle with sneaker */}
      <div
        className="relative w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
        style={{
          background: "#FF6A00",
          boxShadow: "0 3px 14px rgba(255,106,0,0.5)",
        }}
      >
        <SneakerIcon />
      </div>

      {/* Text */}
      <span aria-hidden="true"
        className="font-black select-none"
        style={{ fontSize: "1.22rem", letterSpacing: "-0.025em", lineHeight: 1 }}>
        <span style={{ color: "#FFFFFF" }}>ZayZep</span>
        <span style={{ color: "#FF6A00" }}>Zone</span>
      </span>
    </button>
  );
}

/* ─── Desktop nav link (manages hover via state) ─────────────── */
function DesktopNavLink({ label, path }: { label: string; path: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <NavLink
      to={path}
      end={path === "/"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative py-1 px-0.5 text-sm font-medium rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition-colors duration-180"
      style={({ isActive }) => ({
        color: isActive ? "#FF6A00" : hovered ? "#005FA3" : "rgba(255,255,255,0.88)",
        transition: "color 0.18s ease",
      })}
    >
      {({ isActive }) => (
        <>
          {label}
          {/* Animated underline */}
          <span
            className="absolute bottom-0 left-0 h-[2px] rounded-full transition-all duration-250 ease-out"
            style={{
              width: isActive || hovered ? "100%" : "0%",
              background: isActive ? "#FF6A00" : "rgba(255,255,255,0.55)",
            }}
          />
        </>
      )}
    </NavLink>
  );
}

/* ─── Mobile nav item ────────────────────────────────────────── */
function MobileNavLink({
  label, path, onClose,
}: { label: string; path: string; onClose: () => void }) {
  return (
    <NavLink
      to={path}
      end={path === "/"}
      onClick={onClose}
      className="flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      style={({ isActive }) => ({
        background: isActive ? "rgba(255,106,0,0.16)" : "transparent",
        border: `1.5px solid ${isActive ? "rgba(255,106,0,0.4)" : "transparent"}`,
      })}
    >
      {({ isActive }) => (
        <>
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors"
            style={{ background: isActive ? "#FF6A00" : "rgba(255,255,255,0.3)" }}
          />
          <span
            className="text-sm font-semibold"
            style={{ color: isActive ? "#FF6A00" : "rgba(255,255,255,0.88)" }}
          >
            {label}
          </span>
          {isActive && (
            <svg className="ml-auto" width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="#FF6A00" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          )}
        </>
      )}
    </NavLink>
  );
}

/* ─── Main Navbar ────────────────────────────────────────────── */
export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  // Prevent body scroll when mobile panel is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const close = () => setMobileOpen(false);

  return (
    <>
      {/* ══════════════════════════════════════════ HEADER */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "linear-gradient(90deg, #002472 0%, #004EB0 48%, #0077CC 100%)",
          boxShadow: "0 2px 20px rgba(0, 20, 80, 0.35)",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between"
          style={{ height: "65px" }}>

          {/* Logo */}
          <Logo onClick={() => { close(); navigate("/"); }} />

          {/* ── Desktop nav ── */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Menu chính">
            {NAV_ITEMS.map((item) => (
              <DesktopNavLink key={item.path} label={item.label} path={item.path} />
            ))}
          </nav>

          {/* ── Desktop actions ── */}
          <div className="hidden md:flex items-center gap-1">

            {/* Cart */}
            <button
              id="navbar-cart-icon"
              className="relative p-2.5 rounded-full transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              style={{ color: "rgba(255,255,255,0.8)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)";
                (e.currentTarget as HTMLElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)";
              }}
              aria-label="Giỏ hàng – 2 sản phẩm"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span
                className="absolute top-1.5 right-1.5 w-[10px] h-[10px] rounded-full text-white flex items-center justify-center border border-white/50"
                style={{ background: "#FF6A00", fontSize: "0.48rem", fontWeight: 800 }}
                aria-hidden="true"
              >
                2
              </span>
            </button>

            {/* Login */}
            <button
              className="ml-2 px-5 py-[7px] rounded-full text-white text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
              style={{
                background: "#FF6A00",
                boxShadow: "0 3px 12px rgba(255,106,0,0.45)",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
              onClick={() => navigate("/dang-nhap")}
            >
              Đăng nhập
            </button>
          </div>

          {/* ── Mobile: cart + hamburger ── */}
          <div className="flex md:hidden items-center gap-1">
            <button
              className="relative p-2 rounded-full focus:outline-none"
              style={{ color: "rgba(255,255,255,0.85)" }}
              aria-label="Giỏ hàng"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border border-white/50"
                style={{ background: "#FF6A00" }}
                aria-hidden="true"
              />
            </button>

            <button
              className="p-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              style={{ color: "rgba(255,255,255,0.9)" }}
              onClick={() => setMobileOpen(true)}
              aria-expanded={mobileOpen}
              aria-label="Mở menu"
              aria-controls="mobile-panel"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="17" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Accent underline */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2.5px]"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,106,0,0.6) 40%, rgba(255,106,0,0.8) 60%, transparent 100%)",
          }}
          aria-hidden="true"
        />
      </header>

      {/* ══════════════════════════════════════════ MOBILE BACKDROP */}
      <div
        className="fixed inset-0 z-[60] md:hidden"
        style={{
          background: "rgba(0, 12, 40, 0.65)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          transition: "opacity 0.28s ease",
        }}
        onClick={close}
        aria-hidden="true"
      />

      {/* ══════════════════════════════════════════ MOBILE SLIDE PANEL */}
      <div
        id="mobile-panel"
        className="fixed top-0 right-0 h-full z-[70] md:hidden flex flex-col"
        style={{
          width: "min(300px, 88vw)",
          background: "linear-gradient(160deg, #001A52 0%, #003080 55%, #004EB0 100%)",
          boxShadow: mobileOpen ? "-12px 0 48px rgba(0,0,0,0.45)" : "none",
          transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.32s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          fontFamily: "'Inter', sans-serif",
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Menu điều hướng di động"
      >
        {/* Panel top */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
        >
          <Logo onClick={() => { close(); navigate("/"); }} />
          <button
            onClick={close}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.9)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.18)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)"; }}
            aria-label="Đóng menu"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col flex-1 px-3 pt-4 pb-2 gap-1" aria-label="Menu di động">
          {NAV_ITEMS.map((item) => (
            <MobileNavLink
              key={item.path}
              label={item.label}
              path={item.path}
              onClose={close}
            />
          ))}

          {/* Divider */}
          <div className="my-3" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />

          {/* Extra links */}
          {[
            { icon: "❤️", label: "Yêu thích" },
            { icon: "📦", label: "Đơn hàng của tôi" },
            { icon: "🎁", label: "Ưu đãi & Voucher" },
          ].map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors focus:outline-none"
              style={{ color: "rgba(255,255,255,0.65)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.9)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)"; }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Panel footer */}
        <div
          className="px-4 pb-8 pt-4 space-y-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <button
            className="w-full py-3 rounded-xl text-white text-sm font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            style={{ background: "#FF6A00", boxShadow: "0 4px 16px rgba(255,106,0,0.4)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.9"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            onClick={() => { close(); navigate("/dang-nhap"); }}
          >
            Đăng nhập / Đăng ký
          </button>
          <p className="text-center" style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.7rem" }}>
            © 2026 ZayZepZone · TP.HCM
          </p>
        </div>
      </div>
    </>
  );
}
import { NavLink, useNavigate } from "react-router";

interface BottomNavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  exactMatch?: boolean;
}

function HomeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
function GridIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}
function TrendIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

const NAV_ITEMS: BottomNavItem[] = [
  { path: "/", label: "Trang chủ", icon: <HomeIcon />, exactMatch: true },
  { path: "/san-pham", label: "Sản phẩm", icon: <GridIcon /> },
  { path: "/xu-huong", label: "Xu hướng", icon: <TrendIcon /> },
  { path: "/dang-nhap", label: "Tài khoản", icon: <UserIcon /> },
];

export function BottomNav() {
  const navigate = useNavigate();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        background: "linear-gradient(90deg, #001840 0%, #003080 100%)",
        boxShadow: "0 -2px 20px rgba(0,0,0,0.35)",
        fontFamily: "'Inter', sans-serif",
      }}
      aria-label="Thanh điều hướng di động"
    >
      {/* Orange top line */}
      <div className="h-[2px]" style={{ background: "linear-gradient(90deg, transparent, #FF6A00, transparent)" }} aria-hidden="true" />

      <div className="flex items-stretch h-16 relative">
        {/* First two items */}
        {NAV_ITEMS.slice(0, 2).map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exactMatch}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-inset"
            style={({ isActive }) => ({
              color: isActive ? "#FF6A00" : "rgba(255,255,255,0.55)",
            })}
            aria-label={item.label}
          >
            {({ isActive }) => (
              <>
                <span style={{ transform: isActive ? "scale(1.1)" : "scale(1)", transition: "transform 0.2s" }}>
                  {item.icon}
                </span>
                <span style={{ fontSize: "0.6rem", fontWeight: isActive ? 700 : 500 }}>
                  {item.label}
                </span>
                {isActive && (
                  <span
                    className="absolute top-0 rounded-b-full"
                    style={{ height: "3px", width: "36px", background: "#FF6A00", transition: "opacity 0.2s" }}
                    aria-hidden="true"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}

        {/* Center cart FAB */}
        <div className="flex-1 flex items-center justify-center relative">
          <button
            onClick={() => {}}
            className="relative w-14 h-14 rounded-full flex items-center justify-center -mt-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 transition-transform active:scale-95"
            style={{
              background: "linear-gradient(135deg, #FF6A00, #FF8C38)",
              boxShadow: "0 4px 20px rgba(255,106,0,0.5)",
              color: "#fff",
            }}
            aria-label="Giỏ hàng"
          >
            <CartIcon />
            <span
              className="absolute top-1 right-1 w-4 h-4 rounded-full text-white flex items-center justify-center border-2"
              style={{ background: "#fff", color: "#FF6A00", fontSize: "0.55rem", fontWeight: 900, borderColor: "#FF6A00" }}
              aria-label="2 sản phẩm trong giỏ"
            >
              2
            </span>
          </button>
          <span
            className="absolute bottom-1.5 text-center"
            style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.6rem", fontWeight: 500 }}
            aria-hidden="true"
          >
            Giỏ hàng
          </span>
        </div>

        {/* Last two items */}
        {NAV_ITEMS.slice(2).map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exactMatch}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-inset"
            style={({ isActive }) => ({
              color: isActive ? "#FF6A00" : "rgba(255,255,255,0.55)",
            })}
            aria-label={item.label}
          >
            {({ isActive }) => (
              <>
                <span style={{ transform: isActive ? "scale(1.1)" : "scale(1)", transition: "transform 0.2s" }}>
                  {item.icon}
                </span>
                <span style={{ fontSize: "0.6rem", fontWeight: isActive ? 700 : 500 }}>
                  {item.label}
                </span>
                {isActive && (
                  <span
                    className="absolute top-0 rounded-b-full"
                    style={{ height: "3px", width: "36px", background: "#FF6A00" }}
                    aria-hidden="true"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

import { Outlet, useLocation } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { BottomNav } from "../components/BottomNav";

export function Root() {
  const { pathname } = useLocation();
  const isAuth = pathname === "/dang-nhap" || pathname === "/dang-ky";

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      <main className={isAuth ? "" : "pb-16 md:pb-0"}>
        <Outlet />
      </main>
      {!isAuth && <Footer />}
      {!isAuth && <BottomNav />}
    </div>
  );
}

import { useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router";
import { toast, Toaster } from "sonner";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const AUTH_BG = "https://images.unsplash.com/photo-1744297429057-701f408a2c76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMHlvdXRoJTIwZmFzaGlvbiUyMHN0cmVldHdlYXIlMjBsb2dpbiUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzczNDY3MjA3fDA&ixlib=rb-4.1.0&q=80&w=1080";

/* ─── Sneaker Logo ────────────────────────────────────────────── */
function Logo({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2.5 group focus:outline-none" aria-label="ZayZepZone – Trang chủ">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
        style={{ background: "#FF6A00", boxShadow: "0 3px 14px rgba(255,106,0,0.5)" }}
      >
        <svg width="22" height="22" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <path d="M5 30C5 30 9 27 14 27C18 27 19.5 29 24 29C28.5 29 32 27 32 27L35.5 30H5Z" fill="white" />
          <path d="M7 26L10.5 15C10.5 15 15 16.5 20 16.5C25 16.5 29.5 15 29.5 15L33 26H7Z" fill="rgba(255,255,255,0.82)" />
          <path d="M7 26C7 26 8.5 22 13 22C16 22 18 24 18 24" stroke="white" strokeWidth="1.4" strokeLinecap="round" fill="none" />
          <path d="M15 21H25M16 18.5H24" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeOpacity="0.65" />
        </svg>
      </div>
      <span className="font-black select-none" style={{ fontSize: "1.22rem", letterSpacing: "-0.025em", lineHeight: 1 }}>
        <span style={{ color: "#1A1A1A" }}>ZayZep</span>
        <span style={{ color: "#FF6A00" }}>Zone</span>
      </span>
    </button>
  );
}

/* ─── Input field ─────────────────────────────────────────────── */
function FormField({
  label, type = "text", value, onChange, placeholder, error, rightEl,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  rightEl?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-150"
          style={{
            background: "#F7F8FA",
            border: `1.5px solid ${error ? "#EF4444" : "#E5E7EB"}`,
            color: "#1A1A1A",
          }}
          onFocus={(e) => {
            if (!error) {
              e.currentTarget.style.borderColor = "#0077CC";
              e.currentTarget.style.background = "#fff";
            }
          }}
          onBlur={(e) => {
            if (!error) {
              e.currentTarget.style.borderColor = "#E5E7EB";
              e.currentTarget.style.background = "#F7F8FA";
            }
          }}
          aria-invalid={!!error}
          aria-describedby={error ? `${label}-error` : undefined}
        />
        {rightEl && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightEl}
          </div>
        )}
      </div>
      {error && (
        <p id={`${label}-error`} className="text-xs text-red-500 font-medium" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/* ─── Social button ───────────────────────────────────────────── */
function SocialBtn({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 hover:bg-gray-100"
      style={{ background: "#F7F8FA", border: "1.5px solid #E5E7EB", color: "#333" }}
    >
      {icon}
      {label}
    </button>
  );
}

/* ─── Login Form ──────────────────────────────────────────────── */
function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  function validate() {
    const errs: typeof errors = {};
    if (!email.trim()) errs.email = "Vui lòng nhập email hoặc số điện thoại.";
    else if (email.includes("@") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Email không hợp lệ.";
    if (!password) errs.password = "Vui lòng nhập mật khẩu.";
    else if (password.length < 6) errs.password = "Mật khẩu tối thiểu 6 ký tự.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    toast.success("Đăng nhập thành công! Chào mừng bạn! 🎉", {
      description: "Đang chuyển hướng về trang chủ...",
      icon: "👟",
      duration: 2500,
    });
    setTimeout(() => navigate("/"), 2600);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <FormField
        label="Email hoặc số điện thoại"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="ten@email.com hoặc 09xx..."
        error={errors.email}
      />
      <FormField
        label="Mật khẩu"
        type={showPass ? "text" : "password"}
        value={password}
        onChange={setPassword}
        placeholder="Nhập mật khẩu"
        error={errors.password}
        rightEl={
          <button
            type="button"
            onClick={() => setShowPass((s) => !s)}
            className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
            aria-label={showPass ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          >
            {showPass ? (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
            ) : (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
            )}
          </button>
        }
      />

      {/* Remember + Forgot */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <span
            className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-colors"
            style={{ background: remember ? "#0077CC" : "transparent", border: `1.5px solid ${remember ? "#0077CC" : "#D1D5DB"}` }}
            aria-hidden="true"
          >
            {remember && (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            )}
          </span>
          <input type="checkbox" checked={remember} onChange={() => setRemember((r) => !r)} className="sr-only" />
          <span className="text-sm text-gray-600">Ghi nhớ đăng nhập</span>
        </label>
        <button type="button" className="text-sm font-semibold hover:underline focus:outline-none" style={{ color: "#0077CC" }}>
          Quên mật khẩu?
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-xl text-white font-bold text-base transition-all duration-200 hover:opacity-90 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 disabled:opacity-70"
        style={{
          background: "linear-gradient(90deg, #FF6A00, #FF8C38)",
          boxShadow: "0 6px 20px rgba(255,106,0,0.35)",
        }}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span
              className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
              style={{ animation: "spin 0.8s linear infinite" }}
              aria-hidden="true"
            />
            Đang đăng nhập...
          </span>
        ) : "Đăng nhập"}
      </button>

      {/* OR */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-sm text-gray-400 font-medium">hoặc</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Social */}
      <div className="grid grid-cols-2 gap-3">
        <SocialBtn
          label="Google"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
          }
          onClick={() => { toast.success("Đăng nhập bằng Google thành công! 🎉"); setTimeout(() => navigate("/"), 2000); }}
        />
        <SocialBtn
          label="Facebook"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          }
          onClick={() => { toast.success("Đăng nhập bằng Facebook thành công! 🎉"); setTimeout(() => navigate("/"), 2000); }}
        />
      </div>

      {/* Switch to register */}
      <p className="text-center text-sm text-gray-500">
        Chưa có tài khoản?{" "}
        <button type="button" onClick={onSwitch} className="font-bold hover:underline focus:outline-none" style={{ color: "#0077CC" }}>
          Đăng ký ngay
        </button>
      </p>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </form>
  );
}

/* ─── Register Form ───────────────────────────────────────────── */
function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirm?: string; terms?: string }>({});

  function validate() {
    const errs: typeof errors = {};
    if (!name.trim()) errs.name = "Vui lòng nhập họ tên.";
    if (!email.trim()) errs.email = "Vui lòng nhập email hoặc số điện thoại.";
    else if (email.includes("@") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Email không hợp lệ.";
    if (!password) errs.password = "Vui lòng nhập mật khẩu.";
    else if (password.length < 8) errs.password = "Mật khẩu tối thiểu 8 ký tự.";
    if (password !== confirm) errs.confirm = "Mật khẩu xác nhận không khớp.";
    if (!agreed) errs.terms = "Vui lòng đồng ý với điều khoản.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    toast.success("Đăng ký thành công! Chào mừng bạn đến với ZayZepZone! 🎉", {
      description: "Đang chuyển hướng về trang chủ...",
      icon: "👟",
      duration: 2500,
    });
    setTimeout(() => navigate("/"), 2600);
  }

  const strengthScore = (() => {
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();

  const strengthColors = ["#E5E7EB", "#EF4444", "#F59E0B", "#22C55E", "#0077CC"];
  const strengthLabels = ["", "Yếu", "Trung bình", "Mạnh", "Rất mạnh"];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <FormField label="Họ và tên" value={name} onChange={setName} placeholder="Nguyễn Văn A" error={errors.name} />
      <FormField label="Email hoặc số điện thoại" type="email" value={email} onChange={setEmail} placeholder="ten@email.com hoặc 09xx..." error={errors.email} />
      <div>
        <FormField
          label="Mật khẩu"
          type={showPass ? "text" : "password"}
          value={password}
          onChange={setPassword}
          placeholder="Tối thiểu 8 ký tự"
          error={errors.password}
          rightEl={
            <button
              type="button"
              onClick={() => setShowPass((s) => !s)}
              className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
              aria-label={showPass ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              {showPass ? (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
              ) : (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
              )}
            </button>
          }
        />
        {/* Password strength */}
        {password.length > 0 && (
          <div className="mt-2">
            <div className="flex gap-1 mb-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex-1 h-1.5 rounded-full transition-all duration-300"
                  style={{ background: i <= strengthScore ? strengthColors[strengthScore] : "#E5E7EB" }}
                />
              ))}
            </div>
            {strengthScore > 0 && (
              <p className="text-xs font-medium" style={{ color: strengthColors[strengthScore] }}>
                {strengthLabels[strengthScore]}
              </p>
            )}
          </div>
        )}
      </div>
      <FormField
        label="Xác nhận mật khẩu"
        type="password"
        value={confirm}
        onChange={setConfirm}
        placeholder="Nhập lại mật khẩu"
        error={errors.confirm}
      />

      {/* Terms */}
      <div>
        <label className="flex items-start gap-2.5 cursor-pointer group">
          <span
            className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors"
            style={{ background: agreed ? "#0077CC" : "transparent", border: `1.5px solid ${errors.terms ? "#EF4444" : agreed ? "#0077CC" : "#D1D5DB"}` }}
            aria-hidden="true"
          >
            {agreed && (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            )}
          </span>
          <input type="checkbox" checked={agreed} onChange={() => setAgreed((a) => !a)} className="sr-only" />
          <span className="text-sm text-gray-600 leading-relaxed">
            Tôi đồng ý với{" "}
            <span className="font-semibold cursor-pointer" style={{ color: "#0077CC" }}>Điều khoản dịch vụ</span>
            {" "}và{" "}
            <span className="font-semibold cursor-pointer" style={{ color: "#0077CC" }}>Chính sách riêng tư</span>
            {" "}của ZayZepZone.
          </span>
        </label>
        {errors.terms && <p className="text-xs text-red-500 font-medium mt-1" role="alert">{errors.terms}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-xl text-white font-bold text-base transition-all duration-200 hover:opacity-90 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 disabled:opacity-70"
        style={{
          background: "linear-gradient(90deg, #0077CC, #005FA3)",
          boxShadow: "0 6px 20px rgba(0,119,204,0.35)",
        }}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white" style={{ animation: "spin 0.8s linear infinite" }} aria-hidden="true" />
            Đang tạo tài khoản...
          </span>
        ) : "Tạo tài khoản"}
      </button>

      {/* OR */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-sm text-gray-400 font-medium">hoặc</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Social */}
      <div className="grid grid-cols-2 gap-3">
        <SocialBtn
          label="Google"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
          }
          onClick={() => { toast.success("Đăng ký bằng Google thành công! 🎉"); setTimeout(() => navigate("/"), 2000); }}
        />
        <SocialBtn
          label="Facebook"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          }
          onClick={() => { toast.success("Đăng ký bằng Facebook thành công! 🎉"); setTimeout(() => navigate("/"), 2000); }}
        />
      </div>

      {/* Switch to login */}
      <p className="text-center text-sm text-gray-500">
        Đã có tài khoản?{" "}
        <button type="button" onClick={onSwitch} className="font-bold hover:underline focus:outline-none" style={{ color: "#FF6A00" }}>
          Đăng nhập
        </button>
      </p>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </form>
  );
}

/* ─── Main Auth Page ──────────────────────────────────────────── */
export function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isRegister = location.pathname === "/dang-ky";
  const [mode, setMode] = useState<"login" | "register">(isRegister ? "register" : "login");

  function switchToRegister() {
    setMode("register");
    navigate("/dang-ky", { replace: true });
  }
  function switchToLogin() {
    setMode("login");
    navigate("/dang-nhap", { replace: true });
  }

  return (
    <div className="min-h-screen flex pt-[65px]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Toaster position="top-center" toastOptions={{ style: { fontFamily: "'Inter', sans-serif" } }} />

      {/* ── Left: Brand image panel (desktop) ── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden" aria-hidden="true">
        <ImageWithFallback
          src={AUTH_BG}
          alt="ZayZepZone lifestyle"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(0,36,114,0.88) 0%, rgba(0,119,204,0.75) 60%, rgba(255,106,0,0.35) 100%)" }}
        />
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <Logo onClick={() => navigate("/")} />

          {/* Center text */}
          <div>
            <h2
              className="text-white mb-4"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.02em" }}
            >
              Sneakers chuẩn swag,{" "}
              <span style={{ color: "#FF6A00" }}>giao nhanh</span>{" "}
              tận tay.
            </h2>
            <p className="text-white/70 max-w-sm leading-relaxed">
              Đăng nhập để khám phá hàng trăm mẫu giày trendy, theo dõi đơn hàng và nhận ưu đãi đặc biệt dành riêng cho thành viên.
            </p>

            {/* Testimonials */}
            <div className="mt-8 flex flex-col gap-3">
              {[
                { text: "Giao nhanh, hàng chuẩn, giá hợp lý. Tôi đã mua 5 đôi rồi!", author: "Minh Khôi – Q.1" },
                { text: "ZayZepZone có size đa dạng nhất TP.HCM luôn!", author: "Thuỳ Linh – Q.7" },
              ].map((t, i) => (
                <div
                  key={i}
                  className="flex gap-3 p-4 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ background: "#FF6A00" }}
                  >
                    {t.author[0]}
                  </div>
                  <div>
                    <p className="text-white/90 text-sm italic">"{t.text}"</p>
                    <p className="text-white/50 text-xs mt-0.5 font-medium">{t.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <p className="text-white/30 text-xs">© 2026 ZayZepZone. All rights reserved.</p>
        </div>
      </div>

      {/* ── Right: Form panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 overflow-y-auto"
        style={{ background: "#F8FAFF" }}>
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex justify-center mb-8 lg:hidden">
            <Logo onClick={() => navigate("/")} />
          </div>

          {/* Tab switcher */}
          <div
            className="flex p-1 rounded-2xl mb-8"
            style={{ background: "#E8F0FE" }}
            role="tablist"
            aria-label="Chọn đăng nhập hoặc đăng ký"
          >
            {[
              { label: "Đăng nhập", value: "login" as const },
              { label: "Đăng ký", value: "register" as const },
            ].map((tab) => (
              <button
                key={tab.value}
                role="tab"
                aria-selected={mode === tab.value}
                onClick={() => tab.value === "login" ? switchToLogin() : switchToRegister()}
                className="flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                style={{
                  background: mode === tab.value ? "#fff" : "transparent",
                  color: mode === tab.value ? (tab.value === "login" ? "#FF6A00" : "#0077CC") : "#888",
                  boxShadow: mode === tab.value ? "0 2px 8px rgba(0,0,0,0.10)" : "none",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-7 md:p-8" style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.08)" }}>
            {/* Form heading */}
            <div className="mb-6">
              <h1 className="text-gray-900" style={{ fontWeight: 800, fontSize: "1.5rem", letterSpacing: "-0.01em" }}>
                {mode === "login" ? "Chào mừng trở lại! 👋" : "Tạo tài khoản mới"}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {mode === "login"
                  ? "Đăng nhập để tiếp tục mua sắm tại ZayZepZone."
                  : "Đăng ký miễn phí để nhận ưu đãi thành viên."}
              </p>
            </div>

            {mode === "login" ? (
              <LoginForm onSwitch={switchToRegister} />
            ) : (
              <RegisterForm onSwitch={switchToLogin} />
            )}
          </div>

          {/* Back to home */}
          <div className="flex items-center justify-center mt-6">
            <NavLink
              to="/"
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus-visible:underline"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
              Quay về trang chủ
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
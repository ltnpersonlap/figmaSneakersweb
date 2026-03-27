import { useState, useRef, useEffect, useCallback, type RefObject } from "react";

/* ─── Exported types ─────────────────────────────────────────── */
export interface FilterState {
  search: string;
  sizes: string[];
  brands: string[];
  priceRange: string;
  colors: string[];
  saleOnly: boolean;
}
export const DEFAULT_FILTER: FilterState = {
  search: "",
  sizes: [],
  brands: [],
  priceRange: "",
  colors: [],
  saleOnly: false,
};

/* ─── Config ─────────────────────────────────────────────────── */
export const SIZES = ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"];
export const BRANDS = [
  "KickZone", "SpeedX", "Jumpman", "DarkStep",
  "AeroStep", "Vans", "BlazeKick", "PacePro",
];
export const PRICE_RANGES = [
  { id: "under1m",   label: "Dưới 1.000.000₫" },
  { id: "1mto1_5m",  label: "1.000.000₫ – 1.500.000₫" },
  { id: "1_5mto2m",  label: "1.500.000₫ – 2.000.000₫" },
  { id: "over2m",    label: "Trên 2.000.000₫" },
];
export const COLORS = [
  { id: "white",  label: "Trắng",      hex: "#FFFFFF" },
  { id: "black",  label: "Đen",        hex: "#1A1A1A" },
  { id: "blue",   label: "Xanh dương", hex: "#0077CC" },
  { id: "red",    label: "Đỏ",         hex: "#CC0000" },
  { id: "orange", label: "Cam",        hex: "#FF6A00" },
  { id: "green",  label: "Xanh lá",    hex: "#00CC66" },
  { id: "yellow", label: "Vàng",       hex: "#FFD600" },
  { id: "pink",   label: "Hồng",       hex: "#FFB3C1" },
];

/* ─── Click-outside hook ─────────────────────────────────────── */
function useClickOutside(ref: RefObject<HTMLElement | null>, cb: () => void) {
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) cb();
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [ref, cb]);
}

/* ─── Icons ──────────────────────────────────────────────────── */
const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
);
const IconChevron = ({ open }: { open: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);
const IconX = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
const IconFilter = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="8" y1="12" x2="16" y2="12" />
    <line x1="11" y1="18" x2="13" y2="18" />
  </svg>
);
const IconCheck = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white"
    strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

/* ─── Generic Dropdown ───────────────────────────────────────── */
interface DropdownProps {
  label: string;
  activeCount: number;
  children: React.ReactNode;
  onClear: () => void;
}
function Dropdown({ label, activeCount, children, onClear }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useClickOutside(ref, close);

  const isActive = activeCount > 0;

  return (
    <div ref={ref} className="relative flex-shrink-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 select-none"
        style={{
          background: isActive ? "#EBF5FF" : "#F7F8FA",
          color: isActive ? "#0077CC" : "#444",
          border: `1.5px solid ${isActive ? "#0077CC" : "#E5E7EB"}`,
        }}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {label}
        {isActive && (
          <span
            className="ml-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white"
            style={{ background: "#0077CC", fontSize: "0.6rem", fontWeight: 700 }}
          >
            {activeCount}
          </span>
        )}
        <IconChevron open={open} />
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-2 rounded-xl bg-white z-[200] overflow-hidden"
          style={{
            minWidth: "200px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
            border: "1px solid #E5E7EB",
            animation: "dropdownIn 0.15s ease",
          }}
        >
          <div className="p-3">{children}</div>
          {isActive && (
            <div className="border-t border-gray-100 px-3 py-2">
              <button
                onClick={() => { onClear(); setOpen(false); }}
                className="text-xs font-semibold transition-colors"
                style={{ color: "#0077CC" }}
              >
                Xóa bộ lọc này
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Checkbox item ──────────────────────────────────────────── */
function CheckItem({
  label, checked, onChange,
}: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
      <span
        className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-colors"
        style={{
          background: checked ? "#0077CC" : "transparent",
          border: `1.5px solid ${checked ? "#0077CC" : "#D1D5DB"}`,
        }}
        aria-hidden="true"
      >
        {checked && <IconCheck />}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span className="text-sm text-gray-700 group-hover:text-gray-900 select-none">{label}</span>
    </label>
  );
}

/* ─── Props ──────────────────────────────────────────────────── */
interface FilterBarProps {
  filterState: FilterState;
  onChange: (f: FilterState) => void;
  resultCount: number;
}

/* ─── Main Component ─────────────────────────────────────────── */
export function FilterBar({ filterState, onChange, resultCount }: FilterBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  // Draft state for mobile modal (apply on confirm)
  const [draft, setDraft] = useState<FilterState>(filterState);

  // Sync draft when modal opens
  useEffect(() => {
    if (mobileOpen) setDraft(filterState);
  }, [mobileOpen]);

  // Prevent body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* helpers */
  const set = (patch: Partial<FilterState>) => onChange({ ...filterState, ...patch });
  const setDraftP = (patch: Partial<FilterState>) => setDraft((d) => ({ ...d, ...patch }));

  function toggleArr(arr: string[], val: string) {
    return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
  }

  const activeCount =
    filterState.sizes.length +
    filterState.brands.length +
    (filterState.priceRange ? 1 : 0) +
    filterState.colors.length +
    (filterState.saleOnly ? 1 : 0);

  const draftCount =
    draft.sizes.length +
    draft.brands.length +
    (draft.priceRange ? 1 : 0) +
    draft.colors.length +
    (draft.saleOnly ? 1 : 0);

  /* ── Render ─────────────────────────────────────────────────── */
  return (
    <>
      {/* ── STICKY BAR ── */}
      <div
        className="sticky z-40 w-full bg-white"
        style={{
          top: "65px",
          borderBottom: "1px solid #E5E7EB",
          boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-3 flex items-center gap-3">

          {/* ── Search ── */}
          <div className="relative flex-1 min-w-0" style={{ maxWidth: "300px" }}>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <IconSearch />
            </span>
            <input
              type="search"
              value={filterState.search}
              onChange={(e) => set({ search: e.target.value })}
              placeholder="Tìm theo tên, mã..."
              className="w-full pl-9 pr-8 py-2 rounded-lg text-sm outline-none transition-all duration-150"
              style={{
                background: "#F7F8FA",
                border: "1.5px solid #E5E7EB",
                color: "#1A1A1A",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#0077CC"; e.currentTarget.style.background = "#fff"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.background = "#F7F8FA"; }}
              aria-label="Tìm kiếm sản phẩm theo tên hoặc mã"
            />
            {filterState.search && (
              <button
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => set({ search: "" })}
                aria-label="Xóa tìm kiếm"
              >
                <IconX size={14} />
              </button>
            )}
          </div>

          {/* ── Divider ── */}
          <div className="hidden md:block w-px h-6 bg-gray-200 flex-shrink-0" />

          {/* ── Desktop dropdowns ── */}
          <div className="hidden md:flex items-center gap-2 flex-wrap">

            {/* Size */}
            <Dropdown
              label="Size"
              activeCount={filterState.sizes.length}
              onClear={() => set({ sizes: [] })}
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Chọn size</p>
              <div className="grid grid-cols-4 gap-1.5">
                {SIZES.map((s) => {
                  const on = filterState.sizes.includes(s);
                  return (
                    <button
                      key={s}
                      onClick={() => set({ sizes: toggleArr(filterState.sizes, s) })}
                      className="py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                      style={{
                        background: on ? "#0077CC" : "#F3F4F6",
                        color: on ? "#fff" : "#555",
                        border: `1.5px solid ${on ? "#0077CC" : "transparent"}`,
                      }}
                      aria-pressed={on}
                      aria-label={`Size ${s}`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </Dropdown>

            {/* Thương hiệu */}
            <Dropdown
              label="Thương hiệu"
              activeCount={filterState.brands.length}
              onClear={() => set({ brands: [] })}
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Thương hiệu</p>
              <div className="flex flex-col" style={{ minWidth: "168px" }}>
                {BRANDS.map((b) => (
                  <CheckItem
                    key={b}
                    label={b}
                    checked={filterState.brands.includes(b)}
                    onChange={() => set({ brands: toggleArr(filterState.brands, b) })}
                  />
                ))}
              </div>
            </Dropdown>

            {/* Giá */}
            <Dropdown
              label="Giá"
              activeCount={filterState.priceRange ? 1 : 0}
              onClear={() => set({ priceRange: "" })}
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Khoảng giá</p>
              <div className="flex flex-col" style={{ minWidth: "210px" }}>
                {PRICE_RANGES.map((pr) => {
                  const on = filterState.priceRange === pr.id;
                  return (
                    <label key={pr.id} className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
                      <span
                        className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
                        style={{
                          border: `1.5px solid ${on ? "#0077CC" : "#D1D5DB"}`,
                          background: on ? "#0077CC" : "transparent",
                        }}
                        aria-hidden="true"
                      >
                        {on && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>
                      <input
                        type="radio"
                        name="priceRange"
                        checked={on}
                        onChange={() => set({ priceRange: pr.id })}
                        className="sr-only"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900 select-none">
                        {pr.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </Dropdown>

            {/* ── Color swatches inline ── */}
            <div
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg flex-shrink-0"
              style={{ border: "1.5px solid #E5E7EB", background: "#F7F8FA" }}
              role="group"
              aria-label="Lọc theo màu sắc"
            >
              <span className="text-xs font-medium text-gray-400 mr-0.5 select-none hidden lg:block">Màu</span>
              {COLORS.map((c) => {
                const on = filterState.colors.includes(c.id);
                return (
                  <button
                    key={c.id}
                    onClick={() => set({ colors: toggleArr(filterState.colors, c.id) })}
                    className="relative flex-shrink-0 transition-transform duration-150 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1"
                    style={{ width: "22px", height: "22px", borderRadius: "50%" }}
                    aria-pressed={on}
                    aria-label={`Màu ${c.label}`}
                    title={c.label}
                  >
                    <span
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: c.hex,
                        border: `1.5px solid ${c.hex === "#FFFFFF" ? "#D1D5DB" : "transparent"}`,
                        boxShadow: on ? `0 0 0 2.5px #fff, 0 0 0 4px #0077CC` : "none",
                        transition: "box-shadow 0.15s",
                      }}
                    />
                    {on && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                          stroke={c.hex === "#FFFFFF" || c.hex === "#FFD600" || c.hex === "#FFB3C1" ? "#555" : "white"}
                          strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                    )}
                  </button>
                );
              })}
              {filterState.colors.length > 0 && (
                <button
                  onClick={() => set({ colors: [] })}
                  className="ml-1 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                  aria-label="Xóa bộ lọc màu"
                >
                  <IconX size={13} />
                </button>
              )}
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="hidden md:block w-px h-6 bg-gray-200 flex-shrink-0" />

          {/* ── Sale toggle ── */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <button
              role="switch"
              aria-checked={filterState.saleOnly}
              onClick={() => set({ saleOnly: !filterState.saleOnly })}
              className="relative flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1"
              style={{
                width: "36px",
                height: "20px",
                borderRadius: "10px",
                background: filterState.saleOnly ? "#0077CC" : "#D1D5DB",
                transition: "background 0.2s",
              }}
              aria-label="Chỉ hiển thị giảm giá"
            >
              <span
                className="absolute top-0.5"
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: "#fff",
                  left: filterState.saleOnly ? "18px" : "2px",
                  transition: "left 0.2s",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.18)",
                }}
              />
            </button>
            <span className="text-sm text-gray-600 select-none whitespace-nowrap" style={{ fontSize: "0.82rem" }}>
              Chỉ hiển thị <span className="font-semibold" style={{ color: "#FF6A00" }}>giảm giá</span>
            </span>
          </div>

          {/* ── Clear all (desktop) ── */}
          {activeCount > 0 && (
            <button
              onClick={() => onChange(DEFAULT_FILTER)}
              className="hidden md:flex items-center gap-1.5 text-xs font-semibold transition-colors flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 px-2 py-1 rounded-md hover:bg-red-50"
              style={{ color: "#E53E3E" }}
              aria-label="Xóa tất cả bộ lọc"
            >
              <IconX size={12} />
              Xóa tất cả ({activeCount})
            </button>
          )}

          {/* ── Mobile filter button ── */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden ml-auto flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            style={{
              background: activeCount > 0 ? "#EBF5FF" : "#F7F8FA",
              color: activeCount > 0 ? "#0077CC" : "#444",
              border: `1.5px solid ${activeCount > 0 ? "#0077CC" : "#E5E7EB"}`,
            }}
            aria-label={`Mở bộ lọc${activeCount > 0 ? ` (${activeCount} đang bật)` : ""}`}
          >
            <IconFilter />
            Bộ lọc
            {activeCount > 0 && (
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-white"
                style={{ background: "#0077CC", fontSize: "0.65rem", fontWeight: 700 }}
              >
                {activeCount}
              </span>
            )}
          </button>
        </div>

        {/* ── Active filter chips (desktop) ── */}
        {activeCount > 0 && (
          <div
            className="hidden md:flex items-center gap-2 px-4 md:px-10 pb-2.5 flex-wrap max-w-7xl mx-auto"
            aria-label="Bộ lọc đang áp dụng"
          >
            {filterState.sizes.map((s) => (
              <Chip key={`size-${s}`} label={`Size ${s}`} onRemove={() => set({ sizes: filterState.sizes.filter((x) => x !== s) })} />
            ))}
            {filterState.brands.map((b) => (
              <Chip key={`brand-${b}`} label={b} onRemove={() => set({ brands: filterState.brands.filter((x) => x !== b) })} />
            ))}
            {filterState.priceRange && (
              <Chip
                label={PRICE_RANGES.find((p) => p.id === filterState.priceRange)?.label ?? ""}
                onRemove={() => set({ priceRange: "" })}
              />
            )}
            {filterState.colors.map((c) => {
              const col = COLORS.find((x) => x.id === c);
              return col ? (
                <Chip
                  key={`color-${c}`}
                  label={col.label}
                  dot={col.hex}
                  onRemove={() => set({ colors: filterState.colors.filter((x) => x !== c) })}
                />
              ) : null;
            })}
            {filterState.saleOnly && (
              <Chip label="Giảm giá" onRemove={() => set({ saleOnly: false })} accent />
            )}
            <span className="text-xs text-gray-400 ml-1">
              {resultCount} kết quả
            </span>
          </div>
        )}
      </div>

      {/* ── MOBILE MODAL ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[300] flex flex-col justify-end"
          style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setMobileOpen(false); }}
          role="dialog"
          aria-modal="true"
          aria-label="Bộ lọc sản phẩm"
        >
          <div
            className="bg-white rounded-t-2xl flex flex-col"
            style={{
              maxHeight: "92dvh",
              animation: "slideUp 0.28s cubic-bezier(0.32,0.72,0,1)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center gap-2">
                <h2 className="text-gray-900" style={{ fontSize: "1rem", fontWeight: 700 }}>
                  Bộ lọc
                </h2>
                {draftCount > 0 && (
                  <span
                    className="px-2 py-0.5 rounded-full text-white text-xs font-bold"
                    style={{ background: "#0077CC" }}
                  >
                    {draftCount}
                  </span>
                )}
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                aria-label="Đóng bộ lọc"
              >
                <IconX size={18} />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1 px-5 py-4 space-y-6">

              {/* Sale toggle */}
              <div
                className="flex items-center justify-between p-4 rounded-xl"
                style={{ background: draft.saleOnly ? "#EBF5FF" : "#F7F8FA" }}
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800">Chỉ hiển thị giảm giá</p>
                  <p className="text-xs text-gray-400 mt-0.5">Lọc sản phẩm đang có khuyến mãi</p>
                </div>
                <button
                  role="switch"
                  aria-checked={draft.saleOnly}
                  onClick={() => setDraftP({ saleOnly: !draft.saleOnly })}
                  className="relative flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  style={{
                    width: "44px", height: "24px", borderRadius: "12px",
                    background: draft.saleOnly ? "#0077CC" : "#D1D5DB",
                    transition: "background 0.2s",
                  }}
                  aria-label="Chỉ hiển thị giảm giá"
                >
                  <span
                    className="absolute top-1"
                    style={{
                      width: "16px", height: "16px", borderRadius: "50%",
                      background: "#fff",
                      left: draft.saleOnly ? "24px" : "4px",
                      transition: "left 0.2s",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                    }}
                  />
                </button>
              </div>

              {/* Size */}
              <MobileSection title="Size" count={draft.sizes.length} onClear={() => setDraftP({ sizes: [] })}>
                <div className="grid grid-cols-5 gap-2 mt-3">
                  {SIZES.map((s) => {
                    const on = draft.sizes.includes(s);
                    return (
                      <button
                        key={s}
                        onClick={() => setDraftP({ sizes: toggleArr(draft.sizes, s) })}
                        className="py-2 rounded-xl text-sm font-semibold transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                        style={{
                          background: on ? "#0077CC" : "#F3F4F6",
                          color: on ? "#fff" : "#555",
                        }}
                        aria-pressed={on}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </MobileSection>

              {/* Brand */}
              <MobileSection title="Thương hiệu" count={draft.brands.length} onClear={() => setDraftP({ brands: [] })}>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {BRANDS.map((b) => {
                    const on = draft.brands.includes(b);
                    return (
                      <button
                        key={b}
                        onClick={() => setDraftP({ brands: toggleArr(draft.brands, b) })}
                        className="px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 flex items-center gap-2"
                        style={{
                          background: on ? "#EBF5FF" : "#F3F4F6",
                          color: on ? "#0077CC" : "#555",
                          border: `1.5px solid ${on ? "#0077CC" : "transparent"}`,
                        }}
                        aria-pressed={on}
                      >
                        {on && <IconCheck />}
                        {b}
                      </button>
                    );
                  })}
                </div>
              </MobileSection>

              {/* Price */}
              <MobileSection title="Khoảng giá" count={draft.priceRange ? 1 : 0} onClear={() => setDraftP({ priceRange: "" })}>
                <div className="flex flex-col gap-2 mt-3">
                  {PRICE_RANGES.map((pr) => {
                    const on = draft.priceRange === pr.id;
                    return (
                      <button
                        key={pr.id}
                        onClick={() => setDraftP({ priceRange: on ? "" : pr.id })}
                        className="px-4 py-3 rounded-xl text-sm font-medium text-left transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 flex items-center justify-between"
                        style={{
                          background: on ? "#EBF5FF" : "#F3F4F6",
                          color: on ? "#0077CC" : "#555",
                          border: `1.5px solid ${on ? "#0077CC" : "transparent"}`,
                        }}
                        aria-pressed={on}
                      >
                        {pr.label}
                        {on && (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="#0077CC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              </MobileSection>

              {/* Colors */}
              <MobileSection title="Màu sắc" count={draft.colors.length} onClear={() => setDraftP({ colors: [] })}>
                <div className="flex flex-wrap gap-3 mt-3">
                  {COLORS.map((c) => {
                    const on = draft.colors.includes(c.id);
                    return (
                      <button
                        key={c.id}
                        onClick={() => setDraftP({ colors: toggleArr(draft.colors, c.id) })}
                        className="flex flex-col items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
                        aria-pressed={on}
                        aria-label={`Màu ${c.label}`}
                      >
                        <span
                          className="flex items-center justify-center"
                          style={{
                            width: "36px", height: "36px", borderRadius: "50%",
                            background: c.hex,
                            border: `2px solid ${c.hex === "#FFFFFF" ? "#D1D5DB" : "transparent"}`,
                            boxShadow: on ? `0 0 0 3px #fff, 0 0 0 5px #0077CC` : "0 1px 4px rgba(0,0,0,0.1)",
                            transition: "box-shadow 0.15s",
                          }}
                        >
                          {on && (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                              stroke={c.hex === "#FFFFFF" || c.hex === "#FFD600" || c.hex === "#FFB3C1" ? "#555" : "white"}
                              strokeWidth="3" strokeLinecap="round">
                              <path d="M20 6 9 17l-5-5" />
                            </svg>
                          )}
                        </span>
                        <span className="text-xs text-gray-500" style={{ fontSize: "0.67rem" }}>{c.label}</span>
                      </button>
                    );
                  })}
                </div>
              </MobileSection>
            </div>

            {/* Modal footer */}
            <div
              className="flex items-center gap-3 px-5 py-4 border-t border-gray-100 flex-shrink-0"
              style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
            >
              <button
                onClick={() => { setDraft(DEFAULT_FILTER); }}
                className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                style={{
                  background: "#F3F4F6",
                  color: "#555",
                  border: "1.5px solid #E5E7EB",
                }}
              >
                Xóa tất cả
              </button>
              <button
                onClick={() => { onChange(draft); setMobileOpen(false); }}
                className="flex-[2] py-3 rounded-xl text-sm font-semibold text-white transition-all duration-150 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                style={{ background: "#0077CC", boxShadow: "0 4px 14px rgba(0,119,204,0.35)" }}
              >
                Áp dụng{draftCount > 0 ? ` (${draftCount})` : ""}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes dropdownIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

/* ─── Chip ───────────────────────────────────────────────────── */
function Chip({ label, dot, onRemove, accent }: {
  label: string; dot?: string; onRemove: () => void; accent?: boolean;
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 rounded-full text-xs font-medium"
      style={{
        background: accent ? "#FFF4ED" : "#EBF5FF",
        color: accent ? "#FF6A00" : "#0077CC",
        border: `1px solid ${accent ? "#FFD0A8" : "#BFDBFE"}`,
      }}
    >
      {dot && (
        <span
          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
          style={{ background: dot, border: dot === "#FFFFFF" ? "1px solid #ccc" : "none" }}
        />
      )}
      {label}
      <button
        onClick={onRemove}
        className="ml-0.5 opacity-60 hover:opacity-100 transition-opacity focus:outline-none"
        aria-label={`Xóa ${label}`}
      >
        <IconX size={11} />
      </button>
    </span>
  );
}

/* ─── MobileSection ──────────────────────────────────────────── */
function MobileSection({ title, count, onClear, children }: {
  title: string; count: number; onClear: () => void; children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
          {title}
          {count > 0 && (
            <span
              className="px-1.5 py-0.5 rounded-full text-white"
              style={{ background: "#0077CC", fontSize: "0.6rem", fontWeight: 700 }}
            >
              {count}
            </span>
          )}
        </h3>
        {count > 0 && (
          <button
            onClick={onClear}
            className="text-xs font-semibold focus:outline-none"
            style={{ color: "#0077CC" }}
          >
            Xóa
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

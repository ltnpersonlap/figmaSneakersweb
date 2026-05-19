import { PRODUCTS } from "../data/products";

/* ─── Types ──────────────────────────────────────────────────── */
interface SitemapURL {
  loc: string;
  lastmod: string;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: string;
}

/* ─── Generate Sitemap XML ───────────────────────────────────── */
export function generateSitemapXML(baseUrl: string = "https://zayzepzone.com"): string {
  const now = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

  const urls: SitemapURL[] = [
    // Static pages
    {
      loc: baseUrl,
      lastmod: now,
      changefreq: "daily",
      priority: "1.0",
    },
    {
      loc: `${baseUrl}/san-pham`,
      lastmod: now,
      changefreq: "daily",
      priority: "0.9",
    },
    {
      loc: `${baseUrl}/xu-huong`,
      lastmod: now,
      changefreq: "weekly",
      priority: "0.8",
    },
    {
      loc: `${baseUrl}/ve-chung-toi`,
      lastmod: now,
      changefreq: "monthly",
      priority: "0.7",
    },
    {
      loc: `${baseUrl}/dang-nhap`,
      lastmod: now,
      changefreq: "monthly",
      priority: "0.5",
    },
    {
      loc: `${baseUrl}/dang-ky`,
      lastmod: now,
      changefreq: "monthly",
      priority: "0.5",
    },
  ];

  // Dynamic product pages
  PRODUCTS.forEach((product) => {
    urls.push({
      loc: `${baseUrl}/san-pham/${product.id}`,
      lastmod: now,
      changefreq: "weekly",
      priority: "0.8",
    });
  });

  // Build XML
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const urlsetClose = "</urlset>";

  const urlEntries = urls
    .map(
      (url) => `
  <url>
    <loc>${escapeXML(url.loc)}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
    )
    .join("");

  return `${xmlHeader}\n${urlsetOpen}${urlEntries}\n${urlsetClose}`;
}

/* ─── Escape XML special characters ─────────────────────────── */
function escapeXML(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/* ─── Generate sitemap and download ─────────────────────────── */
export function downloadSitemap(baseUrl: string = "https://zayzepzone.com"): void {
  const xml = generateSitemapXML(baseUrl);
  const blob = new Blob([xml], { type: "application/xml" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "sitemap.xml";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/* ─── Usage Example ─────────────────────────────────────────── */
// Call this function in development to generate sitemap.xml:
// import { downloadSitemap } from "./utils/sitemap-generator";
// downloadSitemap("https://zayzepzone.com");

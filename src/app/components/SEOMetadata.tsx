import { useEffect } from "react";

/* ─── Types ──────────────────────────────────────────────────── */
interface SEOMetadataProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  twitterCard?: "summary" | "summary_large_image";
  author?: string;
  robots?: string;
}

/* ─── SEO Metadata Component ─────────────────────────────────── */
export function SEOMetadata({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  ogType = "website",
  twitterCard = "summary_large_image",
  author,
  robots = "index, follow",
}: SEOMetadataProps) {
  useEffect(() => {
    // Update document title
    document.title = `${title} | ZayZepZone - Giày Sneakers Chính Hãng`;

    // Update or create meta tags
    const metaTags = [
      { name: "description", content: description },
      { name: "keywords", content: keywords || "giày sneakers, giày thể thao, sneakers chính hãng, giày nam, giày nữ, ZayZepZone, TP.HCM" },
      { name: "author", content: author || "ZayZepZone" },
      { name: "robots", content: robots },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0077CC" },

      // Open Graph
      { property: "og:title", content: `${title} | ZayZepZone` },
      { property: "og:description", content: description },
      { property: "og:type", content: ogType },
      { property: "og:url", content: canonicalUrl },
      { property: "og:site_name", content: "ZayZepZone" },
      { property: "og:locale", content: "vi_VN" },
      ...(ogImage ? [{ property: "og:image", content: ogImage }] : []),
      ...(ogImage ? [{ property: "og:image:width", content: "1200" }] : []),
      ...(ogImage ? [{ property: "og:image:height", content: "630" }] : []),

      // Twitter Cards
      { name: "twitter:card", content: twitterCard },
      { name: "twitter:title", content: `${title} | ZayZepZone` },
      { name: "twitter:description", content: description },
      ...(ogImage ? [{ name: "twitter:image", content: ogImage }] : []),
      { name: "twitter:site", content: "@zayzepzone" },

      // Additional SEO
      { name: "format-detection", content: "telephone=no" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      let tag = document.querySelector(selector);

      if (!tag) {
        tag = document.createElement("meta");
        if (name) tag.setAttribute("name", name);
        if (property) tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }

      tag.setAttribute("content", content);
    });

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    // Add alternate language links
    let alternateLang = document.querySelector('link[rel="alternate"][hreflang="vi"]');
    if (!alternateLang) {
      alternateLang = document.createElement("link");
      alternateLang.setAttribute("rel", "alternate");
      alternateLang.setAttribute("hreflang", "vi");
      document.head.appendChild(alternateLang);
    }
    alternateLang.setAttribute("href", canonicalUrl);

  }, [title, description, keywords, canonicalUrl, ogImage, ogType, twitterCard, author, robots]);

  return null;
}

/* ─── Presets ────────────────────────────────────────────────── */
export const SEO_PRESETS = {
  home: {
    title: "Trang Chủ",
    description: "ZayZepZone - Cửa hàng giày sneakers chính hãng hàng đầu TP.HCM. Chuyên cung cấp Nike, Adidas, Puma, Vans với giá tốt nhất. Giao hàng nhanh, bảo hành chính hãng.",
    keywords: "zayzepzone, giày sneakers, giày thể thao chính hãng, giày nam, giày nữ, sneakers TP.HCM, giày nike, giày adidas",
  },
  products: {
    title: "Sản Phẩm",
    description: "Khám phá bộ sưu tập giày sneakers đa dạng tại ZayZepZone. Từ lifestyle, running, basketball đến skate - hơn 100+ mẫu mã, nhiều size, nhiều màu sắc.",
    keywords: "sản phẩm giày sneakers, mua giày sneakers, giày thể thao giá rẻ, giày running, giày basketball",
  },
  trends: {
    title: "Xu Hướng",
    description: "Cập nhật xu hướng sneakers mới nhất 2026. Những đôi giày hot trend được giới trẻ Sài Gòn yêu thích, từ chunky retro đến minimal modern.",
    keywords: "xu hướng giày sneakers 2026, giày hot trend, sneaker fashion, street style",
  },
  about: {
    title: "Về Chúng Tôi",
    description: "ZayZepZone - Hành trình từ 2024 với sứ mệnh mang đến giày sneakers chính hãng chất lượng cao cho giới trẻ Việt Nam. Uy tín, tận tâm, chuyên nghiệp.",
    keywords: "về zayzepzone, cửa hàng giày uy tín, giày chính hãng TP.HCM",
  },
};

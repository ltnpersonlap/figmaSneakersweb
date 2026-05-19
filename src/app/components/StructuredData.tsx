import type { Product, Review } from "../data/products";

/* ─── Types ──────────────────────────────────────────────────── */
interface OrganizationSchemaProps {
  url: string;
}

interface ProductSchemaProps {
  product: Product;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: Array<{ name: string; url: string }>;
}

interface FAQSchemaProps {
  faqs: Array<{ question: string; answer: string }>;
}

interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  images: string[];
}

/* ─── Organization Schema ────────────────────────────────────── */
export function OrganizationSchema({ url }: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ZayZepZone",
    alternateName: "ZayZep",
    url,
    logo: `${url}/logo.png`,
    description: "Cửa hàng giày sneakers chính hãng dành cho giới trẻ TP.HCM. Chuyên cung cấp các dòng giày lifestyle, running, basketball với giá tốt nhất thị trường.",
    foundingDate: "2024",
    address: {
      "@type": "PostalAddress",
      addressLocality: "TP. Hồ Chí Minh",
      addressCountry: "VN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      areaServed: "VN",
      availableLanguage: ["vi"],
    },
    sameAs: [
      "https://facebook.com/zayzepzone",
      "https://instagram.com/zayzepzone",
      "https://tiktok.com/@zayzepzone",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ─── Product Schema ─────────────────────────────────────────── */
export function ProductSchema({ product, url }: ProductSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    description: product.description,
    image: [product.image, ...product.gallery],
    sku: `ZZZ-${product.id}`,
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "VND",
      price: product.price,
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "ZayZepZone",
      },
      ...(product.originalPrice && {
        priceSpecification: {
          "@type": "PriceSpecification",
          price: product.originalPrice,
          priceCurrency: "VND",
        },
      }),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating.toString(),
      reviewCount: product.reviews.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    review: product.mockReviews.map((r: Review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: r.author,
      },
      datePublished: convertDateToISO(r.date),
      reviewBody: r.text,
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating.toString(),
        bestRating: "5",
        worstRating: "1",
      },
      ...(r.verified && { itemReviewed: { "@type": "Product", name: product.name } }),
    })),
    category: product.category,
    material: product.material,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Màu sắc",
        value: product.colors.length > 1 ? "Nhiều màu" : "1 màu",
      },
      {
        "@type": "PropertyValue",
        name: "Kích thước",
        value: product.sizes.join(", "),
      },
      {
        "@type": "PropertyValue",
        name: "Bảo hành",
        value: product.warranty,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ─── Breadcrumb Schema ──────────────────────────────────────── */
export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ─── FAQ Schema ─────────────────────────────────────────────── */
export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ─── Article Schema ─────────────────────────────────────────── */
export function ArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  authorName,
  images,
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished,
    dateModified,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "ZayZepZone",
      logo: {
        "@type": "ImageObject",
        url: `${url}/logo.png`,
      },
    },
    image: images,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ─── WebSite Schema (Search) ────────────────────────────────── */
export function WebSiteSchema({ url }: { url: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ZayZepZone",
    url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/san-pham?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ─── Helpers ────────────────────────────────────────────────── */
function convertDateToISO(dateStr: string): string {
  // Convert "10/03/2026" to "2026-03-10"
  const [day, month, year] = dateStr.split("/");
  return `${year}-${month}-${day}`;
}

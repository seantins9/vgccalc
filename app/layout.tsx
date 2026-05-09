import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vgc-calc.pages.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Pokemon Damage Calculator – Champions / VGC 2026 Reg M-A",
    template: "%s · Pokemon Damage Calculator",
  },
  description:
    "Free, fast, mobile-friendly Pokemon damage calculator for Gen 9 (Scarlet/Violet, Champions, VGC 2026 Reg M-A). Calculate any matchup with full EV, IV, nature, item, ability, Tera, weather, and terrain support.",
  keywords: [
    "Pokemon damage calculator",
    "Pokemon calc",
    "VGC 2026 calculator",
    "Pokemon Champions calc",
    "Scarlet Violet damage calc",
    "Gen 9 damage calculator",
    "Tera damage calc",
  ],
  openGraph: {
    title: "Pokemon Damage Calculator – Champions / VGC 2026",
    description:
      "Free Gen 9 Pokemon damage calculator with full EV/IV/Tera/weather support.",
    url: SITE_URL,
    siteName: "VGC Calc",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pokemon Damage Calculator – Champions / VGC 2026",
    description:
      "Free Gen 9 Pokemon damage calculator with full EV/IV/Tera/weather support.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Pokemon Damage Calculator",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    url: SITE_URL,
    description:
      "Gen 9 Pokemon damage calculator covering Champions and VGC 2026 Reg M-A.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

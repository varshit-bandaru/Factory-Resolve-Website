
import "./globals.css";
import "./sections.css";
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://factoryresolve.com"
).replace(/\/$/, "");
const siteName = "Factory Resolve";
const description =
  "Factory Resolve is the private operating layer for factory work, helping manufacturing teams capture, route, resolve, and learn from work across the plant.";
export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | The private operating layer for factory work`,
    template: `%s | ${siteName}`,
  },
  description,
  applicationName: siteName,
  authors: [{ name: "B.Varshit" }],
  creator: "B.Varshit",
  publisher: siteName,
  keywords: [
    "manufacturing workflow software",
    "factory operations software",
    "plant operations",
    "private manufacturing software",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteName} | The private operating layer for factory work`,
    description,
    url: "/",
    siteName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | The private operating layer for factory work`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};
export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: siteName,
        url: siteUrl,
        description,
        founder: {
          "@type": "Person",
          name: "B.Varshit",
        },
        knowsAbout: [
          "Manufacturing operations",
          "Factory workflow management",
          "Production handoffs",
          "Plant maintenance",
          "Quality operations",
        ],
      },
      {
        "@type": "WebSite",
        name: siteName,
        url: siteUrl,
        description,
      },
    ],
  };
  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingDock from "@/components/FloatingDock";
import MobileBottomBar from "@/components/mobile/MobileBottomBar";
import ScrollProgress from "@/components/ui/scroll-progress";
import { company, services } from "@/data/site";
import { BRAND_SUFFIX, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL, absoluteUrl, jsonLd } from "@/lib/seo";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const homeTitle =
  "Jagdamba Procut Pvt. Ltd. | Steel Plate Stockist & CNC Profile Cutting in Vadodara";
const homeDescription =
  "Steel plate stockist and processor in Vadodara, Gujarat since 2001 — approx. 2,500 MT ready stock (3–300 mm), 8 CNC profile cutting machines, 12 kW laser cutting, CNC drilling and ultrasonic testing under one roof.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: homeTitle,
    template: `%s | ${BRAND_SUFFIX}`,
  },
  description: homeDescription,
  keywords: [
    "steel plate stockist Vadodara",
    "steel plate supplier Gujarat",
    "CNC profile cutting Vadodara",
    "laser cutting Vadodara",
    "CNC drilling",
    "ultrasonic testing steel plates",
    "SA516 Grade 70",
    "IS 2062 E350",
    "heavy plate cutting",
    "Jagdamba Procut",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Steel processing",
  formatDetection: { telephone: true, email: true, address: true },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: "/",
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: [DEFAULT_OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.BING_SITE_VERIFICATION
      ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } }
      : {}),
  },
};

const businessId = `${SITE_URL}/#business`;

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": businessId,
      name: company.name,
      legalName: company.legalName,
      slogan: company.tagline,
      url: SITE_URL,
      logo: absoluteUrl("/images/logo.png"),
      image: absoluteUrl(DEFAULT_OG_IMAGE.url),
      email: company.email,
      telephone: `+91${company.whatsappNumber}`,
      foundingDate: String(company.since),
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
      areaServed: [
        { "@type": "City", name: "Vadodara" },
        { "@type": "State", name: "Gujarat" },
        { "@type": "Country", name: "India" },
      ],
      contactPoint: [
        { "@type": "ContactPoint", telephone: `+91${company.inquiryPhone}`, contactType: "sales", areaServed: "IN" },
        { "@type": "ContactPoint", telephone: `+91${company.accountsPhones[0]}`, contactType: "billing support", areaServed: "IN" },
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "504/1A GIDC Makarpura",
        addressLocality: "Vadodara",
        addressRegion: "Gujarat",
        postalCode: "390010",
        addressCountry: "IN",
      },
      description:
        "Steel plate stockholding and processing in Vadodara: CNC profile cutting, 12 kW laser cutting, CNC drilling, oxy-fuel heavy plate cutting and ultrasonic testing.",
      knowsAbout: [
        "Steel plates",
        "CNC profile cutting",
        "Laser cutting",
        "CNC drilling",
        "Oxy-fuel cutting",
        "Ultrasonic testing",
        "Boiler quality plates",
        "Structural steel plates",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Steel supply and processing services",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.summary,
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      alternateName: BRAND_SUFFIX,
      inLanguage: "en-IN",
      publisher: { "@id": businessId },
    },
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f7f7f5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="site-shell flex min-h-full flex-col font-sans" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(siteJsonLd)}
        />
        <ScrollProgress />
        <Header />
        <main className="flex-1 pb-20 md:pb-10">{children}</main>
        <Footer />
        <FloatingDock />
        <MobileBottomBar />
      </body>
    </html>
  );
}

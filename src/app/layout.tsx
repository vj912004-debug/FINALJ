import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingDock from "@/components/FloatingDock";
import MobileBottomBar from "@/components/mobile/MobileBottomBar";
import ScrollProgress from "@/components/ui/scroll-progress";
import { company } from "@/data/site";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://finalj-wheat.vercel.app"),
  title: {
    default:
      "Jagdamba Procut Pvt. Ltd. | Steel Profile Cutting, CNC & Laser | Vadodara",
    template: "%s | Jagdamba Procut",
  },
  description:
    "Jagdamba Procut Pvt. Ltd. — steel plate processing in Vadodara. CNC profile cutting, 12 kW laser cutting, CNC drilling, ultrasonic testing and heavy plate handling. Precision in Steel. Strength in Every Cut.",
  keywords: [
    "steel profile cutting",
    "CNC profile cutting",
    "laser cutting",
    "steel plate processing",
    "industrial steel processing",
    "precision profile cutting",
    "heavy plate processing",
    "Jagdamba Procut",
    "Vadodara",
  ],
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "Jagdamba Procut Pvt. Ltd. | Precision in Steel",
    description:
      "CNC profile cutting, 12 kW laser, drilling and ultrasonic testing for steel plates in Vadodara.",
    url: "https://finalj-wheat.vercel.app",
    siteName: company.name,
    locale: "en_IN",
    type: "website",
  },
};

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: company.name,
  url: "https://finalj-wheat.vercel.app",
  email: company.email,
  telephone: "+919824917250",
  address: {
    "@type": "PostalAddress",
    streetAddress: "504/1A GIDC Makarpura",
    addressLocality: "Vadodara",
    addressRegion: "Gujarat",
    postalCode: "390010",
    addressCountry: "IN",
  },
  description:
    "Steel stockholding and processing: CNC profile cutting, 12 kW laser cutting, CNC drilling and ultrasonic testing.",
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
    >
      <body className="site-shell flex min-h-full flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
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

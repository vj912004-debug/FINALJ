import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingDock from "@/components/FloatingDock";
import ScrollProgress from "@/components/ui/scroll-progress";
import CustomCursor from "@/components/ui/custom-cursor";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default:
      "Jagdamba Procut Pvt. Ltd. | Steel Plates · CNC · Laser · UT | Vadodara",
    template: "%s | Jagdamba Procut",
  },
  description:
    "Jagdamba Procut Pvt. Ltd. — premium steel stockholding and processing in Vadodara. CNC profile cutting, 12 kW laser, CNC drilling, ultrasonic testing and logistics. Precision in Steel. Strength in Every Cut.",
  openGraph: {
    title: "Jagdamba Procut Pvt. Ltd. | Steel Plates · CNC · Laser · UT",
    description:
      "Precision in Steel. Strength in Every Cut. CNC profile cutting, 12 kW laser and UT in Vadodara.",
    siteName: "Jagdamba Procut Pvt. Ltd.",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jagdamba Procut Pvt. Ltd.",
    description: "Precision in Steel. Strength in Every Cut.",
  },
  keywords: [
    "Jagdamba Procut",
    "CNC Profile Cutting in Vadodara",
    "Steel Plate Supplier in Vadodara",
    "Laser Cutting in Vadodara",
    "12 kW Laser Cutting",
    "SA516 Grade 70",
    "Ultrasonic Tested Steel Plates",
    "ASTM A578",
    "EN 10160",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#12141a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="site-shell flex min-h-full flex-col font-sans">
        <ScrollProgress />
        <CustomCursor />
        <Header />
        <main className="flex-1 pb-24 sm:pb-10">{children}</main>
        <Footer />
        <FloatingDock />
      </body>
    </html>
  );
}

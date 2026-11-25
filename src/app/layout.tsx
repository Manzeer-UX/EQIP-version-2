import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AmbientController } from "@/components/motion/AmbientController";
import { site } from "@/content/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: site.metaTitle,
    template: "%s · EQIP",
  },
  description: site.metaDescription,
  applicationName: "EQIP",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "EQIP",
    title: site.metaTitle,
    description: site.metaDescription,
    url: "/",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: site.metaTitle,
    description: site.metaDescription,
  },
};

export const viewport: Viewport = {
  themeColor: "#070A12",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      {/* suppressHydrationWarning: browser extensions (e.g. Grammarly) add attributes to <body>. */}
      <body suppressHydrationWarning>
        <a
          href="#main"
          className="type-body-s fixed top-3 left-3 z-[60] -translate-y-24 rounded-xs bg-paper-100 px-4 py-3 font-medium text-ink-950 focus:translate-y-0"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <AmbientController />
      </body>
    </html>
  );
}

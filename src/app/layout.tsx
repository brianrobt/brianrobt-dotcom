import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.brianrobt.com"),
  title: "Websites that get St. Louis businesses found | Brian Thompson",
  description:
    "I help Greater St. Louis small businesses get more calls and booked jobs. A clear website, Google Business Profile, and local search, set up once, kept current.",
  keywords: [
    "St. Louis website",
    "small business website",
    "Google Business Profile",
    "local SEO",
    "Greater St. Louis",
    "Brian Thompson",
  ],
  authors: [{ name: "Brian Thompson" }],
  openGraph: {
    title: "Websites that get St. Louis businesses found | Brian Thompson",
    description:
      "I help Greater St. Louis small businesses get more calls and booked jobs. A clear website, Google Business Profile, and local search, set up once, kept current.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}

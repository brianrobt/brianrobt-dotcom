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
  title: "Brian Thompson | Software Consulting",
  description:
    "Independent consulting for production AI, cloud platforms, and custom software. Based in St. Louis.",
  keywords: [
    "Software Consulting",
    "AI Engineering",
    "AWS",
    "RAG",
    "Cloud Infrastructure",
    "St. Louis",
  ],
  authors: [{ name: "Brian Thompson" }],
  openGraph: {
    title: "Brian Thompson | Software Consulting",
    description:
      "Independent consulting for production AI, cloud platforms, and custom software.",
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

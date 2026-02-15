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
  title: "Brian Thompson | Software Engineer",
  description:
    "Software engineer specializing in building exceptional digital experiences. Portfolio showcasing projects in web development, AI, and full-stack applications.",
  keywords: [
    "Software Engineer",
    "Web Developer",
    "Full Stack",
    "React",
    "Next.js",
    "TypeScript",
    "AI",
  ],
  authors: [{ name: "Brian Thompson" }],
  openGraph: {
    title: "Brian Thompson | Software Engineer",
    description:
      "Software engineer specializing in building exceptional digital experiences.",
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

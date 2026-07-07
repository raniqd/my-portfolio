import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import NavProvider from "@/providers/NavProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

import MirrorReceiver from '@/components/layout/MirrorReceiver';

export const metadata: Metadata = {
  title: "raniqd.tech",
  description:
    "raniqd - Full-Stack Developer from Czech Republic. Building modern web apps with Next.js, React, Supabase, and more. 7 months in, already shipping real products.",
  keywords: [
    "Danylo Vasylenko",
    "raniqd",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Flutter",
    "Kotlin",
    "Portfolio",
    "Czech Republic",
  ],
  authors: [{ name: "Danylo Vasylenko", url: "https://github.com/raniqd" }],
  openGraph: {
    title: "raniqd.tech",
    description: "raniqd - Building modern web apps from UI to database.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      style={{ backgroundColor: '#05050f' }}
    >
      <body className="bg-[#05050f] text-white antialiased font-sans">
        {/* Fixed dark backdrop — never goes away regardless of Lenis/scroll state */}
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#05050f',
            zIndex: -1000,
            pointerEvents: 'none',
          }}
        />
        <MirrorReceiver />
          <SmoothScrollProvider>
            <NavProvider>
              {children}
            </NavProvider>
          </SmoothScrollProvider>
      </body>
    </html>
  );
}

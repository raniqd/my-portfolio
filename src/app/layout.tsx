import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/i18n";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import NavProvider from "@/providers/NavProvider";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Danylo Vasylenko — Full-Stack Developer",
  description:
    "raniqd — Full-Stack Developer from Ukraine. Building modern web apps with Next.js, React, Supabase, and more. 4 months in, already shipping real products.",
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
    "Ukraine",
  ],
  authors: [{ name: "Danylo Vasylenko", url: "https://github.com/raniqd" }],
  openGraph: {
    title: "Danylo Vasylenko — Full-Stack Developer",
    description: "raniqd — Building modern web apps from UI to database.",
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
      <body className="bg-[#05050f] text-white antialiased font-sans" style={{ backgroundColor: '#05050f' }}>
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
        <I18nProvider>
          <SmoothScrollProvider>
            <NavProvider>
              {children}
            </NavProvider>
          </SmoothScrollProvider>
        </I18nProvider>
      </body>
    </html>
  );
}

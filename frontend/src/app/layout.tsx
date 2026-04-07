import type { Metadata } from "next";
import { Archivo, Space_Grotesk, Noto_Sans_JP } from "next/font/google";
import { FloatingNav } from "@/components/FloatingNav";
import { ChatWidget } from "@/components/ChatWidget";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Full-Stack Engineer Portfolio",
  description: "設計から運用まで、Webシステムを一貫して作るフルスタックエンジニア",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Full-Stack Engineer Portfolio",
    description: "設計から運用まで、Webシステムを一貫して作るフルスタックエンジニア",
    url: "https://www.mi-goya.com",
    siteName: "Full-Stack Engineer Portfolio",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Full-Stack Engineer Portfolio",
    description: "設計から運用まで、Webシステムを一貫して作るフルスタックエンジニア",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${archivo.variable} ${spaceGrotesk.variable} ${notoSansJP.variable} antialiased`}
    >
      <body>
        <FloatingNav />
        <main>{children}</main>
        <footer className="py-10 border-t border-zinc-200">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-400">
                &copy; {new Date().getFullYear()} All rights reserved.
              </p>
            </div>
          </div>
        </footer>
        <ChatWidget />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import BackToTop from "@/components/BackToTop";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Jurnal Sukabumi | Jelas Seimbang",
  description:
    "Media informasi digital terdepan di Sukabumi, menyajikan berita terkini, akurat, dan terpercaya dengan menjunjung tinggi integritas jurnalistik.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${roboto.variable} antialiased`}>
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-surface font-[Roboto,sans-serif]">
        {children}
        <BackToTop />
      </body>
    </html>
  );
}

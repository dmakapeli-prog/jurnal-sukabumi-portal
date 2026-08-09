"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LiveArticle } from "@/lib/wp";

interface HeroSectionProps {
  articles?: LiveArticle[];
}

const fallbackHeroArticles: LiveArticle[] = [
  {
    id: 101,
    slug: "sungai-tak-lagi-jernih-warga-simpenan-desak-penertiban-tambang-liar",
    link: "#",
    title: "Sungai Tak Lagi Jernih, Warga Simpenan Desak Penertiban Tambang Liar",
    category: "HEADLINE",
    date: "Rabu, 5 Agustus 2026 - 14:20 WIB",
    image: "https://wsrv.nl/?url=jurnalsukabumi.com/wp-content/uploads/2026/07/IMG-20260725-WA0067-e1784991814798.jpg",
    excerpt:
      "Warga Simpenan menyuarakan keprihatinan atas tingginya tingkat pencemaran air sungai akibat aktivitas tambang ilegal.",
  },
  {
    id: 102,
    slug: "oknum-kades-tamanjaya-positif-sabu-pemkab-sukabumi-siapkan-sanksi-tegas",
    link: "#",
    title: "Oknum Kades Tamanjaya Positif Sabu, Pemkab Sukabumi Siapkan Sanksi Tegas",
    category: "PERISTIWA",
    date: "Rabu, 5 Agustus 2026 - 13:40 WIB",
    image: "https://wsrv.nl/?url=jurnalsukabumi.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-18-at-19.28.45-1-e1784378099703.jpeg",
    excerpt:
      "Oknum Kades Tamanjaya dinyatakan positif tes urin kandungan sabu oleh aparat kepolisian.",
  },
  {
    id: 103,
    slug: "dugaan-hubungan-terlarang-oknum-guru-dan-siswi-sma-di-sukabumi",
    link: "#",
    title: "Dugaan Hubungan Terlarang Oknum Guru dan Siswi SMA di Sukabumi",
    category: "HUKUM",
    date: "Rabu, 5 Agustus 2026 - 12:15 WIB",
    image: "https://wsrv.nl/?url=jurnalsukabumi.com/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-22-at-13.42.46-e1782111035175.jpeg",
    excerpt:
      "Kasus dugaan hubungan terlarang oknum guru dan siswi diselidiki pihak kepolisian dan dinas pendidikan.",
  },
  {
    id: 104,
    slug: "rumah-dikepung-massa-dugaan-pencabulan-oknum-guru-ngaji",
    link: "#",
    title: "Rumah Dikepung Massa, Dugaan Pencabulan Oknum Guru Ngaji Gegerkan Warga",
    category: "HUKUM",
    date: "Rabu, 5 Agustus 2026 - 11:30 WIB",
    image: "https://wsrv.nl/?url=jurnalsukabumi.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-18-at-19.28.45-1-e1784378099703.jpeg",
    excerpt:
      "Massa mendatangi kediaman terduga pelaku meminta pertanggungjawaban hukum secara transparan.",
  },
];

export default function HeroSection({ articles }: HeroSectionProps) {
  const displayArticles =
    articles && articles.length > 0 ? articles : fallbackHeroArticles;
  const heroList = displayArticles.slice(0, 4);

  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-slide interval setiap 5 detik
  useEffect(() => {
    if (heroList.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroList.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroList.length]);

  const mainHeadline = heroList[activeIndex] || heroList[0];

  return (
    <section className="w-full flex flex-col rounded-none overflow-hidden border border-gray-200 bg-white">
      {/* 1. GAMBAR RAKSASA UTAMA (DINAMIS SINKRON DENGAN ACTIVEINDEX) */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] min-h-[300px] sm:min-h-[380px] md:min-h-[440px] bg-slate-900 overflow-hidden group flex flex-col justify-end rounded-none">
        <img
          key={mainHeadline.id}
          src={mainHeadline.image}
          alt={mainHeadline.title}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105 rounded-none"
        />

        {/* Badge Merah "Headline" di kiri atas */}
        <div className="absolute top-3 left-3 z-20 bg-red-600 text-white text-xs font-black font-['Montserrat'] px-3 py-1 uppercase rounded-none tracking-wider shadow-sm">
          Headline
        </div>

        {/* Judul di dalam gambar (posisi bawah) dengan background gradient hitam transparan */}
        <div className="relative z-10 p-4 sm:p-6 md:p-8 bg-gradient-to-t from-black/95 via-black/70 to-transparent flex flex-col gap-1.5 transition-all duration-500">
          <Link
            href={`/kategori/${(mainHeadline.category || "headline").toLowerCase().trim().replace(/\s+/g, "-")}`}
            className="text-red-400 text-xs font-bold font-['Montserrat'] uppercase tracking-wide hover:underline inline-block w-fit z-30"
          >
            {mainHeadline.category || "HEADLINE"}
          </Link>
          <Link href={`/berita/${mainHeadline.slug || mainHeadline.id}`}>
            <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold font-['Montserrat'] leading-tight hover:text-red-400 transition-colors max-w-4xl drop-shadow">
              {mainHeadline.title}
            </h1>
          </Link>
          {mainHeadline.excerpt && (
            <p className="text-gray-300 text-xs sm:text-sm font-['Montserrat'] line-clamp-2 leading-relaxed max-w-3xl hidden sm:block">
              {mainHeadline.excerpt}
            </p>
          )}
          <span className="text-gray-400 text-[11px] font-['Montserrat'] mt-0.5">
            {mainHeadline.date}
          </span>
        </div>
      </div>

      {/* 2. GRID 4 KOLOM THUMBNAIL NAVIGASI (CLICKABLE + ACTIVE INDICATOR) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 p-1 bg-gray-200">
        {heroList.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={item.id}
              onClick={() => setActiveIndex(index)}
              className={`text-left border rounded-none overflow-hidden flex flex-col transition-all cursor-pointer ${
                isActive
                  ? "bg-white border-red-600 border-b-4 shadow-sm z-10 opacity-100"
                  : "bg-gray-100 hover:bg-white border-gray-300 border-b-4 border-b-transparent opacity-80 hover:opacity-100"
              }`}
            >
              <div className="relative w-full aspect-[16/10] bg-gray-300 overflow-hidden rounded-none">
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full h-full object-cover transition-transform duration-300 rounded-none ${
                    isActive ? "scale-105" : ""
                  }`}
                />
                {isActive && (
                  <div className="absolute top-1 right-1 bg-red-600 text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded-none">
                    Aktif
                  </div>
                )}
              </div>
              <div className="p-2 sm:p-2.5 flex flex-col gap-1 flex-1 justify-between">
                <span
                  className={`text-[10px] font-black font-['Montserrat'] uppercase ${
                    isActive ? "text-red-600" : "text-red-700/80"
                  }`}
                >
                  {item.category || "BERITA"}
                </span>
                <h3
                  className={`font-['Montserrat'] text-xs leading-snug line-clamp-2 transition-colors ${
                    isActive
                      ? "text-slate-900 font-extrabold"
                      : "text-slate-700 font-bold"
                  }`}
                >
                  {item.title}
                </h3>
                <span className="text-gray-400 text-[9px] font-['Montserrat']">
                  {item.date}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

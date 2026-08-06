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
    slug: "dprd-dan-pemkab-sukabumi-sepakati-nota-kua-ppas-ta-2026",
    link: "#",
    title: "DPRD dan Pemkab Sukabumi Sepakati Nota KUA-PPAS TA 2026",
    category: "PARLEMEN",
    date: "Kamis, 6 Agustus 2026 - 16:30 WIB",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop&q=80",
    excerpt:
      "DPRD Kabupaten Sukabumi menyetujui kesepakatan nota KUA-PPAS 2026 untuk prioritas pembangunan daerah.",
  },
  {
    id: 102,
    slug: "dprd-sukabumi-dorong-pengesahan-raperda-perlindungan-disabilitas",
    link: "#",
    title: "DPRD Sukabumi Dorong Pengesahan Raperda Perlindungan Disabilitas",
    category: "HUKUM",
    date: "Kamis, 6 Agustus 2026 - 14:15 WIB",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&auto=format&fit=crop&q=80",
    excerpt:
      "Rancangan peraturan daerah diharapkan memberikan kepastian hak dan kesempatan kerja bagi warga disabilitas.",
  },
  {
    id: 103,
    slug: "syukuran-nelayan-ke-69-ciletuh-sukabumi-meriahkan-kawasan-geopark",
    link: "#",
    title: "Syukuran Nelayan ke-69 Ciletuh Sukabumi Meriahkan Kawasan Geopark",
    category: "WISATA",
    date: "Rabu, 5 Agustus 2026 - 11:20 WIB",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop&q=80",
    excerpt:
      "Ribuan warga dan nelayan Palabuhanratu menggelar syukuran adat budaya di pesisir Geopark Ciletuh.",
  },
  {
    id: 104,
    slug: "serap-5570-aspirasi-pemkab-sukabumi-gelar-musrenbang-anak-2026",
    link: "#",
    title: "Serap 5.570 Aspirasi, Pemkab Sukabumi Gelar Musrenbang Anak 2026",
    category: "PERISTIWA",
    date: "Selasa, 4 Agustus 2026 - 15:40 WIB",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&auto=format&fit=crop&q=80",
    excerpt:
      "Pemerintah Kabupaten Sukabumi berkomitmen mewujudkan kabupaten layak anak melalui integrasi program.",
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
          <span className="text-red-400 text-xs font-bold font-['Montserrat'] uppercase tracking-wide">
            {mainHeadline.category || "HEADLINE"}
          </span>
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

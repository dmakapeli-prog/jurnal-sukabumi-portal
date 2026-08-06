"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { LiveArticle } from "@/lib/wp";

interface NewsFeedProps {
  articles?: LiveArticle[];
}

const fallbackArticles: LiveArticle[] = [
  {
    id: 1,
    slug: "dprd-dan-pemkab-sukabumi-sepakati-nota-kua-ppas-ta-2026",
    link: "#",
    title: "DPRD dan Pemkab Sukabumi Sepakati Nota KUA-PPAS TA 2026",
    category: "PARLEMEN",
    date: "Kamis, 6 Agustus 2026 - 16:30 WIB",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&auto=format&fit=crop&q=80",
    excerpt: "DPRD Kabupaten Sukabumi menyetujui kesepakatan nota KUA-PPAS 2026 untuk prioritas pembangunan daerah.",
  },
  {
    id: 2,
    slug: "dprd-sukabumi-dorong-pengesahan-raperda-perlindungan-disabilitas",
    link: "#",
    title: "DPRD Sukabumi Dorong Pengesahan Raperda Perlindungan Disabilitas",
    category: "HUKUM",
    date: "Kamis, 6 Agustus 2026 - 14:15 WIB",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",
    excerpt: "Rancangan peraturan daerah diharapkan memberikan kepastian hak dan kesempatan kerja bagi warga disabilitas.",
  },
  {
    id: 3,
    slug: "syukuran-nelayan-ke-69-ciletuh-sukabumi-meriahkan-kawasan-geopark",
    link: "#",
    title: "Syukuran Nelayan ke-69 Ciletuh Sukabumi Meriahkan Kawasan Geopark",
    category: "WISATA",
    date: "Rabu, 5 Agustus 2026 - 11:20 WIB",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
    excerpt: "Ribuan warga dan nelayan Palabuhanratu menggelar syukuran adat budaya di pesisir Geopark Ciletuh.",
  },
  {
    id: 4,
    slug: "serap-5570-aspirasi-pemkab-sukabumi-gelar-musrenbang-anak-2026",
    link: "#",
    title: "Serap 5.570 Aspirasi, Pemkab Sukabumi Gelar Musrenbang Anak 2026",
    category: "PERISTIWA",
    date: "Selasa, 4 Agustus 2026 - 15:40 WIB",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=80",
    excerpt: "Pemerintah Kabupaten Sukabumi berkomitmen mewujudkan kabupaten layak anak melalui integrasi program.",
  },
  {
    id: 5,
    slug: "turnamen-sepak-bola-dandim-cup-2026-kota-sukabumi-resmi-dibuka",
    link: "#",
    title: "Turnamen Sepak Bola Dandim Cup 2026 Kota Sukabumi Resmi Dibuka",
    category: "PERISTIWA",
    date: "Senin, 3 Agustus 2026 - 13:10 WIB",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80",
    excerpt: "Dandim 0607 Kota Sukabumi membuka kejuaraan sepak bola antar-klub untuk menjaring bibit atlet muda.",
  },
  {
    id: 6,
    slug: "musda-xii-mui-kabupaten-sukabumi-perkuat-sinergi-ulama-dan-umara",
    link: "#",
    title: "Musda XII MUI Kabupaten Sukabumi Perkuat Sinergi Ulama dan Umara",
    category: "HEADLINE",
    date: "Minggu, 2 Agustus 2026 - 10:00 WIB",
    image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&auto=format&fit=crop&q=80",
    excerpt: "Musyawarah Daerah MUI membahas penguatan ukhuwah dan peran ulama dalam pembangunan keagamaan.",
  },
  {
    id: 7,
    slug: "dinas-pupr-sukabumi-kejar-target-perbaikan-jalan-dan-jembatan",
    link: "#",
    title: "Dinas PUPR Sukabumi Kejar Target Perbaikan Jalan dan Jembatan",
    category: "EKBIS",
    date: "Sabtu, 1 Agustus 2026 - 09:30 WIB",
    image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80",
    excerpt: "Percepatan pembangunan jalur transportasi darat ditingkatkan demi kelancaran lalu lintas warga.",
  },
];

export default function NewsFeed({ articles }: NewsFeedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [savedArticles, setSavedArticles] = useState<(number | string)[]>([]);

  const syncScrapbook = () => {
    try {
      const stored = localStorage.getItem("scrapbook_jurnalsukabumi");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSavedArticles(
            parsed.map((s) => (typeof s === "object" ? s.id : s))
          );
        }
      } else {
        setSavedArticles([]);
      }
    } catch (err) {
      console.error("Gagal memuat Scrapbook dari localStorage:", err);
    }
  };

  useEffect(() => {
    syncScrapbook();
    window.addEventListener("scrapbook_updated", syncScrapbook);
    window.addEventListener("storage", syncScrapbook);
    return () => {
      window.removeEventListener("scrapbook_updated", syncScrapbook);
      window.removeEventListener("storage", syncScrapbook);
    };
  }, []);

  const toggleSave = (item: LiveArticle, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const stored = localStorage.getItem("scrapbook_jurnalsukabumi");
      let items: any[] = stored ? JSON.parse(stored) : [];

      const exists = items.some((s) =>
        typeof s === "object" ? s.id === item.id : s === item.id
      );

      if (exists) {
        items = items.filter((s) =>
          typeof s === "object" ? s.id !== item.id : s !== item.id
        );
      } else {
        items.push({
          id: item.id,
          title: item.title,
          slug: item.slug || item.id,
          image: item.image,
          category: item.category,
          date: item.date,
        });
      }

      localStorage.setItem("scrapbook_jurnalsukabumi", JSON.stringify(items));
      setSavedArticles(items.map((s) => (typeof s === "object" ? s.id : s)));
      window.dispatchEvent(new Event("scrapbook_updated"));
    } catch (err) {
      console.error("Gagal menyimpan ke Scrapbook:", err);
    }
  };

  const feedData =
    articles && articles.length > 0 ? articles : fallbackArticles;

  const firstBatch = feedData.slice(0, 3);

  const rawPeristiwa = feedData.filter(
    (item) => item.category?.toUpperCase() === "PERISTIWA"
  );

  let darkBlockArticles = [...rawPeristiwa];

  if (darkBlockArticles.length < 6) {
    const extraFeed = feedData.filter(
      (item) => !darkBlockArticles.some((d) => d.id === item.id)
    );
    darkBlockArticles = [...darkBlockArticles, ...extraFeed];
  }

  if (darkBlockArticles.length < 6) {
    const fillItems: LiveArticle[] = fallbackArticles.map((item, index) => ({
      ...item,
      id: item.id + 1000 + index,
    }));
    darkBlockArticles = [...darkBlockArticles, ...fillItems];
  }

  darkBlockArticles = darkBlockArticles.slice(0, 8);

  const remainingBatch =
    feedData.length >= 6 ? feedData.slice(6) : feedData.slice(3);

  const infiniteArticles = [
    ...darkBlockArticles,
    ...darkBlockArticles,
    ...darkBlockArticles,
    ...darkBlockArticles,
    ...darkBlockArticles,
  ];

  const scrollLeft = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth } = containerRef.current;
      const scrollStep = containerRef.current.clientWidth / 3;

      if (scrollLeft <= scrollStep * 2) {
        containerRef.current.style.scrollBehavior = "auto";
        containerRef.current.scrollLeft = scrollWidth / 2;
        containerRef.current.style.scrollBehavior = "smooth";
      }

      requestAnimationFrame(() => {
        if (containerRef.current) {
          containerRef.current.scrollBy({
            left: -scrollStep,
            behavior: "smooth",
          });
        }
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      const scrollStep = clientWidth / 3;

      if (scrollLeft + clientWidth >= scrollWidth - scrollStep * 2) {
        containerRef.current.style.scrollBehavior = "auto";
        containerRef.current.scrollLeft = scrollWidth / 2 - clientWidth;
        containerRef.current.style.scrollBehavior = "smooth";
      }

      requestAnimationFrame(() => {
        if (containerRef.current) {
          containerRef.current.scrollBy({
            left: scrollStep,
            behavior: "smooth",
          });
        }
      });
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* 1. HEADER SECTION: TEKS "BERITA TERKINI" TEBAL DENGAN GARIS BAWAH MERAH SEBAGIAN */}
      <div className="border-b-2 border-red-600 pb-1.5 mb-5 flex items-center justify-between">
        <h2 className="text-slate-900 text-lg sm:text-xl font-black font-['Montserrat'] uppercase tracking-wide">
          BERITA TERKINI
        </h2>
        <span className="text-[11px] font-black text-red-600 uppercase font-['Montserrat']">
          LATEST NEWS
        </span>
      </div>

      {/* 2. LIST BERITA STANDAR (BATCH 1: 3 BERITA PERTAMA) */}
      <div className="flex flex-col">
        {firstBatch.map((item) => (
          <article
            key={item.id}
            className="flex flex-row gap-3 sm:gap-4 items-start group border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0"
          >
            {/* Gambar thumbnail di kiri (w-1/3) */}
            <div className="relative w-1/3 flex-shrink-0 aspect-[16/10] bg-gray-100 rounded-none overflow-hidden border border-gray-200">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-none"
              />
              <button
                type="button"
                onClick={(e) => toggleSave(item, e)}
                title={
                  savedArticles.includes(item.id)
                    ? "Hapus dari Scrapbook"
                    : "Simpan ke Scrapbook"
                }
                aria-label="Simpan ke Scrapbook"
                className="absolute top-2 right-2 z-20 w-8 h-8 rounded-full bg-white/90 shadow-sm flex items-center justify-center hover:bg-white hover:scale-110 active:scale-95 transition-all cursor-pointer"
              >
                {savedArticles.includes(item.id) ? (
                  <svg
                    className="w-4 h-4 text-red-600 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-gray-700 fill-none stroke-current"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Teks judul, kategori (warna merah), dan tanggal di kanan (w-2/3) */}
            <div className="w-2/3 flex flex-col justify-between flex-1 py-0.5 gap-1">
              <span className="text-red-600 text-xs font-black font-['Montserrat'] uppercase tracking-wide">
                {item.category}
              </span>
              <Link href={`/berita/${item.slug || item.id}`}>
                <h3 className="text-slate-900 group-hover:text-red-600 text-sm sm:text-base font-bold font-['Montserrat'] leading-snug transition-colors line-clamp-2 sm:line-clamp-3">
                  {item.title}
                </h3>
              </Link>
              {item.excerpt && (
                <p className="text-gray-600 text-xs font-['Montserrat'] line-clamp-2 leading-relaxed hidden sm:block">
                  {item.excerpt}
                </p>
              )}
              <span className="text-gray-400 text-[10px] sm:text-[11px] font-['Montserrat'] mt-1">
                {item.date}
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* 3. SISIPKAN BLOK GELAP DENGAN LABEL MERAH OVERLAPPING (-TOP-4 LEFT-4) DAN CAROUSEL SLIDER */}
      <div className="relative mt-8 mb-6 p-4 sm:p-5 bg-slate-900 rounded-none border border-slate-800">
        {/* Label div berwarna merah menonjol ke luar atas */}
        <div className="absolute -top-4 left-4 bg-red-600 text-white font-black text-xs px-3 py-1.5 uppercase tracking-wider rounded-none z-10 shadow-sm">
          Peristiwa
        </div>

        {/* Tombol Navigasi Kiri & Kanan */}
        <button
          type="button"
          onClick={scrollLeft}
          aria-label="Scroll Left"
          className="absolute left-2 top-[35%] -translate-y-1/2 z-10 w-9 h-9 bg-white text-slate-900 rounded-full shadow-md flex items-center justify-center hover:bg-slate-100 active:scale-95 transition-all cursor-pointer border border-gray-100"
        >
          <svg
            className="w-5 h-5 text-slate-900 stroke-[2.5]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          type="button"
          onClick={scrollRight}
          aria-label="Scroll Right"
          className="absolute right-2 top-[35%] -translate-y-1/2 z-10 w-9 h-9 bg-white text-slate-900 rounded-full shadow-md flex items-center justify-center hover:bg-slate-100 active:scale-95 transition-all cursor-pointer border border-gray-100"
        >
          <svg
            className="w-5 h-5 text-slate-900 stroke-[2.5]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Container Scroll Carousel */}
        <div
          ref={containerRef}
          className="flex overflow-x-auto scroll-smooth gap-3 snap-x snap-mandatory relative py-2 [&::-webkit-scrollbar]:hidden [ms-overflow-style:none] [scrollbar-width:none]"
        >
          {infiniteArticles.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="w-[calc(33.333%-0.75rem)] flex-shrink-0 snap-start flex flex-col gap-2 group"
            >
              <div className="relative w-full aspect-[16/10] bg-slate-800 rounded-none overflow-hidden border border-slate-700">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-none"
                />
                <button
                  type="button"
                  onClick={(e) => toggleSave(item, e)}
                  title={
                    savedArticles.includes(item.id)
                      ? "Hapus dari Scrapbook"
                      : "Simpan ke Scrapbook"
                  }
                  aria-label="Simpan ke Scrapbook"
                  className="absolute top-2 right-2 z-20 w-8 h-8 rounded-full bg-white/90 shadow-sm flex items-center justify-center hover:bg-white hover:scale-110 active:scale-95 transition-all cursor-pointer"
                >
                  {savedArticles.includes(item.id) ? (
                    <svg
                      className="w-4 h-4 text-red-600 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4 text-gray-700 fill-none stroke-current"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                  )}
                </button>
              </div>
              <span className="text-red-600 font-bold text-xs uppercase mb-1 font-['Montserrat']">
                {item.category}
              </span>
              <Link href={`/berita/${item.slug || item.id}`}>
                <h4 className="text-white font-semibold text-sm leading-tight font-['Montserrat'] group-hover:text-red-400 transition-colors line-clamp-2">
                  {item.title}
                </h4>
              </Link>
              <span className="text-gray-400 text-[9px] font-['Montserrat'] mt-auto">
                {item.date}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. LIST BERITA STANDAR SISANYA (BATCH SISA) */}
      {remainingBatch.length > 0 && (
        <div className="flex flex-col">
          {remainingBatch.map((item) => (
            <article
              key={item.id}
              className="flex flex-row gap-3 sm:gap-4 items-start group border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0"
            >
              {/* Gambar thumbnail di kiri (w-1/3) */}
              <div className="relative w-1/3 flex-shrink-0 aspect-[16/10] bg-gray-100 rounded-none overflow-hidden border border-gray-200">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-none"
                />
                <button
                  type="button"
                  onClick={(e) => toggleSave(item, e)}
                  title={
                    savedArticles.includes(item.id)
                      ? "Hapus dari Scrapbook"
                      : "Simpan ke Scrapbook"
                  }
                  aria-label="Simpan ke Scrapbook"
                  className="absolute top-2 right-2 z-20 w-8 h-8 rounded-full bg-white/90 shadow-sm flex items-center justify-center hover:bg-white hover:scale-110 active:scale-95 transition-all cursor-pointer"
                >
                  {savedArticles.includes(item.id) ? (
                    <svg
                      className="w-4 h-4 text-red-600 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4 text-gray-700 fill-none stroke-current"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Teks judul, kategori (warna merah), dan tanggal di kanan (w-2/3) */}
              <div className="w-2/3 flex flex-col justify-between flex-1 py-0.5 gap-1">
                <span className="text-red-600 text-xs font-black font-['Montserrat'] uppercase tracking-wide">
                  {item.category}
                </span>
                <Link href={`/berita/${item.slug || item.id}`}>
                  <h3 className="text-slate-900 group-hover:text-red-600 text-sm sm:text-base font-bold font-['Montserrat'] leading-snug transition-colors line-clamp-2 sm:line-clamp-3">
                    {item.title}
                  </h3>
                </Link>
                {item.excerpt && (
                  <p className="text-gray-600 text-xs font-['Montserrat'] line-clamp-2 leading-relaxed hidden sm:block">
                    {item.excerpt}
                  </p>
                )}
                <span className="text-gray-400 text-[10px] sm:text-[11px] font-['Montserrat'] mt-1">
                  {item.date}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}



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
    slug: "sungai-tak-lagi-jernih-warga-simpenan-desak-penertiban-tambang-liar",
    link: "#",
    title: "Sungai Tak Lagi Jernih, Warga Simpenan Desak Penertiban Tambang Liar",
    category: "PERISTIWA",
    date: "Senin, 3 Agt 2026 - 15:30 WIB",
    image: "https://picsum.photos/seed/feed1/400/250",
    excerpt: "Dampak penambangan emas tanpa izin merusak kualitas air sungai dan mengancam kesehatan ratusan KK.",
  },
  {
    id: 2,
    slug: "rumah-dikepung-massa-dugaan-pencabulan-oknum-guru-ngaji",
    link: "#",
    title: "Rumah Dikepung Massa, Dugaan Pencabulan Oknum Guru Ngaji Gegerkan Warga",
    category: "HUKUM",
    date: "Senin, 3 Agt 2026 - 14:15 WIB",
    image: "https://picsum.photos/seed/feed2/400/250",
    excerpt: "Aparat kepolisian bertindak cepat mengamankan situasi guna menghindari aksi main hakim sendiri.",
  },
  {
    id: 3,
    slug: "belum-kantongi-izin-pembangunan-alfamart-ditegor-satpol-pp",
    link: "#",
    title: "Belum Kantongi Izin, Pembangunan Alfamart Ditegor Satpol PP Cibadak",
    category: "HEADLINE",
    date: "Senin, 3 Agt 2026 - 12:45 WIB",
    image: "https://picsum.photos/seed/feed3/400/250",
    excerpt: "Pihak pengembang diminta menghentikan proyek sampai seluruh dokumen legalitas diterbitkan Pemkab Sukabumi.",
  },
  {
    id: 4,
    slug: "guru-ngaji-terduga-pelaku-pencabulan-ditangkap-di-banten",
    link: "#",
    title: "Guru Ngaji Terduga Pelaku Pencabulan Ditangkap di Banten",
    category: "PERISTIWA",
    date: "Senin, 3 Agt 2026 - 11:00 WIB",
    image: "https://picsum.photos/seed/feed4/400/250",
    excerpt: "Pelaku sempat melarikan diri ke luar kota sebelum akhirnya terdeteksi tim buser Polres Sukabumi.",
  },
  {
    id: 5,
    slug: "perumda-amtjm-tanggapi-aksi-mahasiswa",
    link: "#",
    title: "Perumda AMTJM Tanggapi Aksi Mahasiswa, Tegaskan Pengadaan Sesuai Prosedur",
    category: "PERISTIWA",
    date: "Senin, 3 Agt 2026 - 10:20 WIB",
    image: "https://picsum.photos/seed/feed5/400/250",
    excerpt: "Direksi Perumda memberikan penjelasan transparan terkait proses lelang pengadaan water meter.",
  },
  {
    id: 6,
    slug: "pemkab-sukabumi-dorong-pengembangan-wisata-geopark",
    link: "#",
    title: "Pemkab Sukabumi Dorong Pengembangan Wisata Geopark Ciletuh Berbasis Masyarakat",
    category: "WISATA",
    date: "Minggu, 2 Agt 2026 - 16:50 WIB",
    image: "https://picsum.photos/seed/feed6/400/250",
    excerpt: "Pemberdayaan UMKM lokal menjadi fokus utama peningkatan ekonomi kawasan wisata Geopark UNESCO.",
  },
  {
    id: 7,
    slug: "sidang-paripurna-dprd-sukabumi-bahas-rancangan-apbd",
    link: "#",
    title: "Sidang Paripurna DPRD Sukabumi Bahas Rancangan APBD Perubahan 2026",
    category: "PARLEMEN",
    date: "Minggu, 2 Agt 2026 - 14:10 WIB",
    image: "https://picsum.photos/seed/feed7/400/250",
    excerpt: "Fokus alokasi anggaran akan diarahkan pada perbaikan infrastruktur jalan dan penanganan stunting.",
  },
];

export default function NewsFeed({ articles }: NewsFeedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [savedArticles, setSavedArticles] = useState<(number | string)[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("scrapbook_jurnalsukabumi");
      if (stored) {
        setSavedArticles(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Gagal memuat Scrapbook dari localStorage:", err);
    }
  }, []);

  const toggleSave = (item: LiveArticle, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setSavedArticles((prev) => {
      const exists = prev.includes(item.id);
      const updated = exists
        ? prev.filter((id) => id !== item.id)
        : [...prev, item.id];

      try {
        localStorage.setItem(
          "scrapbook_jurnalsukabumi",
          JSON.stringify(updated)
        );
      } catch (err) {
        console.error("Gagal menyimpan ke Scrapbook:", err);
      }

      return updated;
    });
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



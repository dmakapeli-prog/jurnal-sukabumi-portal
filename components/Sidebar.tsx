"use client";

import Link from "next/link";
import { LiveArticle } from "@/lib/wp";

interface SidebarProps {
  popularArticles?: LiveArticle[];
  hideBanners?: boolean;
  hidePopular?: boolean;
}

const topicTags = [
  "# EKBIS",
  "# HEADLINE",
  "# PERISTIWA",
  "# POLITIK",
  "# HUKUM",
  "# WISATA",
  "# PARLEMEN",
  "# GERBANG DESA",
  "# PENDIDIKAN",
];

const fallbackPopular = [
  {
    id: 1,
    slug: "sungai-tak-lagi-jernih-warga-simpenan-desak-penertiban-tambang-liar",
    title: "Sungai Tak Lagi Jernih, Warga Simpenan Desak Penertiban Tambang Liar",
    category: "PERISTIWA",
    date: "4 Agt 2026",
    image: "https://wsrv.nl/?url=jurnalsukabumi.com/wp-content/uploads/2026/07/IMG-20260725-WA0067-e1784991814798.jpg",
  },
  {
    id: 2,
    slug: "oknum-kades-tamanjaya-positif-sabu-pemkab-sukabumi-siapkan-sanksi-tegas",
    title: "Oknum Kades Tamanjaya Positif Sabu, Pemkab Sukabumi Siapkan Sanksi Tegas",
    category: "PERISTIWA",
    date: "4 Agt 2026",
    image: "https://wsrv.nl/?url=jurnalsukabumi.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-18-at-19.28.45-1-e1784378099703.jpeg",
  },
  {
    id: 3,
    slug: "dugaan-hubungan-terlarang-oknum-guru-dan-siswi-sma-di-sukabumi",
    title: "Dugaan Hubungan Terlarang Oknum Guru dan Siswi SMA di Sukabumi",
    category: "HUKUM",
    date: "4 Agt 2026",
    image: "https://wsrv.nl/?url=jurnalsukabumi.com/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-22-at-13.42.46-e1782111035175.jpeg",
  },
  {
    id: 4,
    slug: "rumah-dikepung-massa-dugaan-pencabulan-oknum-guru-ngaji",
    title: "Rumah Dikepung Massa, Dugaan Pencabulan Oknum Guru Ngaji Gegerkan Warga",
    category: "HUKUM",
    date: "4 Agt 2026",
    image: "https://wsrv.nl/?url=jurnalsukabumi.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-18-at-19.28.45-1-e1784378099703.jpeg",
  },
  {
    id: 5,
    slug: "belum-kantongi-izin-pembangunan-alfamart-ditegor-satpol-pp",
    title: "Belum Kantongi Izin, Pembangunan Alfamart Ditegor Satpol PP Cibadak",
    category: "HEADLINE",
    date: "4 Agt 2026",
    image: "https://wsrv.nl/?url=jurnalsukabumi.com/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-22-at-13.42.46-e1782111035175.jpeg",
  },
];

export default function Sidebar({
  popularArticles,
  hideBanners,
  hidePopular,
}: SidebarProps) {
  const displayArticles =
    popularArticles && popularArticles.length > 0
      ? popularArticles.slice(0, 5).map((item, idx) => ({
          id: item.id,
          slug: item.slug || `berita-${item.id}`,
          rank: idx + 1,
          title: item.title,
          category: item.category,
          date: item.date,
          image: item.image,
        }))
      : fallbackPopular.map((item, idx) => ({ ...item, rank: idx + 1 }));

  return (
    <aside className="w-full flex-shrink-0 flex flex-col gap-5">
      {/* 1. 3 BANNER ASLI BERTUMPUK VERTIKAL (LIVE URL DARI JURNALSUKABUMI.COM MELEWATI PROXY WSRV.NL) */}
      {!hideBanners && (
        <div className="flex flex-col mb-4">
          {/* Banner 1: Poster DPRD (Pray For Kasepuhan Ciptamulya - Portrait) */}
          <img
            src="https://wsrv.nl/?url=jurnalsukabumi.com/wp-content/uploads/2026/07/IMG-20260725-WA0067-e1784991814798.jpg"
            alt="Poster DPRD Sukabumi - Pray For Kasepuhan Ciptamulya"
            className="w-full h-auto object-contain mb-4 rounded-none border border-gray-200 bg-gray-50"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?w=400&auto=format&fit=crop&q=80";
            }}
          />

          {/* Banner 2: Foto CEO / Ketua SMSI Eman Sulaeman (Portrait) */}
          <img
            src="https://wsrv.nl/?url=jurnalsukabumi.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-18-at-19.28.45-1-e1784378099703.jpeg"
            alt="Foto CEO SMSI Sukabumi - Eman Sulaeman"
            className="w-full h-auto object-contain mb-4 rounded-none border border-gray-200 bg-gray-50"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&auto=format&fit=crop&q=80";
            }}
          />

          {/* Banner 3: Sertifikat SMSI (Landscape) */}
          <img
            src="https://wsrv.nl/?url=jurnalsukabumi.com/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-22-at-13.42.46-e1782111035175.jpeg"
            alt="Sertifikat Media Siber SMSI Sukabumi"
            className="w-full h-auto object-contain mb-4 rounded-none border border-gray-200 bg-gray-50"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop&q=80";
            }}
          />
        </div>
      )}

      {/* 2. WIDGET "TOPIK TERKINI" (LIST DENGAN #) */}
      <div className="bg-white border border-gray-200 p-4 rounded-none flex flex-col gap-3">
        <div className="border-b-2 border-red-600 pb-1.5">
          <h3 className="text-slate-900 text-base font-black font-['Montserrat'] uppercase tracking-wide">
            TOPIK TERKINI
          </h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {topicTags.map((tag) => {
            const tagSlug = tag.replace(/^#\s*/, "").toLowerCase().trim().replace(/\s+/g, "-");
            return (
              <Link
                key={tag}
                href={`/kategori/${tagSlug}`}
                className="bg-gray-100 border border-gray-200 text-slate-800 text-[11px] font-bold font-['Montserrat'] px-2.5 py-1 rounded-none hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors"
              >
                {tag}
              </Link>
            );
          })}
        </div>
      </div>

      {/* 3. WIDGET "BERITA TERPOPULER" */}
      {!hidePopular && (
        <div className="bg-white border border-gray-200 p-4 rounded-none flex flex-col">
          <h3 className="text-xl font-bold mb-4 relative pb-2 border-b border-gray-100 font-['Montserrat']">
            <span className="border-b-4 border-red-600 pb-2">BERITA</span> TERPOPULER
          </h3>

          <div className="flex flex-col">
            {displayArticles.map((item) => (
              <Link
                key={item.id}
                href={`/berita/${item.slug}`}
                className="flex items-center gap-4 p-4 odd:bg-gray-50 even:bg-white group transition-colors"
              >
                {/* Angka Urutan: Buat sangat besar dan merah */}
                <div className="text-5xl font-extrabold text-red-600 shrink-0 w-8 text-center font-['Montserrat']">
                  {item.rank}
                </div>

                {/* Thumbnail: Kotak bersudut melengkung */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 rounded-md object-cover shrink-0"
                />

                {/* Teks Berita: Hitam, tebal, jarak rapat */}
                <h4 className="font-bold text-sm text-black leading-tight group-hover:text-red-600 transition-colors line-clamp-2 font-['Montserrat']">
                  {item.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}

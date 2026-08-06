import Link from "next/link";
import { LiveArticle } from "@/lib/wp";

interface SidebarProps {
  popularArticles?: LiveArticle[];
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
    slug: "dprd-dan-pemkab-sukabumi-sepakati-nota-kua-ppas-ta-2026",
    title: "DPRD dan Pemkab Sukabumi Sepakati Nota KUA-PPAS TA 2026",
    category: "PARLEMEN",
    date: "6 Agt 2026",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=200&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    slug: "dprd-sukabumi-dorong-pengesahan-raperda-perlindungan-disabilitas",
    title: "DPRD Sukabumi Dorong Pengesahan Raperda Perlindungan Disabilitas",
    category: "HUKUM",
    date: "6 Agt 2026",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=200&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    slug: "syukuran-nelayan-ke-69-ciletuh-sukabumi-meriahkan-kawasan-geopark",
    title: "Syukuran Nelayan ke-69 Ciletuh Sukabumi Meriahkan Kawasan Geopark",
    category: "WISATA",
    date: "5 Agt 2026",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    slug: "serap-5570-aspirasi-pemkab-sukabumi-gelar-musrenbang-anak-2026",
    title: "Serap 5.570 Aspirasi, Pemkab Sukabumi Gelar Musrenbang Anak 2026",
    category: "PERISTIWA",
    date: "4 Agt 2026",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=200&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    slug: "turnamen-sepak-bola-dandim-cup-2026-kota-sukabumi-resmi-dibuka",
    title: "Turnamen Sepak Bola Dandim Cup 2026 Kota Sukabumi Resmi Dibuka",
    category: "PERISTIWA",
    date: "3 Agt 2026",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=200&auto=format&fit=crop&q=80",
  },
];

export default function Sidebar({ popularArticles }: SidebarProps) {
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
      {/* 1. 3 BANNER ASLI BERTUMPUK VERTIKAL (LIVE URL DARI JURNALSUKABUMI.COM) */}
      <div className="flex flex-col mb-4">
        {/* Banner 1: Poster DPRD (Pray For Kasepuhan Ciptamulya - Portrait) */}
        <img
          src="https://jurnalsukabumi.com/wp-content/uploads/2026/07/IMG-20260725-WA0067-e1784991814798.jpg"
          alt="Poster DPRD Sukabumi - Pray For Kasepuhan Ciptamulya"
          className="w-full h-auto object-contain mb-4 rounded-none border border-gray-200 bg-gray-50"
        />

        {/* Banner 2: Foto CEO / Ketua SMSI Eman Sulaeman (Portrait) */}
        <img
          src="https://jurnalsukabumi.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-18-at-19.28.45-1-e1784378099703.jpeg"
          alt="Foto CEO SMSI Sukabumi - Eman Sulaeman"
          className="w-full h-auto object-contain mb-4 rounded-none border border-gray-200 bg-gray-50"
        />

        {/* Banner 3: Sertifikat SMSI (Landscape) */}
        <img
          src="https://jurnalsukabumi.com/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-22-at-13.42.46-e1782111035175.jpeg"
          alt="Sertifikat Media Siber SMSI Sukabumi"
          className="w-full h-auto object-contain mb-4 rounded-none border border-gray-200 bg-gray-50"
        />
      </div>

      {/* 2. WIDGET "TOPIK TERKINI" (LIST DENGAN #) */}
      <div className="bg-white border border-gray-200 p-4 rounded-none flex flex-col gap-3">
        <div className="border-b-2 border-red-600 pb-1.5">
          <h3 className="text-slate-900 text-base font-black font-['Montserrat'] uppercase tracking-wide">
            TOPIK TERKINI
          </h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {topicTags.map((tag) => (
            <Link
              key={tag}
              href="#"
              className="bg-gray-100 border border-gray-200 text-slate-800 text-[11px] font-bold font-['Montserrat'] px-2.5 py-1 rounded-none hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* 3. WIDGET "BERITA TERPOPULER" (LIST BERITA DENGAN ANGKA URUTAN BESAR BERWARNA MERAH DI SISI KIRI) */}
      <div className="bg-white border border-gray-200 p-4 rounded-none flex flex-col gap-3">
        <div className="border-b-2 border-red-600 pb-1.5">
          <h3 className="text-slate-900 text-base font-black font-['Montserrat'] uppercase tracking-wide">
            BERITA TERPOPULER
          </h3>
        </div>

        <div className="flex flex-col gap-3">
          {displayArticles.map((item) => (
            <Link
              key={item.id}
              href={`/berita/${item.slug}`}
              className="flex items-center gap-3 group border-b border-gray-100 pb-3 last:border-b-0 last:pb-0"
            >
              {/* Angka urutan besar berwarna merah di sisi kiri */}
              <span className="text-3xl font-black text-red-600 font-['Montserrat'] w-7 text-center flex-shrink-0 group-hover:scale-110 transition-transform">
                {item.rank}
              </span>

              {/* Thumbnail Small */}
              <div className="w-16 h-12 bg-gray-200 rounded-none overflow-hidden flex-shrink-0 border border-gray-200">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform rounded-none"
                />
              </div>

              {/* Detail Text */}
              <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                <span className="text-red-600 text-[9px] font-black uppercase font-['Montserrat']">
                  {item.category}
                </span>
                <h4 className="text-slate-900 group-hover:text-red-600 text-xs font-bold font-['Montserrat'] leading-snug transition-colors line-clamp-2">
                  {item.title}
                </h4>
                <span className="text-gray-400 text-[9px] font-['Montserrat'] mt-0.5">
                  {item.date}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}

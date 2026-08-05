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
    slug: "sungai-tak-lagi-jernih-warga-simpenan-desak-penertiban-tambang-liar",
    title: "Sungai Tak Lagi Jernih, Warga Simpenan Desak Penertiban Tambang Liar",
    category: "PERISTIWA",
    date: "4 Agt 2026",
    image: "https://picsum.photos/seed/pop1/100/70",
  },
  {
    id: 2,
    slug: "rumah-dikepung-massa-dugaan-pencabulan-oknum-guru-ngaji",
    title: "Rumah Dikepung Massa, Dugaan Pencabulan Oknum Guru Ngaji Gegerkan Warga",
    category: "HUKUM",
    date: "4 Agt 2026",
    image: "https://picsum.photos/seed/pop2/100/70",
  },
  {
    id: 3,
    slug: "belum-kantongi-izin-pembangunan-alfamart-ditegor-satpol-pp",
    title: "Belum Kantongi Izin, Pembangunan Alfamart Ditegor Satpol PP Cibadak",
    category: "HEADLINE",
    date: "4 Agt 2026",
    image: "https://picsum.photos/seed/pop3/100/70",
  },
  {
    id: 4,
    slug: "guru-ngaji-terduga-pelaku-pencabulan-ditangkap-di-banten",
    title: "Guru Ngaji Terduga Pelaku Pencabulan Ditangkap di Banten",
    category: "PERISTIWA",
    date: "4 Agt 2026",
    image: "https://picsum.photos/seed/pop4/100/70",
  },
  {
    id: 5,
    slug: "perumda-amtjm-tanggapi-aksi-mahasiswa",
    title: "Perumda AMTJM Tanggapi Aksi Mahasiswa, Tegaskan Pengadaan Water Meter Sesuai Prosedur",
    category: "PERISTIWA",
    date: "4 Agt 2026",
    image: "https://picsum.photos/seed/pop5/100/70",
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
    <aside className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-5">
      {/* 1. 3 TAG <img> BERTUMPUK VERTIKAL (FLEX-COL) DENGAN MARGIN BAWAH MB-4 */}
      <div className="flex flex-col gap-3 mb-4">
        {/* Gambar 1: Poster DPRD (Portrait) */}
        <div className="w-full bg-gray-100 border border-gray-200 rounded-none overflow-hidden">
          <img
            src="https://picsum.photos/seed/dprd-poster/300/400"
            alt="Poster DPRD Sukabumi"
            className="w-full h-auto object-cover rounded-none"
          />
        </div>

        {/* Gambar 2: Foto Ketua SMSI (Portrait) */}
        <div className="w-full bg-gray-100 border border-gray-200 rounded-none overflow-hidden">
          <img
            src="https://picsum.photos/seed/ketua-smsi/300/400"
            alt="Foto Ketua SMSI Sukabumi"
            className="w-full h-auto object-cover rounded-none"
          />
        </div>

        {/* Gambar 3: Sertifikat SMSI (Landscape) */}
        <div className="w-full bg-gray-100 border border-gray-200 rounded-none overflow-hidden">
          <img
            src="https://picsum.photos/seed/sertifikat-smsi/400/250"
            alt="Sertifikat SMSI Sukabumi"
            className="w-full h-auto object-cover rounded-none"
          />
        </div>
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

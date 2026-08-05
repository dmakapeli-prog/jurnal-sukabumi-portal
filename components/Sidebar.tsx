import Link from "next/link";
import { LiveArticle } from "@/lib/wp";

interface SidebarProps {
  popularArticles?: LiveArticle[];
}

const bannerAds = [
  { id: 1, alt: "Banner Iklan DPRD Sukabumi", src: "https://picsum.photos/seed/dprd/300/200" },
  { id: 2, alt: "Banner Sertifikat Media Siber", src: "https://picsum.photos/seed/sertifikat/300/240" },
  { id: 3, alt: "Banner Iklan Layanan Masyarakat Pemkab", src: "https://picsum.photos/seed/pemkab/300/180" },
];

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

  // National Featured Single Card (e.g. 8th article or fallback)
  const nasionalArticle =
    popularArticles && popularArticles.length > 5
      ? popularArticles[5]
      : {
          id: 99,
          slug: "kebutuhan-dasar-penyintas-ciptamulya-dipastikan-aman",
          title: "Kebutuhan Dasar Penyintas Ciptamulya Dipastikan Aman dan Terkendali",
          category: "NASIONAL",
          date: "5 Agt 2026",
          image: "https://picsum.photos/seed/nasional/300/180",
          excerpt:
            "Pemerintah memastikan distribusi logistik dan fasilitas dasar bagi penyintas bencana berlangsung lancar.",
        };

  return (
    <aside className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-6">
      {/* 🔴 A. BANNER IKLAN VERTIKAL BERTUMPUK (PALING ATAS) */}
      <div className="flex flex-col gap-3">
        {bannerAds.map((banner) => (
          <div
            key={banner.id}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-center shadow-sm"
          >
            <span className="text-[9px] uppercase font-black text-gray-400 block mb-1 font-['Montserrat'] tracking-wider">
              SPONSORSHIP / IKLAN
            </span>
            <div className="w-full rounded-md overflow-hidden flex items-center justify-center bg-gray-200">
              <img
                src={banner.src}
                alt={banner.alt}
                className="w-full h-auto object-cover rounded-md"
              />
            </div>
          </div>
        ))}
      </div>

      {/* 🔴 B. TOPIK TERKINI */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col gap-3">
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
              className="bg-gray-100 border border-gray-200 text-slate-800 text-[11px] font-bold font-['Montserrat'] px-2.5 py-1 rounded hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* 🔴 C. BERITA TERPOPULER (ANGKA BESAR MERAH DI SEBELAH KIRI) */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col gap-3">
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
              {/* Angka Urutan BESAR MERAH TEBAL di sebelah kiri */}
              <span className="text-3xl font-black text-red-600 font-['Montserrat'] w-7 text-center flex-shrink-0 group-hover:scale-110 transition-transform">
                {item.rank}
              </span>

              {/* Thumbnail Small */}
              <div className="w-16 h-12 bg-gray-200 rounded overflow-hidden flex-shrink-0 border border-gray-200">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
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

      {/* 🔴 D. NASIONAL (SATU CARD BERITA UTUH) */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col gap-3">
        <div className="border-b-2 border-red-600 pb-1.5 flex items-center justify-between">
          <h3 className="text-slate-900 text-base font-black font-['Montserrat'] uppercase tracking-wide">
            NASIONAL
          </h3>
          <span className="text-[10px] font-bold text-red-600 font-['Montserrat'] uppercase">
            FOKUS
          </span>
        </div>

        <div className="flex flex-col gap-2 group">
          <div className="relative w-full h-40 bg-gray-100 rounded-md overflow-hidden border border-gray-200">
            <img
              src={nasionalArticle.image}
              alt={nasionalArticle.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black font-['Montserrat'] px-2 py-0.5 uppercase rounded shadow">
              {nasionalArticle.category || "NASIONAL"}
            </span>
          </div>

          <Link href={`/berita/${nasionalArticle.slug || nasionalArticle.id}`}>
            <h4 className="text-slate-900 group-hover:text-red-600 text-sm font-bold font-['Montserrat'] leading-snug transition-colors">
              {nasionalArticle.title}
            </h4>
          </Link>

          {"excerpt" in nasionalArticle && nasionalArticle.excerpt && (
            <p className="text-gray-600 text-xs font-['Montserrat'] line-clamp-2 leading-relaxed">
              {nasionalArticle.excerpt}
            </p>
          )}

          <span className="text-gray-400 text-[10px] font-['Montserrat'] mt-1">
            {nasionalArticle.date}
          </span>
        </div>
      </div>
    </aside>
  );
}

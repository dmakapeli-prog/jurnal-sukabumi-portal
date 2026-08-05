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
    image: "https://picsum.photos/seed/hero1/800/450",
    excerpt: "Warga Simpenan menyuarakan keprihatinan atas tingginya tingkat pencemaran air sungai akibat aktivitas tambang ilegal.",
  },
  {
    id: 102,
    slug: "rumah-dikepung-massa-dugaan-pencabulan-oknum-guru-ngaji",
    link: "#",
    title: "Rumah Dikepung Massa, Dugaan Pencabulan Oknum Guru Ngaji Gegerkan Warga",
    category: "HUKUM",
    date: "Rabu, 5 Agustus 2026 - 13:10 WIB",
    image: "https://picsum.photos/seed/hero2/400/250",
    excerpt: "",
  },
  {
    id: 103,
    slug: "belum-kantongi-izin-pembangunan-alfamart-ditegor-satpol-pp",
    link: "#",
    title: "Belum Kantongi Izin, Pembangunan Alfamart Ditegor Satpol PP Cibadak",
    category: "PERISTIWA",
    date: "Rabu, 5 Agustus 2026 - 12:00 WIB",
    image: "https://picsum.photos/seed/hero3/400/250",
    excerpt: "",
  },
  {
    id: 104,
    slug: "perumda-amtjm-tanggapi-aksi-mahasiswa",
    link: "#",
    title: "Perumda AMTJM Tanggapi Aksi Mahasiswa, Tegaskan Pengadaan Sesuai Prosedur",
    category: "EKBIS",
    date: "Rabu, 5 Agustus 2026 - 11:30 WIB",
    image: "https://picsum.photos/seed/hero4/400/250",
    excerpt: "",
  },
  {
    id: 105,
    slug: "dprd-sukabumi-gelar-rapat-paripurna-apbd",
    link: "#",
    title: "DPRD Sukabumi Gelar Rapat Paripurna Pembahasan Raperda APBD 2026",
    category: "PARLEMEN",
    date: "Rabu, 5 Agustus 2026 - 10:15 WIB",
    image: "https://picsum.photos/seed/hero5/400/250",
    excerpt: "",
  },
];

export default function HeroSection({ articles }: HeroSectionProps) {
  const displayArticles =
    articles && articles.length > 0 ? articles : fallbackHeroArticles;

  const mainHeadline = displayArticles[0] || fallbackHeroArticles[0];
  const subHeadlines = (
    displayArticles.length > 1
      ? displayArticles.slice(1, 5)
      : fallbackHeroArticles.slice(1, 5)
  ).slice(0, 4);

  return (
    <section className="w-full flex flex-col rounded-none overflow-hidden border border-gray-200 bg-white">
      {/* 1. GAMBAR UTAMA UKURAN BESAR (FULL WIDTH CONTAINER KIRI) */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] min-h-[300px] sm:min-h-[380px] md:min-h-[440px] bg-slate-900 overflow-hidden group flex flex-col justify-end rounded-none">
        <img
          src={mainHeadline.image}
          alt={mainHeadline.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-none"
        />

        {/* Badge Merah "Headline" di kiri atas */}
        <div className="absolute top-3 left-3 z-20 bg-red-600 text-white text-xs font-black font-['Montserrat'] px-3 py-1 uppercase rounded-none tracking-wider">
          Headline
        </div>

        {/* Judul di dalam gambar (posisi bawah) dengan background gradient hitam transparan */}
        <div className="relative z-10 p-4 sm:p-6 md:p-8 bg-gradient-to-t from-black/95 via-black/70 to-transparent flex flex-col gap-1.5">
          <span className="text-red-400 text-xs font-bold font-['Montserrat'] uppercase tracking-wide">
            {mainHeadline.category || "HEADLINE"}
          </span>
          <Link href={`/berita/${mainHeadline.slug || mainHeadline.id}`}>
            <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold font-['Montserrat'] leading-tight group-hover:text-red-400 transition-colors max-w-4xl drop-shadow">
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

      {/* 2. GRID 4 KOLOM TEPAT DI BAWAH GAMBAR BESAR (GAP-1 SANGAT RAPAT) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 p-1 bg-gray-200">
        {subHeadlines.map((item) => (
          <div
            key={item.id}
            className="bg-gray-100 hover:bg-white border border-gray-200 rounded-none overflow-hidden flex flex-col group transition-colors"
          >
            <div className="relative w-full aspect-[16/10] bg-gray-300 overflow-hidden rounded-none">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-none"
              />
            </div>
            <div className="p-2 sm:p-2.5 flex flex-col gap-1 flex-1 justify-between bg-gray-50 group-hover:bg-white">
              <span className="text-red-600 text-[10px] font-black font-['Montserrat'] uppercase">
                {item.category || "BERITA"}
              </span>
              <Link href={`/berita/${item.slug || item.id}`}>
                <h3 className="text-slate-900 group-hover:text-red-600 font-bold font-['Montserrat'] text-xs leading-snug transition-colors line-clamp-2">
                  {item.title}
                </h3>
              </Link>
              <span className="text-gray-400 text-[9px] font-['Montserrat']">
                {item.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

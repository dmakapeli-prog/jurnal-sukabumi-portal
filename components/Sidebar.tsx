"use client";

import Link from "next/link";
import Image from "next/image";
import { LiveArticle } from "@/lib/wp";

interface SidebarProps {
  popularArticles?: LiveArticle[];
  hideBanners?: boolean;
  hidePopular?: boolean;
  variant?: "default" | "article";
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

const fallbackPopularHome = [
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

const articlePopularList = [
  {
    id: 1,
    slug: "oknum-kades-tamanjaya-positif-sabu-pemkab-sukabumi-siapkan-sanksi-tegas",
    title: "US Oknum Kades Tamanjaya Ciemas Positif Narkoba, Polisi Ungkap Barang Bukti Alat Hisap Sabu",
    image: "https://wsrv.nl/?url=jurnalsukabumi.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-18-at-19.28.45-1-e1784378099703.jpeg",
  },
  {
    id: 2,
    slug: "oknum-kades-tamanjaya-positif-sabu-dewan-batman-soroti-ciemas-darurat-narkoba",
    title: "Oknum Kades Tamanjaya Positif Sabu, Dewan Batman Soroti Ciemas Darurat Narkoba",
    image: "https://wsrv.nl/?url=https://jurnalsukabumi.com/wp-content/uploads/2026/08/Ujang-Abdurohim-Rochmi-Alias-Dewan-Batman.jpg",
  },
  {
    id: 3,
    slug: "dugaan-hubungan-terlarang-oknum-guru-dan-siswi-sma-di-sukabumi",
    title: "Dugaan Hubungan Terlarang Oknum Guru dan Istri Orang di Kalibunder, Polisi Mulai Periksa Saksi",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    slug: "rumah-dikepung-massa-dugaan-pencabulan-oknum-guru-ngaji",
    title: "Kades di Ciemas Berada di Satresnarkoba, Kapolres: Masih Dalam Penyelidikan",
    image: "https://wsrv.nl/?url=jurnalsukabumi.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-18-at-19.28.45-1-e1784378099703.jpeg",
  },
  {
    id: 5,
    slug: "karya-syarah-aulia-rahmah-tembus-nasional",
    title: "Karya Syarah Aulia Rahmah Tembus Nasional, Siswi MTsN 3 Sukabumi Raih Penghargaan Bergengsi",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    slug: "dari-refleksi-hingga-cuan-knpi-palabuhanratu",
    title: "Dari Refleksi hingga Cuan, KNPI Palabuhanratu Bongkar Catatan Kritis Perayaan HJKS Sukabumi",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80",
  },
];

const nasionalFeatured = {
  title: "Dorong Generasi Muda Indonesia-Jepang Peduli Lingkungan, ini Langkah PT Amerta Indah Otsuka!",
  date: "7 Agustus 2026 | 10:20 WIB",
  slug: "dorong-generasi-muda-indonesia-jepang-peduli-lingkungan",
  image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80",
};

const nasionalList = [
  {
    title: "Krisdayanti Hebohkan Cibadak, Ribuan Warga Antusias hingga Berebut Foto Bersama",
    date: "6 Agustus 2026 | 12:04 WIB",
    slug: "krisdayanti-hebohkan-cibadak-ribuan-warga-antusias",
  },
  {
    title: "Dipanggil ke Purwakarta, KDM Ingin Kampung Adat Ciptamulya Ditata",
    date: "2 Agustus 2026 | 19:30 WIB",
    slug: "52-korban-kebakaran-ciptamulya-diundang-kdm-ke-lembur-pakuan",
  },
  {
    title: "Usung Perubahan di PWI Jabar, Kang Andhy Tawarkan Program Kesejahteraan hingga Karier Internasional",
    date: "31 Juli 2026 | 22:04 WIB",
    slug: "usung-perubahan-di-pwi-jabar-kang-andhy-tawarkan-program",
  },
  {
    title: "Hergun Usul Kemendagri Luncurkan Program Wirausaha Pemula untuk Kemandirian Ekonomi Ormas",
    date: "30 Juli 2026 | 15:09 WIB",
    slug: "hergun-usul-kemendagri-luncurkan-program-wirausaha-pemula",
  },
];

export default function Sidebar({
  popularArticles,
  hideBanners,
  hidePopular,
  variant = "default",
}: SidebarProps) {
  // JIKA VARIANT ARTIKEL (Khusus saat user meng-klik artikel)
  if (variant === "article") {
    return (
      <aside className="w-full flex flex-col font-['Montserrat']">
        {/* 1. WIDGET BERITA TERPOPULER (1 - 6 Card Gray Box Sesuai Screenshot) */}
        <div className="mb-8">
          <div className="border-b border-gray-200 pb-2 mb-4">
            <h3 className="text-xl font-black text-slate-900 tracking-wide font-['Montserrat']">
              <span className="border-b-4 border-red-600 pb-2 mr-1">BERITA</span> TERPOPULER
            </h3>
          </div>

          <div className="flex flex-col gap-2.5">
            {articlePopularList.map((item, idx) => (
              <Link
                key={item.id}
                href={`/berita/${item.slug}`}
                prefetch={true}
                className="bg-[#f4f5f7] hover:bg-[#eaecef] p-3 rounded-xl flex items-center gap-3 transition-colors group cursor-pointer border border-gray-100"
              >
                {/* Angka Urutan: Merah Tebal */}
                <div className="text-3xl sm:text-4xl font-black text-red-600 shrink-0 w-7 text-center font-['Montserrat']">
                  {idx + 1}
                </div>

                {/* Thumbnail Gambar */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 relative bg-gray-200 border border-gray-200/80">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    loading="lazy"
                    sizes="64px"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Judul Berita */}
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug group-hover:text-red-600 transition-colors line-clamp-3 font-['Montserrat']">
                  {item.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>

        {/* 2. WIDGET NASIONAL */}
        <div className="mb-8">
          <div className="border-b border-gray-200 pb-2 mb-4">
            <h3 className="text-xl font-black text-slate-900 tracking-wide font-['Montserrat']">
              <span className="border-b-4 border-red-600 pb-2">NASIONAL</span>
            </h3>
          </div>

          {/* Featured Item */}
          <div className="flex flex-col group cursor-pointer mb-4 border-b border-gray-200 pb-4">
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100 mb-3 border border-gray-200">
              <Image
                src={nasionalFeatured.image}
                alt={nasionalFeatured.title}
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 400px"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-2xl"
              />
            </div>
            <Link href={`/berita/${nasionalFeatured.slug}`} prefetch={true}>
              <h4 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug group-hover:text-red-600 transition-colors line-clamp-3 font-['Montserrat'] mb-1.5">
                {nasionalFeatured.title}
              </h4>
            </Link>
            <span className="text-[11px] text-gray-400 font-semibold font-['Montserrat']">
              {nasionalFeatured.date}
            </span>
          </div>

          {/* Sub-list Items */}
          <div className="flex flex-col divide-y divide-gray-200">
            {nasionalList.map((item, idx) => (
              <div key={idx} className="py-3 group flex flex-col gap-1 first:pt-0 last:pb-0">
                <Link href={`/berita/${item.slug}`} prefetch={true}>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug group-hover:text-red-600 transition-colors line-clamp-2 font-['Montserrat']">
                    {item.title}
                  </h4>
                </Link>
                <span className="text-[10px] text-gray-400 font-semibold font-['Montserrat'] mt-0.5">
                  {item.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </aside>
    );
  }

  // VARIANT DEFAULT (UNTUK HOMEPAGE / HALAMAN KATEGORI - ASLI UNTOUCHED)
  const displayHomePopular =
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
      : fallbackPopularHome.map((item, idx) => ({ ...item, rank: idx + 1 }));

  return (
    <aside className="w-full flex-shrink-0 flex flex-col gap-5 font-['Montserrat']">
      {/* 1. 3 BANNER ASLI BERTUMPUK VERTIKAL (HOMEPAGE ASLI) */}
      {!hideBanners && (
        <div className="flex flex-col mb-4">
          {/* Banner 1: Poster DPRD */}
          <div className="relative w-full aspect-[3/4] mb-4 rounded-none border border-gray-200 bg-gray-50 overflow-hidden">
            <Image
              src="https://wsrv.nl/?url=jurnalsukabumi.com/wp-content/uploads/2026/07/IMG-20260725-WA0067-e1784991814798.jpg"
              alt="Poster DPRD Sukabumi - Pray For Kasepuhan Ciptamulya"
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 350px"
              className="object-contain"
            />
          </div>

          {/* Banner 2: Foto CEO / Ketua SMSI Eman Sulaeman */}
          <div className="relative w-full aspect-[3/4] mb-4 rounded-none border border-gray-200 bg-gray-50 overflow-hidden">
            <Image
              src="https://wsrv.nl/?url=jurnalsukabumi.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-18-at-19.28.45-1-e1784378099703.jpeg"
              alt="Foto CEO SMSI Sukabumi - Eman Sulaeman"
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 350px"
              className="object-contain"
            />
          </div>

          {/* Banner 3: Sertifikat SMSI */}
          <div className="relative w-full aspect-[16/10] mb-4 rounded-none border border-gray-200 bg-gray-50 overflow-hidden">
            <Image
              src="https://wsrv.nl/?url=jurnalsukabumi.com/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-22-at-13.42.46-e1782111035175.jpeg"
              alt="Sertifikat Media Siber SMSI Sukabumi"
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 350px"
              className="object-contain"
            />
          </div>
        </div>
      )}

      {/* 2. WIDGET "TOPIK TERKINI" (HOMEPAGE ASLI) */}
      <div className="bg-white border border-gray-200 p-4 rounded-none flex flex-col gap-3">
        <div className="border-b-2 border-red-600 pb-1.5">
          <h3 className="text-slate-900 text-base font-black uppercase tracking-wide font-['Montserrat']">
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

      {/* 3. WIDGET "BERITA TERPOPULER" (HOMEPAGE ASLI) */}
      {!hidePopular && (
        <div className="bg-white border border-gray-200 p-4 rounded-none flex flex-col">
          <h3 className="text-xl font-bold mb-4 relative pb-2 border-b border-gray-100 font-['Montserrat']">
            <span className="border-b-4 border-red-600 pb-2">BERITA</span> TERPOPULER
          </h3>

          <div className="flex flex-col">
            {displayHomePopular.map((item) => (
              <Link
                key={item.id}
                href={`/berita/${item.slug}`}
                prefetch={true}
                className="flex items-center gap-4 p-4 odd:bg-gray-50 even:bg-white group transition-colors"
              >
                {/* Angka Urutan */}
                <div className="text-5xl font-extrabold text-red-600 shrink-0 w-8 text-center font-['Montserrat']">
                  {item.rank}
                </div>

                {/* Thumbnail */}
                <Image
                  src={item.image}
                  alt={item.title}
                  width={64}
                  height={64}
                  loading="lazy"
                  className="w-16 h-16 rounded-md object-cover shrink-0"
                />

                {/* Teks Berita */}
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

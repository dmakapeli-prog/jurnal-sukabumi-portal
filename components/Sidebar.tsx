"use client";

import Link from "next/link";
import Image from "next/image";
import { LiveArticle } from "@/lib/wp";

interface SidebarProps {
  popularArticles?: LiveArticle[];
  hideBanners?: boolean;
  hidePopular?: boolean;
}

const popularArticlesList = [
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

export default function Sidebar({ popularArticles }: SidebarProps) {
  const displayPopular =
    popularArticles && popularArticles.length > 0
      ? popularArticles.slice(0, 6).map((item, idx) => ({
          id: item.id,
          slug: item.slug || `berita-${item.id}`,
          title: item.title,
          image: item.image,
        }))
      : popularArticlesList;
  return (
    <aside className="w-full flex flex-col font-['Montserrat']">
      {/* 1. WIDGET BERITA TERPOPULER (1 - 6 Card Gray Box) */}
      <div className="mb-8">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-xl font-black text-slate-900 tracking-wide font-['Montserrat']">
            <span className="border-b-4 border-red-600 pb-2 mr-1">BERITA</span> TERPOPULER
          </h3>
        </div>

        <div className="flex flex-col gap-2.5">
          {displayPopular.map((item, idx) => (
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

        {/* Featured Item (Gambar Besar Raksasa Melengkung) */}
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

        {/* Sub-list Item (Daftar List Teks Berita Diberi Garis Pembatas) */}
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

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface NewsItem {
  id: number;
  category: string;
  title: string;
  date: string;
  image: string;
}

const mainNews: NewsItem[] = [
  {
    id: 1,
    category: "PERISTIWA",
    title: "Perumda AMTJM Tanggapi Aksi Mahasiswa, Tegaskan Pengadaan Water Meter dan IPA Sesuai Prosedur",
    date: "Selasa, 4 Agustus 2026 - 21:25 WIB",
    image: "https://placehold.co/270x150/0284c7/ffffff?text=Perumda+AMTJM",
  },
  {
    id: 2,
    category: "HEADLINE",
    title: "Belum Kantongi Izin, Pembangunan Alfamart Ditegor Satpol PP Cibadak",
    date: "Selasa, 4 Agustus 2026 - 17:29 WIB",
    image: "https://placehold.co/270x150/dc2626/ffffff?text=Satpol+PP+Cibadak",
  },
  {
    id: 3,
    category: "WISATA",
    title: "Kamar 308 Samudra Beach Tak Hanya Dikunjungi, Kini Disebut Jadi Lokasi Berburu Mustika",
    date: "Selasa, 4 Agustus 2026 - 13:52 WIB",
    image: "https://placehold.co/270x150/059669/ffffff?text=Kamar+308+Samudra",
  },
];

const peristiwaHighlights: NewsItem[] = [
  {
    id: 101,
    category: "HEADLINE",
    title: "Kebutuhan Dasar Penyintas Ciptamulya Dipastikan Aman, Fase Darurat Resmi Ditutup",
    date: "Selasa, 4 Agustus 2026",
    image: "https://placehold.co/243x145/334155/ffffff?text=Ciptamulya+Darurat",
  },
  {
    id: 102,
    category: "HUKUM",
    title: "Suami Bongkar Dugaan Perselingkuhan di Kalibunder, Oknum Guru Dilaporkan ke Polisi",
    date: "Selasa, 4 Agustus 2026",
    image: "https://placehold.co/243x145/475569/ffffff?text=Perselingkuhan+Kalibunder",
  },
  {
    id: 103,
    category: "PERISTIWA",
    title: "Gempa M4,1 Guncang Sukabumi, BMKG Pastikan Tidak Berpotensi Tsunami",
    date: "Selasa, 4 Agustus 2026",
    image: "https://placehold.co/243x145/64748b/ffffff?text=Gempa+Sukabumi",
  },
  {
    id: 104,
    category: "PERISTIWA",
    title: "Teror Buaya di Situ Habibie Kembali Muncul, Anak Sapi Nyaris Diseret ke Dasar Danau",
    date: "Selasa, 4 Agustus 2026",
    image: "https://placehold.co/243x145/1e293b/ffffff?text=Buaya+Situ+Habibie",
  },
  {
    id: 105,
    category: "HEADLINE",
    title: "Bukan Toko, Ini Swalayan Pakaian Gratis di Posko Korban Kebakaran Ciptamulya",
    date: "Selasa, 4 Agustus 2026",
    image: "https://placehold.co/243x145/0f172a/ffffff?text=Swalayan+Pakaian+Gratis",
  },
];

const secondaryNews: NewsItem[] = [
  {
    id: 4,
    category: "PARLEMEN",
    title: "DPRD Dorong Pelaku Usaha Bangun Wisata yang Aman, Nyaman, dan Berkesan",
    date: "Selasa, 4 Agustus 2026 - 12:28 WIB",
    image: "https://placehold.co/270x150/7c3aed/ffffff?text=DPRD+Wisata",
  },
  {
    id: 5,
    category: "RAGAM",
    title: "Abah Hendrik Teguh Pegang Papakem, Pembangunan Ciptamulya Baru Dimulai Usai Bulan Safar",
    date: "Selasa, 4 Agustus 2026 - 10:05 WIB",
    image: "https://placehold.co/270x150/d97706/ffffff?text=Abah+Hendrik",
  },
  {
    id: 6,
    category: "PARLEMEN",
    title: "DPRD Mulai Bahas Perubahan Tirta Jaya Mandiri Jadi Perseroda, Komisi III Ditunjuk Jadi Pansus",
    date: "Selasa, 4 Agustus 2026 - 10:02 WIB",
    image: "https://placehold.co/270x150/2563eb/ffffff?text=DPRD+Tirta+Jaya",
  },
  {
    id: 7,
    category: "PERISTIWA",
    title: "Warga Ciawitali Nagrak Dihebohkan Kemunculan Monyet Masuk ke Pemukiman",
    date: "Senin, 3 Agustus 2026 - 20:20 WIB",
    image: "https://placehold.co/270x150/059669/ffffff?text=Monyet+Pemukiman",
  },
];

export default function NewsFeed() {
  const [sliderIndex, setSliderIndex] = useState(0);

  const prevPeristiwa = () => {
    setSliderIndex((prev) => (prev > 0 ? prev - 1 : peristiwaHighlights.length - 1));
  };

  const nextPeristiwa = () => {
    setSliderIndex((prev) => (prev + 1) % peristiwaHighlights.length);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* SECTION TITLE: BERITA TERKINI */}
      <div className="flex items-center gap-3 border-b-2 border-red-600 pb-2">
        <h2 className="text-slate-900 text-xl font-black font-['Montserrat'] uppercase tracking-wide">
          BERITA TERKINI
        </h2>
        <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse"></span>
      </div>

      {/* Main News List (Items 1-3) */}
      <div className="flex flex-col gap-6">
        {mainNews.map((item) => (
          <article
            key={item.id}
            className="flex flex-col sm:flex-row gap-4 items-start group border-b border-gray-100 pb-5 last:border-b-0"
          >
            <div className="relative w-full sm:w-60 h-40 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, 240px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col justify-between py-1 flex-1 h-full">
              <div className="flex flex-col gap-1.5">
                <span className="text-red-600 text-xs font-bold font-['Montserrat'] uppercase tracking-wider">
                  {item.category}
                </span>
                <Link href="#">
                  <h3 className="text-gray-900 group-hover:text-red-600 text-base sm:text-lg font-bold font-['Montserrat'] leading-snug transition-colors">
                    {item.title}
                  </h3>
                </Link>
              </div>
              <p className="text-gray-400 text-xs font-['Montserrat'] mt-3 flex items-center gap-1">
                <i className="far fa-clock text-[10px]"></i>
                {item.date}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* SPECIAL DARK HIGHLIGHT CAROUSEL BANNER ("PERISTIWA") */}
      <div className="my-2 bg-slate-900 rounded-xl p-5 relative overflow-hidden shadow-xl flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="bg-red-600 text-white text-xs font-bold font-['Montserrat'] px-3 py-1 uppercase rounded tracking-wider">
            FOKUS PERISTIWA
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={prevPeristiwa}
              className="w-8 h-8 bg-slate-800 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors shadow"
              aria-label="Previous Highlight"
            >
              <i className="fas fa-chevron-left text-xs"></i>
            </button>
            <button
              onClick={nextPeristiwa}
              className="w-8 h-8 bg-slate-800 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors shadow"
              aria-label="Next Highlight"
            >
              <i className="fas fa-chevron-right text-xs"></i>
            </button>
          </div>
        </div>

        <div className="w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out gap-4"
            style={{ transform: `translateX(-${sliderIndex * 100}%)` }}
          >
            {peristiwaHighlights.map((item) => (
              <div
                key={item.id}
                className="w-full min-w-full sm:min-w-[48%] flex-shrink-0 bg-slate-800/80 hover:bg-slate-800 rounded-lg p-3 flex flex-col gap-2.5 transition-colors border border-slate-700/50"
              >
                <div className="relative w-full h-36 bg-slate-700 rounded overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 300px"
                    className="object-cover"
                  />
                </div>
                <span className="text-red-400 text-[11px] font-bold font-['Montserrat'] uppercase">
                  {item.category}
                </span>
                <h4 className="text-white text-sm font-bold font-['Montserrat'] line-clamp-2 leading-snug hover:text-red-400 cursor-pointer">
                  {item.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary News List (Items 4-7) */}
      <div className="flex flex-col gap-6">
        {secondaryNews.map((item) => (
          <article
            key={item.id}
            className="flex flex-col sm:flex-row gap-4 items-start group border-b border-gray-100 pb-5 last:border-b-0"
          >
            <div className="relative w-full sm:w-60 h-40 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, 240px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col justify-between py-1 flex-1 h-full">
              <div className="flex flex-col gap-1.5">
                <span className="text-red-600 text-xs font-bold font-['Montserrat'] uppercase tracking-wider">
                  {item.category}
                </span>
                <Link href="#">
                  <h3 className="text-gray-900 group-hover:text-red-600 text-base sm:text-lg font-bold font-['Montserrat'] leading-snug transition-colors">
                    {item.title}
                  </h3>
                </Link>
              </div>
              <p className="text-gray-400 text-xs font-['Montserrat'] mt-3 flex items-center gap-1">
                <i className="far fa-clock text-[10px]"></i>
                {item.date}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

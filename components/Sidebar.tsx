"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LiveArticle } from "@/lib/wp";

interface SidebarProps {
  popularArticles?: LiveArticle[];
}

const fallbackPopular = [
  {
    id: 1,
    rank: 1,
    title: "Sungai Tak Lagi Jernih, Warga Simpenan Desak Penertiban Tambang Liar",
    category: "PERISTIWA",
    views: "1.4k dibaca",
    link: "#",
  },
  {
    id: 2,
    rank: 2,
    title: "Rumah Dikepung Massa, Dugaan Pencabulan Oknum Guru Ngaji Gegerkan Warga",
    category: "HUKUM",
    views: "1.1k dibaca",
    link: "#",
  },
  {
    id: 3,
    rank: 3,
    title: "Belum Kantongi Izin, Pembangunan Alfamart Ditegor Satpol PP Cibadak",
    category: "HEADLINE",
    views: "950 dibaca",
    link: "#",
  },
  {
    id: 4,
    rank: 4,
    title: "Guru Ngaji Terduga Pelaku Pencabulan Ditangkap di Banten",
    category: "PERISTIWA",
    views: "820 dibaca",
    link: "#",
  },
  {
    id: 5,
    rank: 5,
    title: "Perumda AMTJM Tanggapi Aksi Mahasiswa, Tegaskan Pengadaan Water Meter Sesuai Prosedur",
    category: "PERISTIWA",
    views: "740 dibaca",
    link: "#",
  },
];

const sidebarSocials = [
  { icon: "fab fa-facebook-f", label: "Facebook", href: "https://facebook.com", color: "bg-blue-600" },
  { icon: "fab fa-x-twitter", label: "Twitter", href: "https://twitter.com", color: "bg-black" },
  { icon: "fab fa-instagram", label: "Instagram", href: "https://instagram.com", color: "bg-pink-600" },
  { icon: "fab fa-youtube", label: "YouTube", href: "https://youtube.com", color: "bg-red-600" },
  { icon: "fab fa-tiktok", label: "TikTok", href: "https://tiktok.com", color: "bg-slate-900" },
];

export default function Sidebar({ popularArticles }: SidebarProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [voted, setVoted] = useState(false);

  const displayArticles =
    popularArticles && popularArticles.length > 0
      ? popularArticles.slice(0, 5).map((item, idx) => ({
          id: item.id,
          rank: idx + 1,
          title: item.title,
          category: item.category,
          views: item.date,
          link: item.link,
        }))
      : fallbackPopular;

  return (
    <aside className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-6">
      {/* Sponsorship Ad Slot 1 */}
      <div className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-center shadow-sm">
        <span className="text-[10px] uppercase font-extrabold text-gray-400 block mb-2 font-['Montserrat'] tracking-wider">
          SPONSORSHIP / IKLAN
        </span>
        <div className="relative w-full aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
          <Image
            src="https://placehold.co/300x250/e2e8f0/475569?text=Iklan+Banner+300x250"
            alt="Iklan Banner 300x250"
            fill
            sizes="300px"
            className="object-cover"
          />
        </div>
      </div>

      {/* BERITA TERPOPULER WIDGET */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col gap-4">
        <div className="border-b-2 border-red-600 pb-2">
          <h3 className="text-slate-900 text-lg font-black font-['Montserrat'] uppercase tracking-wide">
            BERITA TERPOPULER
          </h3>
        </div>

        <div className="flex flex-col gap-3">
          {displayArticles.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              target="_blank"
              className="flex gap-3 items-start group border-b border-gray-100 pb-3 last:border-b-0 last:pb-0"
            >
              <span className="w-7 h-7 bg-red-600 text-white rounded-full flex items-center justify-center font-extrabold text-xs font-['Montserrat'] flex-shrink-0 group-hover:bg-slate-900 transition-colors shadow-sm">
                {item.rank}
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-red-600 text-[10px] font-extrabold uppercase font-['Montserrat']">
                  {item.category}
                </span>
                <h4 className="text-gray-800 group-hover:text-red-600 text-xs font-bold font-['Montserrat'] leading-snug transition-colors line-clamp-2">
                  {item.title}
                </h4>
                <span className="text-gray-400 text-[10px] mt-0.5 font-['Montserrat'] flex items-center gap-1">
                  <i className="far fa-clock text-[9px]"></i>
                  {item.views}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* IKUTI KAMI SOCIAL MEDIA WIDGET */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col gap-4">
        <div className="border-b-2 border-red-600 pb-2">
          <h3 className="text-slate-900 text-lg font-black font-['Montserrat'] uppercase tracking-wide">
            IKUTI KAMI
          </h3>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {sidebarSocials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${s.color} text-white h-10 rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm`}
              aria-label={s.label}
            >
              <i className={`${s.icon} text-base`} />
            </a>
          ))}
        </div>
      </div>

      {/* JAJAK PENDAPAT / POLLING WIDGET */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col gap-3">
        <div className="border-b-2 border-red-600 pb-2">
          <h3 className="text-slate-900 text-lg font-black font-['Montserrat'] uppercase tracking-wide">
            JAJAK PENDAPAT
          </h3>
        </div>

        <p className="text-xs font-bold text-slate-800 font-['Montserrat'] leading-snug">
          Apakah Anda setuju dengan langkah penertiban tambang liar di kawasan Sukabumi?
        </p>

        {!voted ? (
          <div className="flex flex-col gap-2 mt-1">
            {[
              { id: 1, label: "Setuju, demi kelestarian alam" },
              { id: 2, label: "Tidak setuju, butuh solusi ekonomi" },
              { id: 3, label: "Netral / Ragu-ragu" },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedOption(opt.id)}
                className={`w-full p-2.5 rounded-lg text-left text-xs font-['Montserrat'] transition-all border ${
                  selectedOption === opt.id
                    ? "border-red-600 bg-red-50 text-red-700 font-bold"
                    : "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {opt.label}
              </button>
            ))}
            <button
              disabled={selectedOption === null}
              onClick={() => setVoted(true)}
              className="w-full mt-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-xs py-2 rounded-lg transition-colors font-['Montserrat'] shadow"
            >
              Kirim Pilihan
            </button>
          </div>
        ) : (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-lg text-xs font-bold text-center font-['Montserrat'] mt-1">
            ✓ Terima kasih! Suara Anda telah berhasil direkam.
          </div>
        )}
      </div>

      {/* E-PAPER / INFOGRAFIS WIDGET */}
      <div className="bg-slate-900 text-white rounded-xl p-5 shadow-lg flex flex-col gap-3 border border-slate-800">
        <div>
          <span className="bg-red-600 text-white text-[10px] font-extrabold font-['Montserrat'] px-2 py-0.5 uppercase rounded">
            E-PAPER / INFOGRAFIS
          </span>
          <h4 className="text-sm font-bold font-['Montserrat'] mt-2 leading-snug">
            Edisi Cetak & Infografis Jurnal Sukabumi Pekan Ini
          </h4>
        </div>
        <div className="relative w-full aspect-[16/9] bg-slate-800 rounded-lg overflow-hidden">
          <Image
            src="https://placehold.co/300x180/0f172a/ffffff?text=E-Paper+Sukabumi"
            alt="E-Paper Sukabumi"
            fill
            sizes="300px"
            className="object-cover"
          />
        </div>
        <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-xs font-bold font-['Montserrat'] transition-colors shadow">
          BACA E-PAPER
        </button>
      </div>
    </aside>
  );
}

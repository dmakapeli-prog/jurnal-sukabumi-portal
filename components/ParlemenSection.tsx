"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ParlemenCard {
  id: number;
  title: string;
  image: string;
}

const parlemenCards: ParlemenCard[] = [
  {
    id: 1,
    title: "APBD 2025 Masuki Tahap Akhir, DPRD dan Pemkab Sukabumi Rampungkan Proses Menuju Perda",
    image: "https://placehold.co/253x378/1e1b4b/ffffff?text=APBD+2025",
  },
  {
    id: 2,
    title: "Beralih ke Komisi I DPRD, Dewan Jajah Siap Kawal Pemerintahan dan Aspirasi Rakyat",
    image: "https://placehold.co/253x378/311b92/ffffff?text=Komisi+I+DPRD",
  },
  {
    id: 3,
    title: "DPRD Sukabumi Tampung Aspirasi Warga, Pembahasan Anggaran 2027 Mulai Bergulir",
    image: "https://placehold.co/253x378/4a148c/ffffff?text=Aspirasi+Warga",
  },
  {
    id: 4,
    title: "DPRD Sukabumi Kawal Hak 332 Eks Karyawan, Dua Perusahaan Tambang Mangkir dari Audiensi",
    image: "https://placehold.co/253x378/880e4f/ffffff?text=Hak+Eks+Karyawan",
  },
  {
    id: 5,
    title: "DPRD Soroti Lemahnya Pengawasan Laut, Dewan Dadang: Nelayan Sukabumi Jangan Terus Jadi Penonton",
    image: "https://placehold.co/253x378/0d47a1/ffffff?text=Pengawasan+Laut",
  },
];

export default function ParlemenSection() {
  const [slideOffset, setSlideOffset] = useState(0);

  const nextSlide = () => {
    setSlideOffset((prev) => (prev + 1) % parlemenCards.length);
  };

  const prevSlide = () => {
    setSlideOffset((prev) => (prev > 0 ? prev - 1 : parlemenCards.length - 1));
  };

  return (
    <section className="w-full my-8 bg-slate-50 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200/80 flex flex-col gap-5">
      {/* Section Title Header */}
      <div className="flex items-center justify-between border-b-2 border-red-600 pb-2">
        <h2 className="text-slate-900 text-xl font-black font-['Montserrat'] uppercase tracking-wide">
          PARLEMEN SUKABUMI
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-red-600 hover:text-white transition-colors shadow-sm"
            aria-label="Previous Parlemen Card"
          >
            <i className="fas fa-chevron-left text-xs"></i>
          </button>
          <button
            onClick={nextSlide}
            className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-red-600 hover:text-white transition-colors shadow-sm"
            aria-label="Next Parlemen Card"
          >
            <i className="fas fa-chevron-right text-xs"></i>
          </button>
        </div>
      </div>

      {/* Cards Grid / Slider */}
      <div className="w-full overflow-hidden">
        <div
          className="flex gap-4 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${slideOffset * 240}px)` }}
        >
          {parlemenCards.map((card) => (
            <div
              key={card.id}
              className="w-[220px] sm:w-[240px] h-[340px] flex-shrink-0 relative rounded-lg overflow-hidden group shadow-md bg-slate-900 flex flex-col justify-end"
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="240px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="relative z-10 p-4 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col gap-2">
                <span className="bg-red-600 text-white text-[10px] font-extrabold font-['Montserrat'] uppercase px-2 py-0.5 rounded w-fit">
                  PARLEMEN
                </span>
                <Link href="#">
                  <h3 className="text-white text-xs sm:text-sm font-bold font-['Montserrat'] leading-snug group-hover:text-red-400 transition-colors line-clamp-3">
                    {card.title}
                  </h3>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

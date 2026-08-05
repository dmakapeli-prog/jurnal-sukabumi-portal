"use client";

import { useState } from "react";
import Image from "next/image";

interface HeadlineItem {
  id: number;
  category: string;
  title: string;
  image: string;
  date?: string;
}

const headlines: HeadlineItem[] = [
  {
    id: 1,
    category: "HEADLINE",
    title: "Belum Kantongi Izin, Pembangunan Alfamart Ditegor Satpol PP Cibadak",
    image: "https://placehold.co/790x430/dc2626/ffffff?text=Headline+Alfamart",
    date: "Selasa, 4 Agustus 2026 - 17:29 WIB",
  },
  {
    id: 2,
    category: "HEADLINE",
    title: "Guru Ngaji Terduga Pelaku Pencabulan Ditangkap di Banten, Pelarian AC Berakhir di Cibeber",
    image: "https://placehold.co/790x430/1e293b/ffffff?text=Penangkapan+Guru+Ngaji",
    date: "Selasa, 4 Agustus 2026 - 16:10 WIB",
  },
  {
    id: 3,
    category: "HEADLINE",
    title: "Sungai Tak Lagi Jernih, Warga Simpenan Desak Penertiban Tambang Liar",
    image: "https://placehold.co/790x430/047857/ffffff?text=Penertiban+Tambang+Liar",
    date: "Selasa, 4 Agustus 2026 - 15:45 WIB",
  },
  {
    id: 4,
    category: "HEADLINE",
    title: "Rumah Dikepung Massa, Dugaan Pencabulan Oknum Guru Ngaji Gegerkan Warga Simpenan",
    image: "https://placehold.co/790x430/b91c1c/ffffff?text=Gegerkan+Warga+Simpenan",
    date: "Selasa, 4 Agustus 2026 - 14:20 WIB",
  },
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeHeadline = headlines[activeIndex];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % headlines.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + headlines.length) % headlines.length);
  };

  return (
    <section className="w-full mb-8 flex flex-col gap-3">
      {/* Main Big Hero Banner */}
      <div className="relative w-full aspect-[16/9] min-h-[320px] md:min-h-[420px] bg-slate-900 rounded-xl overflow-hidden group shadow-lg flex flex-col justify-end">
        {/* Background Image */}
        <Image
          src={activeHeadline.image}
          alt={activeHeadline.title}
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 800px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Gradient Layer & Content Overlay */}
        <div className="relative z-10 w-full p-5 md:p-8 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-red-600 text-white text-xs font-black font-['Montserrat'] px-3 py-1 uppercase rounded tracking-wider shadow">
              {activeHeadline.category}
            </span>
            {activeHeadline.date && (
              <span className="text-gray-300 text-xs font-medium font-['Montserrat'] hidden sm:inline-block">
                • {activeHeadline.date}
              </span>
            )}
          </div>

          <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-extrabold font-['Montserrat'] leading-snug md:leading-tight drop-shadow-md">
            {activeHeadline.title}
          </h1>
        </div>

        {/* Carousel Prev / Next Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/60 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all shadow-md"
          aria-label="Previous Slide"
        >
          <i className="fas fa-chevron-left text-sm"></i>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/60 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all shadow-md"
          aria-label="Next Slide"
        >
          <i className="fas fa-chevron-right text-sm"></i>
        </button>
      </div>

      {/* Grid of 4 Thumbnail Cards Below Main Hero */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {headlines.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setActiveIndex(idx)}
            className={`text-left bg-slate-900 text-white rounded-lg overflow-hidden flex flex-col transition-all duration-200 border-2 ${
              activeIndex === idx
                ? "border-red-600 ring-2 ring-red-600/30 scale-[1.01]"
                : "border-transparent opacity-85 hover:opacity-100"
            }`}
          >
            <div className="relative w-full h-24 sm:h-28 bg-slate-800">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 50vw, 250px"
                className="object-cover"
              />
            </div>
            <div className="p-2.5 bg-slate-950 flex-1 flex items-center">
              <p className="text-xs text-gray-200 font-bold font-['Montserrat'] line-clamp-2 leading-relaxed">
                {item.title}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

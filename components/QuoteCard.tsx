"use client";

import { useState } from "react";
import Image from "next/image";

interface QuoteCardProps {
  quote?: string;
  authorName?: string;
  authorRole?: string;
  authorAvatar?: string;
}

export default function QuoteCard({
  quote = "Kalau narkoba sudah masuk ke lingkungan pemerintahan, ini alarm keras bagi kita semua.",
  authorName = "Ujang Abdurohim (Dewan Batman)",
  authorRole = "Anggota DPRD",
  authorAvatar = "https://wsrv.nl/?url=https://jurnalsukabumi.com/wp-content/uploads/2026/08/Ujang-Abdurohim-Rochmi-Alias-Dewan-Batman.jpg",
}: QuoteCardProps) {
  const [copied, setCopied] = useState(false);

  const handleShareQuote = () => {
    const textToCopy = `"${quote}" — ${authorName}, ${authorRole}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <figure className="relative bg-gradient-to-br from-red-50 to-white dark:from-gray-800 dark:to-gray-900 border-l-4 border-red-600 shadow-sm p-6 my-8 rounded-r-lg overflow-hidden font-['Montserrat']">
      {/* Background Giant Quote Icon (Raksasa Merah Transparan) */}
      <div className="absolute -top-6 -right-3 text-red-600/10 dark:text-red-500/10 text-9xl font-serif leading-none pointer-events-none select-none">
        “
      </div>

      {/* Teks Kutipan (Teks Besar, Tebal, & Miring) */}
      <blockquote className="relative z-10 text-lg sm:text-xl font-bold italic text-gray-800 dark:text-gray-100 mb-5 leading-relaxed font-['Montserrat']">
        "{quote}"
      </blockquote>

      {/* Bottom Bar: Profil Tokoh (Kiri) & Tombol Share (Kanan) */}
      <figcaption className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-red-100 dark:border-gray-700">
        {/* Sisi Kiri: Avatar & Nama Tokoh */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 relative bg-gray-200 border border-red-200">
            <Image
              src={authorAvatar}
              alt={authorName}
              fill
              loading="lazy"
              sizes="40px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm text-slate-900 dark:text-slate-100 leading-tight">
              {authorName}
            </span>
            <span className="text-xs text-red-600 font-semibold mt-0.5">
              {authorRole}
            </span>
          </div>
        </div>

        {/* Sisi Kanan: Tombol Outline Share Kutipan */}
        <button
          type="button"
          onClick={handleShareQuote}
          title="Bagikan Kutipan Ini"
          className="inline-flex items-center gap-1.5 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white dark:border-red-500 dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 shadow-2xs active:scale-95"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
              <span>Tersalin!</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
              </svg>
              <span>[Bagikan Kutipan Ini]</span>
            </>
          )}
        </button>
      </figcaption>
    </figure>
  );
}

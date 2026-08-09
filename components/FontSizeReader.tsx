"use client";

import { useState } from "react";

interface FontSizeReaderProps {
  contentHtml?: string;
  paragraphs?: string[];
  reporterInfo?: string;
}

export default function FontSizeReader({
  contentHtml,
  paragraphs,
  reporterInfo = "Reporter: Ilham Nugraha | Redaktur: Ujang Herlan",
}: FontSizeReaderProps) {
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium");

  return (
    <article className="lg:col-span-8 flex flex-col">
      {/* Tombol Pengatur Ukuran Teks (A A A) */}
      <div className="flex items-center justify-end gap-1.5 mb-3 text-gray-600 font-bold font-['Montserrat']">
        <button
          type="button"
          onClick={() => setFontSize("small")}
          className={`text-[10px] cursor-pointer transition-all px-2.5 py-1 border rounded ${
            fontSize === "small"
              ? "bg-red-600 text-white border-red-600 shadow-sm font-black"
              : "bg-white text-gray-700 border-gray-200 hover:text-red-600 hover:border-red-400"
          }`}
          title="Ukuran Teks Kecil"
        >
          A
        </button>
        <button
          type="button"
          onClick={() => setFontSize("medium")}
          className={`text-xs cursor-pointer transition-all px-2.5 py-1 border rounded ${
            fontSize === "medium"
              ? "bg-red-600 text-white border-red-600 shadow-sm font-black"
              : "bg-white text-gray-700 border-gray-200 hover:text-red-600 hover:border-red-400"
          }`}
          title="Ukuran Teks Sedang (Default)"
        >
          A
        </button>
        <button
          type="button"
          onClick={() => setFontSize("large")}
          className={`text-sm cursor-pointer transition-all px-2.5 py-1 border rounded ${
            fontSize === "large"
              ? "bg-red-600 text-white border-red-600 shadow-sm font-black"
              : "bg-white text-gray-700 border-gray-200 hover:text-red-600 hover:border-red-400"
          }`}
          title="Ukuran Teks Besar"
        >
          A
        </button>
      </div>

      {/* Isi Berita */}
      <div
        className={`prose max-w-none text-slate-800 font-['Montserrat'] text-justify transition-all duration-200 ${
          fontSize === "small"
            ? "text-xs sm:text-sm leading-normal space-y-4"
            : fontSize === "large"
            ? "text-base sm:text-xl leading-loose space-y-6"
            : "text-sm sm:text-base leading-relaxed sm:leading-loose space-y-5"
        }`}
      >
        {contentHtml ? (
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        ) : (
          paragraphs?.map((p, idx) => (
            <p key={idx}>
              {idx === 0 && (
                <span className="font-bold text-red-600">
                  JURNALSUKABUMI.COM -{" "}
                </span>
              )}
              {p}
            </p>
          ))
        )}
      </div>

      {/* Footer Berita */}
      <div className="border-t border-gray-200 mt-6 pt-4 text-xs font-bold text-slate-900 font-['Montserrat']">
        {reporterInfo}
      </div>
    </article>
  );
}

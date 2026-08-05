import Link from "next/link";
import { LiveArticle } from "@/lib/wp";

interface HeroSectionProps {
  articles: LiveArticle[];
}

export default function HeroSection({ articles }: HeroSectionProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  const mainHeadline = articles[0];
  const subHeadlines = articles.slice(1, 5);

  return (
    <section className="w-full mb-6 flex flex-col gap-2">
      {/* 1. Main Featured Article (Gambar Raksasa Full-Width) */}
      {mainHeadline && (
        <div className="relative w-full aspect-[16/8] min-h-[340px] md:min-h-[440px] bg-slate-900 rounded-lg overflow-hidden group shadow-md flex flex-col justify-end">
          <img
            src={mainHeadline.image}
            alt={mainHeadline.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Badge Category (Top Left) */}
          <div className="absolute top-4 left-4 z-20 bg-red-600 text-white text-xs font-black font-['Montserrat'] px-3 py-1 uppercase rounded-sm shadow-md">
            {mainHeadline.category || "HEADLINE"}
          </div>

          {/* Gradient Overlay & Text Container (Kiri Bawah Menimpa Gambar) */}
          <div className="relative z-10 p-5 md:p-8 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col gap-2">
            <span className="text-gray-300 text-xs font-medium font-['Montserrat']">
              {mainHeadline.date}
            </span>

            <Link href={`/berita/${mainHeadline.slug || mainHeadline.id}`}>
              <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold font-['Montserrat'] leading-tight group-hover:text-red-400 transition-colors max-w-4xl drop-shadow-md">
                {mainHeadline.title}
              </h1>
            </Link>

            {mainHeadline.excerpt && (
              <p className="text-gray-200 text-xs sm:text-sm font-['Montserrat'] line-clamp-2 leading-relaxed max-w-3xl hidden sm:block">
                {mainHeadline.excerpt}
              </p>
            )}
          </div>
        </div>
      )}

      {/* 2. Grid 4 Artikel Thumbnail Horizontal Berjajar Tepat di Bawah Hero */}
      {subHeadlines.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mt-1">
          {subHeadlines.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm flex flex-col group hover:border-red-500 transition-colors"
            >
              <div className="relative w-full h-28 sm:h-36 bg-gray-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3 flex flex-col gap-1 flex-1 justify-between bg-white">
                <span className="text-red-600 text-[10px] font-black font-['Montserrat'] uppercase">
                  {item.category}
                </span>
                <Link href={`/berita/${item.slug || item.id}`}>
                  <h3 className="text-slate-900 group-hover:text-red-600 font-bold font-['Montserrat'] text-xs sm:text-sm leading-snug transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </Link>
                <span className="text-gray-400 text-[10px] font-['Montserrat'] mt-1">
                  {item.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

import Link from "next/link";
import { LiveArticle } from "@/lib/wp";

interface NewsFeedProps {
  articles: LiveArticle[];
}

export default function NewsFeed({ articles }: NewsFeedProps) {
  if (!articles || articles.length === 0) {
    return (
      <div className="w-full p-8 text-center bg-gray-50 border border-gray-200 rounded-lg text-gray-500 font-['Montserrat'] text-xs">
        Belum ada berita terbaru yang dapat ditampilkan.
      </div>
    );
  }

  // Split news array into parts so we can insert dark theme blocks in-between
  const firstBatch = articles.slice(0, 3);
  const secondBatch = articles.slice(3, 6);
  const thirdBatch = articles.slice(6);

  // Dark Theme Block Data (using articles subset or custom highlights)
  const darkBlock1Items = articles.slice(1, 4);
  const darkBlock2Items = articles.slice(4, 7);

  return (
    <div className="w-full flex flex-col gap-5">
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between border-b-2 border-red-600 pb-1.5">
        <h2 className="text-slate-900 text-lg font-black font-['Montserrat'] uppercase tracking-wide flex items-center gap-2">
          <span>BERITA TERKINI</span>
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
        </h2>
        <span className="text-[11px] font-black text-red-600 uppercase font-['Montserrat']">
          LATEST FEED
        </span>
      </div>

      {/* BATCH 1: Vertical List (Articles 1-3) */}
      <div className="flex flex-col gap-4">
        {firstBatch.map((item) => (
          <article
            key={item.id}
            className="flex flex-col sm:flex-row gap-3.5 items-start group border-b border-gray-200 pb-4 last:border-b-0"
          >
            <div className="relative w-full sm:w-52 h-36 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 shadow-sm border border-gray-200">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col justify-between py-0.5 flex-1 h-full gap-1.5">
              <div className="flex flex-col gap-1">
                <span className="text-red-600 text-[10px] font-black font-['Montserrat'] uppercase tracking-wider">
                  {item.category}
                </span>
                <Link href={`/berita/${item.slug || item.id}`}>
                  <h3 className="text-slate-900 group-hover:text-red-600 text-sm sm:text-base font-bold font-['Montserrat'] leading-snug transition-colors">
                    {item.title}
                  </h3>
                </Link>
                {item.excerpt && (
                  <p className="text-gray-600 text-xs font-['Montserrat'] line-clamp-2 leading-relaxed">
                    {item.excerpt}
                  </p>
                )}
              </div>
              <span className="text-gray-400 text-[10px] font-['Montserrat'] mt-1 flex items-center gap-1">
                <i className="far fa-clock"></i>
                {item.date}
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* 🔴 DARK THEME BLOCK 1: "FOKUS PERISTIWA" (In-between after item 3) */}
      {darkBlock1Items.length > 0 && (
        <div className="my-2 bg-slate-900 rounded-lg p-4 flex flex-col gap-3 shadow-md border border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-red-500 text-xs sm:text-sm font-black font-['Montserrat'] uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-red-600 rounded-full"></span>
              FOKUS PERISTIWA SUKABUMI
            </h3>
            <span className="text-[10px] text-gray-400 font-['Montserrat'] uppercase font-bold">
              SOROTAN
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {darkBlock1Items.map((item) => (
              <div
                key={item.id}
                className="bg-slate-800/90 hover:bg-slate-800 rounded-md p-2.5 flex flex-col gap-2 transition-colors border border-slate-700/60 group"
              >
                <div className="relative w-full h-28 bg-slate-700 rounded overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-red-400 text-[10px] font-black font-['Montserrat'] uppercase">
                  {item.category}
                </span>
                <Link href={`/berita/${item.slug || item.id}`}>
                  <h4 className="text-white text-xs font-bold font-['Montserrat'] line-clamp-2 leading-snug group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h4>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BATCH 2: Vertical List (Articles 4-6) */}
      {secondBatch.length > 0 && (
        <div className="flex flex-col gap-4">
          {secondBatch.map((item) => (
            <article
              key={item.id}
              className="flex flex-col sm:flex-row gap-3.5 items-start group border-b border-gray-200 pb-4 last:border-b-0"
            >
              <div className="relative w-full sm:w-52 h-36 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 shadow-sm border border-gray-200">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col justify-between py-0.5 flex-1 h-full gap-1.5">
                <div className="flex flex-col gap-1">
                  <span className="text-red-600 text-[10px] font-black font-['Montserrat'] uppercase tracking-wider">
                    {item.category}
                  </span>
                  <Link href={`/berita/${item.slug || item.id}`}>
                    <h3 className="text-slate-900 group-hover:text-red-600 text-sm sm:text-base font-bold font-['Montserrat'] leading-snug transition-colors">
                      {item.title}
                    </h3>
                  </Link>
                  {item.excerpt && (
                    <p className="text-gray-600 text-xs font-['Montserrat'] line-clamp-2 leading-relaxed">
                      {item.excerpt}
                    </p>
                  )}
                </div>
                <span className="text-gray-400 text-[10px] font-['Montserrat'] mt-1 flex items-center gap-1">
                  <i className="far fa-clock"></i>
                  {item.date}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* 🔴 DARK THEME BLOCK 2: "KABAR PARLEMEN & RAGAM" (In-between after item 6) */}
      {darkBlock2Items.length > 0 && (
        <div className="my-2 bg-slate-950 rounded-lg p-4 flex flex-col gap-3 shadow-md border border-slate-900">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-red-500 text-xs sm:text-sm font-black font-['Montserrat'] uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-red-600 rounded-full"></span>
              PARLEMEN & RAGAM SUKABUMI
            </h3>
            <span className="text-[10px] text-gray-400 font-['Montserrat'] uppercase font-bold">
              RAGAM
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {darkBlock2Items.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 hover:bg-slate-850 rounded-md p-2.5 flex flex-col gap-2 transition-colors border border-slate-800 group"
              >
                <div className="relative w-full h-28 bg-slate-800 rounded overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-red-400 text-[10px] font-black font-['Montserrat'] uppercase">
                  {item.category}
                </span>
                <Link href={`/berita/${item.slug || item.id}`}>
                  <h4 className="text-white text-xs font-bold font-['Montserrat'] line-clamp-2 leading-snug group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h4>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BATCH 3: Vertical List (Articles 7+) */}
      {thirdBatch.length > 0 && (
        <div className="flex flex-col gap-4">
          {thirdBatch.map((item) => (
            <article
              key={item.id}
              className="flex flex-col sm:flex-row gap-3.5 items-start group border-b border-gray-200 pb-4 last:border-b-0"
            >
              <div className="relative w-full sm:w-52 h-36 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 shadow-sm border border-gray-200">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col justify-between py-0.5 flex-1 h-full gap-1.5">
                <div className="flex flex-col gap-1">
                  <span className="text-red-600 text-[10px] font-black font-['Montserrat'] uppercase tracking-wider">
                    {item.category}
                  </span>
                  <Link href={`/berita/${item.slug || item.id}`}>
                    <h3 className="text-slate-900 group-hover:text-red-600 text-sm sm:text-base font-bold font-['Montserrat'] leading-snug transition-colors">
                      {item.title}
                    </h3>
                  </Link>
                  {item.excerpt && (
                    <p className="text-gray-600 text-xs font-['Montserrat'] line-clamp-2 leading-relaxed">
                      {item.excerpt}
                    </p>
                  )}
                </div>
                <span className="text-gray-400 text-[10px] font-['Montserrat'] mt-1 flex items-center gap-1">
                  <i className="far fa-clock"></i>
                  {item.date}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

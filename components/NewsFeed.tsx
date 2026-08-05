import Link from "next/link";
import { LiveArticle } from "@/lib/wp";

interface NewsFeedProps {
  articles: LiveArticle[];
}

export default function NewsFeed({ articles }: NewsFeedProps) {
  if (!articles || articles.length === 0) {
    return (
      <div className="w-full p-8 text-center bg-gray-50 border border-gray-200 rounded-xl text-gray-500 font-['Montserrat']">
        Belum ada berita terbaru yang dapat ditampilkan.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b-2 border-red-600 pb-2">
        <h2 className="text-slate-900 text-xl font-black font-['Montserrat'] uppercase tracking-wide flex items-center gap-2">
          <span>BERITA TERKINI</span>
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
        </h2>
        <span className="text-xs font-bold text-red-600 uppercase font-['Montserrat']">
          LIVE FEED
        </span>
      </div>

      {/* Vertical Articles List */}
      <div className="flex flex-col gap-6">
        {articles.map((item) => (
          <article
            key={item.id}
            className="flex flex-col sm:flex-row gap-4 items-start group border-b border-gray-100 pb-5 last:border-b-0"
          >
            {/* Thumbnail */}
            <div className="relative w-full sm:w-60 h-40 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content Body */}
            <div className="flex flex-col justify-between py-0.5 flex-1 h-full gap-2">
              <div className="flex flex-col gap-1.5">
                <span className="text-red-600 text-xs font-extrabold font-['Montserrat'] uppercase tracking-wider">
                  {item.category}
                </span>
                <Link href={`/berita/${item.slug || item.id}`}>
                  <h3 className="text-slate-900 group-hover:text-red-600 text-base sm:text-lg font-bold font-['Montserrat'] leading-snug transition-colors">
                    {item.title}
                  </h3>
                </Link>
                {item.excerpt && (
                  <p className="text-gray-600 text-xs font-['Montserrat'] line-clamp-2 leading-relaxed">
                    {item.excerpt}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 text-gray-400 text-[11px] font-['Montserrat'] mt-2">
                <i className="far fa-clock"></i>
                <span>{item.date}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

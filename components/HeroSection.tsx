import Image from "next/image";
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
  const sideHeadlines = articles.slice(1, 3);
  const subHeadlines = articles.slice(3, 7);

  return (
    <section className="w-full mb-8 flex flex-col gap-4">
      {/* Top Main Grid: 1 Large Hero Card + 2 Stacked Side Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Featured Hero Card */}
        {mainHeadline && (
          <div className="lg:col-span-2 bg-slate-900 rounded-xl overflow-hidden shadow-lg flex flex-col group border border-slate-800">
            <div className="relative w-full aspect-[16/9] min-h-[280px] sm:min-h-[360px] bg-slate-800">
              <Image
                src={mainHeadline.image}
                alt={mainHeadline.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 750px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-5 md:p-6 bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col gap-2 border-t border-slate-800">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-red-600 text-white text-xs font-black font-['Montserrat'] px-3 py-1 uppercase rounded tracking-wider shadow">
                  {mainHeadline.category}
                </span>
                <span className="text-gray-400 text-xs font-medium font-['Montserrat']">
                  • {mainHeadline.date}
                </span>
              </div>

              <Link href={mainHeadline.link} target="_blank">
                <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-extrabold font-['Montserrat'] leading-snug group-hover:text-red-400 transition-colors">
                  {mainHeadline.title}
                </h1>
              </Link>

              {mainHeadline.excerpt && (
                <p className="text-gray-300 text-xs sm:text-sm font-['Montserrat'] line-clamp-2 leading-relaxed">
                  {mainHeadline.excerpt}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Side Stacked Headline Cards */}
        <div className="flex flex-col gap-4">
          {sideHeadlines.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col group flex-1"
            >
              <div className="relative w-full h-44 bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4 flex flex-col gap-1.5 flex-1 justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-red-600 text-xs font-bold font-['Montserrat'] uppercase">
                    {item.category}
                  </span>
                  <Link href={item.link} target="_blank">
                    <h2 className="text-slate-900 group-hover:text-red-600 font-bold font-['Montserrat'] text-sm sm:text-base leading-snug transition-colors line-clamp-2">
                      {item.title}
                    </h2>
                  </Link>
                </div>
                <span className="text-gray-400 text-[11px] font-['Montserrat'] mt-2">
                  {item.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sub-headline Grid Row (4 Cards) */}
      {subHeadlines.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {subHeadlines.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col group"
            >
              <div className="relative w-full h-28 sm:h-32 bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 250px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3 flex flex-col gap-1 flex-1 justify-between">
                <span className="text-red-600 text-[10px] font-extrabold font-['Montserrat'] uppercase">
                  {item.category}
                </span>
                <Link href={item.link} target="_blank">
                  <h3 className="text-slate-900 group-hover:text-red-600 font-bold font-['Montserrat'] text-xs leading-snug transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

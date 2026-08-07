import { use } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { fetchLiveArticles, LiveArticle } from "@/lib/wp";
import { articles as localArticles } from "@/lib/articles";

export const revalidate = 60;

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const cleanSlug = decodeURIComponent(slug || "").toLowerCase().trim();
  const categoryTitle = cleanSlug.replace(/-/g, " ").toUpperCase();

  // Fetch live articles or fallback to local
  const liveArticles = await fetchLiveArticles();
  
  // Filter or generate articles for category
  const matchingArticles = liveArticles.filter(
    (a) => a.category?.toLowerCase().includes(cleanSlug) || cleanSlug.includes(a.category?.toLowerCase() || "")
  );

  const displayList: LiveArticle[] =
    matchingArticles.length >= 3
      ? matchingArticles
      : [
          ...matchingArticles,
          ...localArticles.map((item, idx) => ({
            id: idx + 200,
            slug: item.slug,
            link: `/berita/${item.slug}`,
            title: item.title,
            category: categoryTitle,
            date: item.date,
            image: item.image,
            excerpt: item.content[0] || "Berita terbaru dan terpercaya seputar Sukabumi dan sekitarnya.",
          })),
        ].slice(0, 7);

  return (
    <div className="min-h-screen bg-slate-100/50 flex flex-col font-['Montserrat',sans-serif]">
      {/* Header Navigation */}
      <Header />

      {/* Main Container Layout */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 w-full py-6 flex-1">
        {/* Breadcrumb Navigation */}
        <div className="text-sm font-bold mb-4 flex items-center gap-1.5 font-['Montserrat']">
          <Link href="/" className="text-red-600 hover:underline">
            Home
          </Link>
          <span className="text-gray-400 font-normal">/</span>
          <span className="text-gray-500 font-normal">Kategori</span>
          <span className="text-gray-400 font-normal">/</span>
          <span className="text-blue-700 uppercase font-bold">{categoryTitle}</span>
        </div>

        {/* 12-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* KOLOM KIRI (lg:col-span-8) - List View Berita */}
          <div className="lg:col-span-8 flex flex-col bg-white p-6 border border-gray-200 shadow-xs">
            {/* Header Kategori */}
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 border-b border-gray-200 pb-3 mb-6 font-['Montserrat']">
              <span className="border-b-4 border-red-600 pb-3 uppercase text-red-600 mr-2">
                KATEGORI:
              </span>
              <span className="uppercase text-slate-900">{categoryTitle}</span>
            </h1>

            {/* List View Kartu Berita */}
            <div className="flex flex-col divide-y divide-gray-200">
              {displayList.map((article, idx) => {
                const articleSlug = article.slug || `berita-${article.id}`;
                const articleImg = article.image.startsWith("http")
                  ? article.image
                  : `https://wsrv.nl/?url=${encodeURIComponent(article.image)}`;

                return (
                  <article
                    key={`${article.id}-${idx}`}
                    className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-5 group cursor-pointer"
                  >
                    {/* Thumbnail Gambar di Sebelah Kiri */}
                    <Link
                      href={`/berita/${articleSlug}`}
                      className="w-full sm:w-56 h-40 sm:h-36 rounded-lg overflow-hidden shrink-0 bg-gray-100 border border-gray-200 block"
                    >
                      <img
                        src={articleImg}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>

                    {/* Konten Teks di Sebelah Kanan */}
                    <div className="flex flex-col flex-1 justify-between gap-1.5">
                      <div>
                        {/* Tag Kategori Merah Uppercase */}
                        <span className="text-[11px] font-bold text-red-600 uppercase tracking-wide">
                          {article.category || categoryTitle}
                        </span>

                        {/* Judul Berita */}
                        <Link href={`/berita/${articleSlug}`}>
                          <h2 className="text-base sm:text-lg font-bold text-black leading-snug group-hover:text-red-600 transition-colors line-clamp-2 mt-1 mb-2 font-['Montserrat']">
                            {article.title}
                          </h2>
                        </Link>
                      </div>

                      {/* Cuplikan Teks Artikel */}
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed font-['Montserrat']">
                        {article.excerpt ||
                          "Informasi terkini dan liputan mendalam seputar perkembangan wilayah Kabupaten Sukabumi."}
                      </p>

                      {/* Metadata Tanggal & Jam */}
                      <div className="text-[11px] text-gray-400 font-medium flex items-center gap-2 mt-2 pt-2 border-t border-gray-100">
                        <i className="far fa-clock text-red-500"></i>
                        <span>{article.date}</span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* KOLOM KANAN (lg:col-span-4) - Sidebar Kanan Sticky */}
          <div className="lg:col-span-4 flex flex-col gap-8 font-['Montserrat'] sticky top-8 self-start">
            <Sidebar popularArticles={liveArticles} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface LiveArticleDetail {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
  contentHtml: string;
  excerpt: string;
}

function decodeHTMLEntities(text: string): string {
  if (!text) return "";
  return text
    .replace(/<[^>]*>/g, "")
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    )
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#8211;/g, "-")
    .replace(/&#8212;/g, "—")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#038;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function formatIndonesianDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;

    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const dayName = days[d.getDay()];
    const dateNum = d.getDate();
    const monthName = months[d.getMonth()];
    const year = d.getFullYear();
    const hours = d.getHours().toString().padStart(2, "0");
    const minutes = d.getMinutes().toString().padStart(2, "0");

    return `${dayName}, ${dateNum} ${monthName} ${year} - ${hours}:${minutes} WIB`;
  } catch {
    return isoString;
  }
}

export default function BeritaDetailPage() {
  const params = useParams();
  const rawSlug = params?.slug;
  const slugParam = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug || "";

  const [article, setArticle] = useState<LiveArticleDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function loadPost() {
      if (!slugParam) return;
      setLoading(true);
      setNotFound(false);

      try {
        let apiUrl = `https://jurnalsukabumi.com/wp-json/wp/v2/posts?slug=${encodeURIComponent(
          slugParam
        )}&_embed`;

        // If numeric ID passed
        if (/^\d+$/.test(slugParam)) {
          apiUrl = `https://jurnalsukabumi.com/wp-json/wp/v2/posts/${slugParam}?_embed`;
        }

        const res = await fetch(apiUrl);
        if (!res.ok) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        const data = await res.json();
        const item = Array.isArray(data) ? data[0] : data;

        if (!item || !item.id) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        let catName = "BERITA";
        if (item._embedded?.["wp:term"]?.[0]?.length > 0) {
          catName = item._embedded["wp:term"][0][0].name.toUpperCase();
        }

        let imgUrl =
          "https://placehold.co/790x430/dc2626/ffffff?text=Jurnal+Sukabumi";
        const media = item._embedded?.["wp:featuredmedia"]?.[0];
        if (media?.source_url) {
          imgUrl = media.source_url;
        }

        setArticle({
          id: item.id,
          title: decodeHTMLEntities(item.title?.rendered || ""),
          category: catName,
          date: formatIndonesianDate(item.date),
          image: imgUrl,
          contentHtml: item.content?.rendered || "",
          excerpt: decodeHTMLEntities(item.excerpt?.rendered || ""),
        });
      } catch (e) {
        console.error("Failed to load post:", e);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [slugParam]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col font-['Montserrat',sans-serif]">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-12 flex-1 w-full space-y-6">
          <div className="h-8 w-32 bg-gray-200 animate-pulse rounded" />
          <div className="h-12 w-full bg-gray-200 animate-pulse rounded" />
          <div className="h-6 w-48 bg-gray-200 animate-pulse rounded" />
          <div className="w-full aspect-video bg-gray-200 animate-pulse rounded-xl" />
          <div className="space-y-3 pt-4">
            <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
            <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
            <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <div className="min-h-screen bg-white flex flex-col font-['Montserrat',sans-serif]">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-16 text-center flex-1">
          <h1 className="text-3xl font-black text-slate-900 mb-2">
            Artikel Tidak Ditemukan
          </h1>
          <p className="text-gray-600 mb-6 text-sm">
            Maaf, berita yang Anda cari tidak dapat dimuat atau telah dipindahkan.
          </p>
          <Link
            href="/"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors shadow"
          >
            Kembali ke Beranda
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Montserrat',sans-serif]">
      <Header />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-5xl mx-auto px-4 text-xs font-semibold text-gray-500 flex items-center gap-2">
          <Link href="/" className="text-red-600 hover:underline">
            Home
          </Link>
          <span>/</span>
          <span className="text-red-600">{article.category}</span>
          <span>/</span>
          <span className="line-clamp-1 text-gray-800">{article.title}</span>
        </div>
      </div>

      {/* Main Article Detail */}
      <main className="max-w-4xl w-full mx-auto px-4 py-8 flex-1 bg-white my-6 border border-gray-200 rounded-xl shadow-sm">
        <article className="flex flex-col gap-5">
          <div>
            <span className="inline-block bg-red-600 text-white text-xs font-black uppercase px-3 py-1 rounded tracking-wider mb-2">
              {article.category}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold mt-3 pt-3 border-t border-gray-100">
              <i className="far fa-clock text-red-600"></i>
              <span>{article.date}</span>
              <span>• Redaksi Jurnal Sukabumi</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="w-full aspect-[16/9] bg-gray-100 rounded-xl overflow-hidden shadow-md">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Body Content */}
          <div
            className="prose max-w-none text-slate-800 text-sm sm:text-base leading-relaxed space-y-4 pt-2 font-['Montserrat']"
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />

          {/* Share Buttons */}
          <div className="border-t border-gray-200 pt-6 mt-6 flex items-center gap-3">
            <span className="text-xs font-bold uppercase text-gray-600">
              Bagikan Berita:
            </span>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.href : ""
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs hover:opacity-90"
            >
              <i className="fab fa-facebook-f" />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                article.title
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs hover:opacity-90"
            >
              <i className="fab fa-x-twitter" />
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                article.title
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs hover:opacity-90"
            >
              <i className="fab fa-whatsapp" />
            </a>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

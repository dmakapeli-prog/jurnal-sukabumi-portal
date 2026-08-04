"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

/* ─── Types ─── */
interface Berita {
  id: number;
  judul: string;
  isi_berita: string;
  gambar_url: string;
  waktu_dibuat: string;
}

/* ─── Helpers ─── */
function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];
  const hh = d.getHours().toString().padStart(2, "0");
  const mm = d.getMinutes().toString().padStart(2, "0");
  return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} - ${hh}:${mm} WIB`;
}

/* ─── Social Media Icons ─── */
const socialIcons = [
  { icon: "fab fa-facebook", label: "Facebook" },
  { icon: "fab fa-x-twitter", label: "Twitter" },
  { icon: "fab fa-instagram", label: "Instagram" },
  { icon: "fab fa-youtube", label: "YouTube" },
  { icon: "fab fa-tiktok", label: "TikTok" },
  { icon: "fab fa-linkedin", label: "LinkedIn" },
  { icon: "fab fa-pinterest", label: "Pinterest" },
];

const footerSocialIcons = [
  { icon: "fab fa-facebook-f", label: "Facebook" },
  { icon: "fab fa-x-twitter", label: "Twitter" },
  { icon: "fab fa-instagram", label: "Instagram" },
  { icon: "fab fa-youtube", label: "YouTube" },
  { icon: "fab fa-tiktok", label: "TikTok" },
  { icon: "fab fa-linkedin-in", label: "LinkedIn" },
  { icon: "fab fa-pinterest-p", label: "Pinterest" },
];

/* ─── Navigation Categories ─── */
const navLinks = [
  { label: "HOME", href: "/" },
  { label: "PERISTIWA" },
  { label: "POLITIK" },
  { label: "HUKUM" },
  { label: "NASIONAL" },
  { label: "PARLEMEN" },
  { label: "EKONOMI" },
  { label: "WISATA" },
  { label: "RAGAM" },
  { label: "SOSOK" },
  { label: "OPINI" },
  { label: "GERBANG DESA" },
  { label: "PENDIDIKAN" },
  { label: "RELIGI" },
  { label: "VIDEO" },
];

/* ═══════════════════════════════════════════
   BERITA DETAIL PAGE
   ═══════════════════════════════════════════ */
export default function BeritaDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [article, setArticle] = useState<Berita | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Berita[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);

  useEffect(() => {
    async function fetchArticle() {
      try {
        // Extract id from slug format: "1-jalan-tol-bocimi..."
        const idMatch = slug.match(/^(\d+)-/);
        if (!idMatch) {
          setNotFoundState(true);
          setLoading(false);
          return;
        }
        const articleId = parseInt(idMatch[1], 10);

        // Fetch the article
        const { data, error } = await supabase
          .from("berita")
          .select("*")
          .eq("id", articleId)
          .single();

        if (error || !data) {
          setNotFoundState(true);
          setLoading(false);
          return;
        }

        setArticle(data);

        // Fetch related articles (exclude current)
        const { data: related } = await supabase
          .from("berita")
          .select("*")
          .neq("id", articleId)
          .order("waktu_dibuat", { ascending: false })
          .limit(3);

        setRelatedArticles(related || []);
      } catch {
        setNotFoundState(true);
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [slug]);

  /* ─── Loading State ─── */
  if (loading) {
    return (
      <>
        <HeaderComponent />
        <div className="max-w-[1152px] mx-auto px-4 md:px-8 py-8">
          <div className="lg:max-w-[66%] space-y-6">
            <div className="h-8 w-32 bg-surface-container animate-pulse rounded" />
            <div className="h-12 w-full bg-surface-container animate-pulse rounded" />
            <div className="h-6 w-64 bg-surface-container animate-pulse rounded" />
            <div className="w-full aspect-video bg-surface-container animate-pulse rounded-xl" />
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-5 w-full bg-surface-container animate-pulse rounded" />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  /* ─── Not Found State ─── */
  if (notFoundState || !article) {
    return (
      <>
        <HeaderComponent />
        <div className="max-w-[1152px] mx-auto px-4 md:px-8 py-16 text-center">
          <span className="material-symbols-outlined text-7xl text-on-surface-variant/30 mb-4 block">
            search_off
          </span>
          <h1 className="font-[Roboto] text-[28px] font-extrabold mb-2">
            Artikel Tidak Ditemukan
          </h1>
          <p className="text-on-surface-variant mb-6">
            Maaf, berita yang Anda cari tidak tersedia atau telah dihapus.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Kembali ke Beranda
          </Link>
        </div>
      </>
    );
  }

  /* Split content into paragraphs */
  const paragraphs = article.isi_berita
    .split(/\n\n|\n/)
    .filter((p) => p.trim().length > 0);

  return (
    <>
      <HeaderComponent />

      {/* ═══ BREADCRUMB ═══ */}
      <div className="max-w-[1152px] mx-auto px-4 md:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm font-[Roboto]">
          <Link href="/" className="text-primary hover:underline font-medium">
            Home
          </Link>
          <span className="text-on-surface-variant">/</span>
          <span className="text-primary font-medium">Berita</span>
          <span className="text-on-surface-variant">/</span>
          <span className="text-on-surface-variant line-clamp-1 max-w-xs">
            {article.judul}
          </span>
        </nav>
      </div>

      {/* ═══ MAIN ARTICLE CONTENT ═══ */}
      <main className="max-w-[1152px] mx-auto px-4 md:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ─── Article Body (8 cols) ─── */}
          <article className="lg:col-span-8">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block bg-primary text-on-primary px-4 py-1.5 text-xs font-bold uppercase rounded-md tracking-wider">
                Berita
              </span>
            </div>

            {/* Title */}
            <h1 className="font-[Roboto] text-[28px] md:text-[36px] font-extrabold leading-tight text-on-surface mb-4">
              {article.judul}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-outline-variant">
              <div className="flex items-center gap-2 text-on-surface-variant">
                <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                <time className="font-[Roboto] text-[13px]">
                  {formatDate(article.waktu_dibuat)}
                </time>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant">
                <span className="material-symbols-outlined text-[18px]">person</span>
                <span className="font-[Roboto] text-[13px]">Redaksi Jurnal Sukabumi</span>
              </div>
            </div>

            {/* Cover Image */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8 shadow-lg">
              <img
                src={article.gambar_url}
                alt={article.judul}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-white/80 text-xs font-[Roboto] italic">
                  Ilustrasi — {article.judul}
                </p>
              </div>
            </div>

            {/* Share Bar */}
            <div className="flex items-center gap-3 mb-8 p-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
              <span className="font-[Roboto] text-[12px] font-bold text-on-surface-variant uppercase tracking-wider mr-2">
                Bagikan:
              </span>
              <button className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-80 transition-opacity">
                <i className="fab fa-facebook-f text-sm" />
              </button>
              <button className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:opacity-80 transition-opacity">
                <i className="fab fa-x-twitter text-sm" />
              </button>
              <button className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-80 transition-opacity">
                <i className="fab fa-whatsapp text-sm" />
              </button>
              <button className="w-9 h-9 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-80 transition-opacity">
                <i className="fab fa-linkedin-in text-sm" />
              </button>
              <button className="w-9 h-9 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-outline-variant">
                <span className="material-symbols-outlined text-[18px]">link</span>
              </button>
            </div>

            {/* Article Body Text */}
            <div className="prose-article space-y-5">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="font-[Roboto] text-[16px] leading-[1.85] text-on-surface"
                >
                  {index === 0 ? (
                    <>
                      <span className="font-extrabold text-primary">
                        {paragraph.split(" ").slice(0, 2).join(" ")}
                      </span>{" "}
                      — {paragraph.split(" ").slice(2).join(" ")}
                    </>
                  ) : (
                    paragraph
                  )}
                </p>
              ))}
            </div>

            {/* Tags */}
            <div className="mt-10 pt-6 border-t border-outline-variant">
              <h3 className="font-[Roboto] text-[12px] font-bold text-on-surface-variant uppercase tracking-wider mb-3">
                Topik Terkait
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Berita", "Sukabumi", "Terkini"].map((tag) => (
                  <Link
                    key={tag}
                    href="#"
                    className="bg-white border border-outline-variant px-3 py-1 rounded-full text-xs font-bold hover:bg-primary hover:text-white transition-all uppercase tracking-wider"
                  >
                    # {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Author Box */}
            <div className="mt-8 p-6 bg-surface-container-low rounded-xl border border-outline-variant/30 flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-primary text-[28px]">person</span>
              </div>
              <div>
                <h4 className="font-[Roboto] text-[14px] font-bold text-on-surface mb-1">
                  Redaksi Jurnal Sukabumi
                </h4>
                <p className="font-[Roboto] text-[13px] text-on-surface-variant leading-relaxed">
                  Tim redaksi Jurnal Sukabumi berkomitmen menyajikan berita
                  terkini, akurat, dan berimbang dari Sukabumi dan sekitarnya.
                </p>
              </div>
            </div>
          </article>

          {/* ─── Sidebar (4 cols) ─── */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Related Articles */}
            <div className="bg-white rounded-lg shadow-sm border border-outline-variant p-6">
              <h2 className="font-[Roboto] text-[20px] font-bold mb-6 uppercase border-b-2 border-primary pb-2 inline-block">
                Berita Terkait
              </h2>
              <div className="space-y-5">
                {relatedArticles.map((item) => (
                  <Link
                    key={item.id}
                    href={`/berita/${item.id}-${toSlug(item.judul)}`}
                    className="group flex gap-4 cursor-pointer"
                  >
                    <div className="w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.gambar_url}
                        alt={item.judul}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-primary font-[Roboto] text-[10px] font-bold uppercase">
                        Berita
                      </span>
                      <h4 className="text-sm font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2 mt-1">
                        {item.judul}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Ad / Announcement Widget */}
            <div className="bg-surface-container rounded-lg p-1">
              <img
                className="w-full rounded shadow-sm"
                alt="Pengumuman resmi"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyd2DLvJgN3AcqqVcig0yWzehg0RyhjBvMv0VFtTL02aG9MSfrXGO69lzGqXR_goYBcKgAsDdSXZuktCab8Aiw4t4g39lkMxvBrRJ9PXxlJI1rgvJ96pf0qCBkMs9W1jUTI_KCwqHRoR_-APNOJvXhFXIqYvOXo6dkNk6u_AT_hFOfvvdt7UTMysNUhR_2kudpBhQjwvHNkK7lle3IV3h2IsMEXHxBdDxQf3_u9g6snySyD5OQGAnq"
              />
            </div>

            {/* Topic Tags */}
            <div className="bg-surface-container-high rounded-lg p-6">
              <h2 className="font-[Roboto] text-[20px] font-bold mb-4 uppercase">
                Topik Terkini
              </h2>
              <div className="flex flex-wrap gap-2">
                {["Ekonomi", "Politik", "Wisata", "Peristiwa", "Ragam"].map((tag) => (
                  <Link
                    key={tag}
                    className="bg-white border border-outline-variant px-3 py-1 rounded-full text-xs font-bold hover:bg-primary hover:text-white transition-all uppercase tracking-wider"
                    href="#"
                  >
                    # {tag}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="w-full border-t-4 border-primary mt-6 bg-primary">
        <div className="max-w-[1152px] mx-auto py-12 px-4 md:px-8 flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-6 max-w-sm">
            <div className="font-[Roboto] text-[24px] font-extrabold text-on-primary uppercase tracking-tighter leading-[1.2]">
              Jurnal Sukabumi
            </div>
            <p className="text-white/90 text-sm">
              Media informasi digital terdepan di Sukabumi, menyajikan berita
              terkini, akurat, dan terpercaya dengan menjunjung tinggi
              integritas jurnalistik.
            </p>
            <div className="flex gap-4">
              {footerSocialIcons.map((s) => (
                <Link
                  key={s.label}
                  className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                  href="#"
                  aria-label={s.label}
                >
                  <i className={s.icon} />
                </Link>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-4">
            <div>
              <h5 className="text-white font-[Roboto] text-[12px] font-bold uppercase mb-4">Perusahaan</h5>
              <ul className="space-y-2">
                <li><Link className="text-white/80 hover:text-white hover:underline text-sm" href="#">Tentang Kami</Link></li>
                <li><Link className="text-white/80 hover:text-white hover:underline text-sm" href="#">Redaksi</Link></li>
                <li><Link className="text-white/80 hover:text-white hover:underline text-sm" href="#">Karir</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-[Roboto] text-[12px] font-bold uppercase mb-4">Kebijakan</h5>
              <ul className="space-y-2">
                <li><Link className="text-white/80 hover:text-white hover:underline text-sm" href="#">Pedoman Siber</Link></li>
                <li><Link className="text-white/80 hover:text-white hover:underline text-sm" href="#">Privacy Policy</Link></li>
                <li><Link className="text-white/80 hover:text-white hover:underline text-sm" href="#">Kontak</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-[1152px] mx-auto px-4 md:px-8 py-6 border-t border-surface-variant/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-[12px] text-white/60 font-[Roboto]">© 2024 Jurnal Sukabumi. Member of Media Group.</span>
          <div className="flex gap-6 text-xs text-white/60 font-bold">
            <Link className="hover:text-white" href="#">FACEBOOK</Link>
            <Link className="hover:text-white" href="#">INSTAGRAM</Link>
            <Link className="hover:text-white" href="#">TWITTER</Link>
            <Link className="hover:text-white" href="#">YOUTUBE</Link>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ═══════════════════════════════════════════
   HEADER COMPONENT (shared within page)
   ═══════════════════════════════════════════ */
function HeaderComponent() {
  return (
    <header className="sticky top-0 z-50 w-full bg-surface/95 backdrop-blur-sm px-4 md:px-8 border-b border-outline-variant transition-all duration-300 shadow-sm py-3">
      <div className="max-w-[1152px] mx-auto flex flex-col md:flex-row items-center justify-between py-3 gap-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="block w-auto h-16 flex-shrink-0">
            <img
              src="https://lh3.googleusercontent.com/aida/AP1WRLuFPJMz4sFr6yioqtitcvo_LNoktGbqKVKWOzqEFvAjS63m9HYsWJveyP3K_sjycMO8BGH9EG8YBNPQxWpHqy5lBhm6CWPfOPLiPYBUhD77j6Jr-MgpC96OzsdDWsrT3M5rKTnjqa3vwt4QR1wP8PFW7cGvoFUZVpflePpyvnTKqrIMGTXuwNp1etVhX6wtfxGL1PMbxYdBgwgoMvJVUgBghJRh2897Nhbo05IMITFS8ieVHFUZBkInhQ"
              alt="Jurnal Sukabumi Logo"
              className="h-full w-auto object-contain"
            />
          </Link>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0 md:w-64">
            <input
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Cari Berita..."
              type="text"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-primary">
              <span className="material-symbols-outlined">search</span>
            </button>
          </div>
          <div className="hidden md:flex items-center gap-3 mr-2">
            {socialIcons.map((s) => (
              <Link key={s.label} className="text-primary hover:opacity-80 transition-opacity" href="#" aria-label={s.label}>
                <i className={`${s.icon} text-lg`} />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <nav
        className="w-full bg-gradient-to-r from-[#b70100] to-[#e60000] rounded-md -mx-4 md:-mx-8 px-4 md:px-8"
        style={{ width: "calc(100% + 2rem)", marginLeft: "-1rem", marginRight: "-1rem" }}
      >
        <div className="max-w-[1152px] mx-auto overflow-x-auto no-scrollbar">
          <div className="flex items-center py-3 space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href || "#"}
                className="font-[Roboto] text-[11px] font-bold uppercase whitespace-nowrap transition-colors text-white/90 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

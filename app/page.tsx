"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes} Menit Lalu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} Jam Lalu`;
  const daysAgo = Math.floor(hours / 24);
  return `${daysAgo} Hari Lalu`;
}

function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trimEnd() + "...";
}

/* ─── Navigation Categories ─── */
const navLinks = [
  { label: "HOME", active: true },
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

/* ─── Topic Tags ─── */
const topicTags = ["Ekonomi", "Politik", "Wisata", "Peristiwa", "Ragam"];

/* ═══════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════ */
export default function Home() {
  const [beritaList, setBeritaList] = useState<Berita[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* Fetch berita from Supabase */
  useEffect(() => {
    async function fetchBerita() {
      try {
        const { data, error: sbError } = await supabase
          .from("berita")
          .select("*")
          .order("waktu_dibuat", { ascending: false });

        if (sbError) throw sbError;
        setBeritaList(data || []);
      } catch (err: unknown) {
        console.error("Gagal memuat berita:", err);
        setError("Gagal memuat berita. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    }
    fetchBerita();
  }, []);

  /* Scroll micro-interaction for header */
  useEffect(() => {
    const handler = () => {
      const header = document.querySelector("header");
      if (!header) return;
      if (window.scrollY > 10) {
        header.classList.add("py-2");
        header.classList.remove("py-3");
      } else {
        header.classList.add("py-3");
        header.classList.remove("py-2");
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* Split berita: first 3 for hero, rest for feed */
  const heroItems = beritaList.slice(0, 3);
  const feedItems = beritaList.slice(3);
  /* Popular sidebar uses first 3 by views/order */
  const popularItems = beritaList.slice(0, 3);

  return (
    <>
      {/* ═══ HEADER / TOP APP BAR ═══ */}
      <header className="sticky top-0 z-50 w-full bg-surface/95 backdrop-blur-sm px-4 md:px-8 border-b border-outline-variant transition-all duration-300 shadow-sm py-3">
        <div className="max-w-[1152px] mx-auto flex flex-col md:flex-row items-center justify-between py-3 gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-4">
            <Link href="#" className="block w-auto h-16 flex-shrink-0">
              <img
                src="https://lh3.googleusercontent.com/aida/AP1WRLuFPJMz4sFr6yioqtitcvo_LNoktGbqKVKWOzqEFvAjS63m9HYsWJveyP3K_sjycMO8BGH9EG8YBNPQxWpHqy5lBhm6CWPfOPLiPYBUhD77j6Jr-MgpC96OzsdDWsrT3M5rKTnjqa3vwt4QR1wP8PFW7cGvoFUZVpflePpyvnTKqrIMGTXuwNp1etVhX6wtfxGL1PMbxYdBgwgoMvJVUgBghJRh2897Nhbo05IMITFS8ieVHFUZBkInhQ"
                alt="Jurnal Sukabumi Logo"
                className="h-full w-auto object-contain"
              />
            </Link>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="hidden lg:block text-on-surface-variant font-[Roboto] text-[12px] whitespace-nowrap mr-2">
              {new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
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
                <Link
                  key={s.label}
                  className="text-primary hover:opacity-80 transition-opacity"
                  href="#"
                  aria-label={s.label}
                >
                  <i className={`${s.icon} text-lg`} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ─── PITA NAVIGASI BERGRADASI MERAH ─── */}
        <nav
          className="w-full bg-gradient-to-r from-[#b70100] to-[#e60000] rounded-md -mx-4 md:-mx-8 px-4 md:px-8"
          style={{
            width: "calc(100% + 2rem)",
            marginLeft: "-1rem",
            marginRight: "-1rem",
          }}
        >
          <div className="max-w-[1152px] mx-auto overflow-x-auto no-scrollbar">
            <div className="flex items-center py-3 space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href="#"
                  className={`font-[Roboto] text-[11px] font-bold uppercase whitespace-nowrap transition-colors ${
                    link.active
                      ? "text-white border-b-2 border-white pb-1 hover:opacity-80"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* ═══ MAIN CONTENT ═══ */}
      <main className="max-w-[1152px] mx-auto px-4 md:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ─── Main Content Area (8 cols) ─── */}
          <div className="lg:col-span-8 space-y-6">

            {/* ─── LOADING STATE ─── */}
            {loading && (
              <>
                {/* Hero Skeleton */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto md:h-[500px]">
                  <div className="rounded-lg bg-surface-container animate-pulse h-[300px] md:h-full" />
                  <div className="grid grid-rows-2 gap-4">
                    <div className="rounded-lg bg-surface-container animate-pulse" />
                    <div className="rounded-lg bg-surface-container animate-pulse" />
                  </div>
                </section>
                {/* Feed Skeleton */}
                <section>
                  <div className="h-8 w-48 bg-surface-container animate-pulse rounded mb-6" />
                  <div className="space-y-4">
                    {[1, 2].map((i) => (
                      <div key={i} className="flex gap-6 p-4 bg-surface-container-lowest rounded-lg">
                        <div className="w-56 h-40 bg-surface-container animate-pulse rounded-lg flex-shrink-0" />
                        <div className="flex-1 space-y-3 py-4">
                          <div className="h-4 w-24 bg-surface-container animate-pulse rounded" />
                          <div className="h-6 w-full bg-surface-container animate-pulse rounded" />
                          <div className="h-4 w-3/4 bg-surface-container animate-pulse rounded" />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            {/* ─── ERROR STATE ─── */}
            {error && !loading && (
              <div className="bg-error-container text-on-error-container p-6 rounded-lg text-center">
                <span className="material-symbols-outlined text-4xl mb-2 block">error</span>
                <p className="font-[Roboto] font-bold">{error}</p>
              </div>
            )}

            {/* ─── CONTENT FROM SUPABASE ─── */}
            {!loading && !error && (
              <>
                {/* Hero Section (Bento Style) */}
                {heroItems.length > 0 && (
                  <section className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto md:h-[500px]">
                    {/* Primary Hero */}
                    <Link
                      href={`/berita/${heroItems[0].id}-${toSlug(heroItems[0].judul)}`}
                      className="relative rounded-lg overflow-hidden group h-[300px] md:h-full md:col-span-1 block"
                    >
                      <div className="absolute top-4 left-4 z-10 bg-primary text-on-primary px-3 py-1 text-xs font-bold uppercase rounded">
                        Headline
                      </div>
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt={heroItems[0].judul}
                        src={heroItems[0].gambar_url}
                      />
                      <div className="absolute inset-0 text-gradient-overlay flex flex-col justify-end p-6">
                        <span className="text-white/80 font-[Roboto] text-[12px] mb-2">
                          Headline • {timeAgo(heroItems[0].waktu_dibuat)}
                        </span>
                        <h2 className="text-white font-[Roboto] text-[24px] font-extrabold leading-tight group-hover:text-primary-fixed-dim transition-colors">
                          {heroItems[0].judul}
                        </h2>
                      </div>
                    </Link>

                    {/* Secondary Hero Grid */}
                    <div className="grid grid-rows-2 gap-4 md:col-span-1">
                      {heroItems.slice(1, 3).map((item) => (
                        <Link
                          key={item.id}
                          href={`/berita/${item.id}-${toSlug(item.judul)}`}
                          className="relative rounded-lg overflow-hidden group block"
                        >
                          <img
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            alt={item.judul}
                            src={item.gambar_url}
                          />
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all p-4 flex flex-col justify-end">
                            <h3 className="text-white font-[Roboto] text-[20px] font-bold leading-tight">
                              {item.judul}
                            </h3>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                {/* ─── Latest News Feed ─── */}
                {feedItems.length > 0 && (
                  <section>
                    <div className="mb-6 flex justify-between items-end border-b border-outline-variant pb-2">
                      <h2 className="font-[Roboto] text-[24px] font-extrabold uppercase tracking-tight section-title-accent leading-[1.2]">
                        Berita Terkini
                      </h2>
                      <Link
                        className="text-primary font-[Roboto] text-[12px] font-bold hover:underline"
                        href="#"
                      >
                        LIHAT SEMUA
                      </Link>
                    </div>
                    <div className="space-y-6">
                      {feedItems.map((item) => (
                        <Link
                          key={item.id}
                          href={`/berita/${item.id}-${toSlug(item.judul)}`}
                          className="block"
                        >
                          <article className="flex flex-col md:flex-row gap-6 p-4 bg-surface-container-lowest rounded-lg hover:shadow-md transition-shadow group">
                            <div className="w-full md:w-56 h-40 flex-shrink-0 overflow-hidden rounded-lg">
                              <img
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                alt={item.judul}
                                src={item.gambar_url}
                              />
                            </div>
                            <div className="flex flex-col justify-center">
                              <span className="text-primary font-[Roboto] text-[12px] font-bold mb-1 uppercase">
                                Berita
                              </span>
                              <h3 className="font-[Roboto] text-[20px] font-bold leading-[1.3] mb-2 group-hover:text-primary transition-colors">
                                {item.judul}
                              </h3>
                              <p className="text-on-surface-variant text-sm line-clamp-2 mb-3">
                                {truncate(item.isi_berita, 150)}
                              </p>
                              <span className="text-text-muted font-[Roboto] text-[12px]">
                                {formatDate(item.waktu_dibuat)}
                              </span>
                            </div>
                          </article>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                {/* ─── Empty State ─── */}
                {beritaList.length === 0 && (
                  <div className="text-center py-16 text-on-surface-variant">
                    <span className="material-symbols-outlined text-6xl mb-4 block opacity-40">newspaper</span>
                    <p className="font-[Roboto] text-lg font-bold">Belum ada berita</p>
                    <p className="text-sm mt-1">Berita akan muncul di sini setelah ditambahkan ke database.</p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* ─── Sidebar (4 cols) ─── */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Ad / Announcement Widget */}
            <div className="bg-surface-container rounded-lg p-1">
              <img
                className="w-full rounded shadow-sm"
                alt="Pengumuman resmi"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyd2DLvJgN3AcqqVcig0yWzehg0RyhjBvMv0VFtTL02aG9MSfrXGO69lzGqXR_goYBcKgAsDdSXZuktCab8Aiw4t4g39lkMxvBrRJ9PXxlJI1rgvJ96pf0qCBkMs9W1jUTI_KCwqHRoR_-APNOJvXhFXIqYvOXo6dkNk6u_AT_hFOfvvdt7UTMysNUhR_2kudpBhQjwvHNkK7lle3IV3h2IsMEXHxBdDxQf3_u9g6snySyD5OQGAnq"
              />
            </div>

            {/* ─── Popular News Widget ─── */}
            <div className="bg-white rounded-lg shadow-sm border border-outline-variant p-6">
              <h2 className="font-[Roboto] text-[20px] font-bold mb-6 uppercase border-b-2 border-primary pb-2 inline-block">
                Populer
              </h2>
              <div className="space-y-6">
                {loading
                  ? [1, 2, 3].map((i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="w-12 h-14 bg-surface-container animate-pulse rounded" />
                        <div className="flex-1 space-y-2 pt-1">
                          <div className="h-4 bg-surface-container animate-pulse rounded w-full" />
                          <div className="h-3 bg-surface-container animate-pulse rounded w-1/3" />
                        </div>
                      </div>
                    ))
                  : popularItems.map((item, index) => (
                      <Link
                        key={item.id}
                        href={`/berita/${item.id}-${toSlug(item.judul)}`}
                        className="flex items-start gap-4 group cursor-pointer"
                      >
                        <div className="text-6xl font-black text-[#8b0000] leading-none group-hover:text-primary transition-colors select-none flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="pt-1">
                          <h4 className="text-sm font-bold leading-tight group-hover:text-primary">
                            {item.judul}
                          </h4>
                          <span className="text-text-muted text-[10px] uppercase mt-1 block">
                            {timeAgo(item.waktu_dibuat)}
                          </span>
                        </div>
                      </Link>
                    ))}
              </div>
            </div>

            {/* Topic Tags */}
            <div className="bg-surface-container-high rounded-lg p-6">
              <h2 className="font-[Roboto] text-[20px] font-bold mb-4 uppercase">
                Topik Terkini
              </h2>
              <div className="flex flex-wrap gap-2">
                {topicTags.map((tag) => (
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

            {/* National Section */}
            <div>
              <h2 className="font-[Roboto] text-[20px] font-bold mb-4 uppercase border-l-4 border-primary pl-3">
                Nasional
              </h2>
              <div className="space-y-4">
                {loading ? (
                  <div className="space-y-4">
                    <div className="h-32 bg-surface-container animate-pulse rounded-lg" />
                    <div className="h-4 bg-surface-container animate-pulse rounded w-3/4" />
                  </div>
                ) : beritaList.length > 0 ? (
                  <>
                    <Link
                      href={`/berita/${beritaList[0].id}-${toSlug(beritaList[0].judul)}`}
                      className="group cursor-pointer block"
                    >
                      <img
                        className="w-full h-32 object-cover rounded-lg mb-2"
                        alt={beritaList[0].judul}
                        src={beritaList[0].gambar_url}
                      />
                      <h4 className="text-sm font-bold leading-snug group-hover:text-primary">
                        {beritaList[0].judul}
                      </h4>
                      <span className="text-text-muted text-[10px]">
                        {formatDate(beritaList[0].waktu_dibuat)}
                      </span>
                    </Link>
                    {beritaList.length > 1 && (
                      <Link
                        href={`/berita/${beritaList[1].id}-${toSlug(beritaList[1].judul)}`}
                        className="border-t border-outline-variant pt-3 group cursor-pointer block"
                      >
                        <h4 className="text-sm font-bold leading-snug group-hover:text-primary">
                          {beritaList[1].judul}
                        </h4>
                        <span className="text-text-muted text-[10px]">
                          {formatDate(beritaList[1].waktu_dibuat)}
                        </span>
                      </Link>
                    )}
                  </>
                ) : null}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="w-full border-t-4 border-primary mt-6 bg-primary">
        <div className="max-w-[1152px] mx-auto py-12 px-4 md:px-8 flex flex-col md:flex-row justify-between items-start gap-12">
          {/* Brand & Info */}
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

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-4">
            <div>
              <h5 className="text-white font-[Roboto] text-[12px] font-bold uppercase mb-4">
                Perusahaan
              </h5>
              <ul className="space-y-2">
                <li>
                  <Link
                    className="text-white/80 hover:text-white hover:underline decoration-white transition-all text-sm"
                    href="#"
                  >
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-white/80 hover:text-white hover:underline decoration-white transition-all text-sm"
                    href="#"
                  >
                    Redaksi
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-white/80 hover:text-white hover:underline decoration-white transition-all text-sm"
                    href="#"
                  >
                    Karir
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-[Roboto] text-[12px] font-bold uppercase mb-4">
                Kebijakan
              </h5>
              <ul className="space-y-2">
                <li>
                  <Link
                    className="text-white/80 hover:text-white hover:underline decoration-white transition-all text-sm"
                    href="#"
                  >
                    Pedoman Siber
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-white/80 hover:text-white hover:underline decoration-white transition-all text-sm"
                    href="#"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-white/80 hover:text-white hover:underline decoration-white transition-all text-sm"
                    href="#"
                  >
                    Kontak
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-[1152px] mx-auto px-4 md:px-8 py-6 border-t border-surface-variant/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-[12px] text-white/60 font-[Roboto]">
            © 2024 Jurnal Sukabumi. Member of Media Group.
          </span>
          <div className="flex gap-6 text-xs text-white/60 font-bold">
            <Link className="hover:text-white" href="#">
              FACEBOOK
            </Link>
            <Link className="hover:text-white" href="#">
              INSTAGRAM
            </Link>
            <Link className="hover:text-white" href="#">
              TWITTER
            </Link>
            <Link className="hover:text-white" href="#">
              YOUTUBE
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "HOME", href: "/", active: true },
  { label: "PERISTIWA", href: "#" },
  { label: "POLITIK", href: "#" },
  { label: "HUKUM", href: "#" },
  { label: "NASIONAL", href: "#" },
  { label: "PARLEMEN", href: "#" },
  { label: "EKBIS", href: "#" },
  { label: "WISATA", href: "#" },
  { label: "RAGAM", href: "#" },
  { label: "SOSOK", href: "#" },
  { label: "OPINI", href: "#" },
  { label: "GERBANG DESA", href: "#" },
  { label: "PENDIDIKAN", href: "#" },
  { label: "RELIGI", href: "#" },
  { label: "VIDEO", href: "#" },
];

const socialIcons = [
  {
    type: "facebook",
    icon: "fab fa-facebook-f",
    label: "Facebook",
    href: "https://www.facebook.com/jurnalsukabumi",
    colorClass: "text-[#1877F2]",
    hoverBg: "hover:bg-[#1877F2]/10",
  },
  {
    type: "x-twitter",
    icon: "fab fa-x-twitter",
    label: "X (Twitter)",
    href: "#",
    colorClass: "text-black",
    hoverBg: "hover:bg-black/10",
  },
  {
    type: "instagram",
    icon: "fab fa-instagram",
    label: "Instagram",
    href: "https://www.instagram.com/jurnalsukabumi?igsh=d3gzZ255bnJ5Zm16",
    colorClass: "text-[#E4405F]",
    hoverBg: "hover:bg-[#E4405F]/10",
  },
  {
    type: "youtube",
    icon: "fab fa-youtube",
    label: "YouTube",
    href: "https://youtube.com/@jurnalsukabumi8744?si=rdz_4rQW42suiHY-",
    colorClass: "text-[#FF0000]",
    hoverBg: "hover:bg-[#FF0000]/10",
  },
  {
    type: "tiktok",
    icon: "fab fa-tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@jurnalsukabumi?_r=1&_t=ZS-98e4I26Mf22",
    colorClass: "text-black",
    hoverBg: "hover:bg-black/10",
  },
  {
    type: "linkedin",
    icon: "fab fa-linkedin-in",
    label: "LinkedIn",
    href: "#",
    colorClass: "text-[#0A66C2]",
    hoverBg: "hover:bg-[#0A66C2]/10",
  },
  {
    type: "pinterest",
    icon: "fab fa-pinterest-p",
    label: "Pinterest",
    href: "#",
    colorClass: "text-[#BD081C]",
    hoverBg: "hover:bg-[#BD081C]/10",
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrapbookOpen, setScrapbookOpen] = useState(false);
  const [savedItems, setSavedItems] = useState<any[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const todayDate = "Selasa, 4 Agustus 2026";

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const initialDark = savedTheme ? savedTheme === "dark" : prefersDark;

      setIsDarkMode(initialDark);
      if (initialDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch (err) {
      console.error("Gagal membaca preferensi theme:", err);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const nextMode = !prev;
      try {
        localStorage.setItem("theme", nextMode ? "dark" : "light");
      } catch (err) {
        console.error("Gagal menyimpan preferensi theme:", err);
      }

      if (nextMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      return nextMode;
    });
  };

  const syncScrapbook = () => {
    try {
      const stored = localStorage.getItem("scrapbook_jurnalsukabumi");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSavedItems(parsed);
        }
      } else {
        setSavedItems([]);
      }
    } catch (err) {
      console.error("Gagal membaca Scrapbook:", err);
    }
  };

  useEffect(() => {
    syncScrapbook();
    window.addEventListener("scrapbook_updated", syncScrapbook);
    window.addEventListener("storage", syncScrapbook);
    return () => {
      window.removeEventListener("scrapbook_updated", syncScrapbook);
      window.removeEventListener("storage", syncScrapbook);
    };
  }, []);

  const removeItem = (id: number | string) => {
    try {
      const updated = savedItems.filter((s) =>
        typeof s === "object" ? s.id !== id : s !== id
      );
      localStorage.setItem(
        "scrapbook_jurnalsukabumi",
        JSON.stringify(updated)
      );
      setSavedItems(updated);
      window.dispatchEvent(new Event("scrapbook_updated"));
    } catch (err) {
      console.error("Gagal menghapus dari Scrapbook:", err);
    }
  };

  const clearAll = () => {
    try {
      localStorage.removeItem("scrapbook_jurnalsukabumi");
      setSavedItems([]);
      window.dispatchEvent(new Event("scrapbook_updated"));
    } catch (err) {
      console.error("Gagal mengosongkan Scrapbook:", err);
    }
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      {/* BARIS 1: Logo (Kiri), Tanggal & Search + Scrapbook + DarkMode (Tengah), Social Media (Kanan) */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* KIRI: Logo Resmi Jurnal Sukabumi & Tombol Akses Mobile */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="https://jurnalsukabumi.com/wp-content/uploads/2025/11/cropped-Logo-jurnalsukabumi-2025-01.png"
              alt="Jurnal Sukabumi Logo Resmi"
              className="h-12 md:h-14 w-auto object-contain"
            />
          </Link>

          <div className="flex items-center gap-2 md:hidden">
            {/* Tombol Dark Mode Toggle di Mobile */}
            <button
              type="button"
              onClick={toggleDarkMode}
              aria-label={
                isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
              }
              title={isDarkMode ? "Mode Terang" : "Mode Gelap"}
              className="p-2 text-gray-700 hover:text-amber-500 transition-all transform hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center"
            >
              {isDarkMode ? (
                <svg
                  className="w-5 h-5 text-amber-400 hover:text-amber-300 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-gray-700 hover:text-amber-500 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            {/* Tombol Koleksi / Scrapbook di Mobile */}
            <button
              type="button"
              onClick={() => setScrapbookOpen(true)}
              aria-label="Buka Scrapbook Berita"
              className="relative p-2 text-gray-700 hover:text-red-600 focus:outline-none transition-colors"
              title="Koleksi Berita Disimpan"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              {savedItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {savedItems.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-red-600 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              <i
                className={`fas ${
                  mobileMenuOpen ? "fa-times" : "fa-bars"
                } text-2xl`}
              ></i>
            </button>
          </div>
        </div>

        {/* TENGAH: Tanggal, Form Pencarian, Scrapbook & Dark Mode (Desktop) */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-1 max-w-lg justify-center">
          <div className="text-gray-600 text-xs font-semibold font-['Montserrat'] whitespace-nowrap hidden sm:flex items-center gap-1.5">
            <i className="far fa-calendar-alt text-red-600"></i>
            <span>{todayDate}</span>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full sm:w-64 flex items-center relative"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari berita..."
              className="w-full bg-gray-100 border border-gray-300 rounded-full pl-4 pr-10 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600/40 focus:bg-white transition-all"
            />
            <button
              type="submit"
              className="absolute right-3 text-gray-400 hover:text-red-600"
              aria-label="Cari Berita"
            >
              <i className="fas fa-search text-xs"></i>
            </button>
          </form>

          {/* Tombol Dark Mode Toggle di Desktop */}
          <button
            type="button"
            onClick={toggleDarkMode}
            aria-label={
              isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
            }
            title={isDarkMode ? "Mode Terang" : "Mode Gelap"}
            className="hidden md:flex p-2 text-gray-700 hover:text-amber-500 transition-all transform hover:scale-110 active:scale-95 cursor-pointer items-center justify-center"
          >
            {isDarkMode ? (
              <svg
                className="w-5 h-5 text-amber-400 hover:text-amber-300 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-gray-700 hover:text-amber-500 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>

          {/* Tombol Akses Scrapbook di Desktop */}
          <button
            type="button"
            onClick={() => setScrapbookOpen(true)}
            aria-label="Buka Scrapbook Berita"
            className="hidden md:flex relative p-2 text-gray-700 hover:text-red-600 transition-colors items-center justify-center cursor-pointer group"
            title="Koleksi Berita Disimpan"
          >
            <svg
              className="w-6 h-6 text-gray-700 group-hover:text-red-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            {savedItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {savedItems.length}
              </span>
            )}
          </button>
        </div>

        {/* KANAN: Ikon Sosial Media Warna Resmi App */}
        <div className="hidden md:flex items-center gap-2">
          {socialIcons.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-8 h-8 rounded-full bg-gray-100 ${s.hoverBg} flex items-center justify-center transition-all hover:scale-110 shadow-xs border border-gray-200/80`}
              aria-label={s.label}
            >
              {s.type === "x-twitter" ? (
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="w-3.5 h-3.5 fill-black"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              ) : (
                <i className={`${s.icon} ${s.colorClass} text-sm`} />
              )}
            </a>
          ))}
        </div>
      </div>

      {/* BARIS 2: Background Merah Full Width - Menu Navigasi Horizontal */}
      <nav className="w-full bg-gradient-to-r from-red-600 to-black text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center overflow-x-auto no-scrollbar py-1 gap-0.5">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`px-3 py-2 text-xs font-black font-['Montserrat'] uppercase whitespace-nowrap transition-colors rounded hover:bg-red-700 ${
                  item.active
                    ? "bg-red-800 text-white shadow-inner"
                    : "text-white/95"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Collapsible Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-3 px-2 flex flex-col gap-2 border-t border-red-500">
              <div className="text-white text-xs font-medium pb-2 border-b border-red-500 px-2 flex items-center justify-between">
                <span>{todayDate}</span>
                <span className="text-[10px] bg-red-800 px-2 py-0.5 rounded font-bold uppercase">
                  Kategori
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {navLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 text-xs font-bold font-['Montserrat'] rounded text-center transition-colors ${
                      item.active
                        ? "bg-red-800 text-white"
                        : "bg-red-700/60 hover:bg-red-700"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="flex items-center justify-center gap-2 pt-3 border-t border-red-500 mt-2">
                {socialIcons.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center transition-transform hover:scale-110 shadow-sm"
                    aria-label={s.label}
                  >
                    {s.type === "x-twitter" ? (
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="w-3.5 h-3.5 fill-black"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    ) : (
                      <i className={`${s.icon} ${s.colorClass} text-sm`} />
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* MODAL / DRAWER SCRAPBOOK */}
      {scrapbookOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-xs transition-opacity">
          {/* Overlay click to close */}
          <div
            className="absolute inset-0"
            onClick={() => setScrapbookOpen(false)}
          />

          {/* Drawer Container */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 border-l border-gray-200">
            {/* Drawer Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-slate-900 text-white">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-red-500 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                </svg>
                <h3 className="font-extrabold text-sm sm:text-base font-['Montserrat'] tracking-wide uppercase">
                  Scrapbook Berita ({savedItems.length})
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setScrapbookOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-red-600 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Tutup Scrapbook"
              >
                <i className="fas fa-times text-sm"></i>
              </button>
            </div>

            {/* Drawer Content / List Berita */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {savedItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-3 text-center">
                  <svg
                    className="w-12 h-12 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                  <p className="text-sm font-medium font-['Montserrat'] text-gray-500">
                    Belum ada berita yang disimpan.
                  </p>
                  <span className="text-xs text-gray-400">
                    Klik ikon bookmark pada berita untuk mencatat ke koleksi Anda.
                  </span>
                </div>
              ) : (
                savedItems.map((item: any, idx: number) => {
                  const itemId = typeof item === "object" ? item.id : item;
                  const itemTitle =
                    typeof item === "object"
                      ? item.title
                      : `Berita #${itemId}`;
                  const itemImage =
                    typeof item === "object"
                      ? item.image
                      : "https://picsum.photos/seed/feed1/400/250";
                  const itemSlug =
                    typeof item === "object" ? item.slug : itemId;
                  const itemCategory =
                    typeof item === "object" ? item.category : "BERITA";

                  return (
                    <div
                      key={`${itemId}-${idx}`}
                      className="flex items-start gap-3 p-2.5 rounded border border-gray-200 hover:border-gray-300 bg-gray-50/60 hover:bg-white transition-all group relative"
                    >
                      {/* Thumbnail Gambar */}
                      <div className="w-20 h-16 flex-shrink-0 bg-gray-200 rounded overflow-hidden relative">
                        <img
                          src={itemImage}
                          alt={itemTitle}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>

                      {/* Judul & Detail */}
                      <div className="flex-1 min-w-0 flex flex-col gap-1 pr-6">
                        <span className="text-[10px] font-bold text-red-600 uppercase font-['Montserrat']">
                          {itemCategory}
                        </span>
                        <Link
                          href={`/berita/${itemSlug}`}
                          onClick={() => setScrapbookOpen(false)}
                          className="text-xs font-bold text-slate-900 hover:text-red-600 line-clamp-2 leading-snug font-['Montserrat'] transition-colors"
                        >
                          {itemTitle}
                        </Link>
                      </div>

                      {/* Tombol Hapus */}
                      <button
                        type="button"
                        onClick={() => removeItem(itemId)}
                        aria-label="Hapus Berita"
                        className="absolute right-2 top-2 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                        title="Hapus dari Scrapbook"
                      >
                        <i className="fas fa-trash-alt text-xs"></i>
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Drawer Footer */}
            {savedItems.length > 0 && (
              <div className="p-3.5 border-t border-gray-200 bg-gray-50 flex justify-between items-center text-xs text-gray-600">
                <span>
                  Total Disimpan: <strong>{savedItems.length}</strong> berita
                </span>
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-red-600 hover:underline font-semibold cursor-pointer"
                >
                  Hapus Semua
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

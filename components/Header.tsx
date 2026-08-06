"use client";

import { useState } from "react";
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

  const todayDate = "Selasa, 4 Agustus 2026";

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      {/* BARIS 1: Logo (Kiri), Tanggal & Search (Tengah), Social Media (Kanan) */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* KIRI: Logo Resmi Jurnal Sukabumi */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="https://jurnalsukabumi.com/wp-content/uploads/2025/11/cropped-Logo-jurnalsukabumi-2025-01.png"
              alt="Jurnal Sukabumi Logo Resmi"
              className="h-12 md:h-14 w-auto object-contain"
            />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-red-600 focus:outline-none"
            aria-label="Toggle Navigation"
          >
            <i className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"} text-2xl`}></i>
          </button>
        </div>

        {/* TENGAH: Tanggal & Form Pencarian */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-1 max-w-md justify-center">
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
                  item.active ? "bg-red-800 text-white shadow-inner" : "text-white/95"
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
                <span className="text-[10px] bg-red-800 px-2 py-0.5 rounded font-bold uppercase">Kategori</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {navLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 text-xs font-bold font-['Montserrat'] rounded text-center transition-colors ${
                      item.active ? "bg-red-800 text-white" : "bg-red-700/60 hover:bg-red-700"
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
    </header>
  );
}

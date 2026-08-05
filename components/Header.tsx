"use client";

import { useState } from "react";
import Link from "next/link";

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

const socialIcons = [
  { icon: "fab fa-facebook-f", label: "Facebook", href: "https://facebook.com" },
  { icon: "fab fa-x-twitter", label: "Twitter", href: "https://twitter.com" },
  { icon: "fab fa-instagram", label: "Instagram", href: "https://instagram.com" },
  { icon: "fab fa-youtube", label: "YouTube", href: "https://youtube.com" },
  { icon: "fab fa-tiktok", label: "TikTok", href: "https://tiktok.com" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const todayDate = "Selasa, 4 Agustus 2026";

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      {/* Top Bar Container */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand Text Logo & Mobile Drawer Toggle */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-red-600 text-white font-black text-2xl px-3 py-1 rounded-md shadow-md tracking-tighter">
              JS
            </div>
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-black font-['Montserrat'] tracking-tight text-slate-900 group-hover:text-red-600 transition-colors">
                JURNAL <span className="text-red-600">SUKABUMI</span>
              </span>
              <span className="text-[10px] font-extrabold text-gray-500 tracking-widest uppercase -mt-1 font-['Montserrat']">
                Media Informasi Digital Terpercaya • Jelas & Seimbang
              </span>
            </div>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-red-600 focus:outline-none"
            aria-label="Toggle Navigation"
          >
            <i className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"} text-2xl`}></i>
          </button>
        </div>

        {/* Date, Search Box & Social Icons */}
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          <div className="hidden lg:flex items-center gap-1.5 text-gray-600 text-xs font-semibold font-['Montserrat']">
            <i className="far fa-calendar-alt text-red-600"></i>
            <span>{todayDate}</span>
          </div>

          {/* Search Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex-1 md:w-64 flex items-center relative"
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

          {/* Social Links */}
          <div className="hidden md:flex items-center gap-2">
            {socialIcons.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-600 text-gray-600 hover:text-white flex items-center justify-center transition-colors text-xs"
                aria-label={s.label}
              >
                <i className={s.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Red Navigation Bar */}
      <nav className="bg-red-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center overflow-x-auto no-scrollbar py-1 gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href="#"
                className={`px-3 py-2 text-xs font-bold font-['Montserrat'] whitespace-nowrap transition-colors rounded hover:bg-red-700 ${
                  item.active ? "bg-red-800 text-white shadow-inner" : ""
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
                <span className="text-[10px] bg-red-800 px-2 py-0.5 rounded font-bold">KATEGORI</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {navLinks.map((item) => (
                  <Link
                    key={item.label}
                    href="#"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 text-xs font-bold font-['Montserrat'] rounded text-center transition-colors ${
                      item.active ? "bg-red-800 text-white" : "bg-red-700/60 hover:bg-red-700"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="flex items-center justify-center gap-3 pt-3 border-t border-red-500 mt-2">
                {socialIcons.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-red-700 hover:bg-red-800 text-white flex items-center justify-center transition-colors text-xs"
                    aria-label={s.label}
                  >
                    <i className={s.icon} />
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

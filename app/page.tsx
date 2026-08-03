"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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

/* ─── Popular News Data ─── */
const popularNews = [
  {
    rank: 1,
    title:
      "Suami Bongkar Dugaan Perselingkuhan di Kalibunder, Oknum Guru Dilaporkan",
    category: "Hukum",
  },
  {
    rank: 2,
    title: "Nyalip Bersamaan di Cibadak, Pengendara Motor Meninggal Dunia",
    category: "Peristiwa",
  },
  {
    rank: 3,
    title:
      "12 Lulusan Cumlaude PGSD UMMI Langsung Kantongi Beasiswa S2",
    category: "Pendidikan",
  },
];

/* ─── Topic Tags ─── */
const topicTags = ["Ekonomi", "Politik", "Wisata", "Peristiwa", "Ragam"];

/* ─── Wisata Cards Data ─── */
const wisataCards = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSx43BXmZmKj6fENTwI-BSPSDEKO6In6KFXT7m-0HSLEfID_ySM6i02t2vlD3K1hg8C4atDAMMAtYfo0T4P8bw-Jw6WrSm42wlbFttyXO8IpBqppib4IvqG90C_u-BgqsbjIrA7TNS9xwKtCjtYrwAS3k0XiMtlDnKEDu4YuVNczu9VHYu-S9ouKGbcwJeS6Lq3h40diDIBAvDIXA_B0SDonYqRVlM3TkL2sBzMV06tCXPBEemH7cb",
    title: "Desa Wisata Tegalega Disiapkan Jadi Magnet Baru Pariwisata",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDM30Wqmsh4_3Ues79OBpvk-MHng8QZFfDHzSZwLsz6g5ChCrX9R5nG1eGrv-fQY6jiT6JdIxRp4fi1yb1JUHCOofC4o9vvkgcRstk7QximbRNG8MDbMW9fGlIzJP2hXBlSAG-LMkUQu9TDG8rrYzT-XP7DaQYM-rPL3vpXMIhpB-1-UqS-fQgZahAWrmo-M77w9OTfwSs8akAIgzn36DnMs0LPAuCQwch_nuqArt5TEH5h8Yd3Ki67",
    title: "PENYU Cari Lokasi Ideal, Gadobangkong hingga Citepus Dibidik",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuArjMxzY2RFVxOIoJWlFN3RL7dX-tnyZ2c8oGnkYukTtpdH4kxHxU-bOd6vr1yeUKqqAZlbMlhuBQqNXzM4KqshppK_f6hPz21HqP6iUVc7ZWQ2ySduVMqAJOhqHZtO6S0KGcpr6L0D5cuVl-niLiS8vfKXfUT_yrt_pXwr_4DrqpVNBlbIgyLZtd9t94rQJ9Bu_lmpF3x4nIQTzJXfJzVhIxzcN7NqRX8P-vkXitIO4OtdppMcXoOI",
    title: "8 Tahun Padjadjaran Anyar, Menjaga Warisan Karuhun",
  },
];

/* ═══════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════ */
export default function Home() {
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
              Sabtu, 1 Agustus 2026
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
            {/* Hero Section (Bento Style) */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto md:h-[500px]">
              {/* Primary Hero */}
              <div className="relative rounded-lg overflow-hidden group h-[300px] md:h-full md:col-span-1">
                <div className="absolute top-4 left-4 z-10 bg-primary text-on-primary px-3 py-1 text-xs font-bold uppercase rounded">
                  Headline
                </div>
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Berangkat Esok, 52 Korban Kebakaran Ciptamulya Diundang KDM ke Lembur Pakuan"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzwXbFlxhoyep0b_sSKW48PYRZZg9DEFI8kOOBcy0Mv_s2rX6RihwQBdhvADo3R7U-V_Ev3s7k2LI1L7YI4nLapjkAW2zcB0TzcYzpAFemMPk5-HxG91eX5kFN9oTYaeNeP2g0Z6fDQOpMx5Yd8ZjaiJnMjh7HrFVr2L9XbyTNNqlXHsUXx3kOGFgmHHeaupmvRgI5Qg3gaHlvqOObglTXVFGsu-vrI5l-Jylr7t3nBcnRsDqQEDFg"
                />
                <div className="absolute inset-0 text-gradient-overlay flex flex-col justify-end p-6">
                  <span className="text-white/80 font-[Roboto] text-[12px] mb-2">
                    Headline • 1 Jam Lalu
                  </span>
                  <h2 className="text-white font-[Roboto] text-[24px] font-extrabold leading-tight group-hover:text-primary-fixed-dim transition-colors">
                    Berangkat Esok, 52 Korban Kebakaran Ciptamulya Diundang KDM
                    ke Lembur Pakuan
                  </h2>
                </div>
              </div>

              {/* Secondary Hero Grid */}
              <div className="grid grid-rows-2 gap-4 md:col-span-1">
                <div className="relative rounded-lg overflow-hidden group">
                  <div className="absolute top-3 left-3 z-10 bg-primary text-on-primary px-2 py-0.5 text-[10px] font-bold uppercase rounded">
                    Hukum
                  </div>
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="Rumah Dikepung Massa, Dugaan Pencabulan Oknum Guru Ngaji"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0LKv_19fmSmqib1M3iBH6dDexzSzP5DSv0vJKo-nNXDlDcrjSs902pS7lyAF7uj566X-zQV9pNFfk0HaQCClkATK-oAzcqiQ-B-C3HgyFMC7hUlq899Dhe3bQUqn5fFv9chBVi3VYb7lL_XsZeV14KhQBbmtmROeVYcgjL_IF-MstaS8j2E2br3yfW7_KGw_SZEdUS6WANHFQUhR5_zuzsN28u6UqZl1_efoSqjjj4lZfXw5sMIbt"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all p-4 flex flex-col justify-end">
                    <h3 className="text-white font-[Roboto] text-[20px] font-bold leading-tight">
                      Rumah Dikepung Massa, Dugaan Pencabulan Oknum Guru Ngaji
                      Gegerkan Warga Simpenan
                    </h3>
                  </div>
                </div>
                <div className="relative rounded-lg overflow-hidden group">
                  <div className="absolute top-3 left-3 z-10 bg-primary text-on-primary px-2 py-0.5 text-[10px] font-bold uppercase rounded">
                    Nasional
                  </div>
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="Kebutuhan Dasar Penyintas Ciptamulya Dipastikan Aman"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTkqqUSv5VZ29pTkviz2OC6peQC1griLqMRi-0QCTYnwtpDj4ycMZ_-OaKo5Clj-7dAOdjoPt2YPT29JiRF7nW85VC1xN-Raj1ImVO6KyP6AVjDs4slH11lhYUiTSdRJb0z0Kvpf5u8F31UfcDiV-Dwl6FPN83Na4ZoHMGAE-dI9p7hwqdjmkAf110-gWibHPrylebzClSF2YhhmMhP6gQfdO5gx3Tn4XpZxFJWJo3hXMJo3yLnvEh"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all p-4 flex flex-col justify-end">
                    <h3 className="text-white font-[Roboto] text-[20px] font-bold leading-tight">
                      Kebutuhan Dasar Penyintas Ciptamulya Dipastikan Aman
                    </h3>
                  </div>
                </div>
              </div>
            </section>

            {/* ─── Latest News Feed ─── */}
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
                {/* Feed Card 1 */}
                <article className="flex flex-col md:flex-row gap-6 p-4 bg-surface-container-lowest rounded-lg hover:shadow-md transition-shadow group">
                  <div className="w-full md:w-56 h-40 flex-shrink-0 overflow-hidden rounded-lg">
                    <img
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      alt="Warga Desa Cipanengah galang bantuan"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBq4_nZWQZ608UouSmYCATNnMX_a1yhCvMtaHJKNEm-Lp4kkVS_lG8xtsBpa5LeR_vcuRnPKQZ0PIufhMc7i3h5MIWcDkt-_C-PmU7oeaZivhRYaEQ7w04Pm2rHNElrqGgJwKxNHrpTdrxNkLp0A1vhKYSCjZTabZoy1zysQgMxtm76Vo0TY7h_0qMffSfllIUZeqTZflUVYbqffYCP8cT_ooE4EF0_yStWsq_yhsfGNGfCT9K-Y1RB"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-primary font-[Roboto] text-[12px] font-bold mb-1 uppercase">
                      Gerbang Desa
                    </span>
                    <h3 className="font-[Roboto] text-[20px] font-bold leading-[1.3] mb-2 group-hover:text-primary transition-colors">
                      Warga Desa Cipanengah Galang Bantuan untuk Korban
                      Kebakaran Kampung Adat Ciptamulya
                    </h3>
                    <p className="text-on-surface-variant text-sm line-clamp-2 mb-3">
                      Kegiatan gotong royong warga desa menunjukkan solidaritas
                      tinggi dalam membantu sesama yang tertimpa musibah...
                    </p>
                    <span className="text-text-muted font-[Roboto] text-[12px]">
                      Sabtu, 1 Agustus 2026 - 13:41 WIB
                    </span>
                  </div>
                </article>

                {/* Feed Card 2 */}
                <article className="flex flex-col md:flex-row gap-6 p-4 bg-surface-container-lowest rounded-lg hover:shadow-md transition-shadow group">
                  <div className="w-full md:w-56 h-40 flex-shrink-0 overflow-hidden rounded-lg">
                    <img
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      alt="Truk Kayu Terguling di Cibangban"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfctd_nTTiPyzBBVtf38_4euNGnWz7h2QtfX-2Czulb1UfPbvLMXBQPylEPTUwVApdCAQn8TjI2TQ5uFqnLF8JjXDjcqqEkseT7nuEwNMKZYIpKm6VxREF3B4dZeR77Ig1LzuWc-9ZNjAN_oaTXm9-Heensu0z9hdju5PbtmlYvlQOem3cda7m0PLlDDMO_HtNLd_zMzSlZvgHVeS9TkJX-IQ1QKgdTuD4AGvcEousbj8wRmqSM_AC"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-primary font-[Roboto] text-[12px] font-bold mb-1 uppercase">
                      Peristiwa
                    </span>
                    <h3 className="font-[Roboto] text-[20px] font-bold leading-[1.3] mb-2 group-hover:text-primary transition-colors">
                      Tak Kuat Menanjak, Truk Kayu Terguling di Cibangban
                      Sukabumi
                    </h3>
                    <p className="text-on-surface-variant text-sm line-clamp-2 mb-3">
                      Kecelakaan tunggal terjadi di tanjakan ekstrem Cibangban,
                      mengakibatkan arus lalu lintas tersendat selama
                      berjam-jam...
                    </p>
                    <span className="text-text-muted font-[Roboto] text-[12px]">
                      Sabtu, 1 Agustus 2026 - 13:37 WIB
                    </span>
                  </div>
                </article>
              </div>
            </section>

            {/* ─── Wisata Section ─── */}
            <section className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/30">
              <div className="mb-6 flex justify-between items-center">
                <h2 className="font-[Roboto] text-[24px] font-extrabold uppercase tracking-tight section-title-accent leading-[1.2]">
                  Wisata
                </h2>
                <div className="flex gap-2">
                  <button className="p-1 rounded-full border border-outline hover:bg-primary hover:text-white transition-all">
                    <span className="material-symbols-outlined">
                      chevron_left
                    </span>
                  </button>
                  <button className="p-1 rounded-full border border-outline hover:bg-primary hover:text-white transition-all">
                    <span className="material-symbols-outlined">
                      chevron_right
                    </span>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {wisataCards.map((card) => (
                  <div
                    key={card.title}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all group"
                  >
                    <div className="h-40 overflow-hidden">
                      <img
                        className="w-full h-full object-cover group-hover:scale-110 duration-500"
                        alt={card.title}
                        src={card.src}
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-primary font-[Roboto] text-[12px] font-bold mb-2 block">
                        WISATA
                      </span>
                      <h4 className="font-[Roboto] text-sm font-bold group-hover:text-primary transition-colors">
                        {card.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </section>
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

            {/* ─── Popular News Widget — ANGKA POPULER RAKSASA ─── */}
            <div className="bg-white rounded-lg shadow-sm border border-outline-variant p-6">
              <h2 className="font-[Roboto] text-[20px] font-bold mb-6 uppercase border-b-2 border-primary pb-2 inline-block">
                Populer
              </h2>
              <div className="space-y-6">
                {popularNews.map((item) => (
                  <div
                    key={item.rank}
                    className="flex items-start gap-4 group cursor-pointer"
                  >
                    <div className="text-6xl font-black text-[#8b0000] leading-none group-hover:text-primary transition-colors select-none flex-shrink-0">
                      {item.rank}
                    </div>
                    <div className="pt-1">
                      <h4 className="text-sm font-bold leading-tight group-hover:text-primary">
                        {item.title}
                      </h4>
                      <span className="text-text-muted text-[10px] uppercase mt-1 block">
                        {item.category}
                      </span>
                    </div>
                  </div>
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
                <div className="group cursor-pointer">
                  <img
                    className="w-full h-32 object-cover rounded-lg mb-2"
                    alt="Usung Perubahan di PWI Jabar"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbUuhv6EIYGO-Hpz6pLGIzwq4DFmZv6nlIrUebX6BgDlMwvRy8glb_gIPkmjqN6Jj3YtWJ9rO02MPVqwdCh4eU-BnRvuCKa81CSMd2xT-kj_JOcClGGWdf7E2LtDEfkDJjjYlbdRBq8xZbDFtfFygBboAWAfjLqzgYko0Ftg33oUz_T5Zp_V84Lw11vOP2jzeq1TFtL6pTHSCHhCnhIn6NoAXut3vMf-dXrp-yM7IRtJMpmEj4yWu3"
                  />
                  <h4 className="text-sm font-bold leading-snug group-hover:text-primary">
                    Usung Perubahan di PWI Jabar, Kang Andhy Tawarkan Program
                    Kesejahteraan
                  </h4>
                  <span className="text-text-muted text-[10px]">
                    31 Juli 2026
                  </span>
                </div>
                <div className="border-t border-outline-variant pt-3 group cursor-pointer">
                  <h4 className="text-sm font-bold leading-snug group-hover:text-primary">
                    Hergun Usul Kemendagri Luncurkan Program Wirausaha Pemula
                  </h4>
                  <span className="text-text-muted text-[10px]">
                    30 Juli 2026
                  </span>
                </div>
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

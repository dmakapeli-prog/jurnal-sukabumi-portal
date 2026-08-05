import Link from "next/link";

const footerSocials = [
  { icon: "fab fa-facebook-f", label: "Facebook", href: "https://facebook.com" },
  { icon: "fab fa-x-twitter", label: "Twitter", href: "https://twitter.com" },
  { icon: "fab fa-instagram", label: "Instagram", href: "https://instagram.com" },
  { icon: "fab fa-youtube", label: "YouTube", href: "https://youtube.com" },
  { icon: "fab fa-tiktok", label: "TikTok", href: "https://tiktok.com" },
  { icon: "fab fa-linkedin-in", label: "LinkedIn", href: "https://linkedin.com" },
];

const infoLinks = [
  { label: "Redaksi", href: "#" },
  { label: "Tentang Kami", href: "#" },
  { label: "Pedoman Media Siber", href: "#" },
];

const companyLinks = [
  { label: "Karir", href: "#" },
  { label: "Kontak", href: "#" },
  { label: "Kebijakan Privasi", href: "#" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-white mt-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="bg-red-600 text-white font-black text-xl px-2.5 py-1 rounded shadow">
                JS
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black font-['Montserrat'] tracking-tight text-white group-hover:text-red-500 transition-colors">
                  JURNAL <span className="text-red-500">SUKABUMI</span>
                </span>
                <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase -mt-1 font-['Montserrat']">
                  Jelas & Seimbang
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-xs font-['Montserrat'] leading-relaxed max-w-md mt-1">
              Jurnal Sukabumi adalah portal berita digital terdepan di Sukabumi, menyajikan berita terkini, akurat, dan terpercaya dengan menjunjung tinggi integritas jurnalistik.
            </p>
            <div className="flex items-center gap-2.5 mt-2">
              {footerSocials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-red-600 text-gray-300 hover:text-white flex items-center justify-center transition-colors text-xs"
                  aria-label={s.label}
                >
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Info Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-red-500 text-xs font-black font-['Montserrat'] uppercase tracking-wider">
              INFORMASI
            </h4>
            <ul className="flex flex-col gap-2">
              {infoLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white text-xs font-['Montserrat'] transition-colors flex items-center gap-1.5"
                  >
                    <i className="fas fa-chevron-right text-[9px] text-red-600"></i>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-red-500 text-xs font-black font-['Montserrat'] uppercase tracking-wider">
              PERUSAHAAN
            </h4>
            <ul className="flex flex-col gap-2">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white text-xs font-['Montserrat'] transition-colors flex items-center gap-1.5"
                  >
                    <i className="fas fa-chevron-right text-[9px] text-red-600"></i>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col md:flex-row items-center justify-between text-gray-500 text-xs font-['Montserrat'] gap-3">
          <p>© 2026 Jurnal Sukabumi. All Rights Reserved.</p>
          <p className="text-gray-500">Jelas & Seimbang</p>
        </div>
      </div>
    </footer>
  );
}

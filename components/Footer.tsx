import Link from "next/link";

const footerSocials = [
  { icon: "fab fa-facebook-f", label: "Facebook", href: "https://facebook.com" },
  { icon: "fab fa-x-twitter", label: "Twitter", href: "https://twitter.com" },
  { icon: "fab fa-instagram", label: "Instagram", href: "https://instagram.com" },
  { icon: "fab fa-youtube", label: "YouTube", href: "https://youtube.com" },
  { icon: "fab fa-tiktok", label: "TikTok", href: "https://tiktok.com" },
  { icon: "fab fa-linkedin-in", label: "LinkedIn", href: "https://linkedin.com" },
  { icon: "fab fa-pinterest-p", label: "Pinterest", href: "https://pinterest.com" },
];

const mediaNetworkLinks = [
  { label: "SUKABUMI TODAY", href: "#" },
  { label: "RADAR SUKABUMI", href: "#" },
  { label: "SUKABUMI UPDATE", href: "#" },
  { label: "KABAR SUKABUMI", href: "#" },
];

const navFooterLinks = [
  { label: "TENTANG KAMI", href: "#" },
  { label: "PEDOMAN MEDIA SIBER", href: "#" },
  { label: "REDAKSI", href: "#" },
  { label: "KARIR", href: "#" },
  { label: "KONTAK", href: "#" },
  { label: "KEBIJAKAN PRIVASI", href: "#" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-red-950 text-white mt-12 border-t-4 border-red-800">
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col items-center text-center gap-8">
        {/* 1. Gambar Logo Resmi Footer */}
        <div className="flex justify-center">
          <img
            src="https://jurnalsukabumi.com/wp-content/uploads/2025/11/Logo-Footer.png"
            alt="Logo Footer Resmi Jurnal Sukabumi"
            className="h-14 md:h-16 w-auto object-contain"
          />
        </div>

        {/* 2. Ikon Sosial Media (Background Bulat) */}
        <div className="flex items-center justify-center flex-wrap gap-3">
          {footerSocials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-red-600 text-white flex items-center justify-center transition-colors text-xs shadow-sm"
              aria-label={s.label}
            >
              <i className={s.icon} />
            </a>
          ))}
        </div>

        {/* 3. Teks "MEDIA NETWORK" + Link Partner */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-[11px] font-black tracking-widest text-red-300 uppercase font-['Montserrat']">
            MEDIA NETWORK
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-bold font-['Montserrat'] text-gray-300">
            {mediaNetworkLinks.map((partner) => (
              <a
                key={partner.label}
                href={partner.href}
                className="hover:text-white transition-colors"
              >
                {partner.label}
              </a>
            ))}
          </div>
        </div>

        {/* 4. Garis Pembatas Horizontal */}
        <div className="w-full max-w-4xl border-t border-red-900/80 my-1"></div>

        {/* 5. Link Navigasi (TENTANG KAMI / PEDOMAN MEDIA SIBER / dll) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-bold font-['Montserrat'] text-gray-200 uppercase">
          {navFooterLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="hover:text-red-400 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* 6. Copyright Text */}
        <div className="text-[11px] font-['Montserrat'] text-gray-400 mt-2">
          <p>© 2026 Jurnal Sukabumi. All Rights Reserved. Jelas & Seimbang.</p>
        </div>
      </div>
    </footer>
  );
}

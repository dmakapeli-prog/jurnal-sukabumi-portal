"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";

const relatedNews = [
  "Dewan Batman Desak Pemkab Sukabumi Sanksi Tegas Oknum Kades Terlibat Narkoba",
  "Tes Urine Serentak, Belasan Perangkat Desa di Ciemas Diperiksa BNN",
  "Ciemas Darurat Narkoba, Tokoh Masyarakat Minta Kepolisian Tindak Tegas Jaringan Pengedar",
  "Pemkab Sukabumi Siapkan Pj Kades Gantikan Oknum Kades Tamanjaya",
  "DPRD Sukabumi Dorong Pembentukan Perda Pencegahan Narkoba di Tingkat Desa",
  "Satresnarkoba Polres Sukabumi Kembangkan Kasus Sabu Kades Tamanjaya",
];

export default function BeritaDetailPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-['Montserrat',sans-serif]">
      <Header />

      <main className="max-w-7xl w-full mx-auto px-4 py-6 flex-1">
        {/* 1. GRID UTAMA (Membagi Konten Kiri col-span-8 dan Sidebar Kanan col-span-4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* KONTEN KIRI (lg:col-span-8) */}
          <div className="lg:col-span-8 flex flex-col">
            
            {/* BAGIAN ATAS (Full Width di dalam area Konten Kiri col-span-8) */}
            {/* Breadcrumb Navigation */}
            <nav className="text-xs font-bold text-gray-500 mb-2 flex items-center gap-1.5 uppercase font-['Montserrat']">
              <Link href="/" className="text-gray-700 hover:text-red-600 transition-colors">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-red-600 font-extrabold">PARLEMEN</span>
            </nav>

            {/* Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-3 font-['Montserrat']">
              Oknum Kades Tamanjaya Positif Sabu, Dewan Batman Soroti Ciemas Darurat Narkoba
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 border-b border-gray-200 pb-3 mb-3 font-['Montserrat']">
              <span className="inline-flex items-center gap-1 font-bold text-slate-800">
                Redaksi
                <svg className="w-4 h-4 text-blue-500 fill-current" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                </svg>
              </span>
              <span>|</span>
              <span>Kamis, 6 Agustus 2026 - 19:30 WIB</span>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-2 mb-4">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-xs hover:opacity-90 transition-opacity"
                title="Facebook"
              >
                <i className="fab fa-facebook-f" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs hover:opacity-90 transition-opacity"
                title="X (Twitter)"
              >
                <i className="fab fa-x-twitter" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center text-xs hover:opacity-90 transition-opacity"
                title="WhatsApp"
              >
                <i className="fab fa-whatsapp" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#0088cc] text-white flex items-center justify-center text-xs hover:opacity-90 transition-opacity"
                title="Telegram"
              >
                <i className="fab fa-telegram" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#00B900] text-white flex items-center justify-center text-xs hover:opacity-90 transition-opacity"
                title="Line"
              >
                <i className="fab fa-line" />
              </a>
              <button
                className="w-8 h-8 rounded-full bg-gray-600 text-white flex items-center justify-center text-xs hover:opacity-90 transition-opacity"
                title="Copy Link"
              >
                <i className="fas fa-link" />
              </button>
            </div>

            {/* Gambar Utama (100% Full Width dari area col-span-8) */}
            <div className="w-full aspect-[16/9] bg-gray-100 overflow-hidden border border-gray-200 mb-4">
              <img
                src="https://wsrv.nl/?url=jurnalsukabumi.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-18-at-19.28.45-1-e1784378099703.jpeg"
                alt="Dewan Batman Soroti Ciemas Darurat Narkoba"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1575320181282-9afab399332c?w=800&auto=format&fit=crop&q=80";
                }}
              />
            </div>

            {/* BAGIAN BAWAH: INNER GRID DI BAWAH GAMBAR */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* KIRI BAWAH (lg:col-span-4): BERITA TERKAIT */}
              <aside className="lg:col-span-4 bg-white border-t-2 border-red-600 pt-2">
                <h3 className="text-slate-900 text-sm font-black uppercase tracking-wide mb-2 font-['Montserrat']">
                  Berita Terkait
                </h3>
                <div className="flex flex-col border-t border-gray-200">
                  {relatedNews.map((item, idx) => (
                    <Link
                      key={idx}
                      href="#"
                      className="text-xs text-gray-600 hover:text-red-600 py-2.5 border-b border-gray-200 leading-snug font-medium transition-colors"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </aside>

              {/* KANAN BAWAH (lg:col-span-8): TOMBOL TEXT A A A & ISI BERITA & FOOTER & TAGS */}
              <article className="lg:col-span-8 flex flex-col">
                {/* Tombol Teks "A A A" Rata Kanan Tepat Di Bawah Gambar / Di Atas Teks */}
                <div className="flex items-center justify-end gap-1.5 mb-3 text-gray-600 font-bold font-['Montserrat']">
                  <span className="text-[10px] cursor-pointer hover:text-red-600 transition-colors px-2 py-0.5 border border-gray-200 rounded bg-white">
                    A
                  </span>
                  <span className="text-xs cursor-pointer hover:text-red-600 transition-colors px-2 py-0.5 border border-gray-200 rounded bg-white">
                    A
                  </span>
                  <span className="text-sm cursor-pointer hover:text-red-600 transition-colors px-2 py-0.5 border border-gray-200 rounded bg-white">
                    A
                  </span>
                </div>

                {/* Isi Berita */}
                <div className="prose max-w-none text-slate-800 text-sm sm:text-base leading-relaxed sm:leading-loose space-y-5 font-['Montserrat'] text-justify">
                  <p>
                    <span className="font-bold text-red-600">JURNALSUKABUMI.COM - </span>
                    Anggota DPRD Kabupaten Sukabumi, H. Ujang Abdurohim yang akrab disapa Dewan Batman, angkat suara prihatin mendalam atas terungkapnya kasus oknum Kepala Desa (Kades) Tamanjaya, Kecamatan Ciemas, yang terbukti positif menggunakan narkotika jenis sabu.
                  </p>
                  <p>
                    Menurut Dewan Batman, kejadian ini menjadi tamparan keras bagi jajaran pemerintahan daerah serta mempertegas kondisi bahwa wilayah Kecamatan Ciemas dan sekitarnya sudah memasuki kondisi darurat penyalahgunaan narkoba.
                  </p>
                  <p>
                    "Seorang kepala desa seharusnya menjadi pengayom dan teladan utama bagi masyarakat. Ketika figur pemimpin desa justru terjerat barang haram ini, kita tidak boleh tinggal diam. Ini sinyal kuat bahwa Ciemas sudah darurat narkoba," ujar Dewan Batman saat ditemui wartawan di gedung DPRD Kabupaten Sukabumi.
                  </p>
                  <p>
                    Ia meminta aparat penegak hukum (APH) dari Kepolisian dan BNN untuk mengusut tuntas jaringan peredarannya hingga ke akar-akarnya, serta melakukan tes urine secara berkala kepada seluruh aparatur pemerintahan desa di Kabupaten Sukabumi guna menjaga integritas instansi publik.
                  </p>
                </div>

                {/* Footer Berita */}
                <div className="border-t border-gray-200 mt-6 pt-4 text-xs font-bold text-slate-900 font-['Montserrat']">
                  Reporter: Ilham Nugraha | Redaktur: Ujang Herlan
                </div>

                {/* Tags */}
                <div className="bg-gray-100 border border-gray-200 p-3.5 mt-4 rounded-none">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold font-['Montserrat']">
                    <span className="text-gray-500 font-normal">TAGS:</span>
                    <span className="bg-white border border-gray-300 text-slate-800 px-2.5 py-1 rounded-none hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors cursor-pointer">
                      #DPRD
                    </span>
                    <span className="bg-white border border-gray-300 text-slate-800 px-2.5 py-1 rounded-none hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors cursor-pointer">
                      #Sukabumi
                    </span>
                    <span className="bg-white border border-gray-300 text-slate-800 px-2.5 py-1 rounded-none hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors cursor-pointer">
                      #Ciemas
                    </span>
                    <span className="bg-white border border-gray-300 text-slate-800 px-2.5 py-1 rounded-none hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors cursor-pointer">
                      #Narkoba
                    </span>
                    <span className="bg-white border border-gray-300 text-slate-800 px-2.5 py-1 rounded-none hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors cursor-pointer">
                      #Tamanjaya
                    </span>
                  </div>
                </div>
              </article>

            </div>

          </div>

          {/* SIDEBAR KANAN (lg:col-span-4) */}
          <div className="lg:col-span-4">
            <Sidebar />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}



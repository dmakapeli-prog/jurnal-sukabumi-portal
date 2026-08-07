"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import { articles as localArticles } from "@/lib/articles";

interface ArticleDetail {
  title: string;
  category: string;
  date: string;
  image: string;
  contentHtml?: string;
  paragraphs?: string[];
  tags: string[];
  relatedNews: string[];
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

const defaultRelatedNews = [
  "Dewan Batman Desak Pemkab Sukabumi Sanksi Tegas Oknum Kades Terlibat Narkoba",
  "Tes Urine Serentak, Belasan Perangkat Desa di Ciemas Diperiksa BNN",
  "Ciemas Darurat Narkoba, Tokoh Masyarakat Minta Kepolisian Tindak Tegas Jaringan Pengedar",
  "Pemkab Sukabumi Siapkan Pj Kades Gantikan Oknum Kades Tamanjaya",
  "DPRD Sukabumi Dorong Pembentukan Perda Pencegahan Narkoba di Tingkat Desa",
  "Satresnarkoba Polres Sukabumi Kembangkan Kasus Sabu Kades Tamanjaya",
];

const knownArticlesMap: Record<string, ArticleDetail> = {
  "oknum-kades-tamanjaya-positif-sabu-dewan-batman-soroti-ciemas-darurat-narkoba": {
    title: "Oknum Kades Tamanjaya Positif Sabu, Dewan Batman Soroti Ciemas Darurat Narkoba",
    category: "PARLEMEN",
    date: "Kamis, 6 Agustus 2026 - 19:30 WIB",
    image: "https://wsrv.nl/?url=jurnalsukabumi.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-18-at-19.28.45-1-e1784378099703.jpeg",
    paragraphs: [
      "Anggota DPRD Kabupaten Sukabumi, H. Ujang Abdurohim yang akrab disapa Dewan Batman, angkat suara prihatin mendalam atas terungkapnya kasus oknum Kepala Desa (Kades) Tamanjaya, Kecamatan Ciemas, yang terbukti positif menggunakan narkotika jenis sabu.",
      "Menurut Dewan Batman, kejadian ini menjadi tamparan keras bagi jajaran pemerintahan daerah serta mempertegas kondisi bahwa wilayah Kecamatan Ciemas dan sekitarnya sudah memasuki kondisi darurat penyalahgunaan narkoba.",
      "\"Seorang kepala desa seharusnya menjadi pengayom dan teladan utama bagi masyarakat. Ketika figur pemimpin desa justru terjerat barang haram ini, kita tidak boleh tinggal diam. Ini sinyal kuat bahwa Ciemas sudah darurat narkoba,\" ujar Dewan Batman saat ditemui wartawan di gedung DPRD Kabupaten Sukabumi.",
      "Ia meminta aparat penegak hukum (APH) dari Kepolisian dan BNN untuk mengusut tuntas jaringan peredarannya hingga ke akar-akarnya, serta melakukan tes urine secara berkala kepada seluruh aparatur pemerintahan desa di Kabupaten Sukabumi guna menjaga integritas instansi publik."
    ],
    tags: ["#DPRD", "#Sukabumi", "#Ciemas", "#Narkoba", "#Tamanjaya"],
    relatedNews: defaultRelatedNews,
  },
  "oknum-kades-tamanjaya-positif-sabu-pemkab-sukabumi-siapkan-sanksi-tegas": {
    title: "Oknum Kades Tamanjaya Positif Sabu, Pemkab Sukabumi Siapkan Sanksi Tegas",
    category: "PERISTIWA",
    date: "Senin, 3 Agustus 2026 - 14:45 WIB",
    image: "https://wsrv.nl/?url=jurnalsukabumi.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-18-at-19.28.45-1-e1784378099703.jpeg",
    paragraphs: [
      "Pemerintah Kabupaten Sukabumi memberikan respon tegas terkait hasil pemeriksaan kepolisian yang menyatakan oknum Kepala Desa Tamanjaya, Kecamatan Ciemas, positif mengonsumsi narkotika jenis sabu.",
      "Sekretaris Daerah (Sekda) Kabupaten Sukabumi menyatakan bahwa instansinya tidak akan mentolerir segala bentuk pelanggaran hukum berat yang dilakukan oleh aparatur desa.",
      "\"Proses sanksi administratif hingga pemberhentian sementara dari jabatan kades sedang diproses sesuai ketentuan peraturan perundang-undangan yang berlaku. Kita menyerahkan sepenuhnya proses hukum kepada aparat Kepolisian,\" tegas Sekda.",
      "Saat ini, Dinas Pemberdayaan Masyarakat dan Desa (DPMD) tengah menyiapkan penunjukan Penjabat (Pj) Kades agar roda pelayanan publik di Desa Tamanjaya tetap berjalan normal."
    ],
    tags: ["#PemkabSukabumi", "#Tamanjaya", "#Narkoba", "#Ciemas", "#SanksiKades"],
    relatedNews: defaultRelatedNews,
  },
  "sungai-tak-lagi-jernih-warga-simpenan-desak-penertiban-tambang-liar": {
    title: "Sungai Tak Lagi Jernih, Warga Simpenan Desak Penertiban Tambang Liar",
    category: "PERISTIWA",
    date: "Senin, 3 Agustus 2026 - 15:30 WIB",
    image: "https://wsrv.nl/?url=jurnalsukabumi.com/wp-content/uploads/2026/07/IMG-20260725-WA0067-e1784991814798.jpg",
    paragraphs: [
      "Dampak penambangan emas tanpa izin di wilayah Kecamatan Simpenan, Kabupaten Sukabumi, kian memprihatinkan. Kualitas air sungai yang biasanya digunakan warga untuk kebutuhan sehari-hari kini berubah keruh dan tercemar material lumpur serta bahan kimia berbahaya.",
      "Ratusan warga dari beberapa desa di Simpenan menggelar aksi damai mendesak pemerintah daerah dan aparat kepolisian untuk segera menertibkan aktivitas tambang ilegal di sepanjang aliran sungai.",
      "\"Air sungai ini adalah sumber kehidupan kami. Sekarang jangankan untuk diminum, untuk mencuci pun sudah tidak layak karena sering menyebabkan gatal-gatal pada kulit warga,\" ungkap salah seorang tokoh masyarakat Simpenan.",
      "Pemerintah Kabupaten Sukabumi berjanji akan membentuk tim gabungan lintas instansi guna meninjau langsung lokasi penambangan liar serta menyiapkan sanksi tegas bagi pengelola tambang nakal."
    ],
    tags: ["#Simpenan", "#TambangLiar", "#Sukabumi", "#Lingkungan", "#Peristiwa"],
    relatedNews: [
      "Warga Simpenan Kumpulkan Bukti Pencemaran Air Sungai",
      "DLH Sukabumi Ambil Sampel Air Sungai Terkontaminasi",
      "Satpol PP Layangkan Surat Peringatan Pertama ke Pengelola Tambang",
      "DPRD Minta Pemkab Sediakan Air Bersih Darurat Bagi Penyintas",
    ],
  },
  "dugaan-hubungan-terlarang-oknum-guru-dan-siswi-sma-di-sukabumi": {
    title: "Dugaan Hubungan Terlarang Oknum Guru dan Siswi SMA di Sukabumi",
    category: "HUKUM",
    date: "Senin, 3 Agustus 2026 - 13:20 WIB",
    image: "https://wsrv.nl/?url=jurnalsukabumi.com/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-22-at-13.42.46-e1782111035175.jpeg",
    paragraphs: [
      "Dunia pendidikan di Kabupaten Sukabumi mendadak dihebohkan oleh dugaan kasus hubungan terlarang antara seorang oknum guru SMA dengan salah satu siswinya.",
      "Kasus ini mencuat setelah pihak keluarga korban mendapati bukti perpesanan dan melaporkan oknum tenaga pendidik tersebut ke pihak kepolisian serta Dinas Pendidikan Wilayah setempat.",
      "Pihak kepolisian menyatakan saat ini laporan tersebut sedang dalam tahap penyelidikan mendalam dengan mengumpulkan keterangan saksi-saksi dan pemeriksaan bukti medis pendukung.",
      "Sementara itu, Dinas Pendidikan menegaskan akan menjatuhkan sanksi disiplin berat hingga pemecatan jika oknum guru tersebut terbukti secara sah dan meyakinkan melakukan perbuatan tercela."
    ],
    tags: ["#Hukum", "#Sukabumi", "#Pendidikan", "#PolresSukabumi"],
    relatedNews: [
      "Disdik Sukabumi Nonaktifkan Oknum Guru Terduga Kasus Asusila",
      "KPAI Berikan Pendampingan Psikologis untuk Siswi SMA",
      "Polres Sukabumi Periksa Tiga Saksi Kunci",
    ],
  },
  "rumah-dikepung-massa-dugaan-pencabulan-oknum-guru-ngaji": {
    title: "Rumah Dikepung Massa, Dugaan Pencabulan Oknum Guru Ngaji Gegerkan Warga Simpenan",
    category: "HUKUM",
    date: "Jumat, 1 Agustus 2026 - 09:15 WIB",
    image: "https://wsrv.nl/?url=jurnalsukabumi.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-18-at-19.28.45-1-e1784378099703.jpeg",
    paragraphs: [
      "Warga Kecamatan Simpenan, Kabupaten Sukabumi, dihebohkan dengan dugaan pencabulan yang dilakukan oleh seorang oknum guru ngaji terhadap beberapa santrinya. Kejadian tersebut memicu amarah warga yang kemudian mengepung rumah tersangka pada Kamis malam.",
      "Kapolsek Simpenan mengkonfirmasi bahwa pihaknya telah bertindak cepat mengamankan tersangka berinisial AS (45) dari amukan massa untuk dibawa ke Mapolres Sukabumi.",
      "Berdasarkan laporan awal, setidaknya terdapat tiga orang korban yang merupakan santri di tempat pengajian milik tersangka. Para korban yang masih di bawah umur saat ini tengah mendapat pendampingan psikologis.",
      "Tersangka kini dijerat dengan Pasal Undang-Undang Perlindungan Anak dengan ancaman hukuman maksimal 15 tahun penjara."
    ],
    tags: ["#Simpenan", "#Hukum", "#Peristiwa", "#Sukabumi"],
    relatedNews: [
      "Polres Simpenan Amankan Oknum Guru Ngaji dari Amuk Massa",
      "DP3A Berikan Pendampingan Trauma Healing kepada Korban",
    ],
  },
  "belum-kantongi-izin-pembangunan-alfamart-ditegor-satpol-pp": {
    title: "Belum Kantongi Izin, Pembangunan Alfamart Ditegor Satpol PP Cibadak",
    category: "HEADLINE",
    date: "Senin, 3 Agustus 2026 - 11:00 WIB",
    image: "https://wsrv.nl/?url=jurnalsukabumi.com/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-22-at-13.42.46-e1782111035175.jpeg",
    paragraphs: [
      "Satuan Polisi Pamong Praja (Satpol PP) Kecamatan Cibadak, Kabupaten Sukabumi, menindak tegas pembangunan minimarket Alfamart yang diduga belum memiliki kelengkapan izin mendirikan bangunan (PBG) dan izin usaha toko modern.",
      "Petugas memasang stiker peringatan dan meminta penanggung jawab proyek untuk menghentikan sementara aktivitas konstruksi hingga seluruh proses perizinan diselesaikan.",
      "\"Kami merespon keluhan dari pedagang kecil sekitar dan melakukan pengecekan berkas. Ternyata dokumen perizinan belum lengkap, sehingga pekerjaan fisik dihentikan sementara,\" jelas Kasatpol PP Cibadak.",
      "DPRD Kabupaten Sukabumi juga mengimbau para investor toko modern agar mentaati peraturan daerah tentang zonasi dan perlindungan UMKM lokal."
    ],
    tags: ["#Cibadak", "#SatpolPP", "#Alfamart", "#Sukabumi", "#Perizinan"],
    relatedNews: [
      "Satpol PP Hentikan Proyek Pembangunan Toko Modern Tanpa Izin",
      "Asosiasi Pedagang Pasar Cibadak Dukung Penertiban Minimarket",
    ],
  },
};

export default function BeritaDetailPage() {
  const params = useParams();
  const rawSlug = params?.slug;
  const slugParam = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug || "";

  const [article, setArticle] = useState<ArticleDetail>(() => {
    if (slugParam && knownArticlesMap[slugParam]) {
      return knownArticlesMap[slugParam];
    }
    const localMatch = localArticles.find((a) => a.slug === slugParam);
    if (localMatch) {
      return {
        title: localMatch.title,
        category: localMatch.category.toUpperCase(),
        date: localMatch.date,
        image: localMatch.image.startsWith("http")
          ? localMatch.image
          : `https://wsrv.nl/?url=${encodeURIComponent(localMatch.image)}`,
        paragraphs: localMatch.content,
        tags: ["#Sukabumi", `#${localMatch.category}`],
        relatedNews: defaultRelatedNews,
      };
    }
    const formattedTitle = slugParam
      ? slugParam.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
      : "Oknum Kades Tamanjaya Positif Sabu, Dewan Batman Soroti Ciemas Darurat Narkoba";

    return {
      title: formattedTitle,
      category: "BERITA",
      date: "Kamis, 6 Agustus 2026 - 19:30 WIB",
      image:
        "https://wsrv.nl/?url=jurnalsukabumi.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-18-at-19.28.45-1-e1784378099703.jpeg",
      paragraphs: [
        `Anggota DPRD Kabupaten Sukabumi angkat suara prihatin atas kabar terkini mengenai ${formattedTitle}.`,
        "Pemerintah daerah dan aparat penegak hukum diimbau untuk bertindak cepat menindaklanjuti laporan masyarakat guna menjaga kondusivitas wilayah.",
        "Informasi perkembangan kasus ini akan terus diperbarui secara berkala oleh tim redaksi di lapangan.",
      ],
      tags: ["#Sukabumi", "#Berita", "#Terkini"],
      relatedNews: defaultRelatedNews,
    };
  });

  useEffect(() => {
    if (!slugParam) return;

    if (knownArticlesMap[slugParam]) {
      setArticle(knownArticlesMap[slugParam]);
      return;
    }

    const localMatch = localArticles.find((a) => a.slug === slugParam);
    if (localMatch) {
      setArticle({
        title: localMatch.title,
        category: localMatch.category.toUpperCase(),
        date: localMatch.date,
        image: localMatch.image.startsWith("http")
          ? localMatch.image
          : `https://wsrv.nl/?url=${encodeURIComponent(localMatch.image)}`,
        paragraphs: localMatch.content,
        tags: ["#Sukabumi", `#${localMatch.category}`],
        relatedNews: defaultRelatedNews,
      });
      return;
    }

    async function fetchWpPost() {
      try {
        let apiUrl = `https://jurnalsukabumi.com/wp-json/wp/v2/posts?slug=${encodeURIComponent(
          slugParam
        )}&_embed`;
        if (/^\d+$/.test(slugParam)) {
          apiUrl = `https://jurnalsukabumi.com/wp-json/wp/v2/posts/${slugParam}?_embed`;
        }

        const res = await fetch(apiUrl);
        if (res.ok) {
          const data = await res.json();
          const item = Array.isArray(data) ? data[0] : data;
          if (item && item.title) {
            let catName = "BERITA";
            if (item._embedded?.["wp:term"]?.[0]?.length > 0) {
              catName = item._embedded["wp:term"][0][0].name.toUpperCase();
            }
            let imgUrl =
              "https://wsrv.nl/?url=jurnalsukabumi.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-18-at-19.28.45-1-e1784378099703.jpeg";
            const media = item._embedded?.["wp:featuredmedia"]?.[0];
            if (media?.source_url) {
              imgUrl = `https://wsrv.nl/?url=${encodeURIComponent(
                media.source_url
              )}`;
            }

            setArticle({
              title: decodeHTMLEntities(item.title.rendered || ""),
              category: catName,
              date: formatIndonesianDate(item.date),
              image: imgUrl,
              contentHtml: item.content?.rendered || "",
              tags: ["#Sukabumi", `#${catName}`, "#BeritaTerkini"],
              relatedNews: defaultRelatedNews,
            });
            return;
          }
        }
      } catch (e) {
        console.error("WP API Fetch error:", e);
      }

      const formattedTitle = slugParam
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

      setArticle({
        title: formattedTitle,
        category: "BERITA",
        date: "Kamis, 6 Agustus 2026 - 19:30 WIB",
        image:
          "https://wsrv.nl/?url=jurnalsukabumi.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-18-at-19.28.45-1-e1784378099703.jpeg",
        paragraphs: [
          `Laporan terkini mengenai ${formattedTitle} terus menjadi sorotan publik di Kabupaten Sukabumi.`,
          "Berbagai pihak terkait telah mengambil langkah cepat guna menangani permasalahan ini secara profesional dan transparan.",
          "Masyarakat diimbau tetap menjaga situasi kondusif serta mengedepankan informasi dari sumber resmi.",
        ],
        tags: ["#Sukabumi", "#Berita", "#Terkini"],
        relatedNews: defaultRelatedNews,
      });
    }

    fetchWpPost();
  }, [slugParam]);

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
              <span className="text-red-600 font-extrabold">{article.category}</span>
            </nav>

            {/* Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-3 font-['Montserrat']">
              {article.title}
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
              <span>{article.date}</span>
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
                src={article.image}
                alt={article.title}
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
                  {article.relatedNews.map((item, idx) => (
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
                  {article.contentHtml ? (
                    <div dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
                  ) : (
                    article.paragraphs?.map((p, idx) => (
                      <p key={idx}>
                        {idx === 0 && (
                          <span className="font-bold text-red-600">
                            JURNALSUKABUMI.COM -{" "}
                          </span>
                        )}
                        {p}
                      </p>
                    ))
                  )}
                </div>

                {/* Footer Berita */}
                <div className="border-t border-gray-200 mt-6 pt-4 text-xs font-bold text-slate-900 font-['Montserrat']">
                  Reporter: Ilham Nugraha | Redaktur: Ujang Herlan
                </div>

                {/* Tags */}
                <div className="bg-gray-100 border border-gray-200 p-3.5 mt-4 rounded-none">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold font-['Montserrat']">
                    <span className="text-gray-500 font-normal">TAGS:</span>
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-white border border-gray-300 text-slate-800 px-2.5 py-1 rounded-none hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
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




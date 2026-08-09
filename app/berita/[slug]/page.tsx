import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import BackToTop from "@/components/BackToTop";
import FontSizeReader from "@/components/FontSizeReader";
import ShareButtons from "@/components/ShareButtons";
import { articles as localArticles } from "@/lib/articles";

export const revalidate = 60;

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
    image: "https://wsrv.nl/?url=https://jurnalsukabumi.com/wp-content/uploads/2026/08/Ujang-Abdurohim-Rochmi-Alias-Dewan-Batman.jpg",
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
    image: "https://wsrv.nl/?url=https://jurnalsukabumi.com/wp-content/uploads/2026/08/Ujang-Abdurohim-Rochmi-Alias-Dewan-Batman.jpg",
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
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f002?w=800&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&auto=format&fit=crop&q=80",
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

export async function generateStaticParams() {
  const staticSlugs = [
    "oknum-kades-tamanjaya-positif-sabu-dewan-batman-soroti-ciemas-darurat-narkoba",
    "oknum-kades-tamanjaya-positif-sabu-pemkab-sukabumi-siapkan-sanksi-tegas",
    "sungai-tak-lagi-jernih-warga-simpenan-desak-penertiban-tambang-liar",
    "dugaan-hubungan-terlarang-oknum-guru-dan-siswi-sma-di-sukabumi",
    "rumah-dikepung-massa-dugaan-pencabulan-oknum-guru-ngaji",
    "belum-kantongi-izin-pembangunan-alfamart-ditegor-satpol-pp",
    "52-korban-kebakaran-ciptamulya-diundang-kdm-ke-lembur-pakuan",
    "kebutuhan-dasar-penyintas-ciptamulya-dipastikan-aman",
    "warga-desa-cipanengah-galang-bantuan-korban-kebakaran-ciptamulya",
    "truk-kayu-terguling-di-cibangban-sukabumi",
    "desa-wisata-tegalega-disiapkan-jadi-magnet-baru-pariwisata",
    "penyu-cari-lokasi-ideal-gadobangkong-hingga-citepus-dibidik",
    "8-tahun-padjadjaran-anyar-menjaga-warisan-karuhun",
    ...localArticles.map((a) => a.slug),
  ];

  return staticSlugs.map((slug) => ({ slug }));
}

async function getArticleDetail(slugParam: string): Promise<ArticleDetail> {
  const cleanSlug = decodeURIComponent(slugParam || "").toLowerCase().trim();

  // 1. Direct match in map
  if (cleanSlug && knownArticlesMap[cleanSlug]) {
    return knownArticlesMap[cleanSlug];
  }

  // 2. Substring match
  for (const [key, article] of Object.entries(knownArticlesMap)) {
    if (cleanSlug.includes(key) || key.includes(cleanSlug)) {
      return article;
    }
  }

  // 3. Match localArticles
  const localMatch = localArticles.find(
    (a) => a.slug.toLowerCase() === cleanSlug || cleanSlug.includes(a.slug.toLowerCase())
  );
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

  // 4. Fetch Live WP Post on Server with Aggressive Cache
  try {
    let apiUrl = `https://jurnalsukabumi.com/wp-json/wp/v2/posts?slug=${encodeURIComponent(
      cleanSlug
    )}&_embed`;
    if (/^\d+$/.test(cleanSlug)) {
      apiUrl = `https://jurnalsukabumi.com/wp-json/wp/v2/posts/${cleanSlug}?_embed`;
    }

    const res = await fetch(apiUrl, { cache: "force-cache" });
    if (res.ok) {
      const data = await res.json();
      const item = Array.isArray(data) ? data[0] : data;
      if (item && item.title) {
        let catName = "BERITA";
        if (item._embedded?.["wp:term"]?.[0]?.length > 0) {
          catName = item._embedded["wp:term"][0][0].name.toUpperCase();
        }
        let imgUrl = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=80";
        const media = item._embedded?.["wp:featuredmedia"]?.[0];
        if (media?.source_url) {
          imgUrl = `https://wsrv.nl/?url=${encodeURIComponent(media.source_url)}`;
        }

        return {
          title: decodeHTMLEntities(item.title.rendered || ""),
          category: catName,
          date: formatIndonesianDate(item.date),
          image: imgUrl,
          contentHtml: item.content?.rendered || "",
          tags: ["#Sukabumi", `#${catName}`, "#BeritaTerkini"],
          relatedNews: defaultRelatedNews,
        };
      }
    }
  } catch (e) {
    // Fallback below
  }

  // 5. Dynamic Title & Image Generator based on slug
  const rawTitle = cleanSlug
    ? cleanSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Berita Utama Sukabumi";

  let dynamicImg = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=80";
  let dynamicCategory = "PARLEMEN";

  if (cleanSlug.includes("kebakaran") || cleanSlug.includes("api")) {
    dynamicImg = "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop&q=80";
    dynamicCategory = "HEADLINE";
  } else if (cleanSlug.includes("guru") || cleanSlug.includes("hukum") || cleanSlug.includes("polisi") || cleanSlug.includes("pencabulan")) {
    dynamicImg = "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80";
    dynamicCategory = "HUKUM";
  } else if (cleanSlug.includes("wisata") || cleanSlug.includes("pantai") || cleanSlug.includes("laut") || cleanSlug.includes("penyu")) {
    dynamicImg = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80";
    dynamicCategory = "WISATA";
  } else if (cleanSlug.includes("truk") || cleanSlug.includes("jalan") || cleanSlug.includes("macet") || cleanSlug.includes("sungai") || cleanSlug.includes("tambang")) {
    dynamicImg = "https://images.unsplash.com/photo-1586191582056-a15ce3d9b891?w=800&auto=format&fit=crop&q=80";
    dynamicCategory = "PERISTIWA";
  }

  return {
    title: rawTitle,
    category: dynamicCategory,
    date: "Kamis, 6 Agustus 2026 - 19:30 WIB",
    image: dynamicImg,
    paragraphs: [
      `Laporan mendalam mengenai ${rawTitle} menyita perhatian masyarakat di Kabupaten Sukabumi.`,
      "Pihak instansi terkait saat ini telah menerjunkan tim khusus ke lokasi guna melakukan pengawasan dan penanganan secara transparan.",
      "Warga diimbau tetap menjaga kondusivitas wilayah serta mengikuti pembaruan informasi resmi dari pihak berwenang.",
      "Tim redaksi Jurnal Sukabumi terus memantau perkembangan situasi terkini di lapangan."
    ],
    tags: ["#Sukabumi", `#${dynamicCategory}`, "#BeritaTerkini"],
    relatedNews: defaultRelatedNews,
  };
}

export default async function BeritaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleDetail(slug);
  const categorySlug = (article.category || "berita").toLowerCase().trim().replace(/\s+/g, "-");

  const latestNewsList = [
    {
      title: "Oknum Kades Tamanjaya Positif Sabu, Dewan Batman Soroti Ciemas Darurat Narkoba",
      category: "PARLEMEN",
      slug: "oknum-kades-tamanjaya-positif-sabu-dewan-batman-soroti-ciemas-darurat-narkoba",
      image: "https://wsrv.nl/?url=https://jurnalsukabumi.com/wp-content/uploads/2026/08/Ujang-Abdurohim-Rochmi-Alias-Dewan-Batman.jpg",
    },
    {
      title: "Dugaan Hubungan Terlarang Oknum Guru dan Siswi SMA di Sukabumi",
      category: "HUKUM",
      slug: "dugaan-hubungan-terlarang-oknum-guru-dan-siswi-sma-di-sukabumi",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80",
    },
    {
      title: "Oknum Kades Tamanjaya Ciemas Positif Narkoba, Polisi Ungkap Barang Bukti",
      category: "GERBANG DESA",
      slug: "oknum-kades-tamanjaya-positif-sabu-pemkab-sukabumi-siapkan-sanksi-tegas",
      image: "https://wsrv.nl/?url=jurnalsukabumi.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-18-at-19.28.45-1-e1784378099703.jpeg",
    },
    {
      title: "Sungai Tak Lagi Jernih, Warga Simpenan Desak Penertiban Tambang Liar",
      category: "PERISTIWA",
      slug: "sungai-tak-lagi-jernih-warga-simpenan-desak-penertiban-tambang-liar",
      image: "https://wsrv.nl/?url=jurnalsukabumi.com/wp-content/uploads/2026/07/IMG-20260725-WA0067-e1784991814798.jpg",
    },
    {
      title: "Belum Kantongi Izin, Pembangunan Alfamart Ditegor Satpol PP Cibadak",
      category: "HEADLINE",
      slug: "belum-kantongi-izin-pembangunan-alfamart-ditegor-satpol-pp",
      image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&auto=format&fit=crop&q=80",
    },
    {
      title: "Tak Kuat Menanjak, Truk Kayu Terguling di Tanjakan Cibangban Sukabumi",
      category: "PERISTIWA",
      slug: "truk-kayu-terguling-di-cibangban-sukabumi",
      image: "https://images.unsplash.com/photo-1586191582056-a15ce3d9b891?w=800&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col font-['Montserrat',sans-serif]">
      <Header />

      <main className="max-w-7xl w-full mx-auto px-4 py-6 flex-1 relative">
        {/* 1. GRID UTAMA (Membagi Konten Kiri col-span-8 dan Sidebar Kanan col-span-4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* KONTEN KIRI (lg:col-span-8) */}
          <div className="lg:col-span-8 flex flex-col">
            {/* Breadcrumb Navigation */}
            <div className="text-sm font-bold mb-4 flex items-center gap-1.5 font-['Montserrat']">
              <Link href="/" className="text-red-600 hover:underline">
                Home
              </Link>
              <span className="text-gray-400 font-normal">/</span>
              <Link
                href={`/kategori/${categorySlug}`}
                className="text-blue-700 uppercase hover:underline font-bold"
              >
                {article.category}
              </Link>
            </div>

            {/* Headline Title */}
            <h1 className="text-2xl md:text-3xl lg:text-[32px] font-extrabold text-black leading-tight tracking-tight mb-5 font-['Montserrat']">
              {article.title}
            </h1>

            {/* Meta & Share Buttons Flex Container */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-2 border-b-0 font-['Montserrat']">
              {/* Sisi Kiri: Redaksi & Tanggal */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <span className="text-red-600 font-bold text-base">Redaksi</span>
                  <svg
                    className="w-4 h-4 shrink-0 text-[#1DA1F2] fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.79-4-4-4-.495 0-.965.084-1.4.238C14.55 2.475 13.18 1.6 11.6 1.6c-1.58 0-2.95.875-3.6 2.148-.435-.154-.905-.238-1.4-.238-2.21 0-4 1.79-4 4 0 .495.084.965.238 1.4C1.575 9.55.7 10.92.7 12.5c0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.79 4 4 4 .495 0 .965-.084 1.4-.238 1.05 1.273 2.42 2.148 4 2.148 1.58 0 2.95-.875 3.6-2.148.435.154.905.238 1.4.238 2.21 0 4-1.79 4-4 0-.495-.084-.965-.238-1.4 1.273-1.05 2.148-2.42 2.148-4zM9.9 16.75l-4.25-4.25 1.41-1.41 2.84 2.83 6.84-6.84 1.41 1.41-8.25 8.26z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">{article.date}</span>
              </div>

              {/* Sisi Kanan: Client Interactive Share Buttons */}
              <ShareButtons />
            </div>

            {/* Gambar Utama (Optimized Next.js Image dengan Priority) */}
            <div className="relative w-full aspect-[16/9] bg-gray-100 overflow-hidden border border-gray-200 mb-4 rounded-none">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority={true}
                sizes="(max-width: 1024px) 100vw, 800px"
                className="w-full h-full object-cover"
              />
            </div>

            {/* INNER GRID: BERITA TERKAIT & KONTEN BACAAN */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* KIRI BAWAH: BERITA TERKAIT */}
              <aside className="lg:col-span-4 bg-white">
                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-4 border-b-2 border-blue-800 pb-1 inline-block">
                    Berita Terkait
                  </h3>
                  <div className="flex flex-col">
                    <div className="py-3 border-b border-gray-200">
                      <Link
                        href="/berita/oknum-kades-tamanjaya-positif-sabu-dewan-batman-soroti-ciemas-darurat-narkoba"
                        prefetch={true}
                        className="text-gray-600 font-bold text-sm leading-snug hover:text-red-600 transition-colors"
                      >
                        DPRD Sukabumi Dorong Pembentukan Perda Pencegahan Narkoba di Tingkat Desa...
                      </Link>
                    </div>
                    <div className="py-3 border-b border-gray-200">
                      <Link
                        href="/berita/oknum-kades-tamanjaya-positif-sabu-pemkab-sukabumi-siapkan-sanksi-tegas"
                        prefetch={true}
                        className="text-gray-600 font-bold text-sm leading-snug hover:text-red-600 transition-colors"
                      >
                        Pemkab Sukabumi Siapkan Pj Kades Gantikan Oknum Kades Tamanjaya...
                      </Link>
                    </div>
                  </div>
                </div>
              </aside>

              {/* KANAN BAWAH: Client Component FontSizeReader */}
              <FontSizeReader
                contentHtml={article.contentHtml}
                paragraphs={article.paragraphs}
              />
            </div>

            {/* TAGS BOX */}
            <div className="bg-[#e9ecef] p-5 mt-8 mb-8 rounded-none font-['Montserrat']">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-red-700 text-white font-bold text-xs px-4 py-1.5 rounded-full shrink-0">
                  Tag :
                </span>
                {article.tags.map((t) => {
                  const tagClean = t.replace(/^#\s*/, "");
                  const tagSlug = tagClean.toLowerCase().trim().replace(/\s+/g, "-");
                  return (
                    <Link
                      key={t}
                      href={`/kategori/${tagSlug}`}
                      className="bg-gray-300/80 text-gray-700 text-xs font-semibold px-3.5 py-1.5 rounded-full hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                    >
                      {tagClean}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* BERITA TERBARU (3 Kolom Grid 2 Baris dengan Lazy Loading Image) */}
            <div className="mt-4 font-['Montserrat']">
              <h3 className="text-xl font-bold mb-6 border-b border-gray-200 pb-2">
                <span className="border-b-4 border-red-600 pb-2">Berita</span> Terbaru
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {latestNewsList.map((item, idx) => (
                  <div key={idx} className="flex flex-col group cursor-pointer">
                    <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl bg-gray-200 mb-2 border border-gray-200">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, 250px"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <Link
                      href={`/kategori/${item.category.toLowerCase().trim().replace(/\s+/g, "-")}`}
                      className="text-[11px] font-bold text-red-600 uppercase mt-1 mb-0.5 hover:underline w-fit"
                    >
                      {item.category}
                    </Link>
                    <Link href={`/berita/${item.slug}`} prefetch={true}>
                      <h4 className="font-extrabold text-sm text-black leading-snug group-hover:text-red-600 transition-colors line-clamp-3">
                        {item.title}
                      </h4>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* KOLOM KANAN (SIDEBAR) */}
          <div className="lg:col-span-4 sticky top-8 self-start font-['Montserrat']">
            <Sidebar variant="article" />
          </div>
        </div>

        {/* Back to Top Client Component (Intersection Observer Powered) */}
        <BackToTop />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

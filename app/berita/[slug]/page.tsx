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
  "52-korban-kebakaran-ciptamulya-diundang-kdm-ke-lembur-pakuan": {
    title: "Berangkat Esok, 52 Korban Kebakaran Ciptamulya Diundang KDM ke Lembur Pakuan",
    category: "HEADLINE",
    date: "Jumat, 1 Agustus 2026 - 10:22 WIB",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop&q=80",
    paragraphs: [
      "Sebanyak 52 warga korban kebakaran Kampung Adat Ciptamulya, Kecamatan Cikakak, Kabupaten Sukabumi dijadwalkan berangkat besok menuju Lembur Pakuan. Kunjungan ini atas undangan langsung dari Komunitas Dayeuh Mangraga (KDM).",
      "Ketua Paguyuban Kampung Adat Ciptamulya mengungkapkan rasa syukurnya atas undangan tersebut. Undangan ini menjadi obat pelipur lara bagi warga yang rumahnya terbakar.",
      "Kebakaran yang melanda Kampung Adat Ciptamulya menghanguskan belasan rumah adat dan bangunan pendukung. Peristiwa tersebut meninggalkan duka mendalam bagi komunitas adat setempat.",
      "Program kunjungan ini diharapkan dapat memberikan semangat baru bagi para korban sekaligus mempererat tali silaturahmi antarkomunitas adat."
    ],
    tags: ["#Ciptamulya", "#Kebakaran", "#KDM", "#Sukabumi"],
    relatedNews: [
      "Kebutuhan Dasar Penyintas Ciptamulya Dipastikan Aman",
      "Warga Desa Cipanengah Galang Bantuan untuk Korban Kebakaran Ciptamulya",
    ],
  },
  "kebutuhan-dasar-penyintas-ciptamulya-dipastikan-aman": {
    title: "Kebutuhan Dasar Penyintas Ciptamulya Dipastikan Aman",
    category: "NASIONAL",
    date: "Jumat, 1 Agustus 2026 - 08:30 WIB",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&auto=format&fit=crop&q=80",
    paragraphs: [
      "Pemerintah Kabupaten Sukabumi melalui Dinas Sosial memastikan bahwa kebutuhan dasar para penyintas kebakaran Kampung Adat Ciptamulya dalam kondisi aman dan terkendali.",
      "Pemerintah mendistribusikan bantuan berupa bahan makanan pokok, selimut, pakaian layak pakai, serta kebutuhan sanitasi darurat.",
      "Tim medis Dinas Kesehatan secara rutin melakukan pemeriksaan kesehatan terhadap para pengungsi, terutama anak-anak dan lansia.",
      "Proses rehabilitasi dan rekonstruksi rumah-rumah adat yang terbakar sudah mulai dirancang bekerja sama dengan balai pelestarian cagar budaya."
    ],
    tags: ["#Ciptamulya", "#Dinsos", "#Penyintas", "#Sukabumi"],
    relatedNews: [
      "52 Korban Kebakaran Ciptamulya Diundang KDM ke Lembur Pakuan",
      "Warga Desa Cipanengah Galang Bantuan untuk Ciptamulya",
    ],
  },
  "warga-desa-cipanengah-galang-bantuan-korban-kebakaran-ciptamulya": {
    title: "Warga Desa Cipanengah Galang Bantuan untuk Korban Kebakaran Kampung Adat Ciptamulya",
    category: "GERBANG DESA",
    date: "Sabtu, 1 Agustus 2026 - 13:41 WIB",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&auto=format&fit=crop&q=80",
    paragraphs: [
      "Warga Desa Cipanengah, Kecamatan Surade, Kabupaten Sukabumi menunjukkan solidaritas tinggi dengan menggalang bantuan untuk para korban kebakaran Kampung Adat Ciptamulya.",
      "Inisiatif ini muncul secara spontan dari warga desa. Bantuan yang terkumpul berupa beras, makanan siap saji, pakaian layak pakai, dan donasi uang tunai.",
      "Bantuan tersebut disalurkan langsung ke posko pengungsian Ciptamulya oleh perwakilan pemerintah desa dan tokoh pemuda.",
      "Gerakan solidaritas ini menjadi bukti tingginya nilai kebersamaan dan gotong royong warga Sukabumi."
    ],
    tags: ["#Cipanengah", "#Ciptamulya", "#GotongRoyong", "#GerbangDesa"],
    relatedNews: [
      "Kebutuhan Dasar Penyintas Ciptamulya Dipastikan Aman",
      "52 Korban Kebakaran Ciptamulya Diundang KDM",
    ],
  },
  "truk-kayu-terguling-di-cibangban-sukabumi": {
    title: "Tak Kuat Menanjak, Truk Kayu Terguling di Cibangban Sukabumi",
    category: "PERISTIWA",
    date: "Sabtu, 1 Agustus 2026 - 13:37 WIB",
    image: "https://images.unsplash.com/photo-1586191582056-a15ce3d9b891?w=800&auto=format&fit=crop&q=80",
    paragraphs: [
      "Sebuah truk pengangkut kayu mengalami kecelakaan tunggal di kawasan tanjakan Cibangban, Kecamatan Cibadak, Kabupaten Sukabumi. Truk terguling akibat tidak kuat menanjak di jalan yang curam.",
      "Truk yang mengangkut kayu gelondong tersebut mundur saat menanjak dan akhirnya terguling menutup sebagian bahu jalan.",
      "Sopir truk berhasil menyelamatkan diri dan hanya mengalami luka ringan. Namun arus lalu lintas di jalur tersebut sempat mengalami kemacetan.",
      "Petugas gabungan dan alat berat diterjunkan ke lokasi untuk mengevakuasi badan truk dan muatan kayu dari badan jalan."
    ],
    tags: ["#Cibangban", "#Kecelakaan", "#TrukTerguling", "#Sukabumi"],
    relatedNews: [
      "Satlantas Evakuasi Truk Kayu Terguling di Cibangban",
      "Jalur Cibadak Kembali Normal Setelah Evakuasi",
    ],
  },
  "desa-wisata-tegalega-disiapkan-jadi-magnet-baru-pariwisata": {
    title: "Desa Wisata Tegalega Disiapkan Jadi Magnet Baru Pariwisata",
    category: "WISATA",
    date: "Kamis, 31 Juli 2026 - 15:20 WIB",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    paragraphs: [
      "Pemerintah Kabupaten Sukabumi melalui Dinas Pariwisata sedang menyiapkan Desa Tegalega, Kecamatan Ciracap, sebagai destinasi wisata baru yang menyajikan keindahan alam pesisir dan terasering persawahan.",
      "Desa yang terletak di kawasan selatan Sukabumi ini memiliki lanskap perbukitan eksotis serta pantai tersembunyi yang belum terjamah.",
      "Pemerintah daerah mengalokasikan anggaran infrastruktur untuk penataan jalan akses, titik pandang swafoto, serta fasilitas umum tempat wisata.",
      "Pelaku pariwisata lokal menyambut optimistis pengembangan desa wisata ini dalam menggerakkan ekonomi masyarakat desa."
    ],
    tags: ["#Tegalega", "#WisataSukabumi", "#Ciracap", "#DesaWisata"],
    relatedNews: [
      "Dispar Sukabumi Alokasikan Anggaran Penataan Desa Wisata",
      "PENYU Cari Lokasi Ideal di Pesisir Selatan",
    ],
  },
  "penyu-cari-lokasi-ideal-gadobangkong-hingga-citepus-dibidik": {
    title: "PENYU Cari Lokasi Ideal, Gadobangkong hingga Citepus Dibidik",
    category: "WISATA",
    date: "Rabu, 30 Juli 2026 - 11:05 WIB",
    image: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=800&auto=format&fit=crop&q=80",
    paragraphs: [
      "Tim konsentrasi pelestarian penyu melakukan survei lokasi penangkaran ideal di sepanjang garis pantai Kabupaten Sukabumi. Pantai Gadobangkong dan Citepus menjadi kandidat utama.",
      "Pemilihan lokasi memperhatikan tekstur pasir pantai, kondisi gelombang laut, serta tingkat keamanan lingkungan dari pemukiman.",
      "Program konservasi ini bertujuan melindungi habitat penyu hijau yang terancam punah dari maraknya perburuan liar.",
      "Hasil studi kelayakan lapangan akan diserahkan kepada Pemkab Sukabumi untuk penetapan zonasi lindung pantai."
    ],
    tags: ["#PENYU", "#Citepus", "#Gadobangkong", "#Konservasi", "#Wisata"],
    relatedNews: [
      "Desa Wisata Tegalega Disiapkan Jadi Magnet Baru Pariwisata",
      "8 Tahun Padjadjaran Anyar Menjaga Warisan Karuhun",
    ],
  },
  "8-tahun-padjadjaran-anyar-menjaga-warisan-karuhun": {
    title: "8 Tahun Padjadjaran Anyar, Menjaga Warisan Karuhun",
    category: "WISATA",
    date: "Selasa, 29 Juli 2026 - 14:30 WIB",
    image: "https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?w=800&auto=format&fit=crop&q=80",
    paragraphs: [
      "Komunitas Padjadjaran Anyar merayakan milangkala ke-8 dengan mempergelarkan kebudayaan tradisional Sunda di Kabupaten Sukabumi.",
      "Acara diisi dengan pergelaran seni wayang golek, pencak silat, seni tari jaipong, serta ritual syukuran Seren Taun.",
      "Penggiat budaya menegaskan pentingnya konsistensi generasi muda dalam merawat warisan adat leluhur di tengah arus modernisasi.",
      "Dinas Pendidikan dan Kebudayaan memberikan apresiasi atas peran aktif komunitas dalam melestarikan seni kebudayaan daerah."
    ],
    tags: ["#PadjadjaranAnyar", "#BudayaSunda", "#Sukabumi", "#SerenTaun"],
    relatedNews: [
      "Desa Wisata Tegalega Disiapkan Jadi Magnet Baru Pariwisata",
      "PENYU Cari Lokasi Ideal di Pesisir Selatan",
    ],
  },
};

function resolveArticle(slugParam: string): ArticleDetail {
  const cleanSlug = decodeURIComponent(slugParam || "").toLowerCase().trim();

  // 1. Direct match in map
  if (cleanSlug && knownArticlesMap[cleanSlug]) {
    return knownArticlesMap[cleanSlug];
  }

  // 2. Substring / Partial match
  for (const [key, article] of Object.entries(knownArticlesMap)) {
    if (cleanSlug.includes(key) || key.includes(cleanSlug)) {
      return article;
    }
  }

  // 3. ID / Fallback numeric match
  if (cleanSlug === "1" || cleanSlug === "101") return knownArticlesMap["sungai-tak-lagi-jernih-warga-simpenan-desak-penertiban-tambang-liar"];
  if (cleanSlug === "2" || cleanSlug === "102") return knownArticlesMap["oknum-kades-tamanjaya-positif-sabu-pemkab-sukabumi-siapkan-sanksi-tegas"];
  if (cleanSlug === "3" || cleanSlug === "103") return knownArticlesMap["dugaan-hubungan-terlarang-oknum-guru-dan-siswi-sma-di-sukabumi"];
  if (cleanSlug === "4" || cleanSlug === "104") return knownArticlesMap["rumah-dikepung-massa-dugaan-pencabulan-oknum-guru-ngaji"];
  if (cleanSlug === "5" || cleanSlug === "105") return knownArticlesMap["belum-kantongi-izin-pembangunan-alfamart-ditegor-satpol-pp"];

  // 4. Match localArticles from lib/articles.ts
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

  // 5. Dynamic Title & Image Generator based on slug string keywords
  const rawTitle = cleanSlug
    ? cleanSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Berita Utama Sukabumi";

  let dynamicImg = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=80";
  if (cleanSlug.includes("kebakaran") || cleanSlug.includes("api")) {
    dynamicImg = "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop&q=80";
  } else if (cleanSlug.includes("guru") || cleanSlug.includes("hukum") || cleanSlug.includes("polisi")) {
    dynamicImg = "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80";
  } else if (cleanSlug.includes("wisata") || cleanSlug.includes("pantai") || cleanSlug.includes("laut")) {
    dynamicImg = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80";
  } else if (cleanSlug.includes("truk") || cleanSlug.includes("jalan") || cleanSlug.includes("macet")) {
    dynamicImg = "https://images.unsplash.com/photo-1586191582056-a15ce3d9b891?w=800&auto=format&fit=crop&q=80";
  }

  return {
    title: rawTitle,
    category: "BERITA",
    date: "Kamis, 6 Agustus 2026 - 19:30 WIB",
    image: dynamicImg,
    paragraphs: [
      `Laporan mendalam mengenai ${rawTitle} menyita perhatian masyarakat di Kabupaten Sukabumi.`,
      "Pihak instansi terkait saat ini telah menerjunkan tim khusus ke lokasi guna melakukan pengawasan dan penanganan secara transparan.",
      "Warga diimbau tetap menjaga kondusivitas wilayah serta mengikuti pembaruan informasi resmi dari pihak berwenang.",
      "Tim redaksi Jurnal Sukabumi terus memantau perkembangan situasi terkini di lapangan."
    ],
    tags: ["#Sukabumi", "#Berita", "#Terkini"],
    relatedNews: defaultRelatedNews,
  };
}

export default function BeritaDetailPage() {
  const params = useParams();
  const rawSlug = params?.slug;
  const slugParam = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug || "";

  const [article, setArticle] = useState<ArticleDetail>(() => resolveArticle(slugParam));

  useEffect(() => {
    if (!slugParam) return;
    setArticle(resolveArticle(slugParam));

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
            let imgUrl = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=80";
            const media = item._embedded?.["wp:featuredmedia"]?.[0];
            if (media?.source_url) {
              imgUrl = `https://wsrv.nl/?url=${encodeURIComponent(media.source_url)}`;
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
          }
        }
      } catch (e) {
        // Silently use resolved local article
      }
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
            <div className="text-sm font-bold mb-4">
              <Link href="/" className="hover:underline">
                <span className="text-red-600">Home</span>
              </Link>{" "}
              <span className="text-gray-400 font-normal">/</span>{" "}
              <span className="text-blue-700 uppercase">{article.category}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-black leading-tight tracking-tight mb-6">
              {article.title}
            </h1>

            {/* Meta & Share Buttons Flex Container */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-2 border-b-0">
              {/* Sisi Kiri: Pembuat & Tanggal */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <span className="text-red-600 font-bold text-base">Redaksi</span>
                  <svg className="w-5 h-5 text-blue-600 fill-current" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">{article.date}</span>
              </div>

              {/* Sisi Kanan: Share Buttons */}
              <div className="flex items-center gap-2 mt-4 sm:mt-0">
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs hover:opacity-90 transition-opacity"
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
                  className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-xs hover:opacity-90 transition-opacity"
                  title="WhatsApp"
                >
                  <i className="fab fa-whatsapp" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-blue-400 text-white flex items-center justify-center text-xs hover:opacity-90 transition-opacity"
                  title="Telegram"
                >
                  <i className="fab fa-telegram" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-xs hover:opacity-90 transition-opacity"
                  title="Line"
                >
                  <i className="fab fa-line" />
                </a>
                <button
                  className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs hover:opacity-90 transition-opacity"
                  title="Copy Link"
                >
                  <i className="fas fa-link" />
                </button>
              </div>
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
                    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=80";
                }}
              />
            </div>

            {/* BAGIAN BAWAH: INNER GRID DI BAWAH GAMBAR */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* KIRI BAWAH (lg:col-span-4): BERITA TERKAIT */}
              <aside className="lg:col-span-4 bg-white">
                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-4 border-b-2 border-blue-800 pb-1 inline-block">Berita Terkait</h3>
                  <div className="flex flex-col">
                    <div className="py-3 border-b border-gray-200">
                      <a href="#" className="text-gray-500 font-bold text-sm leading-snug hover:text-blue-600">DPRD Sukabumi Dorong Dua Regulasi Strategis, Disabilitas Disahkan...</a>
                    </div>
                    <div className="py-3 border-b border-gray-200">
                      <a href="#" className="text-gray-500 font-bold text-sm leading-snug hover:text-blue-600">DPRD Dorong Pelaku Usaha Bangun Wisata yang Aman, Nyaman...</a>
                    </div>
                  </div>
                </div>
              </aside>

              {/* KANAN BAWAH (lg:col-span-8): TOMBOL TEXT A A A & ISI BERITA & FOOTER & TAGS */}
              <article className="lg:col-span-8 flex flex-col">
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
                    <div
                      dangerouslySetInnerHTML={{ __html: article.contentHtml }}
                    />
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
              </article>
            </div>

            {/* TAGS BOX (Abu-abu muda dengan Pill Tag : Merah dan Tag Oval) */}
            <div className="bg-[#e9ecef] p-5 mt-8 mb-8 rounded-none font-['Montserrat']">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-red-700 text-white font-bold text-xs px-4 py-1.5 rounded-full shrink-0">
                  Tag :
                </span>
                <span className="bg-gray-300/80 text-gray-700 text-xs font-semibold px-3.5 py-1.5 rounded-full hover:bg-red-600 hover:text-white transition-colors cursor-pointer">
                  Dewan Batman
                </span>
                <span className="bg-gray-300/80 text-gray-700 text-xs font-semibold px-3.5 py-1.5 rounded-full hover:bg-red-600 hover:text-white transition-colors cursor-pointer">
                  DPRD
                </span>
                <span className="bg-gray-300/80 text-gray-700 text-xs font-semibold px-3.5 py-1.5 rounded-full hover:bg-red-600 hover:text-white transition-colors cursor-pointer">
                  Oknum Kades Tamanjaya Positif Sabu
                </span>
                <span className="bg-gray-300/80 text-gray-700 text-xs font-semibold px-3.5 py-1.5 rounded-full hover:bg-red-600 hover:text-white transition-colors cursor-pointer">
                  Soroti Ciemas Darurat Narkoba
                </span>
                <span className="bg-gray-300/80 text-gray-700 text-xs font-semibold px-3.5 py-1.5 rounded-full hover:bg-red-600 hover:text-white transition-colors cursor-pointer">
                  Sukabumi
                </span>
              </div>
            </div>

            {/* FITUR BERITA TERBARU (3 Kolom Grid 2 Baris) */}
            <div className="mt-4 font-['Montserrat']">
              <h3 className="text-xl font-bold mb-6 border-b border-gray-200 pb-2">
                <span className="border-b-4 border-red-600 pb-2">Berita</span> Terbaru
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Card 1 */}
                <div className="flex flex-col group cursor-pointer">
                  <div className="w-full aspect-[16/10] overflow-hidden rounded-xl bg-gray-200 mb-2">
                    <img
                      src="https://wsrv.nl/?url=https://jurnalsukabumi.com/wp-content/uploads/2026/08/Ujang-Abdurohim-Rochmi-Alias-Dewan-Batman.jpg"
                      alt="Oknum Kades"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-red-600 uppercase mt-1 mb-0.5">
                    PARLEMEN
                  </span>
                  <h4 className="font-extrabold text-sm text-black leading-snug group-hover:text-red-600 transition-colors line-clamp-3">
                    Oknum Kades Tamanjaya Positif Sabu, Dewan Batman Soroti Ciemas Darurat Narkoba
                  </h4>
                </div>

                {/* Card 2 */}
                <div className="flex flex-col group cursor-pointer">
                  <div className="w-full aspect-[16/10] overflow-hidden rounded-xl bg-gray-200 mb-2">
                    <img
                      src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80"
                      alt="Dugaan Hubungan Terlarang"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-red-600 uppercase mt-1 mb-0.5">
                    HUKUM
                  </span>
                  <h4 className="font-extrabold text-sm text-black leading-snug group-hover:text-red-600 transition-colors line-clamp-3">
                    Dugaan Hubungan Terlarang Oknum Guru dan Istri Orang di Kalibunder, Polisi Mulai Periksa Saksi
                  </h4>
                </div>

                {/* Card 3 */}
                <div className="flex flex-col group cursor-pointer">
                  <div className="w-full aspect-[16/10] overflow-hidden rounded-xl bg-gray-200 mb-2">
                    <img
                      src="https://wsrv.nl/?url=jurnalsukabumi.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-18-at-19.28.45-1-e1784378099703.jpeg"
                      alt="US Oknum Kades"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-red-600 uppercase mt-1 mb-0.5">
                    GERBANG DESA
                  </span>
                  <h4 className="font-extrabold text-sm text-black leading-snug group-hover:text-red-600 transition-colors line-clamp-3">
                    US Oknum Kades Tamanjaya Ciemas Positif Narkoba, Polisi Ungkap Barang Bukti Alat Hisap Sabu
                  </h4>
                </div>

                {/* Card 4 */}
                <div className="flex flex-col group cursor-pointer">
                  <div className="w-full aspect-[16/10] overflow-hidden rounded-xl bg-gray-200 mb-2">
                    <img
                      src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80"
                      alt="Gelar Sosialisasi"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-red-600 uppercase mt-1 mb-0.5">
                    RAGAM
                  </span>
                  <h4 className="font-extrabold text-sm text-black leading-snug group-hover:text-red-600 transition-colors line-clamp-3">
                    Gelar Sosialisasi Pemilih Berkelanjutan di Nyalindung, Heri Gunawan Dorong Masyarakat Jadi Pemilih Cerdas
                  </h4>
                </div>

                {/* Card 5 */}
                <div className="flex flex-col group cursor-pointer">
                  <div className="w-full aspect-[16/10] overflow-hidden rounded-xl bg-gray-200 mb-2">
                    <img
                      src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80"
                      alt="Pesan Bung Karno"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-red-600 uppercase mt-1 mb-0.5">
                    RAGAM
                  </span>
                  <h4 className="font-extrabold text-sm text-black leading-snug group-hover:text-red-600 transition-colors line-clamp-3">
                    Sampaikan Pesan Bung Karno, Ono Surono: Bangsa yang Kuat Terlahir dari Ibu Hebat
                  </h4>
                </div>

                {/* Card 6 */}
                <div className="flex flex-col group cursor-pointer">
                  <div className="w-full aspect-[16/10] overflow-hidden rounded-xl bg-gray-200 mb-2">
                    <img
                      src="https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&auto=format&fit=crop&q=80"
                      alt="DPRD Sukabumi"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-red-600 uppercase mt-1 mb-0.5">
                    PARLEMEN
                  </span>
                  <h4 className="font-extrabold text-sm text-black leading-snug group-hover:text-red-600 transition-colors line-clamp-3">
                    DPRD Sukabumi Dorong Dua Regulasi Strategis, Disabilitas Disahkan dan Ketenagakerjaan Dibahas
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* SIDEBAR KANAN (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col gap-8 font-['Montserrat']">
            {/* WIDGET BERITA TERPOPULER */}
            <div>
              <h3 className="text-xl font-bold mb-4 border-b border-gray-300 pb-2">
                <span className="border-b-4 border-red-600 pb-2">BERITA</span> TERPOPULER
              </h3>
              <div className="flex flex-col">
                <div className="flex items-center gap-4 p-4 bg-gray-50">
                  <div className="text-5xl font-extrabold text-red-600 shrink-0 w-8 text-center">1</div>
                  <img src="https://wsrv.nl/?url=jurnalsukabumi.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-18-at-19.28.45-1-e1784378099703.jpeg" alt="US Oknum Kades" className="w-16 h-16 rounded-md shrink-0 object-cover" />
                  <h4 className="font-bold text-sm text-black leading-tight">US Oknum Kades Tamanjaya Ciemas Positif Narkoba...</h4>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white">
                  <div className="text-5xl font-extrabold text-red-600 shrink-0 w-8 text-center">2</div>
                  <img src="https://wsrv.nl/?url=https://jurnalsukabumi.com/wp-content/uploads/2026/08/Ujang-Abdurohim-Rochmi-Alias-Dewan-Batman.jpg" alt="Dewan Batman" className="w-16 h-16 rounded-md shrink-0 object-cover" />
                  <h4 className="font-bold text-sm text-black leading-tight">Oknum Kades Tamanjaya Positif Sabu, Dewan Batman Soroti...</h4>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50">
                  <div className="text-5xl font-extrabold text-red-600 shrink-0 w-8 text-center">3</div>
                  <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80" alt="Kades Ciemas" className="w-16 h-16 rounded-md shrink-0 object-cover" />
                  <h4 className="font-bold text-sm text-black leading-tight">Kades di Ciemas Berada di Satresnarkoba...</h4>
                </div>
              </div>
            </div>

            {/* WIDGET NASIONAL (Menggantikan Topik Terkini) */}
            <div>
              <h3 className="text-xl font-bold mb-4 border-b border-gray-300 pb-2">
                <span className="border-b-4 border-red-600 pb-2">NASIO</span>NAL
              </h3>
              <div className="flex flex-col">
                {/* Featured Item Krisdayanti */}
                <div className="flex flex-col mb-4 pb-4 border-b border-gray-200 group cursor-pointer">
                  <img
                    src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80"
                    alt="Krisdayanti Hebohkan Cibadak"
                    className="w-full aspect-[16/10] rounded-xl object-cover mb-3 group-hover:scale-[1.02] transition-transform"
                  />
                  <h4 className="font-bold text-base text-black leading-snug group-hover:text-red-600 transition-colors mb-1">
                    Krisdayanti Hebohkan Cibadak, Ribuan Warga Antusias hingga Berebut Foto Bersama
                  </h4>
                  <span className="text-xs text-gray-400 font-medium">
                    6 Agustus 2026 | 12:04 WIB
                  </span>
                </div>

                {/* List Item 2 */}
                <div className="py-3 border-b border-gray-200 group cursor-pointer">
                  <h4 className="font-bold text-sm text-black leading-snug group-hover:text-red-600 transition-colors mb-1">
                    Dipanggil ke Purwakarta, KDM Ingin Kampung Adat Ciptamulya Ditata
                  </h4>
                  <span className="text-xs text-gray-400 font-medium">
                    2 Agustus 2026 | 19:30 WIB
                  </span>
                </div>

                {/* List Item 3 */}
                <div className="py-3 border-b border-gray-200 group cursor-pointer">
                  <h4 className="font-bold text-sm text-black leading-snug group-hover:text-red-600 transition-colors mb-1">
                    Usung Perubahan di PWI Jabar, Kang Andhy Tawarkan Program Kesejahteraan hingga Karier Internasional
                  </h4>
                  <span className="text-xs text-gray-400 font-medium">
                    31 Juli 2026 | 22:04 WIB
                  </span>
                </div>

                {/* List Item 4 */}
                <div className="py-3 border-b border-gray-200 group cursor-pointer">
                  <h4 className="font-bold text-sm text-black leading-snug group-hover:text-red-600 transition-colors mb-1">
                    Hergun Usul Kemendagri Luncurkan Program Wirausaha Pemula untuk Kemandirian Ekonomi Ormas
                  </h4>
                  <span className="text-xs text-gray-400 font-medium">
                    30 Juli 2026 | 15:09 WIB
                  </span>
                </div>

                {/* List Item 5 */}
                <div className="py-3 border-b border-gray-200 group cursor-pointer">
                  <h4 className="font-bold text-sm text-black leading-snug group-hover:text-red-600 transition-colors mb-1">
                    Wamenko Tantang Sukabumi Bangun Budaya Pilah Sampah di Setiap Desa
                  </h4>
                  <span className="text-xs text-gray-400 font-medium">
                    29 Juli 2026 | 14:29 WIB
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

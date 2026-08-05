import Image from "next/image";
import Link from "next/link";

interface NewsItem {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  views?: string;
}

const newsList: NewsItem[] = [
  {
    id: 1,
    category: "PERISTIWA",
    title: "Perumda AMTJM Tanggapi Aksi Mahasiswa, Tegaskan Pengadaan Water Meter dan IPA Sesuai Prosedur",
    excerpt:
      "Direksi Perumda Tirta Jaya Mandiri memberikan klarifikasi menyeluruh terkait pengadaan fasilitas air minum dan klaim aksi mahasiswa.",
    date: "Selasa, 4 Agustus 2026 - 21:25 WIB",
    image: "https://placehold.co/270x150/0284c7/ffffff?text=Perumda+AMTJM",
  },
  {
    id: 2,
    category: "HEADLINE",
    title: "Belum Kantongi Izin, Pembangunan Alfamart Ditegor Satpol PP Cibadak",
    excerpt:
      "Pembangunan fisik gerai Alfamart di kawasan Cibadak dihentikan sementara hingga seluruh kelengkapan izin perizinan diterbitkan.",
    date: "Selasa, 4 Agustus 2026 - 17:29 WIB",
    image: "https://placehold.co/270x150/dc2626/ffffff?text=Satpol+PP+Cibadak",
  },
  {
    id: 3,
    category: "WISATA",
    title: "Kamar 308 Samudra Beach Tak Hanya Dikunjungi, Kini Disebut Jadi Lokasi Berburu Mustika",
    excerpt:
      "Daya tarik tempat bersejarah di kawasan Palabuhanratu ini terus memikat pengunjung dari berbagai penjuru daerah.",
    date: "Selasa, 4 Agustus 2026 - 13:52 WIB",
    image: "https://placehold.co/270x150/059669/ffffff?text=Kamar+308+Samudra",
  },
  {
    id: 4,
    category: "PARLEMEN",
    title: "DPRD Dorong Pelaku Usaha Bangun Wisata yang Aman, Nyaman, dan Berkesan",
    excerpt:
      "Komisi III DPRD Kabupaten Sukabumi menekankan pentingnya aspek keselamatan dan kenyamanan destinasi wisata lokal.",
    date: "Selasa, 4 Agustus 2026 - 12:28 WIB",
    image: "https://placehold.co/270x150/7c3aed/ffffff?text=DPRD+Wisata",
  },
  {
    id: 5,
    category: "RAGAM",
    title: "Abah Hendrik Teguh Pegang Papakem, Pembangunan Ciptamulya Baru Dimulai Usai Bulan Safar",
    excerpt:
      "Proses Pembangunan ulang kawasan adat Ciptamulya mematuhi keputusan dan kearifan lokal para pemangku adat.",
    date: "Selasa, 4 Agustus 2026 - 10:05 WIB",
    image: "https://placehold.co/270x150/d97706/ffffff?text=Abah+Hendrik",
  },
  {
    id: 6,
    category: "PARLEMEN",
    title: "DPRD Mulai Bahas Perubahan Tirta Jaya Mandiri Jadi Perseroda, Komisi III Ditunjuk Jadi Pansus",
    excerpt:
      "Panitia Khusus DPRD mulai melakukan pengkajian naskah akademik perubahan status hukum perumda.",
    date: "Selasa, 4 Agustus 2026 - 10:02 WIB",
    image: "https://placehold.co/270x150/2563eb/ffffff?text=DPRD+Tirta+Jaya",
  },
  {
    id: 7,
    category: "PERISTIWA",
    title: "Warga Ciawitali Nagrak Dihebohkan Kemunculan Monyet Masuk ke Pemukiman",
    excerpt:
      "Tim Damkar dan Penyelamatan Kabupaten Sukabumi diterjunkan ke lokasi untuk menangkap primata liar.",
    date: "Senin, 3 Agustus 2026 - 20:20 WIB",
    image: "https://placehold.co/270x150/059669/ffffff?text=Monyet+Pemukiman",
  },
];

export default function NewsFeed() {
  return (
    <div className="w-full flex flex-col gap-6">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b-2 border-red-600 pb-2">
        <h2 className="text-slate-900 text-xl font-black font-['Montserrat'] uppercase tracking-wide flex items-center gap-2">
          <span>BERITA TERKINI</span>
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
        </h2>
        <span className="text-xs font-bold text-red-600 uppercase font-['Montserrat']">
          Sukabumi Today
        </span>
      </div>

      {/* Vertical Articles List */}
      <div className="flex flex-col gap-6">
        {newsList.map((item) => (
          <article
            key={item.id}
            className="flex flex-col sm:flex-row gap-4 items-start group border-b border-gray-100 pb-5 last:border-b-0"
          >
            {/* Thumbnail */}
            <div className="relative w-full sm:w-60 h-40 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, 240px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content Body */}
            <div className="flex flex-col justify-between py-0.5 flex-1 h-full gap-2">
              <div className="flex flex-col gap-1.5">
                <span className="text-red-600 text-xs font-extrabold font-['Montserrat'] uppercase tracking-wider">
                  {item.category}
                </span>
                <Link href="#">
                  <h3 className="text-slate-900 group-hover:text-red-600 text-base sm:text-lg font-bold font-['Montserrat'] leading-snug transition-colors">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-gray-600 text-xs font-['Montserrat'] line-clamp-2 leading-relaxed">
                  {item.excerpt}
                </p>
              </div>

              <div className="flex items-center gap-2 text-gray-400 text-[11px] font-['Montserrat'] mt-2">
                <i className="far fa-clock"></i>
                <span>{item.date}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-['Montserrat',sans-serif]">
      <Header />

      <main className="max-w-7xl w-full mx-auto px-4 py-6 flex-1">
        {/* 1. GRID UTAMA (col-span-8 Kiri & col-span-4 Sidebar Kanan) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* KONTEN KIRI (lg:col-span-8) */}
          <div className="lg:col-span-8 flex flex-col">
            {/* Breadcrumb Skeleton */}
            <div className="flex items-center gap-2 mb-4">
              <div className="h-4 w-12 bg-gray-200 animate-pulse rounded" />
              <span className="text-gray-300">/</span>
              <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
            </div>

            {/* Headline Title Skeleton */}
            <div className="flex flex-col gap-2 mb-6">
              <div className="h-8 sm:h-9 w-full bg-gray-200 animate-pulse rounded-md" />
              <div className="h-8 sm:h-9 w-3/4 bg-gray-200 animate-pulse rounded-md" />
            </div>

            {/* Meta & Author Skeleton */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="h-5 w-24 bg-gray-200 animate-pulse rounded" />
                <div className="h-4 w-36 bg-gray-200 animate-pulse rounded" />
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                ))}
              </div>
            </div>

            {/* Gambar Utama Skeleton */}
            <div className="w-full aspect-[16/9] bg-gray-200 animate-pulse border border-gray-100 mb-6 rounded-none" />

            {/* Inner Grid (Berita Terkait 4-col & Isi Artikel 8-col) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Kiri Bawah: Berita Terkait Skeleton */}
              <aside className="lg:col-span-4 bg-white hidden sm:block">
                <div className="mt-2">
                  <div className="h-6 w-32 bg-gray-200 animate-pulse rounded mb-4" />
                  <div className="flex flex-col gap-4">
                    <div className="py-2 border-b border-gray-100 flex flex-col gap-1.5">
                      <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
                      <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
                    </div>
                    <div className="py-2 border-b border-gray-100 flex flex-col gap-1.5">
                      <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
                      <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded" />
                    </div>
                  </div>
                </div>
              </aside>

              {/* Kanan Bawah: Isi Berita Skeleton */}
              <article className="lg:col-span-8 flex flex-col gap-4">
                <div className="flex justify-end gap-1.5 mb-2">
                  <div className="h-6 w-6 bg-gray-200 animate-pulse rounded" />
                  <div className="h-6 w-6 bg-gray-200 animate-pulse rounded" />
                  <div className="h-6 w-6 bg-gray-200 animate-pulse rounded" />
                </div>
                <div className="space-y-3">
                  <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
                  <div className="h-4 w-11/12 bg-gray-200 animate-pulse rounded" />
                  <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
                  <div className="h-4 w-4/5 bg-gray-200 animate-pulse rounded" />
                  <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
                  <div className="h-4 w-9/12 bg-gray-200 animate-pulse rounded" />
                </div>
              </article>
            </div>

            {/* Tags Box Skeleton */}
            <div className="bg-gray-100 p-5 mt-8 mb-8 flex items-center gap-2">
              <div className="h-6 w-16 bg-gray-300 animate-pulse rounded-full" />
              <div className="h-6 w-24 bg-gray-200 animate-pulse rounded-full" />
              <div className="h-6 w-20 bg-gray-200 animate-pulse rounded-full" />
              <div className="h-6 w-32 bg-gray-200 animate-pulse rounded-full" />
            </div>

            {/* Berita Terbaru Skeleton Grid */}
            <div className="mt-4">
              <div className="h-7 w-40 bg-gray-200 animate-pulse rounded mb-6" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[1, 2, 3].map((idx) => (
                  <div key={idx} className="flex flex-col gap-2">
                    <div className="w-full aspect-[16/10] bg-gray-200 animate-pulse rounded-xl" />
                    <div className="h-3 w-20 bg-gray-200 animate-pulse rounded mt-1" />
                    <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
                    <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SIDEBAR KANAN (lg:col-span-4) - STICKY */}
          <div className="lg:col-span-4 flex flex-col gap-6 sticky top-8 self-start">
            <div className="bg-white border border-gray-200 p-4 rounded-none flex flex-col gap-4">
              <div className="h-7 w-48 bg-gray-200 animate-pulse rounded mb-2" />
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4 p-2 odd:bg-gray-50">
                  <div className="h-10 w-8 bg-gray-200 animate-pulse rounded" />
                  <div className="w-16 h-16 bg-gray-200 animate-pulse rounded-md shrink-0" />
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
                    <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

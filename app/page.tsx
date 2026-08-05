import { fetchLiveArticles } from "@/lib/wp";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NewsFeed from "@/components/NewsFeed";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export const revalidate = 60;

export default async function Home() {
  const liveArticles = await fetchLiveArticles();

  // Divide live articles: 0-4 for HeroSection slider, rest for NewsFeed
  const heroArticles = liveArticles.slice(0, 4);
  const feedArticles = liveArticles.slice(4);

  return (
    <div className="min-h-screen bg-slate-100/50 flex flex-col font-['Montserrat',sans-serif]">
      {/* Header Navigation (Two-Tier Layout) */}
      <Header />

      {/* Container Utama: Strict 2-Column Layout (70% Kiri / 30% Kanan) */}
      <main className="max-w-7xl mx-auto px-4 w-full flex flex-col lg:flex-row gap-6 mt-4 pb-10 flex-1">
        {/* Kolom Kiri (Main Content - 70%): HeroSection + NewsFeed */}
        <div className="w-full lg:w-[70%] min-w-0 flex flex-col gap-6">
          <HeroSection articles={heroArticles} />
          <NewsFeed
            articles={feedArticles.length > 0 ? feedArticles : liveArticles}
          />
        </div>

        {/* Kolom Kanan (Sidebar - 30%): 3 Banner Teratas + Topik Terkini + Populer */}
        <div className="w-full lg:w-[30%] flex-shrink-0">
          <Sidebar popularArticles={liveArticles} />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

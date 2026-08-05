import { fetchLiveArticles } from "@/lib/wp";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NewsFeed from "@/components/NewsFeed";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export const revalidate = 60;

export default async function Home() {
  const liveArticles = await fetchLiveArticles();

  // Divide live articles: 0-5 for HeroSection (1 Main + 4 Sub-thumbnails), rest for NewsFeed
  const heroArticles = liveArticles.slice(0, 5);
  const feedArticles = liveArticles.slice(5);

  return (
    <div className="min-h-screen bg-slate-100/50 flex flex-col font-['Montserrat',sans-serif]">
      {/* Header Navigation (Two-Tier Layout) */}
      <Header />

      {/* Main Content Area Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-5 md:px-6 pt-4 pb-10 flex flex-col gap-5">
        {/* Hero Section Grid (1 Giant Image + 4 Sub-thumbnails) */}
        <HeroSection articles={heroArticles} />

        {/* Two-Column Main Content & Sidebar Layout */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left Vertical News Feed (with inserted Dark Theme Blocks) */}
          <div className="flex-1 w-full min-w-0">
            <NewsFeed
              articles={feedArticles.length > 0 ? feedArticles : liveArticles}
            />
          </div>

          {/* Right Sidebar Widgets */}
          <Sidebar popularArticles={liveArticles} />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

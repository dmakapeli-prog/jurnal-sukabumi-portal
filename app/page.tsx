import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NewsFeed from "@/components/NewsFeed";
import ParlemenSection from "@/components/ParlemenSection";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-100/50 flex flex-col font-['Montserrat',sans-serif]">
      {/* Header */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-8 pt-6 pb-12">
        {/* Full-width Hero Section */}
        <HeroSection />

        {/* Two-column Content & Sidebar Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Main Feed Column */}
          <div className="flex-1 w-full min-w-0">
            <NewsFeed />
            <ParlemenSection />
          </div>

          {/* Sidebar Column */}
          <Sidebar />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NewsFeed from "@/components/NewsFeed";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-100/60 flex flex-col font-['Montserrat',sans-serif]">
      {/* Header Navigation */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-8 pt-6 pb-12 flex flex-col gap-6">
        {/* Hero Section Grid */}
        <HeroSection />

        {/* Two-Column Main Content & Sidebar Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Vertical News Feed */}
          <div className="flex-1 w-full min-w-0">
            <NewsFeed />
          </div>

          {/* Right Sidebar Widgets */}
          <Sidebar />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

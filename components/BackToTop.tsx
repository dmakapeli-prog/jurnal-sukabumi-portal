"use client";

import { useState, useEffect } from "react";

export default function BackToTop() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Kembali ke Atas"
      className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-red-500/60 hover:bg-red-500/100 text-white flex items-center justify-center shadow-lg backdrop-blur-xs transition-all duration-300 transform ${
        showBackToTop
          ? "opacity-100 scale-100 cursor-pointer"
          : "opacity-0 scale-0 pointer-events-none"
      }`}
      title="Kembali ke Atas"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M5 15l7-7 7 7"
        />
      </svg>
    </button>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";

export default function BackToTop() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = sentinelRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When sentinel at top is out of view (scrolled down), show button
        setShowBackToTop(!entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "300px 0px 0px 0px",
        threshold: 0,
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Sentinel element placed at top of viewport */}
      <div
        ref={sentinelRef}
        className="absolute top-0 left-0 w-full h-1 pointer-events-none opacity-0"
        aria-hidden="true"
      />
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Kembali ke Atas"
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg transition-all duration-300 transform ${
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
    </>
  );
}

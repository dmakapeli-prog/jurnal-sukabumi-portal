"use client";

import { useState } from "react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState("1x");

  const speeds = ["1x", "1.25x", "1.5x", "2x"];

  const handleSpeedToggle = () => {
    const nextIdx = (speeds.indexOf(speed) + 1) % speeds.length;
    setSpeed(speeds[nextIdx]);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 flex items-center justify-between gap-4 my-4 max-w-3xl shadow-sm font-['Montserrat']">
      {/* Sisi Kiri: Ikon Play / Pause bulat merah */}
      <button
        type="button"
        onClick={() => setIsPlaying(!isPlaying)}
        aria-label={isPlaying ? "Jeda Audio" : "Dengarkan Artikel Ini"}
        title={isPlaying ? "Jeda Audio" : "Dengarkan Artikel Ini"}
        className="bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center shrink-0 cursor-pointer hover:bg-red-700 transition-colors shadow-xs"
      >
        {isPlaying ? (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* Tengah: Teks & Visualizer Gelombang Suara */}
      <div className="flex-1 flex items-center gap-3 min-w-0">
        <span className="font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-200 shrink-0">
          Dengarkan Artikel Ini
        </span>

        {/* Dummy Visualizer Gelombang Suara Statis */}
        <div className="hidden sm:flex items-center gap-1 h-6 flex-1 max-w-[200px] overflow-hidden">
          {[40, 75, 30, 90, 50, 100, 65, 40, 85, 30, 60, 95, 45, 70, 35, 80, 50, 90, 40, 65].map(
            (heightPct, idx) => (
              <span
                key={idx}
                style={{ height: `${heightPct}%` }}
                className={`w-1 rounded-full transition-all duration-300 ${
                  isPlaying
                    ? "bg-red-600 animate-pulse"
                    : idx < 8
                    ? "bg-red-600/70"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            )
          )}
        </div>
      </div>

      {/* Sisi Kanan: Durasi & Tombol Kecepatan */}
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
          02:30
        </span>
        <button
          type="button"
          onClick={handleSpeedToggle}
          title="Ubah Kecepatan Audio"
          className="text-xs font-bold bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full px-2.5 py-1 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer transition-colors"
        >
          {speed}
        </button>
      </div>
    </div>
  );
}

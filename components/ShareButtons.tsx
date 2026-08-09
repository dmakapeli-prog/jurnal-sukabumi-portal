"use client";

import { useState } from "react";

export default function ShareButtons() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center gap-2 mt-4 sm:mt-0 relative">
      {copied && (
        <span className="absolute -top-7 right-0 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow">
          Link disalin!
        </span>
      )}
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs hover:opacity-90 transition-opacity"
        title="Facebook"
      >
        <i className="fab fa-facebook-f" />
      </a>
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs hover:opacity-90 transition-opacity"
        title="X (Twitter)"
      >
        <i className="fab fa-x-twitter" />
      </a>
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-xs hover:opacity-90 transition-opacity"
        title="WhatsApp"
      >
        <i className="fab fa-whatsapp" />
      </a>
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        className="w-8 h-8 rounded-full bg-blue-400 text-white flex items-center justify-center text-xs hover:opacity-90 transition-opacity"
        title="Telegram"
      >
        <i className="fab fa-telegram" />
      </a>
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-xs hover:opacity-90 transition-opacity"
        title="Line"
      >
        <i className="fab fa-line" />
      </a>
      <button
        type="button"
        onClick={handleCopyLink}
        className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs hover:opacity-90 transition-opacity cursor-pointer"
        title="Copy Link"
      >
        <i className="fas fa-link" />
      </button>
    </div>
  );
}

import React from "react";

interface SmartTLDRProps {
  summaryPoints?: string[];
}

const defaultPoints = [
  "Kades Ciemas, US, saat ini ditahan dan diperiksa di Satresnarkoba.",
  "Polisi menemukan barang bukti berupa alat hisap sabu (bong).",
  "Pihak kepolisian menegaskan penyelidikan intensif masih terus berlangsung.",
];

export default function SmartTLDR({ summaryPoints }: SmartTLDRProps) {
  const points = summaryPoints && summaryPoints.length > 0 ? summaryPoints : defaultPoints;

  return (
    <div className="bg-blue-50 dark:bg-slate-800 rounded-lg p-5 mb-6 border border-blue-100 dark:border-slate-700 shadow-sm font-['Montserrat']">
      <h3 className="text-lg font-bold text-blue-900 dark:text-blue-400 mb-3 flex items-center gap-2">
        <span>✨</span> Ringkasan Cepat (TL;DR)
      </h3>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 text-sm font-medium leading-relaxed">
        {points.map((point, index) => (
          <li key={index} className="leading-snug">
            <span className="ml-1">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

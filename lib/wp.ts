export interface LiveArticle {
  id: number;
  slug: string;
  link: string;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
}

function decodeHTMLEntities(text: string): string {
  if (!text) return "";
  return text
    .replace(/<[^>]*>/g, "")
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    )
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#8211;/g, "-")
    .replace(/&#8212;/g, "—")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#038;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function formatIndonesianDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;

    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const dayName = days[d.getDay()];
    const dateNum = d.getDate();
    const monthName = months[d.getMonth()];
    const year = d.getFullYear();
    const hours = d.getHours().toString().padStart(2, "0");
    const minutes = d.getMinutes().toString().padStart(2, "0");

    return `${dayName}, ${dateNum} ${monthName} ${year} - ${hours}:${minutes} WIB`;
  } catch {
    return isoString;
  }
}

export async function fetchLiveArticles(): Promise<LiveArticle[]> {
  const WP_API_URL =
    "https://jurnalsukabumi.com/wp-json/wp/v2/posts?_embed&per_page=15";

  try {
    const res = await fetch(WP_API_URL, {
      next: { revalidate: 60 }, // Revalidate cache every 60 seconds
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!res.ok) {
      throw new Error(`Gagal memuat API WordPress: ${res.statusText}`);
    }

    const posts = await res.json();

    if (!Array.isArray(posts)) {
      throw new Error("Format respon API tidak valid");
    }

    return posts.map((item: any, index: number) => {
      // 1. Title
      const rawTitle = item.title?.rendered || "Berita Sukabumi";
      const cleanTitle = decodeHTMLEntities(rawTitle);

      // 2. Category
      let categoryName = "BERITA";
      if (item._embedded?.["wp:term"]?.[0]?.length > 0) {
        categoryName = item._embedded["wp:term"][0][0].name.toUpperCase();
      }

      // 3. Featured Image
      let imageUrl = "https://wsrv.nl/?url=jurnalsukabumi.com/wp-content/uploads/2026/07/IMG-20260725-WA0067-e1784991814798.jpg";
      const media = item._embedded?.["wp:featuredmedia"]?.[0];
      if (media?.source_url) {
        imageUrl = `https://wsrv.nl/?url=${encodeURIComponent(media.source_url)}`;
      } else if (media?.media_details?.sizes?.medium_large?.source_url) {
        imageUrl = `https://wsrv.nl/?url=${encodeURIComponent(media.media_details.sizes.medium_large.source_url)}`;
      }

      // 4. Excerpt
      const rawExcerpt = item.excerpt?.rendered || "";
      const cleanExcerpt = decodeHTMLEntities(rawExcerpt);

      // 5. Date
      const formattedDate = formatIndonesianDate(item.date);

      return {
        id: item.id || index + 1,
        slug: item.slug || `berita-${item.id}`,
        link: item.link || "#",
        title: cleanTitle,
        category: categoryName,
        date: formattedDate,
        image: imageUrl,
        excerpt: cleanExcerpt,
      };
    });
  } catch (err) {
    console.error("[WP Fetch Error]:", err);
    return [];
  }
}

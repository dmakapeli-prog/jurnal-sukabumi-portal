import { NextResponse } from "next/server";
import { fetchLiveArticles } from "@/lib/wp";

export async function GET() {
  try {
    const articles = await fetchLiveArticles();
    return NextResponse.json({ success: true, count: articles.length, data: articles });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

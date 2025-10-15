// # POST /api/preview (metadatos URL)

import { NextRequest, NextResponse } from "next/server";
import { JSDOM } from "jsdom";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL required" }, { status: 400 });
    }

    // Validar URL
    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; WishlistBot/1.0)",
      },
      signal: AbortSignal.timeout(10000), // 10s timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    // Extraer Open Graph meta tags
    const getMetaContent = (property: string) => {
      const meta =
        doc.querySelector(`meta[property="${property}"]`) ||
        doc.querySelector(`meta[name="${property}"]`);
      return meta?.getAttribute("content") || "";
    };

    const title =
      getMetaContent("og:title") ||
      doc.querySelector("title")?.textContent ||
      "";
    const image = getMetaContent("og:image");
    const siteName = getMetaContent("og:site_name") || new URL(url).hostname;
    const description = getMetaContent("og:description");

    // Intentar extraer precio (común en e-commerce)
    const priceElement =
      doc.querySelector('[itemprop="price"]') ||
      doc.querySelector(".price") ||
      doc.querySelector('[class*="price"]');
    const price = priceElement?.textContent?.trim();

    return NextResponse.json({
      title: title.trim(),
      image,
      store: siteName,
      description,
      price: price || null,
      url,
    });
  } catch (error) {
    console.error("Error fetching preview:", error);
    return NextResponse.json(
      { error: "Failed to fetch preview", details: error },
      { status: 500 }
    );
  }
}

"use server";

export async function ripMedia(url: string) {
    try {
        if (!url.startsWith("http")) {
            return { success: false, error: "Invalid URL" };
        }

        const res = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"
            }
        });

        if (!res.ok) return { success: false, error: "Target unreachable" };

        const html = await res.text();

        // Extract Meta Tags (OpenGraph / Twitter / JSON-LD)
        const title = html.match(/<meta property="og:title" content="(.*?)"/)?.[1] ||
            html.match(/<title>(.*?)<\/title>/)?.[1] || "Unknown Title";

        const image = html.match(/<meta property="og:image" content="(.*?)"/)?.[1] || "";

        const videoUrl = html.match(/<meta property="og:video" content="(.*?)"/)?.[1] ||
            html.match(/<meta property="og:video:url" content="(.*?)"/)?.[1] ||
            html.match(/"contentUrl": "(.*?)"/)?.[1];

        const description = html.match(/<meta property="og:description" content="(.*?)"/)?.[1] || "";

        const siteName = html.match(/<meta property="og:site_name" content="(.*?)"/)?.[1] || new URL(url).hostname;

        return {
            success: true,
            data: {
                title,
                image,
                videoUrl,
                description,
                siteName
            }
        };

    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

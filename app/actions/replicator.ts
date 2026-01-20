"use server";

export async function replicateSite(url: string) {
    try {
        // Validate URL
        if (!url.startsWith("http")) {
            return { success: false, error: "Invalid URL. Must start with http:// or https://" };
        }

        const res = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            },
            cache: "no-store"
        });

        if (!res.ok) {
            return { success: false, error: `Refused Connection: ${res.status} ${res.statusText}` };
        }

        const html = await res.text();

        // Basic stats extraction
        const stats = {
            size: (html.length / 1024).toFixed(2) + " KB",
            lines: html.split("\n").length,
            title: html.match(/<title>(.*?)<\/title>/)?.[1] || "Unknown Title"
        };

        return { success: true, html, stats };

    } catch (error: any) {
        return { success: false, error: "Network Error: " + error.message };
    }
}

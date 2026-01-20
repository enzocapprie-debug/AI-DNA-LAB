"use client";

import { useState } from "react";
import { ripMedia } from "@/app/actions/media-ripper";
import { Film, Download, ExternalLink, Play, Loader2 } from "lucide-react";

export function MediaRipperInterface() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState("");

    async function handleRip() {
        if (!url) return;
        setLoading(true);
        setError("");
        setData(null);

        const res = await ripMedia(url);

        if (res.success) {
            setData(res.data);
        } else {
            setError(res.error || "Failed to extract metadata");
        }
        setLoading(false);
    }

    return (
        <div className="space-y-6">
            <div className="bg-surface border border-surface-border p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Film className="w-5 h-5 text-secondary" /> Stream Extractor
                </h3>

                <div className="flex gap-2">
                    <input
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Paste video URL (YouTube, Vimeo, etc)..."
                        className="flex-1 bg-black border border-surface-border rounded-xl px-4 py-3 focus:border-secondary outline-none"
                    />
                    <button
                        onClick={handleRip}
                        disabled={loading}
                        className="bg-secondary text-white font-bold px-6 rounded-xl hover:bg-secondary/90 transition-colors disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : "EXTRACT"}
                    </button>
                </div>

                {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
            </div>

            {data && (
                <div className="bg-surface border border-surface-border rounded-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                    {data.image && (
                        <div className="relative h-48 w-full bg-black/50">
                            <img src={data.image} alt="Thumbnail" className="w-full h-full object-cover opacity-60" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                                    <Play className="w-8 h-8 fill-white text-white translate-x-1" />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="p-6 space-y-4">
                        <div>
                            <div className="text-xs text-secondary font-bold uppercase tracking-wider mb-1">
                                {data.siteName}
                            </div>
                            <h2 className="text-xl font-bold leading-tight">{data.title}</h2>
                        </div>

                        {data.description && (
                            <p className="text-sm text-muted line-clamp-2">{data.description}</p>
                        )}

                        <div className="flex gap-3 pt-2">
                            {data.videoUrl ? (
                                <a href={data.videoUrl} target="_blank" className="flex-1 bg-white text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                                    <Download className="w-4 h-4" /> Download Source
                                </a>
                            ) : (
                                <button disabled className="flex-1 bg-white/5 text-muted font-bold py-3 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed">
                                    <Download className="w-4 h-4" /> Source Hidden
                                </button>
                            )}
                            <a href={url} target="_blank" className="px-4 py-3 bg-white/5 rounded-xl hover:bg-white/10 text-white transition-colors">
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        </div>

                        {!data.videoUrl && (
                            <p className="text-xs text-center text-muted">
                                *Direct stream URL protected by DRM or encryption. Metadata only.
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

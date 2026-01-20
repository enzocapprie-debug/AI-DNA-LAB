"use client";

import { useState } from "react";
import { replicateSite } from "@/app/actions/replicator";
import { Copy, Download, Globe, Loader2, Terminal } from "lucide-react";

export function ReplicatorInterface() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{ html: string; stats: any } | null>(null);
    const [error, setError] = useState("");

    async function handleScan() {
        if (!url) return;
        setLoading(true);
        setError("");
        setResult(null);

        const res = await replicateSite(url);

        if (res.success) {
            setResult({ html: res.html!, stats: res.stats });
        } else {
            setError(res.error || "Unknown Error");
        }
        setLoading(false);
    }

    return (
        <div className="space-y-6">
            <div className="bg-surface border border-surface-border p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" /> Target Acquisition
                </h3>

                <div className="flex gap-2">
                    <input
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com"
                        className="flex-1 bg-black border border-surface-border rounded-xl px-4 py-3 font-mono text-sm focus:border-primary outline-none"
                    />
                    <button
                        onClick={handleScan}
                        disabled={loading}
                        className="bg-primary text-black font-bold px-6 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : "CLONE"}
                    </button>
                </div>

                {error && (
                    <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm font-mono">
                        [ERROR] {error}
                    </div>
                )}
            </div>

            {result && (
                <div className="space-y-4">
                    {/* Stats Bar */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-surface border border-surface-border p-4 rounded-xl">
                            <div className="text-xs text-muted uppercase">Page Title</div>
                            <div className="font-bold truncate" title={result.stats.title}>{result.stats.title}</div>
                        </div>
                        <div className="bg-surface border border-surface-border p-4 rounded-xl">
                            <div className="text-xs text-muted uppercase">Size</div>
                            <div className="font-bold text-primary">{result.stats.size}</div>
                        </div>
                        <div className="bg-surface border border-surface-border p-4 rounded-xl">
                            <div className="text-xs text-muted uppercase">Lines of Code</div>
                            <div className="font-bold text-accent">{result.stats.lines}</div>
                        </div>
                    </div>

                    {/* Code Viewer */}
                    <div className="bg-black border border-surface-border rounded-xl overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
                            <div className="flex items-center gap-2 text-xs text-muted">
                                <Terminal className="w-3 h-3" /> source_code.html
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => navigator.clipboard.writeText(result.html)}
                                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-muted hover:text-white"
                                    title="Copy to Clipboard"
                                >
                                    <Copy className="w-4 h-4" />
                                </button>
                                <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-muted hover:text-white" title="Download File">
                                    <Download className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <pre className="p-4 text-xs font-mono text-muted overflow-auto h-[400px] leading-relaxed">
                            {result.html}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
}

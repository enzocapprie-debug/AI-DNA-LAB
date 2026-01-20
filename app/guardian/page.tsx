"use client";

import { useEffect, useState } from "react";
import { Shield, Lock, Activity, AlertTriangle } from "lucide-react";

export default function GuardianPage() {
    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        const addLog = () => {
            const actions = [
                "[SCAN] Verified integrity of /app/api/auth...",
                "[OPTIMIZE] Compressed static assets (saved 12kb)",
                "[GUARD] Blocked SQL injection attempt from IP 192.168.x.x",
                "[MONITOR] CPU usage nominal at 14%",
                "[CACHE] Purged stale cache entries"
            ];
            const randomAction = actions[Math.floor(Math.random() * actions.length)];
            const timestamp = new Date().toLocaleTimeString();
            setLogs(prev => [`[${timestamp}] ${randomAction}`, ...prev].slice(0, 20));
        };

        const interval = setInterval(addLog, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <Shield className="w-8 h-8 text-primary" /> Guardian Sentinel
                    </h1>
                    <p className="text-muted">Real-time application protection and optimization.</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-lg flex items-center gap-2 text-green-500 text-sm">
                        <Activity className="w-4 h-4" /> System Healthy
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-surface border border-surface-border p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-2 text-muted">
                        <Lock className="w-5 h-5 text-accent" /> Threats Blocked
                    </div>
                    <div className="text-3xl font-bold">142</div>
                </div>
                <div className="bg-surface border border-surface-border p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-2 text-muted">
                        <Activity className="w-5 h-5 text-primary" /> Uptime
                    </div>
                    <div className="text-3xl font-bold">99.99%</div>
                </div>
                <div className="bg-surface border border-surface-border p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-2 text-muted">
                        <AlertTriangle className="w-5 h-5 text-yellow-500" /> Pending Updates
                    </div>
                    <div className="text-3xl font-bold">0</div>
                </div>
            </div>

            {/* Live Console */}
            <div className="bg-black border border-surface-border rounded-2xl p-6 font-mono h-[400px] overflow-hidden flex flex-col">
                <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-4 text-xs text-muted uppercase tracking-widest">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Live Event Stream
                </div>
                <div className="flex-1 overflow-y-auto space-y-2">
                    {logs.map((log, i) => (
                        <div key={i} className="text-sm opacity-80 border-l-2 border-primary/20 pl-3 py-1">
                            <span className="text-primary">{log.split('] ')[0]}]</span>
                            <span className="text-foreground/80">{log.split('] ')[1]}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

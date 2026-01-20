"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AgentRole } from "@/types/agent";
import { Bot, FileText, Globe, Shield, Sparkles, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

const ROLES: { id: AgentRole; label: string; icon: any; color: string }[] = [
    { id: 'generator', label: 'Generator', icon: Sparkles, color: 'text-yellow-400' },
    { id: 'analyzer', label: 'Analyzer', icon: FileText, color: 'text-blue-400' },
    { id: 'scraper', label: 'Hunter', icon: Globe, color: 'text-green-400' },
    { id: 'moderator', label: 'Guardian', icon: Shield, color: 'text-red-400' },
];

export function CreateAgentForm() {
    const [selectedRole, setSelectedRole] = useState<AgentRole>('generator');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        // Mock API call
        await new Promise(r => setTimeout(r, 2000));
        setLoading(false);
        alert("Agent Created Successfully (Mock)");
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">

            {/* Identity Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-primary flex items-center gap-2">
                    <Bot className="w-5 h-5" /> Agent Identity
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm text-muted">Agent Name</label>
                        <input
                            required
                            className="w-full bg-surface border border-surface-border rounded-lg px-4 py-3 focus:border-primary outline-none transition-colors"
                            placeholder="e.g. NeoWriter V1"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-muted">Version Tag</label>
                        <input
                            readOnly value="1.0.0-alpha"
                            className="w-full bg-surface/50 border border-surface-border rounded-lg px-4 py-3 text-muted"
                        />
                    </div>
                </div>
            </div>

            {/* Role Selection */}
            <div className="space-y-4">
                <label className="text-sm text-muted block">Primary Directive (Role)</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {ROLES.map((role) => (
                        <div
                            key={role.id}
                            onClick={() => setSelectedRole(role.id)}
                            className={cn(
                                "cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-3 transition-all hover:bg-surface/80",
                                selectedRole === role.id
                                    ? "bg-primary/5 border-primary shadow-[0_0_15px_rgba(0,255,148,0.15)]"
                                    : "bg-surface border-surface-border"
                            )}
                        >
                            <role.icon className={cn("w-6 h-6", role.color)} />
                            <span className="text-xs font-medium uppercase tracking-wider">{role.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* System Prompt */}
            <div className="space-y-2">
                <label className="text-sm text-muted">System Prompt (The Brain)</label>
                <textarea
                    required
                    rows={5}
                    className="w-full bg-surface border border-surface-border rounded-lg px-4 py-3 focus:border-primary outline-none text-sm font-mono leading-relaxed"
                    placeholder="You are an expert AI assistant designed to..."
                />
                <p className="text-xs text-muted text-right">0 / 2000 tokens</p>
            </div>

            {/* Knowledge Upload (Mock) */}
            <div className="border border-dashed border-surface-border rounded-xl p-8 text-center hover:bg-surface/30 transition-colors cursor-pointer group">
                <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <Upload className="w-6 h-6 text-muted group-hover:text-primary" />
                </div>
                <p className="text-sm font-medium">Upload Knowledge Base</p>
                <p className="text-xs text-muted mt-1">Drag & drop PDF, TXT, or JSON files</p>
            </div>

            {/* Submit */}
            <button
                disabled={loading}
                className="w-full bg-primary text-black font-bold text-lg py-4 rounded-xl hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(0,255,148,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {loading ? (
                    <>Initialize Neural Network...</>
                ) : (
                    <>
                        <Sparkles className="w-5 h-5 fill-black" /> Deploy Agent
                    </>
                )}
            </button>

        </form>
    );
}

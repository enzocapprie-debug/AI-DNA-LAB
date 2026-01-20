"use client";

import Link from "next/link";
import { Bot, Code, Globe, Search, Shield } from "lucide-react";

export default function AgentsPage() {
    const agents = [
        {
            id: "web_architect",
            name: "Web Architect v9",
            role: "Generator",
            desc: "Specializes in writing HTML/Tailwind landing pages from scratch.",
            icon: Code,
            color: "text-yellow-400",
            bg: "bg-yellow-400/10",
            status: "IDLE"
        },
        {
            id: "discount_hunter",
            name: "Discount Hunter",
            role: "Scraper",
            desc: "Scans 50+ deal sites for 100% off software coupons.",
            icon: Globe,
            color: "text-green-400",
            bg: "bg-green-400/10",
            status: "SCANNING"
        },
        {
            id: "seo_oracle",
            name: "SEO Oracle",
            role: "Analyzer",
            desc: "Audits URLs for semantic HTML, keyword density, and meta tags.",
            icon: Search,
            color: "text-blue-400",
            bg: "bg-blue-400/10",
            status: "IDLE"
        },
        {
            id: "guardian_sentinel",
            name: "Guardian Sentinel",
            role: "Moderator",
            desc: "Protects site integrity and monitors performance logs.",
            icon: Shield,
            color: "text-red-400",
            bg: "bg-red-400/10",
            status: "ACTIVE"
        }
    ];

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Deployed Agents</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agents.map((agent) => (
                    <Link href={`/agents/${agent.id}`} key={agent.id}>
                        <div className="group bg-surface border border-surface-border p-6 rounded-2xl hover:border-primary transition-all cursor-pointer h-full relative overflow-hidden">
                            {/* Hover Glow */}
                            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />

                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div className={`p-3 rounded-xl ${agent.bg} ${agent.color}`}>
                                    <agent.icon className="w-8 h-8" />
                                </div>
                                <span className="text-xs font-mono py-1 px-2 rounded bg-white/5 border border-white/10 text-muted">
                                    {agent.status}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{agent.name}</h3>
                            <p className="text-sm text-muted mb-4">{agent.desc}</p>

                            <div className="text-xs font-mono opacity-50 flex items-center gap-2">
                                <Bot className="w-3 h-3" /> {agent.role.toUpperCase()}_UNIT
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

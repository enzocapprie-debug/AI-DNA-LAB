"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    Bot,
    BrainCircuit,
    LayoutDashboard,
    ShieldCheck,
    Sparkles,
    Settings
} from "lucide-react";

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Bot, label: "My Agents", href: "/agents" },
    { icon: BrainCircuit, label: "Training Center", href: "/training" },
    { icon: ShieldCheck, label: "Guardian", href: "/guardian" },
    { icon: Sparkles, label: "Marketplace", href: "/marketplace" },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-screen w-64 bg-surface/50 border-r border-border backdrop-blur-xl fixed left-0 top-0 z-50">
            <div className="p-6">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent pb-1">
                    NEXUS AI
                </h1>
                <p className="text-xs text-muted uppercase tracking-widest">Agent Foundry</p>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                isActive
                                    ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(0,255,148,0.1)]"
                                    : "text-muted hover:text-foreground hover:bg-white/5"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isActive && "fill-primary/20")} />
                            <span className="font-medium text-sm">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-border">
                <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-white/5 text-muted hover:text-foreground transition-colors">
                    <Settings className="w-5 h-5" />
                    <span className="text-sm font-medium">Settings</span>
                </button>
            </div>
        </div>
    );
}

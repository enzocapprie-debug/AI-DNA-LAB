import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "AI DNA LAB | Agent Foundry",
    description: "Advanced Autonomous Agent Builder Platform",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.className} antialiased min-h-screen bg-background text-foreground flex overflow-hidden`}
            >
                <Sidebar />
                <main className="flex-1 ml-64 h-screen overflow-y-auto relative">
                    {/* Ambient Glows */}
                    <div className="fixed top-0 left-64 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />
                    <div className="relative z-10 p-8 max-w-7xl mx-auto min-h-full">
                        {children}
                    </div>
                </main>
            </body>
        </html>
    );
}

"use client";

import { BrainCircuit, FileText, Link as LinkIcon, UploadCloud } from "lucide-react";
import { useState } from "react";

export default function TrainingPage() {
    const [activeTab, setActiveTab] = useState<'url' | 'text' | 'file'>('url');

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                    <BrainCircuit className="w-8 h-8 text-accent" /> Training Center
                </h1>
                <p className="text-muted">Feed your agents with custom knowledge.</p>
            </div>

            <div className="bg-surface border border-surface-border rounded-2xl overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-surface-border">
                    <button
                        onClick={() => setActiveTab('url')}
                        className={`flex-1 p-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === 'url' ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'hover:bg-white/5 text-muted'}`}
                    >
                        <LinkIcon className="w-4 h-4" /> Import URL
                    </button>
                    <button
                        onClick={() => setActiveTab('text')}
                        className={`flex-1 p-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === 'text' ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'hover:bg-white/5 text-muted'}`}
                    >
                        <FileText className="w-4 h-4" /> Raw Text
                    </button>
                    <button
                        onClick={() => setActiveTab('file')}
                        className={`flex-1 p-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === 'file' ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'hover:bg-white/5 text-muted'}`}
                    >
                        <UploadCloud className="w-4 h-4" /> Upload Files
                    </button>
                </div>

                <div className="p-8">
                    {activeTab === 'url' && (
                        <div className="space-y-4">
                            <label className="text-sm text-muted">Web Resource URL</label>
                            <input className="w-full bg-black border border-surface-border rounded-xl px-4 py-3" placeholder="https://..." />
                            <p className="text-xs text-muted">The crawler will extract all readable text from this page.</p>
                        </div>
                    )}

                    {activeTab === 'text' && (
                        <div className="space-y-4">
                            <label className="text-sm text-muted">Training Data</label>
                            <textarea rows={10} className="w-full bg-black border border-surface-border rounded-xl px-4 py-3" placeholder="Paste your content here..." />
                        </div>
                    )}

                    {activeTab === 'file' && (
                        <div className="border-2 border-dashed border-surface-border rounded-xl p-12 text-center hover:bg-white/5 cursor-pointer transition-colors">
                            <UploadCloud className="w-12 h-12 text-muted mx-auto mb-4" />
                            <p className="font-medium">Drop PDF, TXT, or MD files</p>
                        </div>
                    )}

                    <div className="mt-8 flex justify-end">
                        <button className="bg-primary text-black font-bold px-8 py-3 rounded-xl hover:bg-primary/90 transition-colors">
                            Ingest Data
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

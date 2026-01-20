import { Construction } from "lucide-react";

export default function PlaceholderPage() {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
            <div className="w-24 h-24 rounded-full bg-surface border border-surface-border flex items-center justify-center">
                <Construction className="w-12 h-12 text-muted" />
            </div>
            <div>
                <h1 className="text-3xl font-bold mb-2">System Module Offline</h1>
                <p className="text-muted max-w-md mx-auto">
                    This sector is currently under development. <br />
                    Access is restricted to Level 5 Personnel.
                </p>
            </div>
            <div className="px-4 py-2 bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 rounded-lg text-xs font-mono">
                STATUS: WORK_IN_PROGRESS
            </div>
        </div>
    );
}

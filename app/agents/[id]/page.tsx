import { AgentChatWindow } from "@/components/chat/AgentChatWindow";

// This is a Server Component that could fetch data, but for MVP we pass ID to client
export default async function AgentChatPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col">
            <div className="mb-4">
                <h1 className="text-2xl font-bold flex items-center gap-2 capitalize">
                    Active Session: <span className="text-primary">{id.replace('_', ' ')}</span>
                </h1>
            </div>

            <div className="flex-1 bg-surface border border-surface-border rounded-2xl overflow-hidden relative">
                <AgentChatWindow agentId={id} />
            </div>
        </div>
    );
}

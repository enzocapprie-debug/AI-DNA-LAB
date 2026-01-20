import { CreateAgentForm } from "@/components/agents/CreateAgentForm";
import { Activity, Cpu, Database, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-12 pb-20">

      {/* Header */}
      <div className="flex items-end justify-between border-b border-surface-border pb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Command Center</h1>
          <p className="text-muted">System Status: <span className="text-primary">ONLINE</span> // v1.0.0</p>
        </div>
        <div className="flex gap-4">
          {/* Mini Stats or Actions */}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Active Agents", val: "4", icon: Users, color: "text-primary" },
          { label: "Total Requests", val: "8,942", icon: Activity, color: "text-accent" },
          { label: "Knowledge base", val: "1.2 GB", icon: Database, color: "text-purple-400" },
          { label: "CPU Load", val: "12%", icon: Cpu, color: "text-orange-400" },
        ].map((stat, i) => (
          <div key={i} className="bg-surface border border-surface-border p-6 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-sm text-muted uppercase tracking-wider mb-1">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.val}</p>
            </div>
            <div className={`p-3 bg-white/5 rounded-xl ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      {/* Agent Creation Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Initialize New Agent</h2>
            <p className="text-muted">Configure neural parameters and role assignment.</p>
          </div>
          <CreateAgentForm />
        </div>

        {/* Recent Activity / Logs Mock */}
        <div className="bg-black/50 border border-surface-border rounded-2xl p-6 font-mono text-sm h-fit">
          <div className="flex items-center gap-2 text-muted border-b border-surface-border pb-4 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-auto opacity-50">system_logs.log</span>
          </div>
          <div className="space-y-3 text-xs opacity-70">
            <p><span className="text-primary">[10:42:01]</span> System initialized successfully.</p>
            <p><span className="text-accent">[10:42:05]</span> Connected to vector database (Pinecone).</p>
            <p><span className="text-blue-400">[10:44:12]</span> Agent "SEO_Oracle" completed analysis of target URL.</p>
            <p><span className="text-yellow-400">[10:45:00]</span> Warning: CPU usage spike detected in worker-02.</p>
            <p><span className="text-primary">[10:46:22]</span> New agent "Discount_Hunter" deployed to production.</p>
            <p className="text-muted italic">... listening for events ...</p>
          </div>
        </div>
      </div>

    </div>
  );
}

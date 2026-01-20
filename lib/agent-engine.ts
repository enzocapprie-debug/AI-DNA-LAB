import { Agent, AgentMemory, AgentResponse } from "@/types/agent";

export class AgentEngine {
    private agent: Agent;

    constructor(agent: Agent) {
        this.agent = agent;
    }

    public async processInput(input: string): Promise<AgentResponse> {
        // 1. Check Capabilities
        // 2. Search Memory (RAG Mock)
        // 3. Generate Response

        console.log(`[${this.agent.name}] Processing: ${input}`);

        // MOCK RESPONSE LOGIC
        await new Promise(r => setTimeout(r, 1500)); // Simulate thinking

        return {
            agentId: this.agent.id,
            message: `[MOCK] I am ${this.agent.name}. I received your input: "${input}". My role is ${this.agent.role}.`,
            timestamp: Date.now()
        };
    }

    public learn(data: AgentMemory) {
        this.agent.memory.push(data);
        console.log(`[${this.agent.name}] Learned new ${data.type}`);
    }

    public getStatus() {
        return {
            id: this.agent.id,
            memorySize: this.agent.memory.length,
            active: this.agent.isActive
        };
    }
}

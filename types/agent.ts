export type AgentRole = 'generator' | 'analyzer' | 'scraper' | 'moderator' | 'archiver';

export interface AgentMemory {
    id: string;
    type: 'link' | 'text' | 'pdf';
    content: string;
    timestamp: number;
}

export interface Agent {
    id: string;
    name: string;
    role: AgentRole;
    description: string;
    avatar: string;
    systemPrompt: string;
    capabilities: string[];
    memory: AgentMemory[];
    isActive: boolean;
}

export interface AgentResponse {
    agentId: string;
    message: string;
    metadata?: any;
    timestamp: number;
}

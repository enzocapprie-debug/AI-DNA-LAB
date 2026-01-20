"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, User, StopCircle } from "lucide-react";
import { AgentResponse } from "@/types/agent";

interface Message {
    role: 'user' | 'agent';
    content: string;
}

export function AgentChatWindow({ agentId }: { agentId: string }) {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'agent', content: `System initialized. I am ${agentId.replace('_', ' ')}. How can I assist you today?` }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        // Add User Message
        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setInput("");
        setIsTyping(true);

        // SIMULATE AGENT THINKING & RESPONSE
        setTimeout(() => {
            let response = "I received your request.";

            // Mock Logic based on ID
            if (agentId === 'web_architect') {
                response = `Generative Task Accepted.\n\nHere is the HTML structure for "${userMsg}":\n\n\`\`\`html\n<section class="hero bg-black text-white">\n  <h1 class="text-6xl font-bold">Welcome to ${userMsg}</h1>\n  <button class="btn-primary">Get Started</button>\n</section>\n\`\`\`\n\nWould you like me to add Tailwind classes?`;
            } else if (agentId === 'discount_hunter') {
                response = `Scanning target vectors... Found 3 potential matches:\n\n1. **Adobe Creative Cloud** - 40% OFF (Student)\n2. **NordVPN** - 68% OFF (Limited)\n3. **VsCode Pro** - FREE (Always)\n\nShall I extract the coupon codes?`;
            } else if (agentId === 'seo_oracle') {
                response = `Analysis Complete for query "${userMsg}".\n\n- **Score**: 85/100\n- **Issues**: Missing H1 tag on sub-pages.\n- **Opportunity**: Keyword "AI Tools" has high volume.\n\nRecommendation: Add semantic <article> tags.`;
            }

            setMessages(prev => [...prev, { role: 'agent', content: response }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-full bg-black/40">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'agent' && (
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                                <Sparkles className="w-4 h-4 text-primary" />
                            </div>
                        )}

                        <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'user'
                                ? 'bg-surface border border-surface-border text-foreground'
                                : 'bg-primary/5 border border-primary/10 text-primary-foreground/90'
                            }`}>
                            {msg.content}
                        </div>

                        {msg.role === 'user' && (
                            <div className="w-8 h-8 rounded-full bg-surface-border flex items-center justify-center shrink-0">
                                <User className="w-4 h-4 text-muted" />
                            </div>
                        )}
                    </div>
                ))}

                {isTyping && (
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                        </div>
                        <div className="flex items-center gap-1 h-8">
                            <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-surface-border bg-surface/50 backdrop-blur-md">
                <div className="flex gap-2">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Enter command or prompt..."
                        className="flex-1 bg-surface border border-surface-border rounded-xl px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isTyping}
                        className="bg-primary text-black p-3 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

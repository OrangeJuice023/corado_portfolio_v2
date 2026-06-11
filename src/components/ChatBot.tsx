"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hi! I'm Gervi's AI assistant. Ask me about his systems, certifications, experience, or how to get in touch.",
};

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(1) }),
      });
      const data = (await res.json()) as { reply?: string };
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            data.reply ?? "Something went wrong — try again or use the contact page.",
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "I couldn't reach the server. Please try again, or use the contact page.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        className="fixed bottom-6 right-6 z-50 cursor-pointer rounded-full bg-forest p-4 text-warm shadow-lg transition-all duration-200 hover:scale-105 hover:bg-emerald"
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="AI assistant"
          className="fixed bottom-24 right-6 z-50 flex h-[28rem] w-[min(24rem,calc(100vw-3rem))] flex-col overflow-hidden rounded-[18px] border border-line bg-warm shadow-2xl"
        >
          <div className="border-b border-line bg-forest px-5 py-4">
            <p className="font-display text-sm font-semibold text-warm">
              Ask about Gervi
            </p>
            <p className="text-xs text-sage">
              AI assistant · answers questions about his work
            </p>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                  m.role === "user"
                    ? "ml-auto rounded-br-md bg-forest text-warm"
                    : "rounded-bl-md bg-white text-charcoal",
                )}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div
                className="max-w-[85%] rounded-2xl rounded-bl-md bg-white px-4 py-2.5 text-sm text-slate"
                aria-live="polite"
              >
                Thinking…
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="flex items-center gap-2 border-t border-line p-3">
            <label htmlFor="chat-input" className="sr-only">
              Your question
            </label>
            <input
              id="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about Gervi's work…"
              maxLength={2000}
              className="min-w-0 flex-1 rounded-full border border-line bg-white px-4 py-2 text-sm outline-none transition-colors duration-200 focus:border-emerald"
            />
            <button
              type="button"
              onClick={send}
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="cursor-pointer rounded-full bg-forest p-2.5 text-warm transition-colors duration-200 hover:bg-emerald disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

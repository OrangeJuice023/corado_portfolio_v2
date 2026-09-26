"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "end" });
  }, [messages, open, reduced]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    setOpen(false);
    launcherRef.current?.focus();
  }

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
      <div className="group fixed bottom-4 right-4 z-50 flex items-center gap-3 sm:bottom-6 sm:right-6">
        {!open && (
          <span
            aria-hidden="true"
            className="tape pointer-events-none hidden translate-x-2 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 sm:inline-block"
          >
            Ask the systems assistant
          </span>
        )}
        <button
          ref={launcherRef}
          type="button"
          onClick={() => (open ? close() : setOpen(true))}
          aria-label={open ? "Close AI assistant" : "Open AI assistant"}
          aria-expanded={open}
          aria-controls="chat-panel"
          className="relative grid h-12 w-12 cursor-pointer sm:h-14 sm:w-14 place-items-center rounded-full bg-forest text-warm shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_10px_28px_-10px_rgba(27,67,50,0.7)] ring-4 ring-warm/80 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald active:translate-y-0"
        >
          {open ? <X size={20} /> : <MessageCircle size={20} />}
          {!open && (
            <span aria-hidden="true" className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full border-2 border-forest bg-sage" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="chat-panel"
            role="dialog"
            aria-modal="false"
            aria-labelledby="chat-title"
            initial={reduced ? false : { opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.21, 0.6, 0.35, 1] }}
            style={{ transformOrigin: "bottom right" }}
            className="surface-paper fixed inset-x-3 bottom-20 z-50 flex h-[min(30rem,72svh)] sm:bottom-24 flex-col overflow-hidden shadow-lifted sm:inset-x-auto sm:right-6 sm:w-[24rem]"
          >
            <div className="flex items-start justify-between gap-3 border-b border-line bg-warm px-5 py-4">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-forest text-warm shadow-raised">
                  <MessageCircle size={16} />
                </span>
                <div>
                  <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-emerald">
                    Systems assistant · AI
                  </p>
                  <p id="chat-title" className="font-display text-sm font-semibold text-charcoal">
                    Ask about Gervi
                  </p>
                  <p className="text-xs text-slate">AI assistant · answers questions about his work</p>
                </div>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close AI assistant"
                className="-mr-1 grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full text-slate transition-colors duration-200 hover:bg-warm-200 hover:text-forest"
              >
                <X size={16} />
              </button>
            </div>

            <div
              role="log"
              aria-live="polite"
              aria-label="Conversation"
              className="field-grid flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                    m.role === "user"
                      ? "ml-auto rounded-br-md bg-forest text-warm shadow-raised"
                      : "rounded-bl-md border border-line bg-paper text-charcoal shadow-raised",
                  )}
                >
                  <span className="sr-only">{m.role === "user" ? "You: " : "Assistant: "}</span>
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="inline-flex items-center gap-2 rounded-2xl rounded-bl-md border border-line bg-paper px-4 py-3 text-sm text-slate shadow-raised">
                  <span className="sr-only">Thinking…</span>
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      aria-hidden="true"
                      className="h-1.5 w-1.5 animate-soft-pulse rounded-full bg-emerald"
                      style={{ animationDelay: `${d * 0.25}s`, animationDuration: "1.2s" }}
                    />
                  ))}
                </div>
              )}
              <div ref={endRef} />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2 border-t border-line bg-warm p-3"
            >
              <label htmlFor="chat-input" className="sr-only">
                Your question
              </label>
              <input
                ref={inputRef}
                id="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Gervi's work…"
                maxLength={2000}
                autoComplete="off"
                className="field-input min-w-0 flex-1 !rounded-full !py-2.5"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full bg-forest text-warm shadow-raised transition-colors duration-200 hover:bg-emerald disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useState } from "react";
import { Send } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  async function submit() {
    if (status === "sending") return;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (data.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
        setError(data.error ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setError("Network error — email me directly instead.");
    }
  }

  if (status === "sent") {
    return (
      <p className="rounded-[18px] border border-emerald/30 bg-forest-50 p-6 text-emerald">
        Message sent — I&apos;ll get back to you soon. Thanks for reaching out.
      </p>
    );
  }

  const field =
    "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-emerald";

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="cf-name" className="mb-1.5 block text-sm font-medium">
          Name
        </label>
        <input
          id="cf-name"
          className={field}
          value={form.name}
          maxLength={100}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="cf-email" className="mb-1.5 block text-sm font-medium">
          Email
        </label>
        <input
          id="cf-email"
          type="email"
          className={field}
          value={form.email}
          maxLength={200}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="cf-msg" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="cf-msg"
          rows={5}
          className={field}
          value={form.message}
          maxLength={5000}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </div>
      {error && <p className="text-sm text-red-700">{error}</p>}
      <button
        type="button"
        onClick={submit}
        disabled={status === "sending"}
        className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-medium text-warm transition-colors duration-200 hover:bg-emerald disabled:opacity-50"
      >
        <Send size={15} />
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </div>
  );
}

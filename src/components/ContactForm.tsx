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
      <p role="status" className="rounded-[18px] border border-emerald/30 bg-forest-50 p-6 text-emerald">
        Message sent — I&apos;ll get back to you soon. Thanks for reaching out.
      </p>
    );
  }

  const label = "mb-2 block font-mono text-[0.66rem] uppercase tracking-[0.16em] text-ink-soft";

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <div>
        <label htmlFor="cf-name" className={label}>
          Name
        </label>
        <input
          id="cf-name"
          name="name"
          autoComplete="name"
          required
          className="field-input"
          value={form.name}
          maxLength={100}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="cf-email" className={label}>
          Email
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="field-input"
          value={form.email}
          maxLength={200}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="cf-msg" className={label}>
          Message
        </label>
        <textarea
          id="cf-msg"
          name="message"
          rows={5}
          required
          className="field-input resize-y"
          value={form.message}
          maxLength={5000}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </div>
      <p aria-live="polite" className="min-h-0 text-sm text-red-700 empty:hidden">
        {error}
      </p>
      <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:opacity-50">
        <Send size={15} />
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

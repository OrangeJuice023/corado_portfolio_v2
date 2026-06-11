import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit, clientIp } from "@/lib/rate-limit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const limit = rateLimit(`contact:${clientIp(req.headers)}`, 3, 600_000);
  if (!limit.success) {
    return NextResponse.json(
      { ok: false, error: "Too many messages — please try again later." },
      { status: 429 },
    );
  }

  let body: { name?: unknown; email?: unknown; message?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim().slice(0, 100) : "";
  const email = typeof body.email === "string" ? body.email.trim().slice(0, 200) : "";
  const message =
    typeof body.message === "string" ? body.message.trim().slice(0, 5000) : "";

  if (!name || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please fill in all fields with a valid email." },
      { status: 400 },
    );
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL) {
    console.error("contact route: missing RESEND_API_KEY or CONTACT_TO_EMAIL");
    return NextResponse.json(
      { ok: false, error: "Contact form is not configured yet." },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // [swap for your verified domain]
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(
      "contact route error:",
      error instanceof Error ? error.message : "unknown",
    );
    return NextResponse.json(
      { ok: false, error: "Could not send right now — email me directly instead." },
      { status: 502 },
    );
  }
}

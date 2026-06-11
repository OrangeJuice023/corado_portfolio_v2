# Gervi Corado — Portfolio V2

Building systems that turn complexity into clarity.

Next.js 15 · React 19 · TypeScript · Tailwind v4 · Framer Motion · d3-force ·
AI assistant on **Groq's free tier** (no credit card).

## Quick start

```bash
git clone https://github.com/OrangeJuice023/portfolio-v2.git
cd portfolio-v2
npm install
cp .env.example .env.local
# fill in LLM_API_KEY (free: https://console.groq.com/keys)
# and RESEND_API_KEY (free: https://resend.com)
npm run dev              # http://localhost:3000
```

Requires Node 18.18+ (Node 20+ recommended).

## Is it safe to make this repo PUBLIC?

Yes — by design:
- API keys live only in `.env.local` (local) and Vercel env vars (production).
- `.gitignore` excludes all `.env*` files except `.env.example` (dummy values).
- The chat route runs server-side; the key is never sent to the browser and
  never logged.
- If a real key ever lands in a commit by accident, rotate it immediately at
  console.groq.com / resend.com and rewrite the commit.

## The free AI assistant

Two-model pipeline, both on Groq's free tier:

1. `openai/gpt-oss-safeguard-20b` — guardrail. Classifies every message
   against a plain-English policy (`src/lib/moderation.ts`).
2. `llama-3.3-70b-versatile` — answers, scoped by a strict system prompt
   built from `src/lib/content/*` (including certifications).

Plus: per-IP rate limiting (10 msgs/min chat, 3/10min contact), input
validation, capped history, server-side key, no key logging.

**Swap providers without code changes** (OpenAI-compatible). In `.env.local`:

| Provider   | LLM_BASE_URL                      | LLM_MODEL (example)                       |
| ---------- | --------------------------------- | ----------------------------------------- |
| Groq       | https://api.groq.com/openai/v1    | llama-3.3-70b-versatile                    |
| OpenRouter | https://openrouter.ai/api/v1      | meta-llama/llama-3.3-70b-instruct:free     |
| Cerebras   | https://api.cerebras.ai/v1        | llama-3.3-70b                              |

If a provider lacks the safeguard model, set `LLM_MODERATION_ENABLED=false`.

## Editing content

All personal data lives in `src/lib/content/` — components never hardcode it:

- `profile.ts` — identity, about, resume, links
- `systems.ts` — case studies; disciplines are FILTER TAGS on one unified list
- `certifications.ts` — all credentials; add badge images to
  `/public/images/certs/` and set the `image` field to display them
- `impact.ts` — homepage metrics (keep them defensible)
- `writing.ts` — essays (set `published: true` when ready)

Search for `[bracketed]` placeholders and replace with real detail.

## Assets to add

- `/public/resume.pdf`
- `/public/images/portrait.jpg` (About page)
- `/public/images/certs/*.png` (optional cert badges)
- `/public/og.png` (optional social share image)

## Deploy

Push to GitHub → import in Vercel → add env vars from `.env.example`.
Note: the in-memory rate limiter is per-instance on serverless; for strict
global limits add Upstash Redis later.

import OpenAI from "openai";

/**
 * Provider-agnostic chat client. Defaults to Groq's FREE OpenAI-compatible
 * endpoint; swap providers by changing LLM_BASE_URL / LLM_MODEL / LLM_API_KEY.
 */
export const LLM_MODEL = process.env.LLM_MODEL ?? "llama-3.3-70b-versatile";
export const MODERATION_MODEL =
  process.env.LLM_MODERATION_MODEL ?? "openai/gpt-oss-safeguard-20b";
export const MODERATION_ENABLED =
  process.env.LLM_MODERATION_ENABLED !== "false";

const BASE_URL = process.env.LLM_BASE_URL ?? "https://api.groq.com/openai/v1";

let client: OpenAI | null = null;

export function getLLM(): OpenAI {
  if (!process.env.LLM_API_KEY) {
    throw new Error("LLM_API_KEY is not set");
  }
  if (!client) {
    client = new OpenAI({ apiKey: process.env.LLM_API_KEY, baseURL: BASE_URL });
  }
  return client;
}

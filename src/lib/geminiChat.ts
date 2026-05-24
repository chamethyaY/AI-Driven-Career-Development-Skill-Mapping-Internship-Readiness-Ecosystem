import { supabase } from "../services/supabase";

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? "";

export type Message = {
  role: "user" | "assistant";
  content: string;
};

// Build system prompt from user's profile
export const buildSystemPrompt = (
  goal: string,
  level: string,
  roles: string[],
  tickedSkills: string[],
): string => {
  return `
You are Forge AI, a friendly career mentor for student developers.
Be concise, practical and encouraging. Max 120 words per response.

About this user:
- Goal: ${goal === "internship" ? "Land a developer internship" : goal}
- Level: ${level}
- Role interests: ${roles.join(", ")}
- Skills already completed: ${tickedSkills.length > 0 ? tickedSkills.join(", ") : "none yet"}

Always give advice specific to their situation.
Never give generic advice. Reference their actual skills and goal.
  `.trim();
};

// Send message to Gemini
export const sendToGemini = async (
  messages: Message[],
  systemPrompt: string,
): Promise<string> => {
  try {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY)
      throw new Error("Missing Supabase env");

    const {
      data: { session },
    } = await supabase.auth.getSession();
    const accessToken = session?.access_token;

    if (!accessToken) {
      throw new Error("Missing user session token for edge function auth");
    }

    const fnUrl = `${SUPABASE_URL.replace(/\/$/, "")}/functions/v1/dynamic-task`;
    const resp = await fetch(fnUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ messages, systemPrompt }),
    });
    if (resp.ok) {
      const body = await resp.json();
      if (body?.reply) return body.reply;
    }

    const text = await resp.text().catch(() => "");
    console.warn(
      "Edge function dynamic-task failed:",
      resp.status,
      text.slice?.(0, 300),
    );

    const lastUser =
      [...messages].reverse().find((m) => m.role === "user")?.content ??
      "your question";

    return `Sorry — Forge AI is temporarily unavailable right now. Please try again in a moment. Quick tip for "${lastUser}": check the Learn tab for resources.`;
  } catch (e) {
    console.warn(
      "Edge function invocation failed:",
      e instanceof Error ? e.message : String(e),
    );
  }

  const lastUser =
    [...messages].reverse().find((m) => m.role === "user")?.content ??
    "your question";
  return `Sorry — Forge AI is temporarily unavailable right now. Quick tip for "${lastUser}": check the Learn tab for resources and try again shortly.`;
};

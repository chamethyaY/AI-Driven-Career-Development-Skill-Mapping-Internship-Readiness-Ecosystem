import { supabase } from "../services/supabase";

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? "";

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY ?? "";
console.log(
  "API KEY BEING USED:",
  process.env.EXPO_PUBLIC_GEMINI_API_KEY?.slice(0, 20),
);
const CLIENT_FALLBACK_MODELS = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-1.5-flash",
];

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
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  // Try server-side first
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
    } else {
      const text = await resp.text().catch(() => "");
      console.warn(
        "Edge function dynamic-task failed:",
        resp.status,
        text.slice?.(0, 300),
      );
    }
  } catch (e) {
    console.warn(
      "Edge function invocation failed, will attempt client fallback if key present:",
      e instanceof Error ? e.message : String(e),
    );
  }

  if (!GEMINI_API_KEY) {
    const lastUser =
      [...messages].reverse().find((m) => m.role === "user")?.content ??
      "your question";
    return `Sorry — AI chat is temporarily unavailable. The app is configured to use a server-side AI (recommended). Please deploy the server function or enable a public Gemini key for a temporary fallback. Quick tip for "${lastUser}": check the Learn tab for resources.`;
  }

  let lastErrorBody: any = null;
  for (const modelName of CLIENT_FALLBACK_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`;
      console.log("Trying client fallback URL:", url.slice(0, 120));

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents,
          generationConfig: { maxOutputTokens: 300, temperature: 0.7 },
        }),
      });

      const textBody = await response.text().catch(() => "");
      try {
        lastErrorBody = JSON.parse(textBody);
      } catch {
        lastErrorBody = textBody;
      }

      if (response.ok) {
        const candidateText =
          lastErrorBody?.candidates?.[0]?.content?.parts?.[0]?.text ||
          lastErrorBody?.output?.[0]?.content?.[0]?.text ||
          lastErrorBody?.text ||
          (typeof lastErrorBody === "string" ? lastErrorBody : null);
        if (candidateText) return candidateText;
      }

      if (response.status === 429) {
        const userMsg =
          typeof lastErrorBody === "string"
            ? lastErrorBody
            : (lastErrorBody?.message ?? "Rate limit or quota exceeded");
        return `Sorry — the AI service quota has been reached: ${String(userMsg).slice(0, 200)}. Please try again later or check the Learn tab for resources.`;
      }

      console.warn(
        `Client fallback model failed (${modelName}):`,
        response.status,
        JSON.stringify(lastErrorBody).slice?.(0, 300),
      );
    } catch (e) {
      lastErrorBody = e instanceof Error ? e.message : String(e);
      console.warn(
        `Client fallback request error (${modelName}):`,
        String(lastErrorBody),
      );
    }
  }

  const lastUser =
    [...messages].reverse().find((m) => m.role === "user")?.content ??
    "your question";
  return `Sorry — the AI service is temporarily unavailable. Quick tip for "${lastUser}": check the Learn tab for resources and try again shortly.`;
};

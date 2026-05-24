// @ts-nocheck
type ChatMessage = { role: string; content: string };

function jsonResponse(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: { "Content-Type": "application/json", ...(init.headers ?? {}) },
  });
}

function extractText(result: any): string {
  const candidates = result?.candidates;
  const parts = candidates?.[0]?.content?.parts;
  if (!Array.isArray(parts)) return "";
  return parts
    .map((p: any) => (typeof p?.text === "string" ? p.text : ""))
    .join("\n")
    .trim();
}

Deno.serve(async (req) => {
  try {
    if (req.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, { status: 405 });
    }

    let payload: { messages?: ChatMessage[]; systemPrompt?: string };
    try {
      payload = await req.json();
    } catch {
      return jsonResponse({ error: "Invalid JSON body" }, { status: 400 });
    }

    const messages = Array.isArray(payload.messages) ? payload.messages : [];
    const systemPrompt = String(payload.systemPrompt ?? "");

    const geminiKey = Deno.env.get("GEMINI_API_KEY");
    if (!geminiKey) {
      console.error("Missing GEMINI_API_KEY");
      return jsonResponse({ error: "Missing GEMINI_API_KEY" }, { status: 500 });
    }

    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const promptInstruction =
      systemPrompt ||
      "You are Forge AI, a friendly career mentor. Be concise and practical.";

    const modelConfigs = [
      { name: "gemini-2.5-flash", version: "v1beta" },
      { name: "gemini-2.0-flash", version: "v1beta" },
      { name: "gemini-1.5-flash", version: "v1beta" },
    ];

    let geminiResult: any = null;
    let lastError = "";

    for (const cfg of modelConfigs) {
      console.log(`Calling Gemini server-side: ${cfg.name}`);
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/${cfg.version}/models/${cfg.name}:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              system_instruction: { parts: [{ text: promptInstruction }] },
              contents,
              generationConfig: { temperature: 0.6, maxOutputTokens: 400 },
            }),
          },
        );

        console.log(`Gemini status: ${res.status}`);
        if (res.ok) {
          geminiResult = await res.json();
          break;
        }

        lastError = await res.text();
        console.warn("Gemini server error:", lastError.slice?.(0, 300));
      } catch (err) {
        lastError = err instanceof Error ? err.message : String(err);
        console.error("Gemini fetch error:", lastError);
      }
    }

    if (!geminiResult) {
      console.error("Gemini failed server-side", lastError);
      const lastUser =
        [...messages].reverse().find((m) => m.role === "user")?.content ??
        "your question";
      const fallback = `Sorry — the AI service is temporarily unavailable (rate limit or quota). Quick tip for "${lastUser}": check the Learn tab for resources and try again shortly.`;

      return jsonResponse({ reply: fallback });
    }

    const reply = extractText(geminiResult);
    return jsonResponse({ reply });
  } catch (err) {
    console.error("Unhandled error in dynamic-task:", err);
    return jsonResponse(
      {
        error: "Unexpected error",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 },
    );
  }
});

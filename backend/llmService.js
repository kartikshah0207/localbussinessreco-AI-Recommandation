const Groq = require("groq-sdk");

function safeJsonParse(text) {
  try {
    return { ok: true, value: JSON.parse(text) };
  } catch {
    return { ok: false, value: null };
  }
}

function extractJsonArray(text) {
  const direct = safeJsonParse(text);
  if (direct.ok && Array.isArray(direct.value)) return direct.value;

  // Regex extraction for first JSON array (handles extra text)
  const match = text.match(/\[[\s\S]*\]/m);
  if (!match) return null;

  const extracted = safeJsonParse(match[0]);
  if (extracted.ok && Array.isArray(extracted.value)) return extracted.value;
  return null;
}

function buildPrompt({ interests, businesses, topN }) {
  return `
User interests: ${interests.join(", ")}

Nearby businesses:
${businesses
  .map((b, idx) => `${idx + 1}. ${b.name} (${b.category}) [id:${b.id}]`)
  .join("\n")}

Task:
- Recommend top ${topN} places.
- Give one short reason for each.
- Return ONLY a JSON array. No markdown. No extra text.

JSON schema:
[
  { "id": "string", "reason": "string" }
]
`.trim();
}

async function callGroqOnce({ apiKey, prompt }) {
  const client = new Groq({ apiKey });
  const completion = await client.chat.completions.create({
    model: "llama3-70b-8192",
    
    temperature: 0.3,
    messages: [
      {
        role: "system",
        content:
          "You are a ranking engine. Output ONLY valid JSON that matches the schema. No prose."
      },
      { role: "user", content: prompt }
    ]
  });

  const content = completion?.choices?.[0]?.message?.content;
  if (typeof content !== "string") {
    const err = new Error("Groq returned an unexpected response");
    err.code = "LLM_BAD_RESPONSE";
    throw err;
  }

  return content;
}

async function getAIRecommendations(userPreferences, businesses, topN = 7) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    const err = new Error("GROQ_API_KEY is not configured");
    err.code = "LLM_NOT_CONFIGURED";
    throw err;
  }

  const interests = Array.isArray(userPreferences?.interests)
    ? userPreferences.interests.map((x) => String(x).trim()).filter(Boolean).slice(0, 20)
    : [];

  const payloadBusinesses = Array.isArray(businesses) ? businesses.slice(0, 15) : [];

  const prompt = buildPrompt({ interests, businesses: payloadBusinesses, topN });

  // Try once, then retry once if parsing fails
  const first = await callGroqOnce({ apiKey, prompt });
  let arr = extractJsonArray(first);

  if (!arr) {
    const retryPrompt = `${prompt}\n\nREMINDER: Output ONLY the JSON array.`;
    const second = await callGroqOnce({ apiKey, prompt: retryPrompt });
    arr = extractJsonArray(second);
  }

  if (!arr) {
    const err = new Error("Groq response was not valid JSON");
    err.code = "LLM_INVALID_JSON";
    throw err;
  }

  const cleaned = arr
    .map((item) => ({
      id: typeof item?.id === "string" ? item.id : null,
      reason: typeof item?.reason === "string" ? item.reason.trim() : null
    }))
    .filter((x) => x.id && x.reason);

  if (cleaned.length === 0) {
    const err = new Error("Groq returned empty recommendations");
    err.code = "LLM_BAD_RESPONSE";
    throw err;
  }

  return cleaned.slice(0, topN);
}

module.exports = {
  getAIRecommendations
};


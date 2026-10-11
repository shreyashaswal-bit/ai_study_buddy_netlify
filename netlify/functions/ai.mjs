export default async (request) => {
  if (request.method !== "POST") return new Response(JSON.stringify({ error: "Use POST for this endpoint." }), { status: 405, headers: { "Content-Type": "application/json" } });
  const key = process.env.OPENAI_API_KEY;
  if (!key) return new Response(JSON.stringify({ error: "OPENAI_API_KEY is not configured in Netlify." }), { status: 500, headers: { "Content-Type": "application/json" } });
  try {
    const { mode = "tutor", prompt = "" } = await request.json();
    if (typeof prompt !== "string" || !prompt.trim()) return new Response(JSON.stringify({ error: "Please enter a question or topic." }), { status: 400, headers: { "Content-Type": "application/json" } });
    const system = mode === "quiz"
      ? "You are a helpful school quiz maker. Make clear, age-appropriate practice questions. Include the answer key and brief explanations."
      : mode === "notes"
      ? "You are a helpful study assistant. Summarize notes clearly with headings and key points, preserving important facts."
      : "You are a kind, patient tutor for school students. Explain step by step in simple language, with a short example when useful.";
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "gpt-4o-mini", messages: [{ role: "system", content: system }, { role: "user", content: prompt }], temperature: 0.5 })
    });
    const data = await response.json();
    if (!response.ok) return new Response(JSON.stringify({ error: data?.error?.message || "AI provider request failed." }), { status: response.status, headers: { "Content-Type": "application/json" } });
    return new Response(JSON.stringify({ text: data.choices?.[0]?.message?.content || "No answer returned." }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request or temporary server error." }), { status: 400, headers: { "Content-Type": "application/json" } });
  }
};

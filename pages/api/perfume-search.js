const RATE_WINDOW_MS = 60_000;
const MAX_REQUESTS = 12;
const requests = new Map();

function getClientKey(req) {
  const forwarded = req.headers["x-forwarded-for"];
  return Array.isArray(forwarded) ? forwarded[0] : (forwarded || req.socket?.remoteAddress || "unknown").split(",")[0].trim();
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: "Live discovery is not configured yet. Please try again later." });
  }

  const query = typeof req.body?.query === "string" ? req.body.query.trim() : "";
  if (query.length < 2 || query.length > 120) {
    return res.status(400).json({ error: "Enter a search of 2–120 characters." });
  }

  const now = Date.now();
  const clientKey = getClientKey(req);
  const recent = (requests.get(clientKey) || []).filter(time => now - time < RATE_WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    return res.status(429).json({ error: "A little pause, please. Try again in a minute." });
  }
  recent.push(now);
  requests.set(clientKey, recent);

  try {
    const response = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        query: `${query} perfume fragrance notes review`,
        topic: "general",
        search_depth: "basic",
        max_results: 6,
        include_answer: false,
        include_raw_content: false
      }),
      signal: AbortSignal.timeout(15_000)
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 401 || status === 403) {
        console.error("Tavily authentication failed.");
        return res.status(502).json({ error: "Live discovery is temporarily unavailable. Please try again later." });
      }
      if (status === 429) {
        return res.status(429).json({ error: "The discovery service is busy. Please try again shortly." });
      }
      console.error("Tavily request failed with status:", status);
      return res.status(502).json({ error: "The discovery service could not complete that search." });
    }

    const data = await response.json();
    const results = (Array.isArray(data.results) ? data.results : [])
      .filter(item => typeof item.url === "string" && /^https?:\/\//i.test(item.url))
      .slice(0, 6)
      .map(item => {
        let domain = "";
        try { domain = new URL(item.url).hostname.replace(/^www\./, ""); } catch {}
        return {
          title: String(item.title || "Fragrance resource").slice(0, 180),
          url: item.url,
          domain,
          snippet: String(item.content || "").slice(0, 420)
        };
      });

    return res.status(200).json({ results });
  } catch (error) {
    console.error("Perfume discovery error:", error?.name || "UnknownError");
    return res.status(502).json({
      error: error?.name === "TimeoutError"
        ? "That search took too long. Please try again."
        : "Something went wrong while searching. Please try again."
    });
  }
}

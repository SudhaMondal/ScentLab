import { useState } from "react";

export default function PerfumeDiscovery() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  async function handleSearch(event) {
    event.preventDefault();
    const cleanQuery = query.trim();
    if (cleanQuery.length < 2 || cleanQuery.length > 120 || loading) return;

    setLoading(true);
    setError("");
    setResults([]);
    setSearched(true);

    try {
      const response = await fetch("/api/perfume-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: cleanQuery })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Search could not be completed.");
      setResults(Array.isArray(data.results) ? data.results : []);
    } catch (err) {
      setError(err.message || "Search could not be completed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="discovery section" id="discover">
      <div className="discovery-heading">
        <div>
          <small>02 / THE PERFUME FIELD GUIDE</small>
          <h2>Curiosity, <em>bottled.</em></h2>
          <p>Look beyond the archive. Search the wider fragrance world for perfumes, notes, reviews and scent stories.</p>
        </div>
        <span className="discovery-stamp">LIVE<br />FIND</span>
      </div>

      <form className="discovery-form" onSubmit={handleSearch}>
        <label className="sr-only" htmlFor="perfume-discovery-query">Search perfumes and fragrance notes</label>
        <input
          id="perfume-discovery-query"
          type="search"
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder="Try “rose oud”, “clean musk” or a perfume name..."
          minLength={2}
          maxLength={120}
          required
        />
        <button className="pixel-btn" type="submit" disabled={loading || query.trim().length < 2}>
          {loading ? "Searching..." : "Find scents ↗"}
        </button>
      </form>

      <p className="discovery-note">Search results link to independent websites. ScentLab does not endorse or verify every review.</p>

      {loading && <p className="discovery-status" role="status">✧ Turning the pages of the fragrance world...</p>}
      {error && <p className="discovery-error" role="alert">{error}</p>}
      {!loading && !error && searched && results.length === 0 && (
        <p className="discovery-status">No results this time. Try a perfume name, house or scent note.</p>
      )}

      {results.length > 0 && (
        <div className="discovery-results" aria-live="polite">
          {results.map((result, index) => (
            <article className="discovery-result" key={result.url}>
              <small>FIELD NOTE / {String(index + 1).padStart(2, "0")} · {result.domain}</small>
              <h3><a href={result.url} target="_blank" rel="noopener noreferrer">{result.title} ↗</a></h3>
              <p>{result.snippet}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

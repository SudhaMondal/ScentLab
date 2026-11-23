"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { recipes } from "@/lib/recipes";
import { RecipeCard } from "@/components/recipe-card";
import { getLocalRecipes } from "@/lib/local-store";
import type { Recipe } from "@/lib/recipes";

export function Discovery() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [localRecipes, setLocalRecipes] = useState<Recipe[]>([]);
  useEffect(() => { setLocalRecipes(getLocalRecipes()); }, []);
  const allRecipes = [...localRecipes, ...recipes];
  const filters = ["All", "Fresh", "Gourmand", "Floral", "Woody"];
  const results = useMemo(() => allRecipes.filter((recipe) => {
    const q = query.trim().toLowerCase();
    const haystack = [recipe.title, recipe.subtitle, recipe.description, recipe.creator, ...recipe.notes, ...recipe.tags, ...recipe.ingredients.map(x => x.material)].join(" ").toLowerCase();
    const matchesQuery = !q || haystack.includes(q);
    const matchesFilter = filter === "All" || recipe.category.toLowerCase().includes(filter.toLowerCase()) || recipe.tags.some(tag => tag.includes(filter.toLowerCase()));
    return matchesQuery && matchesFilter;
  }), [query, filter, localRecipes]);

  return (
    <section id="discover" className="discovery-section">
      <div className="section-heading">
        <div><span className="eyebrow"><Sparkles size={14} /> THE COMMUNITY FORMULA BOOK</span><h2>Find your next<br /><em>signature scent.</em></h2></div>
        <p>Search a note, follow a feeling, or fall down a fragrant rabbit hole. Your next obsession is probably one scroll away.</p>
      </div>
      <div className="search-panel">
        <Search size={20} />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try rosemary, chocolate, rose, amber…" aria-label="Search ingredients and recipes" />
        <span className="search-hint">INGREDIENT / MOOD / NOTE</span>
      </div>
      <div className="filter-row"><div className="filter-label"><SlidersHorizontal size={15} /> FILTER THE FEED</div>{filters.map(item => <button key={item} onClick={() => setFilter(item)} className={filter === item ? "filter-pill active" : "filter-pill"}>{item}</button>)}<span className="result-count">{results.length} recipes</span></div>
      {query.toLowerCase() === "chocolate" && <div className="search-note"><strong>Two kinds of chocolate:</strong> results distinguish formulas containing a cocoa material from accords that simply smell like chocolate.</div>}
      {results.length ? <div className="recipe-grid">{results.map((recipe, i) => <RecipeCard key={recipe.slug} recipe={recipe} index={i} />)}</div> : <div className="empty-state"><span>✳</span><h3>No scent found. Yet.</h3><p>Try another ingredient or clear your filters. Your next discovery might be waiting under a different name.</p><button className="button button-outline" onClick={() => { setQuery(""); setFilter("All"); }}>Clear search</button></div>}
    </section>
  );
}

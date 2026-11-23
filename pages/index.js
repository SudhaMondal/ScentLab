
import Head from "next/head";
import { useMemo, useState } from "react";

const starterRecipes = [
  {
    id: 1,
    name: "Rosemary After Rain",
    subtitle: "Green · Fresh · Earthy",
    category: "Fresh",
    mood: "A walk through a garden after a summer storm.",
    color: "#dce8d4",
    accent: "#557451",
    notes: ["Rosemary", "Bergamot", "Cedarwood"],
    ingredients: [
      { name: "Rosemary accord", grams: 4 },
      { name: "Bergamot accord", grams: 3 },
      { name: "Cedarwood accord", grams: 2 },
      { name: "Perfumer's alcohol", grams: 1 },
    ],
  },
  {
    id: 2,
    name: "Midnight Cacao",
    subtitle: "Warm · Sweet · Comforting",
    category: "Gourmand",
    mood: "Dark chocolate, warm evenings and a little mystery.",
    color: "#e9d5c3",
    accent: "#75503d",
    notes: ["Cacao", "Vanilla", "Tonka"],
    ingredients: [
      { name: "Cacao accord", grams: 4 },
      { name: "Vanilla accord", grams: 3 },
      { name: "Tonka accord", grams: 2 },
      { name: "Perfumer's alcohol", grams: 1 },
    ],
  },
  {
    id: 3,
    name: "Petals in Paris",
    subtitle: "Floral · Delicate · Romantic",
    category: "Floral",
    mood: "Soft rose petals with a clean, elegant finish.",
    color: "#f4d9df",
    accent: "#a45e70",
    notes: ["Rose", "Jasmine", "Musk"],
    ingredients: [
      { name: "Rose accord", grams: 4 },
      { name: "Jasmine accord", grams: 2 },
      { name: "Musk accord", grams: 3 },
      { name: "Perfumer's alcohol", grams: 1 },
    ],
  },
  {
    id: 4,
    name: "Golden Hour",
    subtitle: "Amber · Woody · Sensual",
    category: "Woody",
    mood: "Sun-warmed wood, soft amber and golden light.",
    color: "#f1dfb9",
    accent: "#96703c",
    notes: ["Amber", "Sandalwood", "Vanilla"],
    ingredients: [
      { name: "Amber accord", grams: 4 },
      { name: "Sandalwood accord", grams: 3 },
      { name: "Vanilla accord", grams: 2 },
      { name: "Perfumer's alcohol", grams: 1 },
    ],
  },
  {
    id: 5,
    name: "Citrus Club",
    subtitle: "Bright · Sparkling · Energetic",
    category: "Fresh",
    mood: "A bright citrus opening with a breezy finish.",
    color: "#f4e8b9",
    accent: "#927b35",
    notes: ["Lemon", "Sweet Orange", "Neroli"],
    ingredients: [
      { name: "Lemon accord", grams: 4 },
      { name: "Sweet orange accord", grams: 3 },
      { name: "Neroli accord", grams: 2 },
      { name: "Perfumer's alcohol", grams: 1 },
    ],
  },
  {
    id: 6,
    name: "Velvet Library",
    subtitle: "Smoky · Woody · Mysterious",
    category: "Woody",
    mood: "Old books, polished wood and quiet confidence.",
    color: "#d9d4ca",
    accent: "#66594c",
    notes: ["Cedar", "Patchouli", "Vanilla"],
    ingredients: [
      { name: "Cedarwood accord", grams: 4 },
      { name: "Patchouli accord", grams: 3 },
      { name: "Vanilla accord", grams: 2 },
      { name: "Perfumer's alcohol", grams: 1 },
    ],
  },
];

const categories = ["All", "Fresh", "Floral", "Gourmand", "Woody"];

function Bottle({ color, accent, small = false }) {
  return (
    <div className={`bottle ${small ? "bottle-small" : ""}`}>
      <div className="bottle-cap" style={{ background: accent }} />
      <div className="bottle-neck" style={{ background: color }} />
      <div className="bottle-body" style={{ background: color }}>
        <div className="bottle-label">
          <span>SCENT</span>
          <strong>LAB</strong>
          <i>EAU DE IDEAS</i>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [recipes, setRecipes] = useState(starterRecipes);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);
  const [saved, setSaved] = useState([]);
  const [batch, setBatch] = useState(10);
  const [showCreate, setShowCreate] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "Fresh",
    mood: "",
    notes: "",
    ingredients: "",
  });

  const filtered = useMemo(() => {
    return recipes.filter((recipe) => {
      const text = [
        recipe.name,
        recipe.subtitle,
        recipe.category,
        recipe.mood,
        ...recipe.notes,
        ...recipe.ingredients.map((item) => item.name),
      ].join(" ").toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase());
      const matchesCategory =
        category === "All" || recipe.category === category;
      const matchesSaved = !showSaved || saved.includes(recipe.id);

      return matchesSearch && matchesCategory && matchesSaved;
    });
  }, [recipes, search, category, saved, showSaved]);

  function toggleSaved(id) {
    setSaved((old) =>
      old.includes(id) ? old.filter((x) => x !== id) : [...old, id]
    );
  }

  function createRecipe(e) {
    e.preventDefault();

    const ingredients = form.ingredients
      .split("\n")
      .map((line) => {
        const parts = line.split("|");
        return {
          name: parts[0]?.trim(),
          grams: Number(parts[1]?.trim()),
        };
      })
      .filter((item) => item.name && Number.isFinite(item.grams) && item.grams > 0);

    if (!form.name.trim() || ingredients.length === 0) {
      alert("Please enter a recipe name and at least one valid ingredient.");
      return;
    }

    const colors = {
      Fresh: ["#dce8d4", "#557451"],
      Floral: ["#f4d9df", "#a45e70"],
      Gourmand: ["#e9d5c3", "#75503d"],
      Woody: ["#f1dfb9", "#96703c"],
    };

    const [color, accent] = colors[form.category] || colors.Fresh;

    const newRecipe = {
      id: Date.now(),
      name: form.name.trim(),
      subtitle: `${form.category} · Community creation`,
      category: form.category,
      mood: form.mood.trim() || "A fragrance created by the community.",
      color,
      accent,
      notes: ingredients.map((item) => item.name),
      ingredients,
    };

    setRecipes((old) => [newRecipe, ...old]);
    setForm({
      name: "",
      category: "Fresh",
      mood: "",
      notes: "",
      ingredients: "",
    });
    setShowCreate(false);
    setShowSaved(false);
    setSearch("");
    setCategory("All");
  }

  function openRecipe(recipe) {
    setSelected(recipe);
    setBatch(10);
  }

  return (
    <>
      <Head>
        <title>ScentLab — Create Your Own Scent</title>
        <meta
          name="description"
          content="Discover fragrance recipes, explore ingredients and experiment with your own scent."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="site">
        <nav className="navbar">
          <a className="logo" href="#" onClick={() => {
            setShowSaved(false);
            setSearch("");
            setCategory("All");
          }}>
            <span className="logo-mark">S.</span>
            <span>SCENTLAB</span>
          </a>

          <div className="nav-links">
            <a href="#explore">Explore</a>
            <a href="#how">How it works</a>
            <button
              className="nav-link-button"
              onClick={() => setShowSaved(!showSaved)}
            >
              Saved ({saved.length})
            </button>
          </div>

          <button className="nav-cta" onClick={() => setShowCreate(true)}>
            + Create a scent
          </button>
        </nav>

        <main>
          <section className="hero">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                THE PLAYGROUND FOR PERFUME PEOPLE
              </div>
              <h1>
                Your nose.
                <br />
                Your <em>rules.</em>
              </h1>
              <p>
                A little science, a little art, and a whole lot of curiosity.
                Discover fragrance recipes, experiment with ingredients and
                create a scent that feels like you.
              </p>
              <div className="hero-actions">
                <a href="#explore" className="primary-button">
                  Explore recipes <span>↗</span>
                </a>
                <button
                  className="secondary-button"
                  onClick={() => setShowCreate(true)}
                >
                  Make something new
                </button>
              </div>
              <div className="hero-footnote">
                <span>✳</span> MADE FOR THE CURIOUS, NOT THE CONNOISSEUR
              </div>
            </div>

            <div className="hero-art">
              <div className="art-circle circle-one" />
              <div className="art-circle circle-two" />
              <div className="art-label">THE ART OF<br />SMELLING GOOD.</div>
              <div className="hero-bottle">
                <Bottle color="#e8d5c2" accent="#8e6048" />
              </div>
              <div className="floating-note note-one">✳ ROSE</div>
              <div className="floating-note note-two">✳ CACAO</div>
              <div className="floating-note note-three">✳ AMBER</div>
              <div className="art-bottom">SCENT IS A MEMORY YOU CAN WEAR.</div>
            </div>
          </section>

          <section className="ticker">
            <div>
              EXPLORE <span>✳</span> MIX <span>✳</span> EXPERIMENT
              <span>✳</span> CREATE <span>✳</span> REPEAT <span>✳</span>
              EXPLORE <span>✳</span> MIX <span>✳</span> EXPERIMENT
              <span>✳</span> CREATE <span>✳</span> REPEAT <span>✳</span>
            </div>
          </section>

          <section className="explore-section" id="explore">
            <div className="section-heading">
              <div>
                <div className="eyebrow">THE SCENT LIBRARY</div>
                <h2>
                  Find your <em>notes.</em>
                </h2>
                <p>
                  Start with a feeling. Follow your nose.
                </p>
              </div>
              <div className="library-count">
                <strong>{recipes.length.toString().padStart(2, "0")}</strong>
                <span>RECIPES IN THE LAB</span>
              </div>
            </div>

            <div className="search-row">
              <div className="search-box">
                <span>⌕</span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search ingredients, moods, notes..."
                  aria-label="Search recipes"
                />
                {search && (
                  <button onClick={() => setSearch("")}>×</button>
                )}
              </div>
              <button
                className={`saved-filter ${showSaved ? "active" : ""}`}
                onClick={() => setShowSaved(!showSaved)}
              >
                ♡ {showSaved ? "Showing saved" : "My saved"}
              </button>
            </div>

            <div className="category-row">
              {categories.map((item) => (
                <button
                  key={item}
                  className={`category-pill ${category === item ? "active" : ""}`}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="recipe-grid">
              {filtered.map((recipe, index) => (
                <article className="recipe-card" key={recipe.id}>
                  <div
                    className="recipe-image"
                    style={{ background: recipe.color }}
                    onClick={() => openRecipe(recipe)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && openRecipe(recipe)}
                  >
                    <div className="card-number">
                      NO. {String(index + 1).padStart(2, "0")}
                    </div>
                    <button
                      className={`heart ${saved.includes(recipe.id) ? "hearted" : ""}`}
                      aria-label="Save recipe"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaved(recipe.id);
                      }}
                    >
                      {saved.includes(recipe.id) ? "♥" : "♡"}
                    </button>
                    <Bottle color="#fffaf0" accent={recipe.accent} small />
                    <div className="image-note">{recipe.category.toUpperCase()}</div>
                  </div>
                  <div className="recipe-info">
                    <div className="recipe-category">{recipe.subtitle}</div>
                    <h3>{recipe.name}</h3>
                    <p>{recipe.mood}</p>
                    <div className="card-bottom">
                      <div className="note-tags">
                        {recipe.notes.slice(0, 3).map((note) => (
                          <span key={note}>{note}</span>
                        ))}
                      </div>
                      <button
                        className="arrow-button"
                        onClick={() => openRecipe(recipe)}
                        aria-label={`Open ${recipe.name}`}
                      >
                        ↗
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="empty-state">
                <div>✳</div>
                <h3>Nothing in the air just yet.</h3>
                <p>Try another ingredient or create your own recipe.</p>
                <button className="primary-button" onClick={() => {
                  setSearch("");
                  setCategory("All");
                  setShowSaved(false);
                }}>
                  Reset filters
                </button>
              </div>
            )}
          </section>

          <section className="manifesto" id="how">
            <div className="manifesto-left">
              <div className="eyebrow">A NOTE FROM THE LAB</div>
              <h2>
                Perfume is
                <br />
                <em>personal.</em>
              </h2>
            </div>
            <div className="manifesto-right">
              <p>
                We believe fragrance shouldn't feel like a secret club.
                ScentLab is a space to learn, explore and play with the
                building blocks of scent.
              </p>
              <p>
                Find inspiration in the library. Learn how formulas work.
                Save the combinations you love. Then make something entirely
                your own.
              </p>
              <button className="text-link" onClick={() => setShowCreate(true)}>
                START EXPERIMENTING <span>↗</span>
              </button>
            </div>
            <div className="manifesto-stamp">SMELL<br />THINGS<br />DIFFERENTLY.</div>
          </section>

          <section className="create-banner">
            <div>
              <div className="eyebrow">YOUR TURN, PERFUMER</div>
              <h2>
                Got a scent
                <br />
                <em>in mind?</em>
              </h2>
              <p>Put your imagination into a formula.</p>
            </div>
            <button className="banner-button" onClick={() => setShowCreate(true)}>
              Create your recipe <span>↗</span>
            </button>
            <div className="banner-sparkle">✳</div>
          </section>
        </main>

        <footer>
          <a className="logo footer-logo" href="#">
            <span className="logo-mark">S.</span>
            <span>SCENTLAB</span>
          </a>
          <p>Made with curiosity. And probably too much perfume.</p>
          <span className="footer-copy">© 2026 SCENTLAB</span>
        </footer>
      </div>

      {selected && (
        <div className="overlay" onMouseDown={(e) => {
          if (e.target === e.currentTarget) setSelected(null);
        }}>
          <div className="modal recipe-modal">
            <button className="close-button" onClick={() => setSelected(null)}>×</button>
            <div className="modal-art" style={{ background: selected.color }}>
              <Bottle color="#fffaf0" accent={selected.accent} />
              <span className="modal-art-caption">SCENTLAB / FORMULA STUDY</span>
            </div>
            <div className="modal-content">
              <div className="eyebrow">{selected.category} FORMULA</div>
              <h2>{selected.name}</h2>
              <p className="modal-description">{selected.mood}</p>
              <div className="modal-divider" />
              <div className="formula-heading">
                <h3>The formula</h3>
                <div className="batch-control">
                  <label htmlFor="batch">BATCH SIZE</label>
                  <input
                    id="batch"
                    type="number"
                    min="1"
                    max="10000"
                    value={batch}
                    onChange={(e) => setBatch(Math.max(1, Number(e.target.value) || 1))}
                  />
                  <span>g</span>
                </div>
              </div>
              <div className="ingredient-list">
                {selected.ingredients.map((ingredient) => (
                  <div className="ingredient-row" key={ingredient.name}>
                    <span>{ingredient.name}</span>
                    <strong>{(ingredient.grams * batch / 10).toFixed(2)} g</strong>
                  </div>
                ))}
              </div>
              <div className="formula-total">
                <span>TOTAL BATCH</span>
                <strong>{batch} g</strong>
              </div>
              <div className="safety-note">
                <strong>LAB NOTE</strong>
                <p>
                  These are illustrative learning formulas, not validated
                  skin-safe perfume formulations. Before making or applying
                  any product, verify material identity, supplier safety
                  documentation, dilution limits, IFRA guidance and applicable
                  regulations. Do not apply experimental mixtures to skin.
                </p>
              </div>
              <button
                className="primary-button modal-save"
                onClick={() => toggleSaved(selected.id)}
              >
                {saved.includes(selected.id) ? "♥ Saved to your library" : "♡ Save this recipe"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showCreate && (
        <div className="overlay" onMouseDown={(e) => {
          if (e.target === e.currentTarget) setShowCreate(false);
        }}>
          <div className="modal create-modal">
            <button className="close-button" onClick={() => setShowCreate(false)}>×</button>
            <div className="eyebrow">THE LAB IS YOURS</div>
            <h2>Make a little <em>magic.</em></h2>
            <p className="modal-description">
              Give your experiment a name and write down its ingredients.
            </p>
            <form onSubmit={createRecipe}>
              <label>
                RECIPE NAME
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Sunday in the Garden"
                />
              </label>
              <label>
                FRAGRANCE FAMILY
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  {categories.filter((x) => x !== "All").map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </label>
              <label>
                THE MOOD
                <input
                  value={form.mood}
                  onChange={(e) => setForm({ ...form, mood: e.target.value })}
                  placeholder="What does this scent feel like?"
                />
              </label>
              <label>
                INGREDIENTS
                <span className="field-help">One ingredient per line: name | grams</span>
                <textarea
                  required
                  rows={5}
                  value={form.ingredients}
                  onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
                  placeholder={"Rose accord | 4\nVanilla accord | 3\nCedarwood accord | 2\nPerfumer's alcohol | 1"}
                />
              </label>
              <button className="primary-button submit-button" type="submit">
                Add to the lab ↗
              </button>
              <p className="form-footnote">
                This demo saves recipes in the current browser session only.
              </p>
            </form>
          </div>
        </div>
      )}

      <style jsx global>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #f8f5ee; color: #25251f; font-family: 'DM Sans', sans-serif; }
        button, input, textarea, select { font: inherit; }
        button { cursor: pointer; }
        a { color: inherit; text-decoration: none; }
        .site { overflow: hidden; }
        .navbar { height: 78px; padding: 0 7%; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #e8e3d9; background: #f8f5ee; }
        .logo { display: flex; align-items: center; gap: 10px; font-size: 13px; font-weight: 800; letter-spacing: 2px; }
        .logo-mark { display: grid; place-items: center; width: 32px; height: 32px; background: #d5e3cb; border-radius: 50%; font-family: 'Playfair Display', serif; font-size: 20px; letter-spacing: 0; }
        .nav-links { display: flex; align-items: center; gap: 34px; font-size: 12px; font-weight: 600; }
        .nav-links a:hover, .nav-link-button:hover { color: #9a7059; }
        .nav-link-button { border: 0; background: none; padding: 0; color: inherit; font-weight: 600; }
        .nav-cta, .primary-button { border: 0; background: #292c25; color: white; padding: 14px 20px; font-size: 11px; font-weight: 700; letter-spacing: .5px; transition: .2s; }
        .nav-cta:hover, .primary-button:hover { background: #607657; transform: translateY(-2px); }
        .hero { min-height: 590px; display: grid; grid-template-columns: 1fr 1fr; padding: 65px 10% 75px; gap: 50px; align-items: center; }
        .eyebrow { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 1.8px; color: #77766b; }
        .eyebrow-dot { display: inline-block; width: 7px; height: 7px; background: #9bb28d; border-radius: 50%; margin-right: 8px; }
        h1, h2 { font-family: 'Playfair Display', serif; font-weight: 500; letter-spacing: -2px; }
        .hero h1 { font-size: clamp(65px, 8vw, 112px); line-height: .98; margin: 25px 0; }
        h1 em, h2 em { color: #9b715b; font-weight: 500; }
        .hero-copy > p { max-width: 410px; color: #77766e; font-size: 14px; line-height: 1.9; }
        .hero-actions { display: flex; align-items: center; gap: 12px; margin-top: 30px; flex-wrap: wrap; }
        .primary-button { display: inline-flex; align-items: center; gap: 25px; }
        .secondary-button { border: 1px solid #d8d3c9; background: transparent; padding: 13px 18px; font-size: 11px; font-weight: 700; }
        .secondary-button:hover { border-color: #292c25; }
        .hero-footnote { margin-top: 65px; font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 1.2px; color: #929084; }
        .hero-footnote span { color: #a57b62; font-size: 15px; margin-right: 8px; }
        .hero-art { position: relative; min-height: 440px; background: #e8e4d8; overflow: hidden; display: grid; place-items: center; }
        .art-circle { position: absolute; border: 1px solid rgba(103,111,84,.22); border-radius: 50%; }
        .circle-one { width: 350px; height: 350px; }
        .circle-two { width: 260px; height: 260px; }
        .hero-bottle { position: relative; z-index: 2; transform: scale(1.45); margin-top: 30px; }
        .art-label { position: absolute; top: 36px; left: 35px; font-family: 'Playfair Display', serif; font-size: 17px; line-height: 1.1; }
        .art-bottom { position: absolute; bottom: 25px; font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 1.4px; color: #797b6d; }
        .floating-note { position: absolute; z-index: 3; background: #f8f5ee; padding: 10px 14px; font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 1px; box-shadow: 0 5px 20px #0000000c; }
        .note-one { top: 22%; right: 10%; transform: rotate(7deg); }
        .note-two { bottom: 25%; left: 8%; transform: rotate(-8deg); }
        .note-three { bottom: 19%; right: 8%; transform: rotate(5deg); }
        .bottle { width: 112px; height: 190px; display: flex; flex-direction: column; align-items: center; position: relative; filter: drop-shadow(12px 15px 12px #00000019); }
        .bottle-cap { width: 35px; height: 22px; border-radius: 5px 5px 2px 2px; }
        .bottle-neck { width: 27px; height: 18px; border-radius: 2px 2px 0 0; border: 1px solid #ffffff7a; }
        .bottle-body { width: 105px; height: 142px; border: 2px solid #ffffffa3; border-radius: 18px 18px 12px 12px; display: grid; place-items: center; box-shadow: inset 8px 0 10px #ffffff5c, inset -7px 0 10px #0000000b; }
        .bottle-label { width: 72px; height: 62px; background: #f8f5ee; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; color: #3b3c34; }
        .bottle-label span { font-family: 'DM Mono', monospace; font-size: 7px; letter-spacing: 2px; }
        .bottle-label strong { font-family: 'Playfair Display', serif; font-size: 21px; line-height: 1; }
        .bottle-label i { font-style: normal; font-family: 'DM Mono', monospace; font-size: 5px; letter-spacing: 1px; }
        .ticker { background: #d8e2d0; padding: 15px 0; overflow: hidden; white-space: nowrap; font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 2px; }
        .ticker div { text-align: center; }
        .ticker span { margin: 0 20px; color: #9a715b; }
        .explore-section { padding: 105px 10%; }
        .section-heading { display: flex; justify-content: space-between; align-items: end; margin-bottom: 38px; }
        .section-heading h2, .manifesto h2, .create-banner h2 { font-size: clamp(44px, 5vw, 66px); line-height: 1.05; margin: 14px 0; }
        .section-heading p { font-size: 13px; color: #858378; }
        .library-count { display: flex; flex-direction: column; align-items: end; gap: 4px; }
        .library-count strong { font-family: 'Playfair Display', serif; font-size: 40px; font-weight: 500; }
        .library-count span { font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 1px; color: #858378; }
        .search-row { display: flex; gap: 12px; margin-bottom: 20px; }
        .search-box { flex: 1; display: flex; align-items: center; gap: 12px; background: white; border: 1px solid #e8e3d9; padding: 0 17px; min-height: 48px; }
        .search-box > span { font-size: 24px; color: #89877c; }
        .search-box input { border: 0; outline: 0; flex: 1; background: transparent; font-size: 12px; min-width: 0; }
        .search-box button { border: 0; background: none; font-size: 20px; color: #777; }
        .saved-filter { background: transparent; border: 1px solid #ded9cf; padding: 0 18px; font-size: 11px; }
        .saved-filter.active { background: #292c25; color: white; }
        .category-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 35px; }
        .category-pill { border: 1px solid #ded9cf; background: transparent; border-radius: 30px; padding: 9px 17px; font-size: 10px; color: #77766e; }
        .category-pill.active { background: #d8e2d0; color: #30372c; border-color: #d8e2d0; }
        .recipe-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 35px 22px; }
        .recipe-card { min-width: 0; }
        .recipe-image { height: 260px; position: relative; display: grid; place-items: center; cursor: pointer; overflow: hidden; }
        .recipe-image::after { content: ""; position: absolute; inset: 12px; border: 1px solid #ffffff70; pointer-events: none; }
        .recipe-image:hover .bottle-small { transform: translateY(-7px) scale(1.05); }
        .bottle-small { transform: scale(.9); transition: .3s; }
        .card-number, .image-note { position: absolute; z-index: 2; font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 1px; color: #55564d; }
        .card-number { top: 25px; left: 25px; }
        .image-note { bottom: 24px; right: 25px; }
        .heart { position: absolute; z-index: 3; right: 22px; top: 18px; border: 0; background: #f8f5ee; width: 30px; height: 30px; border-radius: 50%; font-size: 17px; color: #555; }
        .heart.hearted { color: #b65c69; }
        .recipe-info { padding: 18px 2px 0; }
        .recipe-category { font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 1px; color: #9a715b; text-transform: uppercase; }
        .recipe-info h3 { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 500; margin: 8px 0; }
        .recipe-info > p { font-size: 11px; line-height: 1.7; color: #88867b; min-height: 38px; }
        .card-bottom { display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #e8e3d9; padding-top: 13px; margin-top: 14px; }
        .note-tags { display: flex; flex-wrap: wrap; gap: 5px; }
        .note-tags span { background: #eeeae1; padding: 5px 8px; font-size: 8px; color: #77766e; }
        .arrow-button { width: 29px; height: 29px; border: 1px solid #ded9cf; border-radius: 50%; background: transparent; }
        .arrow-button:hover { background: #d8e2d0; }
        .empty-state { text-align: center; padding: 70px 10px; }
        .empty-state > div { font-size: 40px; color: #9a715b; }
        .empty-state h3 { font-family: 'Playfair Display', serif; font-size: 27px; font-weight: 500; }
        .empty-state p { font-size: 12px; color: #858378; margin-bottom: 25px; }
        .manifesto { position: relative; background: #e9e5d9; padding: 90px 13%; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; overflow: hidden; }
        .manifesto-right { padding-top: 35px; max-width: 420px; }
        .manifesto-right p { font-size: 13px; line-height: 2; color: #77766e; }
        .text-link { margin-top: 20px; border: 0; background: none; padding: 0 0 8px; border-bottom: 1px solid #9a715b; font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 1px; }
        .text-link span { margin-left: 15px; }
        .manifesto-stamp { position: absolute; bottom: -35px; right: 5%; transform: rotate(-12deg); width: 125px; height: 125px; border: 1px solid #9c9a87; border-radius: 50%; display: grid; place-content: center; text-align: center; font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 2px; line-height: 1.6; color: #898675; }
        .create-banner { position: relative; margin: 90px 10%; background: #d8e2d0; padding: 65px 8%; display: flex; justify-content: space-between; align-items: center; overflow: hidden; }
        .create-banner h2 { font-size: 55px; }
        .create-banner p { font-size: 12px; color: #77766e; }
        .banner-button { position: relative; z-index: 2; background: #292c25; color: white; border: 0; padding: 18px 23px; font-size: 11px; font-weight: 700; }
        .banner-button span { margin-left: 20px; }
        .banner-sparkle { position: absolute; right: 28%; top: -80px; font-size: 220px; color: #ffffff50; }
        footer { border-top: 1px solid #e8e3d9; padding: 30px 7%; display: flex; justify-content: space-between; align-items: center; gap: 20px; }
        footer p, .footer-copy { color: #89877c; font-size: 9px; }
        .footer-copy { font-family: 'DM Mono', monospace; letter-spacing: 1px; }
        .overlay { position: fixed; z-index: 20; inset: 0; background: #1c1e19a8; display: grid; place-items: center; padding: 20px; overflow-y: auto; }
        .modal { position: relative; background: #f8f5ee; width: min(100%, 760px); max-height: 92vh; overflow-y: auto; }
        .close-button { position: absolute; z-index: 3; right: 18px; top: 15px; border: 0; background: #f8f5ee; width: 35px; height: 35px; border-radius: 50%; font-size: 23px; }
        .recipe-modal { display: grid; grid-template-columns: .85fr 1.15fr; }
        .modal-art { min-height: 530px; display: grid; place-items: center; position: relative; }
        .modal-art .bottle { transform: scale(1.4); }
        .modal-art-caption { position: absolute; bottom: 25px; font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 1px; }
        .modal-content { padding: 45px 35px; }
        .modal-content h2, .create-modal h2 { font-family: 'Playfair Display', serif; font-size: 38px; font-weight: 500; line-height: 1.1; margin: 12px 0; }
        .modal-description { font-size: 12px; color: #858378; line-height: 1.7; }
        .modal-divider { border-top: 1px solid #e2ddd3; margin: 25px 0; }
        .formula-heading { display: flex; justify-content: space-between; align-items: center; gap: 10px; }
        .formula-heading h3 { font-family: 'Playfair Display', serif; font-size: 21px; font-weight: 500; }
        .batch-control { display: flex; align-items: center; gap: 5px; font-size: 10px; }
        .batch-control label { font-family: 'DM Mono', monospace; font-size: 8px; }
        .batch-control input { width: 55px; padding: 6px; border: 1px solid #ded9cf; background: white; }
        .ingredient-row, .formula-total { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e8e3d9; font-size: 11px; }
        .ingredient-row strong, .formula-total strong { font-family: 'DM Mono', monospace; }
        .formula-total { border: 0; font-size: 10px; margin-top: 5px; }
        .safety-note { background: #eeeae1; padding: 14px; margin-top: 20px; }
        .safety-note strong { font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 1px; }
        .safety-note p { color: #77766e; font-size: 10px; line-height: 1.7; margin-bottom: 0; }
        .modal-save { margin-top: 20px; width: 100%; justify-content: center; }
        .create-modal { padding: 45px; width: min(100%, 520px); }
        .create-modal h2 { font-size: 42px; }
        .create-modal form { margin-top: 25px; display: flex; flex-direction: column; gap: 17px; }
        .create-modal form label { display: flex; flex-direction: column; gap: 8px; font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 1px; }
        .create-modal input, .create-modal select, .create-modal textarea { width: 100%; border: 1px solid #ded9cf; background: white; padding: 12px; outline: none; font-family: 'DM Sans', sans-serif; font-size: 12px; letter-spacing: 0; resize: vertical; }
        .create-modal input:focus, .create-modal select:focus, .create-modal textarea:focus { border-color: #8d9d80; }
        .field-help { font-family: 'DM Sans', sans-serif; font-size: 10px; color: #858378; letter-spacing: 0; }
        .submit-button { justify-content: center; }
        .form-footnote { text-align: center; color: #858378; font-size: 9px; line-height: 1.6; }
        @media (max-width: 850px) {
          .hero { padding-left: 7%; padding-right: 7%; gap: 25px; }
          .explore-section { padding-left: 7%; padding-right: 7%; }
          .recipe-grid { grid-template-columns: repeat(2, 1fr); }
          .manifesto { padding-left: 8%; padding-right: 8%; }
        }
        @media (max-width: 600px) {
          .navbar { height: 65px; padding: 0 5%; }
          .nav-links { display: none; }
          .nav-cta { padding: 11px 12px; font-size: 9px; }
          .hero { grid-template-columns: 1fr; padding: 65px 7% 55px; }
          .hero h1 { font-size: 75px; }
          .hero-art { min-height: 360px; }
          .hero-footnote { margin-top: 35px; }
          .explore-section { padding: 70px 6%; }
          .section-heading h2 { font-size: 48px; }
          .library-count { display: none; }
          .search-row { flex-direction: column; }
          .search-box { min-height: 48px; }
          .saved-filter { min-height: 40px; }
          .recipe-grid { grid-template-columns: 1fr 1fr; gap: 25px 12px; }
          .recipe-image { height: 190px; }
          .recipe-info h3 { font-size: 19px; }
          .recipe-info > p { font-size: 10px; }
          .note-tags span { font-size: 7px; padding: 4px 5px; }
          .manifesto { grid-template-columns: 1fr; gap: 5px; padding: 65px 8%; }
          .manifesto-right { padding-top: 0; }
          .create-banner { margin: 55px 6%; padding: 40px 7%; flex-direction: column; align-items: flex-start; gap: 25px; }
          .create-banner h2 { font-size: 48px; }
          footer { flex-wrap: wrap; padding: 25px 6%; }
          footer p { order: 3; width: 100%; }
          .recipe-modal { grid-template-columns: 1fr; }
          .modal-art { min-height: 230px; }
          .modal-art .bottle { transform: scale(.9); }
          .modal-content { padding: 30px 22px; }
          .create-modal { padding: 40px 23px 25px; }
        }
      `}</style>
    </>
  );
}

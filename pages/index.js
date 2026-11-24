import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import PerfumeDiscovery from "../components/PerfumeDiscovery";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

const starterRecipes = [
  {
    id: "seed-1",
    name: "Rosemary After Rain",
    category: "Fresh",
    mood: "A green garden after a summer storm.",
    notes: ["Rosemary", "Bergamot", "Cedarwood"],
    color: "#b8d4ad",
    ingredients: [
      { name: "Rosemary accord", grams: 4 },
      { name: "Bergamot accord", grams: 3 },
      { name: "Cedarwood accord", grams: 2 },
      { name: "Perfumer's alcohol", grams: 1 }
    ],
    instructions: ["Prepare clean, dry glass equipment, a precision scale, a glass stirrer and a labelled sample vial. Work with ventilation and suitable protective equipment.", "Weigh each accord separately using the quantities shown for your chosen batch size.", "Combine the cedarwood and rosemary accords in a glass beaker and stir slowly until uniform.", "Add the bergamot accord gradually, stirring gently after each addition.", "Add the listed perfumer's alcohol slowly while stirring. Keep the beaker covered between additions.", "Transfer to the labelled vial and leave closed for 48 hours. Evaluate on a blotter strip only; this starter formula is not validated for skin use."]
  },
  {
    id: "seed-2",
    name: "Midnight Cacao",
    category: "Gourmand",
    mood: "Dark chocolate, warm evenings and a little mystery.",
    notes: ["Cacao", "Vanilla", "Tonka"],
    color: "#c99c7e",
    ingredients: [
      { name: "Cacao accord", grams: 4 },
      { name: "Vanilla accord", grams: 3 },
      { name: "Tonka accord", grams: 2 },
      { name: "Perfumer's alcohol", grams: 1 }
    ],
    instructions: ["Prepare clean, dry glass equipment, a precision scale, a glass stirrer and a labelled sample vial. Work with ventilation and suitable protective equipment.", "Weigh each accord separately using the quantities shown for your chosen batch size.", "Combine the tonka and vanilla accords in a glass beaker and stir slowly.", "Add the cacao accord in small portions, stirring until the blend is uniform.", "Add the listed perfumer's alcohol gradually while stirring gently.", "Transfer to the labelled vial and leave closed for 48 hours. Evaluate on a blotter strip only; this starter formula is not validated for skin use."]
  },
  {
    id: "seed-3",
    name: "Petals in Paris",
    category: "Floral",
    mood: "Soft rose petals with a clean, elegant finish.",
    notes: ["Rose", "Jasmine", "Musk"],
    color: "#edb7c8",
    ingredients: [
      { name: "Rose accord", grams: 4 },
      { name: "Jasmine accord", grams: 2 },
      { name: "Musk accord", grams: 3 },
      { name: "Perfumer's alcohol", grams: 1 }
    ],
    instructions: ["Prepare clean, dry glass equipment, a precision scale, a glass stirrer and a labelled sample vial. Work with ventilation and suitable protective equipment.", "Weigh each accord separately using the quantities shown for your chosen batch size.", "Combine the musk and rose accords in a glass beaker and stir gently until uniform.", "Add the jasmine accord gradually, mixing slowly.", "Add the listed perfumer's alcohol in small portions while stirring gently.", "Transfer to the labelled vial and leave closed for 48 hours. Evaluate on a blotter strip only; this starter formula is not validated for skin use."]
  },
  {
    id: "seed-4",
    name: "Golden Hour",
    category: "Woody",
    mood: "Sun-warmed wood, soft amber and golden light.",
    notes: ["Amber", "Sandalwood", "Vanilla"],
    color: "#e4c27b",
    ingredients: [
      { name: "Amber accord", grams: 4 },
      { name: "Sandalwood accord", grams: 3 },
      { name: "Vanilla accord", grams: 2 },
      { name: "Perfumer's alcohol", grams: 1 }
    ],
    instructions: ["Prepare clean, dry glass equipment, a precision scale, a glass stirrer and a labelled sample vial. Work with ventilation and suitable protective equipment.", "Weigh each accord separately using the quantities shown for your chosen batch size.", "Combine the sandalwood and vanilla accords in a glass beaker and stir until uniform.", "Add the amber accord gradually, stirring slowly.", "Add the listed perfumer's alcohol a little at a time while stirring gently.", "Transfer to the labelled vial and leave closed for 48 hours. Evaluate on a blotter strip only; this starter formula is not validated for skin use."]
  },
  {
    id: "seed-5",
    name: "Citrus Club",
    category: "Fresh",
    mood: "A bright citrus opening with a breezy finish.",
    notes: ["Lemon", "Sweet Orange", "Neroli"],
    color: "#e9d875",
    ingredients: [
      { name: "Lemon accord", grams: 4 },
      { name: "Sweet orange accord", grams: 3 },
      { name: "Neroli accord", grams: 2 },
      { name: "Perfumer's alcohol", grams: 1 }
    ],
    instructions: ["Prepare clean, dry glass equipment, a precision scale, a glass stirrer and a labelled sample vial. Work with ventilation and suitable protective equipment.", "Weigh each accord separately using the quantities shown for your chosen batch size.", "Combine the neroli and sweet orange accords in a glass beaker and stir gently.", "Add the lemon accord gradually, mixing until uniform.", "Add the listed perfumer's alcohol slowly while stirring.", "Transfer to the labelled vial and leave closed for 48 hours. Evaluate on a blotter strip only; this starter formula is not validated for skin use."]
  },
  {
    id: "seed-6",
    name: "Velvet Library",
    category: "Woody",
    mood: "Old books, polished wood and quiet confidence.",
    notes: ["Cedar", "Patchouli", "Vanilla"],
    color: "#aaa18e",
    ingredients: [
      { name: "Cedarwood accord", grams: 4 },
      { name: "Patchouli accord", grams: 3 },
      { name: "Vanilla accord", grams: 2 },
      { name: "Perfumer's alcohol", grams: 1 }
    ],
    instructions: ["Prepare clean, dry glass equipment, a precision scale, a glass stirrer and a labelled sample vial. Work with ventilation and suitable protective equipment.", "Weigh each accord separately using the quantities shown for your chosen batch size.", "Combine the vanilla and patchouli accords in a glass beaker and stir slowly.", "Add the cedarwood accord gradually, stirring until uniform.", "Add the listed perfumer's alcohol in small portions while stirring gently.", "Transfer to the labelled vial and leave closed for 48 hours. Evaluate on a blotter strip only; this starter formula is not validated for skin use."]
  }
];

const families = ["All", "Fresh", "Floral", "Gourmand", "Woody"];

function Bottle({ color = "#c9dcb8" }) {
  return (
    <div className="bottle">
      <div className="bottle-cap" />
      <div className="bottle-neck" />
      <div className="bottle-glass" style={{ background: color }}>
        <span>SCENT<br />LAB</span>
      </div>
    </div>
  );
}

export default function Home() {
  const [recipes, setRecipes] = useState(starterRecipes);
  const [search, setSearch] = useState("");
  const [family, setFamily] = useState("All");
  const [user, setUser] = useState(null);
  const [selected, setSelected] = useState(null);
  const [batch, setBatch] = useState(10);
  const [saved, setSaved] = useState([]);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [onlySaved, setOnlySaved] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    category: "Fresh",
    mood: "",
    notes: "",
    ingredients: "",
    instructions: ""
  });

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (active) setUser(data.session?.user || null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user || null)
    );

    supabase.from("recipes")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (active && data?.length) setRecipes(data);
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!supabase || !user) {
      setSaved([]);
      setLikes([]);
      return;
    }

    let active = true;

    Promise.all([
      supabase.from("saved_recipes")
        .select("recipe_id")
        .eq("user_id", user.id),

      supabase.from("recipe_likes")
        .select("recipe_id")
        .eq("user_id", user.id)
    ]).then(([saves, liked]) => {
      if (!active) return;

      setSaved((saves.data || []).map(x => x.recipe_id));
      setLikes((liked.data || []).map(x => x.recipe_id));
    });

    return () => {
      active = false;
    };
  }, [user]);

  useEffect(() => {
    if (!selected || !supabase || String(selected.id).startsWith("seed-")) {
      setComments([]);
      return;
    }

    supabase.from("comments")
      .select("id,body,created_at,user_id")
      .eq("recipe_id", selected.id)
      .order("created_at")
      .then(({ data }) => setComments(data || []));
  }, [selected]);

  const filtered = useMemo(() => {
    return recipes.filter(recipe => {
      const searchable = [
        recipe.name,
        recipe.category,
        recipe.mood,
        ...(recipe.notes || []),
        ...(recipe.ingredients || []).map(x => x.name),
        ...(recipe.instructions || [])
      ].join(" ").toLowerCase();

      return (
        searchable.includes(search.toLowerCase()) &&
        (family === "All" || recipe.category === family) &&
        (!onlySaved || saved.includes(recipe.id))
      );
    });
  }, [recipes, search, family, onlySaved, saved]);

  const ingredientTotal = (selected?.ingredients || [])
    .reduce((sum, item) => sum + Number(item.grams || 0), 0);

  async function handleAuth(event) {
    event.preventDefault();
    setAuthMessage("");

    if (!supabase) {
      setAuthMessage(
        "Supabase is not configured. Add the Vercel environment variables first."
      );
      return;
    }

    const result = authMode === "signup"
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (result.error) {
      setAuthMessage(result.error.message);
    } else if (authMode === "signup") {
      setAuthMessage(
        "Account created. Check your email to confirm your address."
      );
    } else {
      setAuthOpen(false);
      setPassword("");
    }
  }

  async function toggleSaved(id) {
    if (!user) {
      setAuthOpen(true);
      setNotice("Sign in to save recipes.");
      return;
    }

    if (String(id).startsWith("seed-")) {
      setNotice(
        "Starter recipes become saveable after the database setup."
      );
      return;
    }

    const exists = saved.includes(id);

    setSaved(current => exists
      ? current.filter(item => item !== id)
      : [...current, id]
    );

    const result = exists
      ? await supabase.from("saved_recipes")
          .delete()
          .eq("recipe_id", id)
          .eq("user_id", user.id)
      : await supabase.from("saved_recipes")
          .insert({ recipe_id: id, user_id: user.id });

    if (result.error) {
      setSaved(current => exists
        ? [...current, id]
        : current.filter(item => item !== id)
      );
      setNotice(result.error.message);
    }
  }

  async function toggleLike(id) {
    if (!user) {
      setAuthOpen(true);
      return;
    }

    if (String(id).startsWith("seed-")) {
      setNotice("Likes are available on published community recipes.");
      return;
    }

    const exists = likes.includes(id);

    setLikes(current => exists
      ? current.filter(item => item !== id)
      : [...current, id]
    );

    const result = exists
      ? await supabase.from("recipe_likes")
          .delete()
          .eq("recipe_id", id)
          .eq("user_id", user.id)
      : await supabase.from("recipe_likes")
          .insert({ recipe_id: id, user_id: user.id });

    if (result.error) setNotice(result.error.message);
  }

  async function publishRecipe(event) {
    event.preventDefault();

    if (!user) {
      setAuthOpen(true);
      setNotice("Sign in before publishing a recipe.");
      return;
    }

    const ingredients = form.ingredients
      .split("\n")
      .map(line => {
        const [name, grams] = line.split("|");

        return {
          name: (name || "").trim(),
          grams: Number((grams || "").trim())
        };
      })
      .filter(item =>
        item.name &&
        item.grams > 0 &&
        Number.isFinite(item.grams)
      );

    if (!ingredients.length) {
      setNotice("Add ingredients using: ingredient name | grams");
      return;
    }

    const instructions = form.instructions
      .split("\n")
      .map(step => step.trim())
      .filter(Boolean);

    if (!instructions.length) {
      setNotice("Add at least one preparation step.");
      return;
    }

    const payload = {
      user_id: user.id,
      name: form.name.trim(),
      category: form.category,
      mood: form.mood.trim(),
      notes: form.notes.split(",")
        .map(x => x.trim())
        .filter(Boolean),
      ingredients,
      instructions,
      is_published: true
    };

    const { data, error } = await supabase
      .from("recipes")
      .insert(payload)
      .select()
      .single();

    if (error) {
      setNotice(error.message);
      return;
    }

    setRecipes(current => [data, ...current]);
    setCreateOpen(false);

    setForm({
      name: "",
      category: "Fresh",
      mood: "",
      notes: "",
      ingredients: "",
      instructions: ""
    });

    setNotice("Your recipe has been published!");
  }

  async function postComment(event) {
    event.preventDefault();

    if (!user) {
      setAuthOpen(true);
      return;
    }

    if (
      !selected ||
      String(selected.id).startsWith("seed-") ||
      !comment.trim()
    ) return;

    const { data, error } = await supabase.from("comments")
      .insert({
        recipe_id: selected.id,
        user_id: user.id,
        body: comment.trim()
      })
      .select("id,body,created_at,user_id")
      .single();

    if (error) {
      setNotice(error.message);
    } else {
      setComments(current => [...current, data]);
      setComment("");
    }
  }

  return (
    <>
      <Head>
        <title>ScentLab — The Pixel Perfumery Library</title>
        <meta
          name="description"
          content="A little pixel-art perfumery library. Discover fragrance recipes, explore scent notes and share your own formulas."
        />
        <meta name="theme-color" content="#f4efe3" />
      </Head>

      <div className="site">
        <header className="nav">
          <a className="logo" href="#">
            ✿ SCENT<span>LAB</span>
            <small>THE PIXEL PERFUMERY LIBRARY</small>
          </a>

          <nav>
            <a href="#explore">The Library</a>
            <a href="#discover">Discover</a>
            <a href="#community">Makers' Corner</a>
          </nav>

          <div className="nav-actions">
            {user ? (
              <>
                <span className="user-label">{user.email}</span>
                <button
                  className="plain"
                  onClick={() => supabase.auth.signOut()}
                >
                  Sign out
                </button>
              </>
            ) : (
              <button
                className="plain"
                onClick={() => setAuthOpen(true)}
              >
                Sign in
              </button>
            )}

            <button
              className="pixel-btn"
              onClick={() => setCreateOpen(true)}
            >
              ＋ Create recipe
            </button>
          </div>
        </header>

        <main>
          <section className="hero">
            <div className="hero-copy">
              <div className="eyebrow">
                ✧ A LITTLE CABINET OF SCENTED CURIOSITIES
              </div>

              <h1>
                Make a scent.<br />
                <em>Make a story.</em>
              </h1>

              <p>
                Step into a tiny pixel universe inspired by old perfume
                houses, botanical notebooks and curious makers. Discover
                fragrance recipes, explore beautiful notes, and compose
                a little something of your own.
              </p>

              <div className="hero-actions">
                <a className="pixel-btn" href="#explore">
                  Browse the library ↗
                </a>

                <button
                  className="plain"
                  onClick={() => setCreateOpen(true)}
                >
                  ＋ Compose a formula
                </button>
              </div>

              <div className="micro-stats">
                ✿ A CABINET OF SCENTS　 ▦ FORMULAS & FIELD NOTES　 ✧ MADE TO EXPLORE
              </div>
            </div>

            <div className="hero-art">
              <span className="hero-label">
                SCENT LAB<br />
                <small>NO. 001 / THE BOTANICAL EDITION</small>
              </span>

              <span className="sun">✦</span>
              <Bottle />
              <span className="flower flower-one">✿</span>
              <span className="flower flower-two">✿</span>
              <span className="hero-tag">ROSE + MOSS</span>
              <span className="hero-side-note">EAU DE PIXEL · EST. 2026</span>
            </div>
          </section>

          <div className="ticker">
            ✦ TURN THE PAGE　 ✿　 FOLLOW THE NOTES　 ✿　 MIX YOUR MAGIC　 ✿　 A LIBRARY OF LITTLE SCENTS　 ✦
          </div>

          <section className="section" id="explore">
            <div className="library-intro">
              <div className="section-heading">
                <div>
                  <small>01 / THE RECIPE ARCHIVE</small>
                  <h2>
                    Find your <em>next obsession.</em>
                  </h2>
                  <p>Collected notes, curious formulas and fragrant little stories.</p>
                </div>

                <strong>
                  {recipes.length.toString().padStart(2, "0")}
                  <small>ENTRIES IN THE ARCHIVE</small>
                </strong>
              </div>

              <div className="library-rule">
                <span>THE SCENT INDEX</span>
                <span>VOL. I · 2026</span>
              </div>
            </div>

            <div className="search-row">
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="⌕  Search notes, moods, ingredients..."
              />

              <button
                className={onlySaved ? "active-filter" : ""}
                onClick={() => {
                  if (!user && !onlySaved) {
                    setAuthOpen(true);
                    return;
                  }
                  setOnlySaved(!onlySaved);
                }}
              >
                ♡ My saved lab
              </button>
            </div>

            <div className="filters">
              {families.map(item => (
                <button
                  key={item}
                  className={family === item ? "active" : ""}
                  onClick={() => setFamily(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            {loading && (
              <p className="muted">Opening the archive…</p>
            )}

            <div className="cards">
              {filtered.map((recipe, index) => (
                <article className="recipe-card" key={recipe.id}>
                  <div
                    className="recipe-art"
                    style={{ background: recipe.color || "#c9dcb8" }}
                  >
                    <small>
                      ARCHIVE / {String(index + 1).padStart(2, "0")}
                    </small>

                    <button
                      className="heart"
                      aria-label="Save recipe"
                      onClick={() => toggleSaved(recipe.id)}
                    >
                      {saved.includes(recipe.id) ? "♥" : "♡"}
                    </button>

                    <button
                      className="art-open"
                      aria-label={`Open ${recipe.name}`}
                      onClick={() => {
                        setSelected(recipe);
                        setBatch(10);
                      }}
                    >
                      <Bottle color={recipe.color || "#c9dcb8"} />
                      <span>✧ OPEN SCENT STUDY ✧</span>
                    </button>
                  </div>

                  <div className="recipe-meta">
                    {recipe.category}
                    <span>✦ {(recipe.notes || []).length} NOTES</span>
                  </div>

                  <button
                    className="recipe-name"
                    onClick={() => {
                      setSelected(recipe);
                      setBatch(10);
                    }}
                  >
                    {recipe.name} ↗
                  </button>

                  <p>{recipe.mood}</p>

                  <div className="note-tags">
                    {(recipe.notes || []).slice(0, 3).map(note => (
                      <span key={note}>{note}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            {!filtered.length && (
              <div className="empty">
                <h3>No little bottles found.</h3>
                <p>Try another note or clear your filters.</p>

                <button
                  className="plain"
                  onClick={() => {
                    setSearch("");
                    setFamily("All");
                    setOnlySaved(false);
                  }}
                >
                  Clear filters ↗
                </button>
              </div>
            )}
          </section>

          <PerfumeDiscovery />

          <section className="community" id="community">
            <div className="community-art" aria-hidden="true">
              <span>✦</span>
              <span>🧴</span>
              <span>✿</span>
            </div>

            <div>
              <small>FROM ONE SCENT MAKER TO ANOTHER</small>

              <h2>
                A good formula<br />
                deserves <em>a little story.</em>
              </h2>

              <p>
                Keep your favourite blends close, share the experiments
                you are proud of, and leave a kind note for another maker.
                The library is lovelier when we build it together.
              </p>

              <button
                className="pixel-btn"
                onClick={() => user ? setCreateOpen(true) : setAuthOpen(true)}
              >
                Visit the makers' corner ↗
              </button>
            </div>
          </section>
        </main>

        <footer>
          <a className="logo" href="#">
            ✿ SCENT<span>LAB</span>
            <small>THE PIXEL PERFUMERY LIBRARY</small>
          </a>

          <p>Made of notes, pixels & a little imagination.</p>
          <small>© SCENTLAB 2026</small>
        </footer>

        <nav className="hotbar">
          <a href="#explore">⌕<small>Library</small></a>
          <a href="#community">✿<small>Club</small></a>

          <button
            onClick={() => user ? setCreateOpen(true) : setAuthOpen(true)}
          >
            ♙<small>My Lab</small>
          </button>
        </nav>

        {notice && (
          <button className="notice" onClick={() => setNotice("")}>
            {notice}　×
          </button>
        )}

        {selected && (
          <div
            className="overlay"
            onMouseDown={e => {
              if (e.target === e.currentTarget) setSelected(null);
            }}
          >
            <section className="detail-modal">
              <button
                className="close"
                onClick={() => setSelected(null)}
              >
                ×
              </button>

              <div
                className="detail-art"
                style={{ background: selected.color || "#c9dcb8" }}
              >
                <Bottle color={selected.color || "#c9dcb8"} />
              </div>

              <div className="detail-content">
                <small>{selected.category} / FORMULA</small>
                <h2>{selected.name}</h2>
                <p>{selected.mood}</p>

                <div className="note-tags">
                  {(selected.notes || []).map(note => (
                    <span key={note}>{note}</span>
                  ))}
                </div>

                <div className="formula-heading">
                  <h3>Ingredient recipe</h3>

                  <label>
                    Target batch
                    <input
                      type="number"
                      min="1"
                      max="10000"
                      value={batch}
                      onChange={e =>
                        setBatch(Math.max(1, Number(e.target.value) || 1))
                      }
                    />
                    g
                  </label>
                </div>

                {(selected.ingredients || []).map((item, i) => (
                  <div className="ingredient" key={i}>
                    <span>{item.name}</span>
                    <b>
                      {(
                        Number(item.grams || 0) *
                        batch /
                        (ingredientTotal || 1)
                      ).toFixed(2)} g
                    </b>
                  </div>
                ))}

                <div className="ingredient total">
                  <span>FORMULA TOTAL</span>
                  <b>{batch} g</b>
                </div>

                <section className="preparation">
                  <h3>How to make it</h3>
                  {(selected.instructions || []).length ? (
                    <ol>
                      {selected.instructions.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  ) : (
                    <p className="muted">The maker has not added preparation steps for this recipe yet.</p>
                  )}
                </section>

                <div className="safety">
                  <b>LAB SAFETY NOTE</b>
                  <p>
                    These are illustrative learning formulas, not
                    validated skin-safe perfume formulations. Verify
                    material identity, supplier safety documentation,
                    dilution limits, current IFRA guidance and applicable
                    regulations. Do not apply experimental mixtures
                    to skin.
                  </p>
                </div>

                <div className="detail-actions">
                  <button
                    className="pixel-btn"
                    onClick={() => toggleSaved(selected.id)}
                  >
                    {saved.includes(selected.id) ? "♥ Saved" : "♡ Save recipe"}
                  </button>

                  <button
                    className="like"
                    onClick={() => toggleLike(selected.id)}
                  >
                    ♥ {likes.includes(selected.id) ? "Liked" : "Like"}
                  </button>
                </div>

                <div className="comments">
                  <h3>Little notes from the community</h3>

                  {comments.map(item => (
                    <p key={item.id}>
                      <b>Scent maker · {item.user_id.slice(0, 6)}</b>
                      <br />
                      {item.body}
                    </p>
                  ))}

                  {!comments.length && (
                    <small className="muted">
                      No comments yet. Be the first to leave a note.
                    </small>
                  )}

                  {user && !String(selected.id).startsWith("seed-") && (
                    <form onSubmit={postComment}>
                      <input
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        placeholder="Leave a kind note…"
                      />
                      <button>Post ↗</button>
                    </form>
                  )}
                </div>
              </div>
            </section>
          </div>
        )}

        {authOpen && (
          <div
            className="overlay"
            onMouseDown={e => {
              if (e.target === e.currentTarget) setAuthOpen(false);
            }}
          >
            <section className="small-modal">
              <button
                className="close"
                onClick={() => setAuthOpen(false)}
              >
                ×
              </button>

              <small>WELCOME TO YOUR LITTLE LAB</small>

              <h2>
                {authMode === "signup"
                  ? "Create your account."
                  : "Come on in."}
              </h2>

              <p>
                Save your favourite formulas and share your own experiments.
              </p>

              <form onSubmit={handleAuth}>
                <label>
                  Email
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </label>

                <label>
                  Password
                  <input
                    type="password"
                    minLength="6"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                  />
                </label>

                <button className="pixel-btn full">
                  {authMode === "signup" ? "Create account" : "Sign in"} ↗
                </button>
              </form>

              <button
                className="plain switch"
                onClick={() => {
                  setAuthMode(
                    authMode === "signup" ? "signin" : "signup"
                  );
                  setAuthMessage("");
                }}
              >
                {authMode === "signup"
                  ? "Already registered? Sign in"
                  : "New here? Create an account"}
              </button>

              {authMessage && (
                <p className="auth-message">{authMessage}</p>
              )}
            </section>
          </div>
        )}

        {createOpen && (
          <div
            className="overlay"
            onMouseDown={e => {
              if (e.target === e.currentTarget) setCreateOpen(false);
            }}
          >
            <section className="small-modal create-modal">
              <button
                className="close"
                onClick={() => setCreateOpen(false)}
              >
                ×
              </button>

              <small>THE PERFUMER'S NOTEBOOK</small>

              <h2>
                Make a little <em>magic.</em>
              </h2>

              <p>
                Write down your formula and send it into the ScentLab library.
              </p>

              <form onSubmit={publishRecipe}>
                <label>
                  Recipe name
                  <input
                    required
                    value={form.name}
                    onChange={e =>
                      setForm({ ...form, name: e.target.value })
                    }
                    placeholder="Sunday in the garden"
                  />
                </label>

                <label>
                  Fragrance family
                  <select
                    value={form.category}
                    onChange={e =>
                      setForm({ ...form, category: e.target.value })
                    }
                  >
                    {families.filter(x => x !== "All").map(x => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                </label>

                <label>
                  The mood
                  <input
                    value={form.mood}
                    onChange={e =>
                      setForm({ ...form, mood: e.target.value })
                    }
                    placeholder="What does this scent feel like?"
                  />
                </label>

                <label>
                  Notes
                  <input
                    value={form.notes}
                    onChange={e =>
                      setForm({ ...form, notes: e.target.value })
                    }
                    placeholder="Rose, vanilla, cedar"
                  />
                </label>

                <label>
                  Ingredients
                  <small>One per line: ingredient | grams</small>
                  <textarea
                    rows="5"
                    required
                    value={form.ingredients}
                    onChange={e =>
                      setForm({ ...form, ingredients: e.target.value })
                    }
                    placeholder={"Rose accord | 4\nVanilla accord | 3\nCedarwood accord | 2\nPerfumer's alcohol | 1"}
                  />
                </label>

                <label>
                  Preparation method
                  <small>Write each making step on a separate line, in the order it should be performed.</small>
                  <textarea
                    rows="7"
                    required
                    value={form.instructions}
                    onChange={e =>
                      setForm({ ...form, instructions: e.target.value })
                    }
                    placeholder={"1. Prepare clean, dry equipment.\n2. Weigh each ingredient.\n3. Combine the aromatic materials.\n4. Add the diluent gradually and mix.\n5. Bottle, label and allow to rest before evaluation."}
                  />
                </label>

                <button className="pixel-btn full">
                  Publish recipe ↗
                </button>
              </form>

              {!user && (
                <p className="auth-message">
                  Sign in is required to publish a recipe.
                </p>
              )}
            </section>
          </div>
        )}
      </div>
    </>
  );
}

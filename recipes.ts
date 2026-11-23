export type IngredientLine = {
  material: string;
  amount: number;
  stock: string;
  role: string;
};

export type Recipe = {
  slug: string;
  title: string;
  subtitle: string;
  creator: string;
  category: string;
  notes: string[];
  mood: string;
  color: string;
  image: string;
  description: string;
  ingredients: IngredientLine[];
  steps: string[];
  tags: string[];
  materialMatch: boolean;
  demo: boolean;
};

export const recipes: Recipe[] = [
  {
    slug: "rosemary-coastline",
    title: "Rosemary, by the Coast",
    subtitle: "Salt air · green stems · sun-warmed citrus",
    creator: "Mira Sol",
    category: "Fresh / aromatic",
    notes: ["Rosemary", "Bergamot", "Sea salt accord"],
    mood: "A walk along the shore",
    color: "sage",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1000&q=85",
    description: "A bright, breezy scent concept built around the herbal snap of rosemary and a citrus opening. A community concept formula for learning the structure of an accord.",
    ingredients: [
      { material: "Rosemary accord (demo)", amount: 0.8, stock: "10% in carrier (demo)", role: "Heart" },
      { material: "Bergamot accord (demo)", amount: 1.2, stock: "10% in carrier (demo)", role: "Top" },
      { material: "Sea-air accord (demo)", amount: 0.5, stock: "10% in carrier (demo)", role: "Heart" },
      { material: "Soft cedar accord (demo)", amount: 0.5, stock: "10% in carrier (demo)", role: "Base" }
    ],
    steps: ["Prepare and label clean, suitable glassware.", "Weigh each demo material accurately using a suitable precision scale.", "Combine in the listed order and mix gently.", "Record the date, materials, and observations. This is a synthetic UI example, not a manufacturing formula."],
    tags: ["rosemary", "fresh", "green", "citrus"],
    materialMatch: true,
    demo: true
  },
  {
    slug: "rosemary-forest",
    title: "The Rosemary Forest",
    subtitle: "Crushed leaves · dry cedar · earthy air",
    creator: "Noah Atelier",
    category: "Woody / green",
    notes: ["Rosemary", "Cedar", "Vetiver accord"],
    mood: "A quiet forest after rain",
    color: "forest",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=85",
    description: "A darker interpretation of rosemary: less sparkling coastline, more crushed green leaves and dry woods.",
    ingredients: [
      { material: "Rosemary accord (demo)", amount: 1.0, stock: "10% in carrier (demo)", role: "Heart" },
      { material: "Cedarwood accord (demo)", amount: 1.1, stock: "10% in carrier (demo)", role: "Base" },
      { material: "Vetiver accord (demo)", amount: 0.6, stock: "10% in carrier (demo)", role: "Base" },
      { material: "Moss accord (demo)", amount: 0.3, stock: "10% in carrier (demo)", role: "Base" }
    ],
    steps: ["Set up a clean, labelled work area.", "Weigh the listed demo materials.", "Combine slowly, then mix gently until uniform.", "Document the materials and your sensory observations. Synthetic demonstration only."],
    tags: ["rosemary", "woody", "forest", "green"],
    materialMatch: true,
    demo: true
  },
  {
    slug: "cacao-after-hours",
    title: "Cacao After Hours",
    subtitle: "Dark cocoa · vanilla warmth · soft woods",
    creator: "Jules Parfum",
    category: "Gourmand",
    notes: ["Cocoa absolute*", "Vanilla accord", "Sandalwood accord"],
    mood: "A late-night chocolate café",
    color: "cacao",
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=1000&q=85",
    description: "A gourmand direction that explicitly includes a cocoa material in its concept. Ingredient identity and stock details must be verified before any real-world use.",
    ingredients: [
      { material: "Cocoa absolute concept (demo)", amount: 0.7, stock: "10% in carrier (demo)", role: "Heart" },
      { material: "Vanilla accord (demo)", amount: 1.0, stock: "10% in carrier (demo)", role: "Heart" },
      { material: "Sandalwood accord (demo)", amount: 0.8, stock: "10% in carrier (demo)", role: "Base" },
      { material: "Benzoin accord (demo)", amount: 0.5, stock: "10% in carrier (demo)", role: "Base" }
    ],
    steps: ["Review the material identities and documentation before any practical work.", "Weigh each synthetic demo line.", "Blend in a clean, labelled vessel.", "Record the result and any changes. This sample is not a validated formula."],
    tags: ["chocolate", "cacao", "gourmand", "vanilla"],
    materialMatch: true,
    demo: true
  },
  {
    slug: "chocolate-cloud",
    title: "Chocolate Cloud",
    subtitle: "Milky cocoa impression · fluffy vanilla · musk",
    creator: "Ari Bloom",
    category: "Gourmand / soft",
    notes: ["Chocolate accord", "Vanilla", "Soft musk accord"],
    mood: "A soft-focus dessert dream",
    color: "pink",
    image: "https://images.unsplash.com/photo-1548907040-4d42cfcf6f8b?auto=format&fit=crop&w=1000&q=85",
    description: "A chocolate-smelling accord concept. This result is an olfactory impression and does not claim to contain cocoa absolute.",
    ingredients: [
      { material: "Chocolate accord (demo)", amount: 1.0, stock: "10% in carrier (demo)", role: "Heart" },
      { material: "Vanilla accord (demo)", amount: 0.9, stock: "10% in carrier (demo)", role: "Heart" },
      { material: "Soft musk accord (demo)", amount: 0.7, stock: "10% in carrier (demo)", role: "Base" },
      { material: "Cream accord (demo)", amount: 0.4, stock: "10% in carrier (demo)", role: "Top" }
    ],
    steps: ["Prepare clean, labelled glassware.", "Weigh each demo accord.", "Combine and mix gently.", "Write down the first impression and revisit your notes later. Synthetic demo only."],
    tags: ["chocolate", "gourmand", "sweet", "vanilla"],
    materialMatch: false,
    demo: true
  },
  {
    slug: "rose-postcard",
    title: "A Rose Postcard",
    subtitle: "Petal-soft rose · pear · clean linen",
    creator: "Studio Fleur",
    category: "Floral",
    notes: ["Rose accord", "Pear accord", "Musk accord"],
    mood: "A handwritten note in spring",
    color: "rose",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1000&q=85",
    description: "A sheer floral direction with a juicy fruit lift and a clean, airy finish.",
    ingredients: [
      { material: "Rose accord (demo)", amount: 1.2, stock: "10% in carrier (demo)", role: "Heart" },
      { material: "Pear accord (demo)", amount: 0.6, stock: "10% in carrier (demo)", role: "Top" },
      { material: "Clean musk accord (demo)", amount: 0.8, stock: "10% in carrier (demo)", role: "Base" }
    ],
    steps: ["Label the vessel and record the date.", "Weigh each demo material.", "Blend gently and document the scent direction.", "Revisit and add observations to your experiment log. Synthetic demo only."],
    tags: ["rose", "floral", "fresh"],
    materialMatch: true,
    demo: true
  },
  {
    slug: "amber-library",
    title: "Amber in the Library",
    subtitle: "Golden resin · paper · quiet woods",
    creator: "The Scent Shelf",
    category: "Amber / woody",
    notes: ["Amber accord", "Benzoin accord", "Dry woods"],
    mood: "Old books and late afternoon light",
    color: "amber",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1000&q=85",
    description: "A warm, resinous concept with a softly woody finish and a nostalgic library mood.",
    ingredients: [
      { material: "Amber accord (demo)", amount: 1.1, stock: "10% in carrier (demo)", role: "Heart" },
      { material: "Benzoin accord (demo)", amount: 0.8, stock: "10% in carrier (demo)", role: "Base" },
      { material: "Dry woods accord (demo)", amount: 0.7, stock: "10% in carrier (demo)", role: "Base" }
    ],
    steps: ["Prepare a clean, labelled vessel.", "Weigh the demo materials.", "Combine and mix gently.", "Record your impressions over time. Synthetic demonstration only."],
    tags: ["amber", "woody", "resinous"],
    materialMatch: true,
    demo: true
  }
];

export function getRecipe(slug: string) {
  return recipes.find((recipe) => recipe.slug === slug);
}

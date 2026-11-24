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
  ,
  {
    "id": "seed-7",
    "name": "Citrus Linen",
    "category": "Fresh",
    "mood": "Bright orange and lavender over a clean, airy woody-musky base.",
    "notes": [
      "Sweet Orange",
      "Lavender",
      "Hedione",
      "Soft Woods",
      "Clean Musk"
    ],
    "color": "#e8c47e",
    "ingredients": [
      {
        "name": "Sweet Orange Essential Oil",
        "grams": 2
      },
      {
        "name": "Lavender Essential Oil",
        "grams": 0.5
      },
      {
        "name": "Hedione",
        "grams": 3.5
      },
      {
        "name": "Ethylene Brassylate",
        "grams": 1
      },
      {
        "name": "Iso E Super",
        "grams": 1.5
      },
      {
        "name": "Ambroxan 10% in DPG",
        "grams": 0.9
      },
      {
        "name": "Vanillin 10% in DPG",
        "grams": 0.6
      }
    ],
    "instructions": [
      "Reference concentrate: 10.00 g. Equipment: 0.01 g-resolution scale, clean dry glass beaker with a loose cover, separate labelled weighing cups, glass rod, one clean pipette per liquid material, blotter strips, 25–30 mL glass mixing bottle with a tight cap, and an ethanol-compatible fine filter. Wear nitrile gloves and eye protection; work with ventilation. Perfumer's ethanol is flammable: keep it away from flames, sparks and heat. Do not heat the mixture.",
      "Weigh the 10.00 g concentrate separately, taring the scale before every material: Ethylene Brassylate 1.00 g; Iso E Super 1.50 g; Ambroxan solution (10% Ambroxan in DPG) 0.90 g; Vanillin solution (10% Vanillin in DPG) 0.60 g; Hedione 3.50 g; Lavender Essential Oil 0.50 g; Sweet Orange Essential Oil 2.00 g. The Ambroxan and Vanillin lines are already 10% solutions: do not add another 10% dilution to them.",
      "Add the heavier base materials first: Ethylene Brassylate, Iso E Super, Ambroxan 10% in DPG and Vanillin 10% in DPG. Add Hedione and Lavender next. Add Sweet Orange Essential Oil last to reduce its exposure to air while weighing. After the final addition, stir slowly for 2 minutes, scraping the bottom and sides until the concentrate is uniform. Keep the beaker loosely covered between additions.",
      "For one 25.00 g finished EDP reference batch, weigh 5.20 g of the 10.00 g concentrate into a clean, dry 25–30 mL glass bottle. Add 19.80 g perfumer's ethanol (approximately 95–96% ethanol) by weight. This is the source's worked calculation: the concentrate includes DPG from its two 10% solutions, so 5.20 g concentrate supplies approximately 4.50 g aromatic material. Do not substitute beverage alcohol or measure by drops or volume.",
      "Cap immediately and gently invert 20 times over about 30 seconds. Do not leave the bottle open. Label it with formula name, batch date, 18% aromatic strength, and raw-material lot numbers. Store upright, tightly closed, cool and dark for 90 days.",
      "Maturation checks: Day 2 — with the cap closed, gently invert 10 times. Day 7 — place one drop on a blotter; assess at 30 seconds, 10 minutes and 1 hour. Day 45 — repeat the blotter assessment and record any change. Keep the bottle sealed between checks.",
      "At Day 90, chill the closed bottle at approximately 4°C for 24 hours. While still cold, filter through clean ethanol-compatible fine filter paper or a suitable approximately 1 µm PTFE/cellulose filter into a clean glass vessel. Avoid incompatible plastics. Let the filtered sample stand at room temperature for 24 hours; if haze or sediment returns, re-check stability and filter again before filling. This is a clarity step, not a substitute for a safety assessment."
    ],
    "formula_type": "published_reference",
    "target_strength": 18,
    "finished_batch_grams": 25,
    "finished_concentrate_grams": 5.2,
    "finished_alcohol_grams": 19.8,
    "maceration_days": 90,
    "compliance_status": "source_reference_pass",
    "compliance_basis": "The source reports an IFRA Category 4 reference-calculator pass at 18% aromatic strength using the listed material grades. This is a source-reported calculation, not an IFRA-issued certificate or an independent safety assessment.",
    "source_title": "PerfuMate — How to make perfume at home",
    "source_url": "https://perfumate.app/learn/how-to-make-perfume-at-home",
    "method_source_title": "PerfuMate — Perfume making basics and maceration schedule",
    "method_source_url": "https://perfumate.app/learn/how-long-to-macerate-perfume",
    "formula_strength_label": "Eau de Parfum · 18% aromatic strength"
  },
  {
    "id": "seed-8",
    "name": "Citrus Grove Cologne",
    "category": "Fresh",
    "mood": "A crisp citrus cologne with aromatic herbs and a light musky-woody backbone.",
    "notes": [
      "Bergamot FCF",
      "Lemon",
      "Petitgrain",
      "Neroli",
      "Rosemary",
      "Lavender"
    ],
    "color": "#d9d78b",
    "ingredients": [
      {
        "name": "Ethylene Brassylate",
        "grams": 1
      },
      {
        "name": "Iso E Super",
        "grams": 0.5
      },
      {
        "name": "Hedione",
        "grams": 1.5
      },
      {
        "name": "Lavender Essential Oil",
        "grams": 1
      },
      {
        "name": "Rosemary Essential Oil",
        "grams": 0.5
      },
      {
        "name": "Neroli Essential Oil",
        "grams": 0.5
      },
      {
        "name": "Petitgrain Bigarade Essential Oil",
        "grams": 1
      },
      {
        "name": "Lemon Essential Oil (cold-pressed)",
        "grams": 1.5
      },
      {
        "name": "Bergamot FCF Essential Oil",
        "grams": 2.5
      }
    ],
    "instructions": [
      "Reference concentrate: 10.00 g. Equipment: 0.01 g-resolution scale, clean dry glass beaker with a loose cover, separate labelled weighing cups, glass rod, one clean pipette per liquid material, blotter strips, 25–30 mL glass mixing bottle with a tight cap, and an ethanol-compatible fine filter. Wear nitrile gloves and eye protection; work with ventilation. Perfumer's ethanol is flammable: keep it away from flames, sparks and heat. Do not heat the mixture.",
      "Weigh the normalized 10.00 g concentrate, taring the scale before each line: Ethylene Brassylate 1.00 g; Iso E Super 0.50 g; Hedione 1.50 g; Lavender Essential Oil 1.00 g; Rosemary Essential Oil 0.50 g; Neroli Essential Oil 0.50 g; Petitgrain Bigarade Essential Oil 1.00 g; Lemon Essential Oil (cold-pressed) 1.50 g; Bergamot FCF Essential Oil 2.50 g. These are exactly half the 20.00 g concentrate quantities in the source formula; the proportions are unchanged.",
      "Add Ethylene Brassylate, Iso E Super and Hedione first. Add Lavender, Rosemary, Neroli and Petitgrain next. Add cold-pressed Lemon Essential Oil and Bergamot FCF Essential Oil last. Stir slowly for 2 minutes after the final addition until uniform, keeping the beaker loosely covered between additions.",
      "For one 25.00 g finished cologne reference batch at 5% concentrate, weigh 1.25 g of the 10.00 g concentrate into a clean, dry 25–30 mL glass bottle. Add 23.75 g perfumer's ethanol (approximately 95–96% ethanol) by weight. Cap immediately and gently invert 20 times over about 30 seconds. Do not measure by drops or volume.",
      "Label with formula name, batch date, 5% strength and raw-material lot numbers. Store upright, tightly closed, cool and dark for 60 days. The source's Category 4 reference check is specific to this formula and its stated grades, including cold-pressed lemon and bergamot FCF; do not replace them with expressed bergamot or a different citrus grade without recalculating.",
      "Maturation checks: Day 2 — with the cap closed, gently invert 10 times. Day 7 — place one drop on a blotter; assess at 30 seconds, 10 minutes and 1 hour. Day 30 — repeat the blotter assessment and record any change. Keep the bottle sealed between checks.",
      "At Day 60, chill the closed bottle at approximately 4°C for 24 hours. While still cold, filter through clean ethanol-compatible fine filter paper or a suitable approximately 1 µm PTFE/cellulose filter into a clean glass vessel. Avoid incompatible plastics. Let the filtered sample stand at room temperature for 24 hours; if haze or sediment returns, re-check stability and filter again before filling."
    ],
    "formula_type": "published_reference",
    "target_strength": 5,
    "finished_batch_grams": 25,
    "finished_concentrate_grams": 1.25,
    "finished_alcohol_grams": 23.75,
    "maceration_days": 60,
    "compliance_status": "source_reference_pass",
    "compliance_basis": "The source reports an IFRA Category 4 reference-calculator pass at 5% strength under the 51st Amendment. Its cold-pressed lemon line sets the stated maximum strength; the check is grade-specific and is not an IFRA-issued certificate or an independent safety assessment.",
    "source_title": "PerfuMate — Perfume recipes for beginners (citrus cologne formula)",
    "source_url": "https://perfumate.app/learn/perfume-recipes-for-beginners",
    "method_source_title": "PerfuMate — How to make an eau de cologne at home",
    "method_source_url": "https://perfumate.app/learn/how-to-make-eau-de-cologne",
    "formula_strength_label": "Eau de Cologne · 5% concentrate"
  }

];

const detailedStarterInstructions = {
  "Rosemary After Rain": [
    "Standard batch: 10.00 g. Work at 20–25°C in good ventilation, away from flames, sparks and hot surfaces. Wear nitrile gloves and eye protection. Equipment: 0.01 g-resolution scale, 30–50 mL clean dry glass beaker, glass rod, four weighing cups, disposable pipettes, blotter strips and a clean 10–15 mL amber glass vial. Do not heat any material.",
    "Tare separate cups and weigh: Rosemary accord 4.00 g; Bergamot accord 3.00 g; Cedarwood accord 2.00 g; perfumer's alcohol 1.00 g. Keep the alcohol capped. The ingredient list above recalculates the weights if you change the batch size.",
    "Put 2.00 g Cedarwood accord and 4.00 g Rosemary accord into the beaker. Stir slowly for 90 seconds, scraping the base and sides until uniform.",
    "Add 3.00 g Bergamot accord in 3 equal 1.00 g portions, 30 seconds apart. Stir for 45 seconds after each portion, then stir for a further 60 seconds.",
    "Add 1.00 g perfumer's alcohol in 4 equal 0.25 g portions, 30 seconds apart. Stir 30 seconds after each addition, then stir continuously for 2 minutes. Keep the beaker loosely covered between additions; never seal it while mixing.",
    "Transfer to the labelled vial, cap tightly and gently invert 10 times. Record date and ingredient lot numbers. Rest upright, cool and dark for 48 hours; assess again after 7 days. Put one small drop on a blotter and record at 5 minutes, 30 minutes, 2 hours and 24 hours. Blotter-only: not approved for skin use."
  ],
  "Midnight Cacao": [
    "Standard batch: 10.00 g. Work at 20–25°C in good ventilation, away from flames, sparks and hot surfaces. Wear nitrile gloves and eye protection. Equipment: 0.01 g-resolution scale, 30–50 mL clean dry glass beaker, glass rod, four weighing cups, disposable pipettes, blotter strips and a clean 10–15 mL amber glass vial. Do not heat any material.",
    "Tare separate cups and weigh: Cacao accord 4.00 g; Vanilla accord 3.00 g; Tonka accord 2.00 g; perfumer's alcohol 1.00 g. Keep the alcohol capped. The ingredient list above recalculates the weights if you change the batch size.",
    "Put 2.00 g Tonka accord and 3.00 g Vanilla accord into the beaker. Stir slowly for 90 seconds until uniform.",
    "Add 4.00 g Cacao accord in 4 equal 1.00 g portions, 30 seconds apart. Stir for 45 seconds after each portion, then stir for a further 60 seconds.",
    "Add 1.00 g perfumer's alcohol in 4 equal 0.25 g portions, 30 seconds apart. Stir 30 seconds after each addition, then stir continuously for 2 minutes. Keep the beaker loosely covered between additions; never seal it while mixing.",
    "Transfer to the labelled vial, cap tightly and gently invert 10 times. Record date and ingredient lot numbers. Rest upright, cool and dark for 48 hours; assess again after 7 days. Put one small drop on a blotter and record at 5 minutes, 30 minutes, 2 hours and 24 hours. Blotter-only: not approved for skin use."
  ],
  "Petals in Paris": [
    "Standard batch: 10.00 g. Work at 20–25°C in good ventilation, away from flames, sparks and hot surfaces. Wear nitrile gloves and eye protection. Equipment: 0.01 g-resolution scale, 30–50 mL clean dry glass beaker, glass rod, four weighing cups, disposable pipettes, blotter strips and a clean 10–15 mL amber glass vial. Do not heat any material.",
    "Tare separate cups and weigh: Rose accord 4.00 g; Jasmine accord 2.00 g; Musk accord 3.00 g; perfumer's alcohol 1.00 g. Keep the alcohol capped. The ingredient list above recalculates the weights if you change the batch size.",
    "Put 3.00 g Musk accord and 4.00 g Rose accord into the beaker. Stir gently for 90 seconds until uniform.",
    "Add 2.00 g Jasmine accord in 4 equal 0.50 g portions, 30 seconds apart. Stir for 45 seconds after each portion, then stir for a further 60 seconds.",
    "Add 1.00 g perfumer's alcohol in 4 equal 0.25 g portions, 30 seconds apart. Stir 30 seconds after each addition, then stir continuously for 2 minutes. Keep the beaker loosely covered between additions; never seal it while mixing.",
    "Transfer to the labelled vial, cap tightly and gently invert 10 times. Record date and ingredient lot numbers. Rest upright, cool and dark for 48 hours; assess again after 7 days. Put one small drop on a blotter and record at 5 minutes, 30 minutes, 2 hours and 24 hours. Blotter-only: not approved for skin use."
  ],
  "Golden Hour": [
    "Standard batch: 10.00 g. Work at 20–25°C in good ventilation, away from flames, sparks and hot surfaces. Wear nitrile gloves and eye protection. Equipment: 0.01 g-resolution scale, 30–50 mL clean dry glass beaker, glass rod, four weighing cups, disposable pipettes, blotter strips and a clean 10–15 mL amber glass vial. Do not heat any material.",
    "Tare separate cups and weigh: Amber accord 4.00 g; Sandalwood accord 3.00 g; Vanilla accord 2.00 g; perfumer's alcohol 1.00 g. Keep the alcohol capped. The ingredient list above recalculates the weights if you change the batch size.",
    "Put 3.00 g Sandalwood accord and 2.00 g Vanilla accord into the beaker. Stir slowly for 90 seconds until uniform.",
    "Add 4.00 g Amber accord in 4 equal 1.00 g portions, 30 seconds apart. Stir for 45 seconds after each portion, then stir for a further 60 seconds.",
    "Add 1.00 g perfumer's alcohol in 4 equal 0.25 g portions, 30 seconds apart. Stir 30 seconds after each addition, then stir continuously for 2 minutes. Keep the beaker loosely covered between additions; never seal it while mixing.",
    "Transfer to the labelled vial, cap tightly and gently invert 10 times. Record date and ingredient lot numbers. Rest upright, cool and dark for 48 hours; assess again after 7 days. Put one small drop on a blotter and record at 5 minutes, 30 minutes, 2 hours and 24 hours. Blotter-only: not approved for skin use."
  ],
  "Citrus Club": [
    "Standard batch: 10.00 g. Work at 20–25°C in good ventilation, away from flames, sparks and hot surfaces. Wear nitrile gloves and eye protection. Equipment: 0.01 g-resolution scale, 30–50 mL clean dry glass beaker, glass rod, four weighing cups, disposable pipettes, blotter strips and a clean 10–15 mL amber glass vial. Do not heat any material.",
    "Tare separate cups and weigh: Lemon accord 4.00 g; Sweet orange accord 3.00 g; Neroli accord 2.00 g; perfumer's alcohol 1.00 g. Keep the alcohol capped. The ingredient list above recalculates the weights if you change the batch size.",
    "Put 2.00 g Neroli accord and 3.00 g Sweet orange accord into the beaker. Stir gently for 90 seconds until uniform.",
    "Add 4.00 g Lemon accord in 4 equal 1.00 g portions, 30 seconds apart. Stir for 45 seconds after each portion, then stir for a further 60 seconds.",
    "Add 1.00 g perfumer's alcohol in 4 equal 0.25 g portions, 30 seconds apart. Stir 30 seconds after each addition, then stir continuously for 2 minutes. Keep the beaker loosely covered between additions; never seal it while mixing.",
    "Transfer to the labelled vial, cap tightly and gently invert 10 times. Record date and ingredient lot numbers. Rest upright, cool and dark for 48 hours; assess again after 7 days. Put one small drop on a blotter and record at 5 minutes, 30 minutes, 2 hours and 24 hours. Blotter-only: not approved for skin use."
  ],
  "Velvet Library": [
    "Standard batch: 10.00 g. Work at 20–25°C in good ventilation, away from flames, sparks and hot surfaces. Wear nitrile gloves and eye protection. Equipment: 0.01 g-resolution scale, 30–50 mL clean dry glass beaker, glass rod, four weighing cups, disposable pipettes, blotter strips and a clean 10–15 mL amber glass vial. Do not heat any material.",
    "Tare separate cups and weigh: Cedarwood accord 4.00 g; Patchouli accord 3.00 g; Vanilla accord 2.00 g; perfumer's alcohol 1.00 g. Keep the alcohol capped. The ingredient list above recalculates the weights if you change the batch size.",
    "Put 2.00 g Vanilla accord and 3.00 g Patchouli accord into the beaker. Stir slowly for 90 seconds until uniform.",
    "Add 4.00 g Cedarwood accord in 4 equal 1.00 g portions, 30 seconds apart. Stir for 45 seconds after each portion, then stir for a further 60 seconds.",
    "Add 1.00 g perfumer's alcohol in 4 equal 0.25 g portions, 30 seconds apart. Stir 30 seconds after each addition, then stir continuously for 2 minutes. Keep the beaker loosely covered between additions; never seal it while mixing.",
    "Transfer to the labelled vial, cap tightly and gently invert 10 times. Record date and ingredient lot numbers. Rest upright, cool and dark for 48 hours; assess again after 7 days. Put one small drop on a blotter and record at 5 minutes, 30 minutes, 2 hours and 24 hours. Blotter-only: not approved for skin use."
  ]
};

starterRecipes.forEach(recipe => {
  if (detailedStarterInstructions[recipe.name]) {
    recipe.instructions = detailedStarterInstructions[recipe.name];
  }
});

const families = ["All", "Fresh", "Floral", "Gourmand", "Woody"];

function ingredientPhoto(name = "") {
  const value = name.toLowerCase();
  const key = value.includes("rosemary") ? "rosemary"
    : value.includes("lavender") ? "lavender"
    : value.includes("bergamot") ? "bergamot"
    : value.includes("cedar") ? "cedar"
    : value.includes("alcohol") ? "alcohol"
    : value.includes("cacao") || value.includes("cocoa") ? "cacao"
    : value.includes("vanilla") ? "vanilla"
    : value.includes("tonka") ? "tonka"
    : value.includes("rose") ? "rose"
    : value.includes("jasmine") ? "jasmine"
    : value.includes("musk") ? "musk"
    : value.includes("amber") ? "amber"
    : value.includes("sandalwood") ? "sandalwood"
    : value.includes("lemon") ? "lemon"
    : value.includes("orange") ? "orange"
    : value.includes("neroli") ? "neroli"
    : value.includes("patchouli") ? "patchouli"
    : null;
  const photos = {
  "rosemary": [
    "Dry_rosemary.jpg",
    "Tiia Monto",
    "CC BY-SA 3.0",
    "Dry rosemary herb",
    "https://commons.wikimedia.org/wiki/File:Dry_rosemary.jpg"
  ],
  "lavender": [
    "Lavender Field.jpg",
    "Miguel Virkkunen Carvalho",
    "CC BY 2.0",
    "Lavender field, Provence",
    "https://commons.wikimedia.org/wiki/File:Lavender_Field.jpg"
  ],
  "bergamot": [
    "Bergamotfruit.jpg",
    "Xenocryst",
    "CC BY-SA 2.0",
    "Bergamot fruit",
    "https://commons.wikimedia.org/wiki/File:Bergamotfruit.jpg"
  ],
  "cedar": [
    "Bucket_full_of_Eastern_Red_Cedar_chips_-_Cupressaceae_Juniperus_virginiana.jpg",
    "Spoingus101",
    "CC0",
    "Eastern red cedar wood chips (species reference)",
    "https://commons.wikimedia.org/wiki/File:Bucket_full_of_Eastern_Red_Cedar_chips_-_Cupressaceae_Juniperus_virginiana.jpg"
  ],
  "alcohol": [
    "Ethanol_Flasche.jpg",
    "Leipnizkeks / Metoc",
    "GFDL",
    "Ethanol bottle reference; use perfumer's alcohol",
    "https://commons.wikimedia.org/wiki/File:Ethanol_Flasche.jpg"
  ],
  "cacao": [
    "Theobroma_cacao_01.JPG",
    "Vinayaraj",
    "CC BY-SA 3.0",
    "Cacao plant and fruit",
    "https://commons.wikimedia.org/wiki/File:Theobroma_cacao_01.JPG"
  ],
  "vanilla": [
    "Vanilla_beans_curing.jpg",
    "Sunil Elias",
    "CC BY-SA 3.0",
    "Cured vanilla beans",
    "https://commons.wikimedia.org/wiki/File:Vanilla_beans_curing.jpg"
  ],
  "tonka": [
    "Tonka_Beans.jpg",
    "Mecredis / Fred Benenson",
    "GFDL (see source)",
    "Tonka beans",
    "https://commons.wikimedia.org/wiki/File:Tonka_Beans.jpg"
  ],
  "rose": [
    "Rose_Petals.jpg",
    "Atoma",
    "CC BY 2.5",
    "Rose petals",
    "https://commons.wikimedia.org/wiki/File:Rose_Petals.jpg"
  ],
  "jasmine": [
    "Jasmine_plant_and_flowers.jpg",
    "Maina Tudu",
    "CC0",
    "Jasmine plant and flowers",
    "https://commons.wikimedia.org/wiki/File:Jasmine_plant_and_flowers.jpg"
  ],
  "musk": [
    "Perfume_Bottle.jpg",
    "ChickenFreak",
    "Public domain",
    "Perfumery bottle reference for musk accord (often synthetic)",
    "https://commons.wikimedia.org/wiki/File:Perfume_Bottle.jpg"
  ],
  "amber": [
    "Labdanum,_Cistus,_Rose_of_Sharon,_05,_2019.jpg",
    "Curtis Ward",
    "CC BY-SA 4.0",
    "Labdanum resin, a perfumery material used for amber notes",
    "https://commons.wikimedia.org/wiki/File:Labdanum,_Cistus,_Rose_of_Sharon,_05,_2019.jpg"
  ],
  "sandalwood": [
    "Sandalwood_4.jpg",
    "Nativeplants garden",
    "CC BY-SA 4.0",
    "Sandalwood",
    "https://commons.wikimedia.org/wiki/File:Sandalwood_4.jpg"
  ],
  "lemon": [
    "Lemon_picture.jpg",
    "Mgmoscatello",
    "CC BY-SA 3.0",
    "Lemon",
    "https://commons.wikimedia.org/wiki/File:Lemon_picture.jpg"
  ],
  "orange": [
    "Orange_fruit.jpeg",
    "Tshrinivasan",
    "CC BY 3.0",
    "Sweet orange fruit",
    "https://commons.wikimedia.org/wiki/File:Orange_fruit.jpeg"
  ],
  "neroli": [
    "Bitter_orange_-_Citrus_aurantium_01.JPG",
    "Zeynel Cebeci",
    "CC BY-SA 4.0",
    "Bitter orange blossom, source of neroli",
    "https://commons.wikimedia.org/wiki/File:Bitter_orange_-_Citrus_aurantium_01.JPG"
  ],
  "patchouli": [
    "Patchouli.jpg",
    "Joe Laurence",
    "CC BY 4.0",
    "Patchouli plant",
    "https://commons.wikimedia.org/wiki/File:Patchouli.jpg"
  ]
};
  if (!key || !photos[key]) return null;
  const [filename, author, license, caption, page] = photos[key];
  return {
    src: `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}?width=480`,
    author, license, caption, page
  };
}

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

                <p className="ingredient-visual-note">
                  Real photographs of raw materials and perfumery references.
                  Accords may be blended or synthetic; a photograph shows the
                  scent inspiration, not the exact composition of the accord.
                </p>

                {(selected.ingredients || []).map((item, i) => {
                  const photo = ingredientPhoto(item.name);
                  return (
                    <div className="ingredient ingredient-with-image" key={i}>
                      <div className="ingredient-main">
                        {photo ? (
                          <img
                            className="ingredient-thumb"
                            src={photo.src}
                            alt={photo.caption}
                            loading="lazy"
                            width="58"
                            height="48"
                          />
                        ) : (
                          <span className="ingredient-thumb ingredient-placeholder" title="Synthetic aroma material; no botanical source photograph" aria-hidden="true">LAB</span>
                        )}
                        <span>
                          {item.name}
                          {photo && (
                            <small className="ingredient-photo-credit">
                              <a href={photo.page} target="_blank" rel="noreferrer">
                                Photo: {photo.author} · {photo.license}
                              </a>
                            </small>
                          )}
                        </span>
                      </div>
                      <b>
                        {(
                          Number(item.grams || 0) *
                          batch /
                          (ingredientTotal || 1)
                        ).toFixed(2)} g
                      </b>
                    </div>
                  );
                })}

                <div className="ingredient total">
                  <span>FORMULA TOTAL</span>
                  <b>{batch} g</b>
                </div>

                {selected.formula_type === "published_reference" && (
                  <div className="formula-reference">
                    <div className="formula-reference-top">
                      <b>{selected.formula_strength_label}</b>
                      <span>Published formula</span>
                    </div>
                    <div className="formula-reference-grid">
                      <div><small>FINISHED BATCH</small><strong>{(Number(selected.finished_batch_grams) * batch / 10).toFixed(2)} g</strong></div>
                      <div><small>CONCENTRATE</small><strong>{(Number(selected.finished_concentrate_grams) * batch / 10).toFixed(2)} g</strong></div>
                      <div><small>PERFUMER'S ETHANOL</small><strong>{(Number(selected.finished_alcohol_grams) * batch / 10).toFixed(2)} g</strong></div>
                      <div><small>RESTING PERIOD</small><strong>{selected.maceration_days} days</strong></div>
                    </div>
                    <p className="formula-reference-status">
                      <b>Source-reported IFRA Category 4 check: PASS.</b> {selected.compliance_basis}
                    </p>
                    <p className="formula-reference-links">
                      <a href={selected.source_url} target="_blank" rel="noreferrer">{selected.source_title}</a>
                      {" · "}
                      <a href={selected.method_source_url} target="_blank" rel="noreferrer">{selected.method_source_title}</a>
                    </p>
                  </div>
                )}

                <section className="preparation">
                  <h3>How to make it</h3>
                  <p className="preparation-intro">
                    {selected.formula_type === "published_reference"
                      ? "The numbered method uses a 10.00 g concentrate reference. Scale every gram amount by the selected concentrate batch ÷ 10; the finished-batch quantities below update with the batch control."
                      : "Gram amounts in the numbered steps are for a 10.00 g reference batch. For another batch size, multiply every step amount by target batch ÷ 10; the live ingredient list above is the exact weight guide. Keep the same order and timings."}
                  </p>
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

                {selected.formula_type !== "published_reference" && (
                  <div className="safety">
                    <b>FORMULA STATUS</b>
                    <p>
                      This community/study formula has not been independently
                      verified for wearable use. Check the exact supplier
                      materials, their documentation and the intended-use
                      limits before skin application. Do not assume that a
                      recipe is skin-safe solely because its ingredients are
                      familiar or naturally derived.
                    </p>
                  </div>
                )}

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

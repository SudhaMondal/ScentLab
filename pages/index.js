import Head from "next/head";
import { useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import PerfumeDiscovery from "../components/PerfumeDiscovery";
import { moonlightMidi } from "../lib/moonlight-midi";

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

// Detailed logging choices combine established fragrance wheels, traditional
// fragrance categories and the French Society of Perfumers' classic families.
// Facets/accords are kept separate because they describe character, not always
// a standalone fragrance family.
const notebookTemplates = [
  {
    id: "blank",
    name: "Start with a blank page",
    category: "Fresh",
    mood: "",
    notes: "",
    ingredients: "",
    instructions: ""
  },
  {
    id: "citrus",
    name: "Citrus cologne study",
    category: "Citrus",
    mood: "Bright, sparkling and breezy; an opening like freshly peeled citrus.",
    notes: "Bergamot, lemon, sweet orange, petitgrain",
    ingredients: "Bergamot accord | 3\nLemon accord | 2\nSweet orange accord | 2\nPetitgrain accord | 1\nPerfumer's alcohol | 2",
    instructions: "Prepare clean, dry glass equipment and label the sample.\nWeigh each accord separately.\nCombine the citrus and petitgrain accords and stir gently.\nAdd the perfumer's alcohol gradually while mixing.\nClose, label and allow the sample to rest before blotter evaluation."
  },
  {
    id: "floral",
    name: "Classic floral bouquet",
    category: "Floral Bouquet",
    mood: "A graceful bouquet with a soft, petal-like heart.",
    notes: "Rose, jasmine, orange blossom, soft musk",
    ingredients: "Rose accord | 3\nJasmine accord | 2\nOrange blossom accord | 2\nSoft musk accord | 1\nPerfumer's alcohol | 2",
    instructions: "Prepare and label clean glass equipment.\nWeigh the accords separately.\nBlend the rose and jasmine accords until uniform.\nFold in orange blossom and soft musk accords.\nAdd perfumer's alcohol gradually, close and rest before blotter evaluation."
  },
  {
    id: "amber",
    name: "Soft amber evening",
    category: "Soft Amber",
    mood: "Warm, enveloping and gently sweet, with a resinous finish.",
    notes: "Vanilla, benzoin, labdanum, sandalwood",
    ingredients: "Vanilla accord | 2\nBenzoin accord | 2\nLabdanum accord | 2\nSandalwood accord | 2\nPerfumer's alcohol | 2",
    instructions: "Prepare and label clean glass equipment.\nWeigh each accord separately.\nCombine the resinous accords and stir until uniform.\nAdd vanilla and sandalwood accords and mix gently.\nAdd perfumer's alcohol gradually, close and rest before blotter evaluation."
  },
  {
    id: "woody",
    name: "Woods and moss study",
    category: "Mossy Woods",
    mood: "Dry, grounded and quietly atmospheric.",
    notes: "Cedarwood, vetiver, patchouli, oakmoss",
    ingredients: "Cedarwood accord | 3\nVetiver accord | 2\nPatchouli accord | 2\nOakmoss-style accord | 1\nPerfumer's alcohol | 2",
    instructions: "Prepare and label clean glass equipment.\nWeigh each accord separately.\nBlend cedarwood and vetiver accords first.\nAdd patchouli and oakmoss-style accords and stir gently.\nAdd perfumer's alcohol gradually, close and rest before blotter evaluation."
  },
  {
    id: "fougere",
    name: "Aromatic fougère sketch",
    category: "Aromatic Fougère",
    mood: "Herbal, fresh and softly woody; inspired by a classic fougère structure.",
    notes: "Lavender, aromatic herbs, coumarin-style accord, woods",
    ingredients: "Lavender accord | 3\nHerbal aromatic accord | 2\nCoumarin-style accord | 2\nWoody accord | 1\nPerfumer's alcohol | 2",
    instructions: "Prepare and label clean glass equipment.\nWeigh each accord separately.\nCombine lavender and herbal accords.\nAdd the coumarin-style and woody accords and mix until uniform.\nAdd perfumer's alcohol gradually, close and rest before blotter evaluation."
  },
  {
    id: "chypre",
    name: "Green chypre impression",
    category: "Green Chypre",
    mood: "Crisp green facets over a dry, mossy-woody impression.",
    notes: "Bergamot, green leaf, patchouli, moss accord",
    ingredients: "Bergamot accord | 2\nGreen leaf accord | 2\nPatchouli accord | 2\nMoss-style accord | 2\nPerfumer's alcohol | 2",
    instructions: "Prepare and label clean glass equipment.\nWeigh each accord separately.\nBlend bergamot and green leaf accords.\nAdd patchouli and moss-style accords and stir gently.\nAdd perfumer's alcohol gradually, close and rest before blotter evaluation."
  },
  {
    id: "aquatic",
    name: "Air and water sketch",
    category: "Water",
    mood: "Transparent, airy and cool, with a clean ozonic character.",
    notes: "Marine accord, citrus, watery floral, musk",
    ingredients: "Marine accord | 2\nCitrus accord | 2\nWatery floral accord | 2\nClean musk accord | 2\nPerfumer's alcohol | 2",
    instructions: "Prepare and label clean glass equipment.\nWeigh each accord separately.\nCombine the marine and watery floral accords.\nAdd citrus and clean musk accords and mix gently.\nAdd perfumer's alcohol gradually, close and rest before blotter evaluation."
  },
  {
    id: "gourmand",
    name: "Gourmand dessert accord",
    category: "Gourmand",
    mood: "Comforting, creamy and dessert-like without being a literal food recipe.",
    notes: "Cacao, vanilla, tonka-style accord, woods",
    ingredients: "Cacao accord | 2\nVanilla accord | 3\nTonka-style accord | 2\nSoft woody accord | 1\nPerfumer's alcohol | 2",
    instructions: "Prepare and label clean glass equipment.\nWeigh each accord separately.\nBlend vanilla and tonka-style accords.\nFold in cacao and soft woody accords.\nAdd perfumer's alcohol gradually, close and rest before blotter evaluation."
  }
];

const familyLogGroups = [
  {
    label: "Fragrance wheel · Michael Edwards",
    options: [
      "Soft Floral", "Floral", "Floral Amber",
      "Soft Amber", "Amber", "Woody Amber",
      "Woods", "Mossy Woods", "Dry Woods",
      "Aromatic", "Citrus", "Water", "Green", "Fruity"
    ]
  },
  {
    label: "Traditional fragrance categories",
    options: [
      "Aldehydic", "Chypre", "Gourmand", "Leather",
      "Musky", "Oriental (traditional term)", "Spicy"
    ]
  },
  {
    label: "French classical families · family / subfamily",
    options: [
      "Citrus", "General Citrus", "Floral Chypre Citrus",
      "Spiced Citrus", "Woody Citrus",
      "Floral", "Single Flower / Soliflore", "Lavender-Single Flower",
      "Floral Bouquet", "Floral Green", "Floral Aldehydic",
      "Floral Woody", "Floral Fruity Woody",
      "Fougère", "General Fougère", "Soft Amber Fougère",
      "Floral Amber Fougère", "Spiced Fougère", "Aromatic Fougère",
      "Chypre", "General Chypre", "Floral Chypre",
      "Floral Aldehydic Chypre", "Fruity Chypre", "Green Chypre",
      "Aromatic Chypre", "Leather Chypre",
      "Woody", "General Woody", "Woody Citrusy Coniferous",
      "Woody Aromatic", "Woody Spicy", "Woody Spicy Leather",
      "Amber", "Floral Woody Amber", "Floral Spicy Amber",
      "Soft Amber", "Citrus Amber", "Floral Semi-Amber",
      "Leather", "Floral Leather", "Tobacco Leather"
    ]
  },
  {
    label: "Olfactive facets & accords · descriptive",
    options: [
      "Animalic", "Balsamic / Resinous", "Powdery", "Smoky",
      "Tobacco", "Marine / Ozonic", "Herbal / Herbaceous",
      "Earthy", "Camphoraceous", "Salty / Mineral",
      "Creamy", "Waxy"
    ]
  }
];

const scentFamilyGuide = [
  {
    name: "Floral",
    tone: "Blooming · soft · expressive",
    subfamilies: ["Floral", "Soft Floral", "Floral Amber"],
    examples: "Rose, jasmine, violet, peony, orange blossom"
  },
  {
    name: "Amber",
    tone: "Warm · resinous · enveloping",
    subfamilies: ["Soft Amber", "Amber", "Woody Amber"],
    examples: "Vanilla, labdanum, benzoin, incense, warm spices"
  },
  {
    name: "Woody",
    tone: "Earthy · dry · grounding",
    subfamilies: ["Woods", "Mossy Woods", "Dry Woods"],
    examples: "Cedarwood, sandalwood, vetiver, patchouli, oakmoss"
  },
  {
    name: "Fresh",
    tone: "Bright · green · airy",
    subfamilies: ["Aromatic", "Citrus", "Water", "Green", "Fruity"],
    examples: "Lavender, bergamot, marine notes, galbanum, berries"
  }
];

// The classifications below are deliberately separated: they are different
// professional/educational systems, not one universal master list.
const frenchPerfumerFamilies = [
  {
    name: "Citrus (Hespéridée)",
    description: "Bright citrus-led structures.",
    subfamilies: ["General Citrus", "Floral Chypre Citrus", "Spiced Citrus", "Woody Citrus"]
  },
  {
    name: "Floral",
    description: "Single-flower studies through complex bouquets.",
    subfamilies: ["Single Flower / Soliflore", "Lavender-Single Flower", "Floral Bouquet", "Floral Green", "Floral Aldehydic", "Floral Woody", "Floral Fruity Woody"]
  },
  {
    name: "Fougère",
    description: "A classic aromatic structure, often lavender-led with mossy and coumarin facets.",
    subfamilies: ["General Fougère", "Soft Amber Fougère", "Floral Amber Fougère", "Spiced Fougère", "Aromatic Fougère"]
  },
  {
    name: "Chypre",
    description: "A structured citrus opening over mossy, woody and resinous facets.",
    subfamilies: ["General Chypre", "Floral Chypre", "Floral Aldehydic Chypre", "Fruity Chypre", "Green Chypre", "Aromatic Chypre", "Leather Chypre"]
  },
  {
    name: "Woody",
    description: "Dry, creamy, earthy, coniferous or warm wood-led compositions.",
    subfamilies: ["General Woody", "Woody Citrusy Coniferous", "Woody Aromatic", "Woody Spicy", "Woody Spicy Leather", "Woody Amber"]
  },
  {
    name: "Amber (Ambrée)",
    description: "Warm, resinous, balsamic and spicy compositions.",
    subfamilies: ["Floral Woody Amber", "Floral Spicy Amber", "Soft Amber", "Citrus Amber", "Floral Semi-Amber"]
  },
  {
    name: "Leather (Cuir)",
    description: "Suede-like, smoky, tarry or tobacco-tinged leather accords.",
    subfamilies: ["Leather", "Floral Leather", "Tobacco Leather"]
  }
];

const michaelEdwardsGroups = [
  ["Floral", ["Soft Floral", "Floral", "Floral Amber"]],
  ["Amber", ["Soft Amber", "Amber", "Woody Amber"]],
  ["Woody", ["Woods", "Mossy Woods", "Dry Woods"]],
  ["Fresh", ["Aromatic", "Citrus", "Water", "Green", "Fruity"]]
];

const fragranceFoundationCategories = [
  ["Citrus", "Bright, sparkling citrus-led scents."],
  ["Aromatic", "Herbal and aromatic notes such as lavender, rosemary and sage."],
  ["Floral", "Single flowers, floral bouquets and varied floral facets."],
  ["Fruity", "Juicy fruit impressions, from crisp to lush."],
  ["Woody", "Dry, creamy, earthy and resinous wood notes."],
  ["Oriental / Amber", "Warm, rich, spicy and balsamic styles; Amber is now common terminology."],
  ["Chypre", "Citrus, floral and mossy-woody contrasts."],
  ["Aldehydic", "Sparkling, waxy, soapy or airy aldehydic effects."],
  ["Green", "Leafy, grassy, stemmy and crisp green effects."],
  ["Water / Aquatic", "Watery, marine, ozonic and fresh-air impressions."],
  ["Musky", "Soft skin-like, clean, powdery or sensual musk effects."],
  ["Spicy", "Fresh, warm or pungent spice-led effects."],
  ["Gourmand", "Food-inspired sweetness such as vanilla, cocoa, coffee or caramel."]
];

const additionalScentDescriptors = [
  ["Animalic", "Warm, musky, leathery or skin-like effects; historically may refer to animal-derived materials or modern recreations."],
  ["Balsamic / Resinous", "Smooth, sweet-resin, incense and balsam impressions."],
  ["Powdery", "Soft, dry, cosmetic or dusted impressions, often from iris, violet or musk facets."],
  ["Smoky", "Smoke, charred wood, incense or burnt facets."],
  ["Tobacco", "Dry leaf, honeyed, hay-like or smoky tobacco impressions."],
  ["Marine / Ozonic", "Sea-air, mineral, breezy or ozone-like freshness; overlaps with aquatic."],
  ["Herbal / Herbaceous", "Green aromatic herbs such as basil, thyme, mint and rosemary."],
  ["Earthy", "Soil-like, rooty, damp or mineral impressions, often associated with vetiver and patchouli."],
  ["Camphoraceous", "Cooling, medicinal, eucalyptus-like or mentholated freshness."],
  ["Salty / Mineral", "Briny, stony, mineral or skin-salt impressions."],
  ["Creamy", "Smooth, milky or soft-textured impressions, often sandalwood or lactonic."],
  ["Waxy", "Wax, candle, honeycomb or smooth aldehydic effects."]
];


function ingredientPhoto(name = "") {
  const value = String(name || "").toLowerCase();
  const key =
    value.includes("rosemary") ? "rosemary" :
    value.includes("lavender") ? "lavender" :
    value.includes("bergamot") ? "bergamot" :
    value.includes("cedar") ? "cedar" :
    value.includes("alcohol") || value.includes("ethanol") ? "alcohol" :
    value.includes("cacao") || value.includes("cocoa") ? "cacao" :
    value.includes("vanillin") ? "aroma-chemical" :
    value.includes("vanilla") ? "vanilla" :
    value.includes("tonka") ? "tonka" :
    value.includes("rose") ? "rose" :
    value.includes("jasmine") ? "jasmine" :
    value.includes("musk") || value.includes("brassylate") ? "musk" :
    value.includes("ambroxan") || value.includes("vanillin") ? "aroma-chemical" :
    value.includes("amber") || value.includes("labdanum") ? "amber" :
    value.includes("sandalwood") ? "sandalwood" :
    value.includes("lemon") ? "lemon" :
    value.includes("petitgrain") ? "petitgrain" :
    value.includes("neroli") || value.includes("orange blossom") ? "neroli" :
    value.includes("orange") ? "sweet-orange" :
    value.includes("patchouli") ? "patchouli" :
    value.includes("hedione") || value.includes("iso e super") || value.includes("dpg") || value.includes("aroma") ? "aroma-chemical" :
    "aroma-chemical";

  // Each source is a single-material photograph. Attribution links identify
  // the original source and licence; check the source before commercial reuse.
  const photos = {
    rosemary: {
      src: "https://www.buddhateas.com/cdn/shop/collections/rosemary-leaf-macro.jpg?v=1769038214",
      author: "Buddha Teas",
      license: "Source page",
      caption: "Rosemary leaves only",
      page: "https://www.buddhateas.com/collections/organic-rosemary-leaf"
    },
    lavender: {
      src: "https://bleulavande.com/cdn/shop/articles/Photos_Blogue_14.png?v=1719571817&width=1500",
      author: "Bleu Lavande",
      license: "Source page",
      caption: "Lavender flowers only",
      page: "https://bleulavande.com/en/blogs/news/les-proprietes-de-la-lavande-un-tresor-estival"
    },
    bergamot: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Citrus%20bergamia%20fructus.jpg",
      author: "Rillke",
      license: "CC BY-SA / GFDL",
      caption: "One bergamot fruit",
      page: "https://commons.wikimedia.org/wiki/File:Citrus_bergamia_fructus.jpg"
    },
    cacao: {
      src: "https://images.pexels.com/photos/5252060/pexels-photo-5252060.jpeg?auto=compress&cs=tinysrgb&w=1200",
      author: "Diego Concepción / Pexels",
      license: "Pexels licence",
      caption: "Cacao beans only",
      page: "https://www.pexels.com/photo/brown-cocoa-beans-in-close-up-photography-5252060/"
    },
    vanilla: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Vanilla%20beans.jpg",
      author: "Sunil Elias",
      license: "CC BY-SA / GFDL",
      caption: "Vanilla pods only",
      page: "https://commons.wikimedia.org/wiki/File:Vanilla_beans.jpg"
    },
    tonka: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Tonka%20Beans.jpg",
      author: "Mecredis / Fred Benenson",
      license: "CC BY-SA 3.0",
      caption: "Tonka beans only",
      page: "https://commons.wikimedia.org/wiki/File:Tonka_Beans.jpg"
    },
    rose: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Rose%20Petals.jpeg",
      author: "Lankiveil",
      license: "CC BY-SA 3.0 Australia",
      caption: "Rose petals only",
      page: "https://commons.wikimedia.org/wiki/File:Rose_Petals.jpeg"
    },
    jasmine: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Jasmine%20Flower%20image.jpg",
      author: "Kanimozhi Vennila",
      license: "CC0",
      caption: "One jasmine flower",
      page: "https://commons.wikimedia.org/wiki/File:Jasmine_Flower_image.jpg"
    },
    cedar: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Bucket%20full%20of%20Eastern%20Red%20Cedar%20chips%20-%20Cupressaceae%20Juniperus%20virginiana.jpg",
      author: "Spoingus101",
      license: "CC0",
      caption: "Eastern red cedar wood chips only",
      page: "https://commons.wikimedia.org/wiki/File:Bucket_full_of_Eastern_Red_Cedar_chips_-_Cupressaceae_Juniperus_virginiana.jpg"
    },
    amber: {
      src: "https://procosmet.com/cdn/shop/articles/cdd1001cd9e02d64d996b23df9c9159e_a5ae73df-953e-4b16-ac04-3c15d4e6f9dd_720x.jpg?v=1752739029",
      author: "Procosmet",
      license: "Source page",
      caption: "Amber-coloured resin granules",
      page: "https://procosmet.com/en/blogs/active-principles/glycolic-extract-of-myrrh"
    },
    sandalwood: {
      src: "https://www.arogya.earth/cdn/shop/files/oleo-essencial-sandalo-relaxamento-bem-estar.webp?v=1732038917&width=1000",
      author: "Arogya",
      license: "Source page",
      caption: "Sandalwood chips only",
      page: "https://www.arogya.earth/en/products/sandalwood-essential-oil"
    },
    lemon: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Picture%20of%20a%20lemon%20fruit.jpg",
      author: "Nubelbariloe",
      license: "CC BY 4.0",
      caption: "One lemon fruit",
      page: "https://commons.wikimedia.org/wiki/File:Picture_of_a_lemon_fruit.jpg"
    },
    "sweet-orange": {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Orange%20fruit%20%28Citrus%20%C3%97%20sinensis%29.jpg",
      author: "Kuttykrishnan Photos",
      license: "CC0",
      caption: "One sweet orange fruit",
      page: "https://commons.wikimedia.org/wiki/File:Orange_fruit_(Citrus_%C3%97_sinensis).jpg"
    },
    neroli: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Orange%20blossom%20Flower.jpg",
      author: "Diyarenoon",
      license: "CC BY-SA 4.0",
      caption: "Orange blossom flower only (neroli source plant)",
      page: "https://commons.wikimedia.org/wiki/File:Orange_blossom_Flower.jpg"
    },
    petitgrain: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Citrus%20aurantium%20leaves.JPG",
      author: "Dinkum",
      license: "CC0",
      caption: "Bitter orange leaves only",
      page: "https://commons.wikimedia.org/wiki/File:Citrus_aurantium_leaves.JPG"
    },
    patchouli: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Patchouli1.JPG",
      author: "Maša Sinreih and Valentina Vivod",
      license: "CC BY-SA 3.0",
      caption: "Patchouli leaves only",
      page: "https://commons.wikimedia.org/wiki/File:Patchouli1.JPG"
    },
    alcohol: {
      src: "https://makesy.com/cdn/shop/files/2023_feb_perfumers_alcohol_base_pdp2_04e2426c-45bd-4bd6-9027-a00106a582a4.jpg?v=1738608593&width=1638",
      author: "Makesy",
      license: "Source page",
      caption: "Perfumer's alcohol only",
      page: "https://makesy.com/products/perfumers-denatured-alcohol"
    },
    musk: {
      src: "https://pgiforyou.com/cdn/shop/files/ALDEHYDEC12MNA_377e40da-799a-4252-96bc-3b98d49fe316.jpg?v=1723391423",
      author: "My New Smell",
      license: "Source page",
      caption: "One labelled aroma-chemical bottle; illustrative reference for synthetic musk materials",
      page: "https://pgiforyou.com/products/mns-aldehyde-12mna-amber-aldehydic-moss-sweaty-musk-tuberose-coumarin-perfume-base"
    },
    "aroma-chemical": {
      src: "https://pgiforyou.com/cdn/shop/files/ALDEHYDEC12MNA_377e40da-799a-4252-96bc-3b98d49fe316.jpg?v=1723391423",
      author: "My New Smell",
      license: "Source page",
      caption: "One labelled aroma-chemical bottle; illustrative reference for synthetic materials",
      page: "https://pgiforyou.com/products/mns-aldehyde-12mna-amber-aldehydic-moss-sweaty-musk-tuberose-coumarin-perfume-base"
    }
  };

  return photos[key] || photos["aroma-chemical"];
}

function Bottle({ color = "#c9dcb8", name = "Rose + Moss", category = "Botanical" }) {
  const title = String(name || "Signature").trim();
  const variants = ["round", "square", "apothecary", "tall", "faceted", "oval"];
  const variantIndex = [...title].reduce((sum, char) => sum + char.charCodeAt(0), 0) % variants.length;
  const variant = variants[variantIndex];
  const accents = ["#9b6b52", "#667d91", "#b28b45", "#7b8060", "#8b6e91", "#a65d64"];
  const accent = accents[variantIndex];
  return (
    <div className={`bottle bottle--${variant}`} style={{ "--bottle-color": color, "--bottle-accent": accent }} aria-label={`${title} perfume bottle design`}>
      <div className="bottle-cap"><i /></div>
      <div className="bottle-neck" />
      <div className="bottle-glass">
        <span className="bottle-label">
          <small>SCENTLAB</small>
          <b>{title.length > 19 ? title.slice(0, 18) + "…" : title}</b>
          <em>{category}</em>
        </span>
        <i className="bottle-glint" />
      </div>
      <small className="bottle-edition">EAU DE PARFUM · 2026</small>
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
  const [enlargedIngredient, setEnlargedIngredient] = useState(null);
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
  const [musicOn, setMusicOn] = useState(false);
  const musicContextRef = useRef(null);
  const musicMasterRef = useRef(null);
  const musicTimerRef = useRef(null);

  function stopNotebookMusic() {
    if (musicTimerRef.current) {
      window.clearInterval(musicTimerRef.current);
      musicTimerRef.current = null;
    }
    const context = musicContextRef.current;
    const master = musicMasterRef.current;
    if (context && master && context.state !== "closed") {
      master.gain.setTargetAtTime(0, context.currentTime, 0.35);
      window.setTimeout(() => {
        if (context.state !== "closed") context.close();
      }, 1500);
    }
    musicContextRef.current = null;
    musicMasterRef.current = null;
    setMusicOn(false);
  }

  async function toggleNotebookMusic() {
    if (musicOn) {
      stopNotebookMusic();
      return;
    }

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      setNotice("Background music is not supported in this browser.");
      return;
    }

    let context;
    try {
      context = new AudioContextClass();
      await context.resume();

      // A compressor keeps the louder, full-score performance controlled.
      const master = context.createGain();
      const compressor = context.createDynamicsCompressor();
      master.gain.setValueAtTime(0.0001, context.currentTime);
      master.gain.setTargetAtTime(1.05, context.currentTime, 0.65);
      compressor.threshold.setValueAtTime(-19, context.currentTime);
      compressor.knee.setValueAtTime(12, context.currentTime);
      compressor.ratio.setValueAtTime(4, context.currentTime);
      compressor.attack.setValueAtTime(0.004, context.currentTime);
      compressor.release.setValueAtTime(0.24, context.currentTime);
      master.connect(compressor);
      compressor.connect(context.destination);

      // Parse the complete Mutopia MIDI score for all three movements.
      // The browser synthesizes a piano-like tone locally; this is not a recording.
      const decodeMovement = (base64, tempoScale) => {
        const binary = window.atob(base64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);

        const readU32 = (i) => (
          (bytes[i] * 0x1000000) +
          (bytes[i + 1] << 16) +
          (bytes[i + 2] << 8) +
          bytes[i + 3]
        );
        const readVar = (state) => {
          let value = 0;
          let byte;
          do {
            byte = bytes[state.i++];
            value = (value << 7) | (byte & 0x7f);
          } while (byte & 0x80);
          return value;
        };

        if (String.fromCharCode(...bytes.slice(0, 4)) !== "MThd") {
          throw new Error("Invalid Moonlight Sonata MIDI header.");
        }
        const headerLength = readU32(4);
        const ticksPerQuarter = ((bytes[12] & 0x7f) << 8) | bytes[13];
        if (!ticksPerQuarter) throw new Error("Invalid MIDI timing.");

        const rawEvents = [];
        let offset = 8 + headerLength;
        let order = 0;
        while (offset + 8 <= bytes.length) {
          const chunkName = String.fromCharCode(...bytes.slice(offset, offset + 4));
          const chunkLength = readU32(offset + 4);
          const chunkEnd = Math.min(bytes.length, offset + 8 + chunkLength);
          if (chunkName !== "MTrk") {
            offset = chunkEnd;
            continue;
          }

          const state = { i: offset + 8 };
          let tick = 0;
          let runningStatus = 0;
          while (state.i < chunkEnd) {
            tick += readVar(state);
            if (state.i >= chunkEnd) break;
            let status = bytes[state.i];
            if (status & 0x80) {
              status = bytes[state.i++];
              if (status < 0xf0) runningStatus = status;
            } else {
              status = runningStatus;
            }

            if (status === 0xff) {
              const metaType = bytes[state.i++];
              const length = readVar(state);
              if (metaType === 0x51 && length === 3) {
                const tempo = (bytes[state.i] << 16) | (bytes[state.i + 1] << 8) | bytes[state.i + 2];
                rawEvents.push({ tick, kind: "tempo", tempo, order: order++ });
              }
              state.i += length;
              continue;
            }
            if (status === 0xf0 || status === 0xf7) {
              state.i += readVar(state);
              continue;
            }

            const command = status & 0xf0;
            const channel = status & 0x0f;
            const note = bytes[state.i++];
            const velocity = (command === 0xc0 || command === 0xd0) ? 0 : bytes[state.i++];
            if (command === 0x90 && velocity > 0) {
              rawEvents.push({ tick, kind: "on", channel, note, velocity, order: order++ });
            } else if (command === 0x80 || (command === 0x90 && velocity === 0)) {
              rawEvents.push({ tick, kind: "off", channel, note, order: order++ });
            }
          }
          offset = chunkEnd;
        }

        rawEvents.sort((a, b) => a.tick - b.tick ||
          (a.kind === "tempo" ? -1 : b.kind === "tempo" ? 1 : a.order - b.order));

        let currentTick = 0;
        let currentSeconds = 0;
        let microsPerQuarter = 1000000;
        const active = new Map();
        const notes = [];
        const secondsAt = (tick) => {
          currentSeconds += ((tick - currentTick) * microsPerQuarter) /
            (ticksPerQuarter * 1000000 * tempoScale);
          currentTick = tick;
        };

        rawEvents.forEach(event => {
          secondsAt(event.tick);
          if (event.kind === "tempo") {
            microsPerQuarter = event.tempo;
            return;
          }
          const key = event.channel + ":" + event.note;
          if (event.kind === "on") {
            const queue = active.get(key) || [];
            queue.push({ start: currentSeconds, velocity: event.velocity, note: event.note });
            active.set(key, queue);
          } else {
            const queue = active.get(key);
            if (queue && queue.length) {
              const started = queue.shift();
              notes.push({
                time: started.start,
                duration: Math.max(0.045, currentSeconds - started.start),
                frequency: 440 * Math.pow(2, (event.note - 69) / 12),
                velocity: started.velocity / 127
              });
              if (!queue.length) active.delete(key);
            }
          }
        });

        // Close any note that lacks an explicit note-off at the end of its track.
        active.forEach(queue => queue.forEach(started => {
          notes.push({
            time: started.start,
            duration: 0.25,
            frequency: 440 * Math.pow(2, (started.note - 69) / 12),
            velocity: started.velocity / 127
          });
        }));

        notes.sort((a, b) => a.time - b.time);
        const duration = notes.reduce((latest, note) =>
          Math.max(latest, note.time + note.duration), 0);
        return { notes, duration };
      };

      const movements = [
        { data: moonlightMidi.movement1, tempo: 0.9, label: "I. Adagio sostenuto" },
        { data: moonlightMidi.movement2, tempo: 1.5, label: "II. Allegretto" },
        { data: moonlightMidi.movement3, tempo: 2.0, label: "III. Presto agitato" }
      ];

      const playlist = [];
      let movementOffset = 0;
      movements.forEach(movement => {
        const score = decodeMovement(movement.data, movement.tempo);
        score.notes.forEach(note => playlist.push({ ...note, time: note.time + movementOffset }));
        movementOffset += score.duration + 1.8;
      });
      playlist.sort((a, b) => a.time - b.time);
      if (!playlist.length) throw new Error("The Moonlight Sonata score could not be read.");

      const playPianoNote = (frequency, when, duration, velocity) => {
        const voice = context.createGain();
        const fundamental = context.createOscillator();
        const overtone = context.createOscillator();
        const overtoneGain = context.createGain();
        const peak = 0.19 * velocity;
        const releaseAt = when + Math.max(0.075, duration);

        fundamental.type = "sine";
        fundamental.frequency.setValueAtTime(frequency, when);
        overtone.type = "triangle";
        overtone.frequency.setValueAtTime(frequency * 2, when);
        overtoneGain.gain.setValueAtTime(0.13, when);

        voice.gain.setValueAtTime(0.0001, when);
        voice.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), when + 0.009);
        voice.gain.setTargetAtTime(Math.max(0.0002, peak * 0.23), when + 0.02, 0.28);
        voice.gain.setTargetAtTime(0.0001, releaseAt, 0.16);

        fundamental.connect(voice);
        overtone.connect(overtoneGain);
        overtoneGain.connect(voice);
        voice.connect(master);
        fundamental.start(when);
        overtone.start(when);
        fundamental.stop(releaseAt + 1.05);
        overtone.stop(releaseAt + 0.75);
      };

      let eventIndex = 0;
      let cycleStart = context.currentTime + 0.08;
      const cycleDuration = movementOffset;
      const scheduleAhead = () => {
        if (context.state !== "running") return;
        const now = context.currentTime;
        const horizon = now + 0.22;
        while (eventIndex < playlist.length) {
          const event = playlist[eventIndex];
          const when = cycleStart + event.time;
          if (when > horizon) break;
          playPianoNote(
            event.frequency,
            Math.max(now + 0.006, when),
            event.duration,
            event.velocity
          );
          eventIndex += 1;
          if (eventIndex >= playlist.length) {
            eventIndex = 0;
            cycleStart += cycleDuration;
          }
        }
      };

      scheduleAhead();
      musicTimerRef.current = window.setInterval(scheduleAhead, 45);
      musicContextRef.current = context;
      musicMasterRef.current = master;
      setMusicOn(true);
    } catch (error) {
      if (context && context.state !== "closed") context.close();
      setNotice("The full Moonlight Sonata could not start. Please try again.");
    }
  }

  useEffect(() => () => {
    if (musicTimerRef.current) window.clearInterval(musicTimerRef.current);
    if (musicContextRef.current && musicContextRef.current.state !== "closed") {
      musicContextRef.current.close();
    }
  }, []);

  const [form, setForm] = useState({
    template: "blank",
    name: "",
    category: "Fresh",
    mood: "",
    notes: "",
    ingredients: "",
    instructions: ""
  });

  function loadNotebookTemplate(templateId) {
    const template = notebookTemplates.find(item => item.id === templateId);
    if (!template) return;
    setForm(current => ({
      ...current,
      ...template,
      name: template.id === "blank" ? current.name : template.name
    }));
  }

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
      template: "blank",
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
        <title>ScentLab — The Perfumer's Notebook</title>
        <meta
          name="description"
          content="A considered little scent atelier. Explore fragrance studies, collect olfactory notes and compose your own signature formulas."
        />
        <meta name="theme-color" content="#f4efe3" />
      </Head>

      <div className="site">
        <header className="nav">
          <a className="logo" href="#">
            ✿ SCENT<span>LAB</span>
            <small>THE PERFUMER'S NOTEBOOK</small>
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
              className={`music-toggle ${musicOn ? "is-playing" : ""}`}
              onClick={toggleNotebookMusic}
              aria-pressed={musicOn}
              title={musicOn ? "Pause the complete Moonlight Sonata" : "Play all three movements of Beethoven’s Moonlight Sonata"}
            >
              <span aria-hidden="true">{musicOn ? "♫" : "♪"}</span>
              {musicOn ? "Pause music" : "Moonlight Sonata"}
            </button>
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
                ✿ BOTANICAL STUDIES　 ·　 FORMULAS & FIELD NOTES　 ·　 MADE TO DISCOVER
              </div>
            </div>

            <div className="hero-art">
              <span className="hero-label">
                SCENT LAB<br />
                <small>NO. 001 / THE BOTANICAL EDITION</small>
              </span>

              <span className="sun">✦</span>
              <span className="gemstone gem-emerald" aria-hidden="true">◆</span>
              <span className="gemstone gem-amethyst" aria-hidden="true">◆</span>
              <span className="gemstone gem-ruby" aria-hidden="true">◆</span>
              <span className="gemstone gem-citrine" aria-hidden="true">◆</span>
              <Bottle name="Rose + Moss" category="Botanical" />
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

            <section className="scent-family-guide" aria-labelledby="scent-family-title">
              <div className="scent-guide-heading">
                <div>
                  <small>THE PERFUMER'S MAP</small>
                  <h3 id="scent-family-title">Core scent families <em>& subfamilies</em></h3>
                  <p>Explore the four broad families and the scent styles that sit within or between them.</p>
                </div>
                <span className="scent-guide-stamp">SCENT<br/>ATLAS</span>
              </div>

              <div className="scent-family-grid">
                {scentFamilyGuide.map((group, index) => (
                  <article className={`scent-family-card scent-family-card-${index}`} key={group.name}>
                    <span className="scent-family-number">0{index + 1}</span>
                    <h4>{group.name}</h4>
                    <small>{group.tone}</small>
                    <div className="scent-subfamily-list">
                      {group.subfamilies.map(subfamily => <span key={subfamily}>{subfamily}</span>)}
                    </div>
                    <p>{group.examples}</p>
                  </article>
                ))}
              </div>

              <div className="classic-groups">
                <div className="classic-groups-heading">
                  <small>MICHAEL EDWARDS · 2024 WHEEL</small>
                  <h4>Four groups & 14 fragrance families</h4>
                </div>
                <div className="scent-system-grid">
                  {michaelEdwardsGroups.map(([name, subs], index) => (
                    <article className="scent-system-card" key={name}>
                      <span className="scent-system-index">0{index + 1}</span>
                      <strong>{name}</strong>
                      <div className="scent-subfamily-list">
                        {subs.map(sub => <span key={sub}>{sub}</span>)}
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="classic-groups scent-system-section">
                <div className="classic-groups-heading">
                  <small>FRENCH SOCIETY OF PERFUMERS · CLASSIFICATION DES PARFUMS</small>
                  <h4>Seven classical families & their subfamilies</h4>
                  <p className="scent-system-intro">A separate technical classification. The subfamily names below follow the published 1990 classification as reproduced in Perfumers & Flavorist.</p>
                </div>
                <div className="french-family-list">
                  {frenchPerfumerFamilies.map((group, index) => (
                    <article key={group.name}>
                      <div className="french-family-title"><span>0{index + 1}</span><strong>{group.name}</strong></div>
                      <p>{group.description}</p>
                      <div className="scent-subfamily-list">
                        {group.subfamilies.map(sub => <span key={sub}>{sub}</span>)}
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="classic-groups scent-system-section">
                <div className="classic-groups-heading">
                  <small>THE FRAGRANCE FOUNDATION · TRADITIONAL SELECTION GUIDE</small>
                  <h4>13 traditional fragrance categories</h4>
                </div>
                <div className="classic-groups-grid">
                  {fragranceFoundationCategories.map(([name, description], index) => (
                    <article key={name}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <div><strong>{name}</strong><p>{description}</p></div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="classic-groups scent-system-section">
                <div className="classic-groups-heading">
                  <small>ADDITIONAL OLFACTIVE FACETS & ACCORD DESCRIPTORS</small>
                  <h4>More ways perfumers describe a scent</h4>
                  <p className="scent-system-intro">These are useful descriptors and accord styles. They are not all independent top-level families in every classification.</p>
                </div>
                <div className="classic-groups-grid">
                  {additionalScentDescriptors.map(([name, description], index) => (
                    <article key={name}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <div><strong>{name}</strong><p>{description}</p></div>
                    </article>
                  ))}
                </div>
              </div>

              <p className="scent-taxonomy-note">
                There is no single universal master list. The same perfume can belong to one family in a wheel and receive a different label in another system. Notes (ingredients), accords (composed scent effects), families (overall structures), and descriptors (facets such as powdery or smoky) are related but not interchangeable.
              </p>
              <div className="scent-taxonomy-references">
                <a className="scent-taxonomy-source" href="https://www.fragrancesoftheworld.com/Docs/Fragrance-Wheels-2024.pdf" target="_blank" rel="noreferrer">Michael Edwards' Fragrance Wheel (2024) ↗</a>
                <a className="scent-taxonomy-source" href="https://fragrance.org/wp-content/uploads/2019/10/TFF-Fragrance-Academy-Overview-1.pdf" target="_blank" rel="noreferrer">The Fragrance Foundation: Fragrance Academy ↗</a>
                <a className="scent-taxonomy-source" href="https://img.perfumerflavorist.com/files/base/allured/all/document/2016/02/pf.PF_26_06_028_10.pdf" target="_blank" rel="noreferrer">Boelens & Boelens: Classification of Perfumes and Fragrances ↗</a>
              </div>
            </section>

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
                      <Bottle color={recipe.color || "#c9dcb8"} name={recipe.name} category={recipe.category} />
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
            <small>THE PERFUMER'S NOTEBOOK</small>
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
                <Bottle color={selected.color || "#c9dcb8"} name={selected.name} category={selected.category} />
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
                  Each ingredient has its own single-subject reference image. Select any image to enlarge it.
                  Accord and aroma-chemical photos are visual references, not proof of an accord's exact composition.
                </p>

                {(selected.ingredients || []).map((item, i) => {
                  const photo = ingredientPhoto(item.name);
                  return (
                    <div className="ingredient ingredient-with-image" key={i}>
                      <div className="ingredient-main">
                        <button
                          type="button"
                          className="ingredient-image-button"
                          onClick={() => setEnlargedIngredient({ ...photo, name: item.name })}
                          aria-label={`Enlarge image of ${item.name}`}
                        >
                          <img
                            className="ingredient-thumb"
                            src={photo.src}
                            alt={photo.caption}
                            loading="lazy"
                            width="76"
                            height="64"
                            onError={event => {
                              const image = event.currentTarget;
                              if (image.dataset.fallbackApplied) {
                                image.hidden = true;
                                return;
                              }
                              image.dataset.fallbackApplied = "true";
                              const fallbackSrc = "https://pgiforyou.com/cdn/shop/files/ALDEHYDEC12MNA_377e40da-799a-4252-96bc-3b98d49fe316.jpg?v=1723391423";
                              image.src = fallbackSrc;
                              image.alt = "Single labelled aroma-chemical bottle, illustrative reference";
                              setEnlargedIngredient(current => current
                                ? { ...current, src: fallbackSrc, caption: image.alt }
                                : current
                              );
                            }}
                          />
                          <span className="ingredient-zoom-hint">VIEW</span>
                        </button>
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
                <div className="notebook-template-panel">
                  <div>
                    <strong>Choose your starting point</strong>
                    <small>Load a guided formula sketch, then edit every field to make it your own.</small>
                  </div>
                  <label>
                    Formula template
                    <select
                      value={form.template}
                      onChange={e => loadNotebookTemplate(e.target.value)}
                    >
                      {notebookTemplates.map(template => (
                        <option key={template.id} value={template.id}>{template.name}</option>
                      ))}
                    </select>
                  </label>
                  <p>Templates are editable learning drafts, not safety-assessed or skin-approved perfume formulas.</p>
                </div>

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
                  Fragrance family log
                  <select
                    value={form.category}
                    onChange={e =>
                      setForm({ ...form, category: e.target.value })
                    }
                  >
                    {familyLogGroups.map(group => (
                      <optgroup key={group.label} label={group.label}>
                        {group.options.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <small>
                    Choose the closest family or subfamily. Use the facets section
                    when you are recording a scent character or accord rather than
                    a formal family.
                  </small>
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

        {enlargedIngredient && (
          <div
            className="overlay ingredient-lightbox-overlay"
            onMouseDown={event => {
              if (event.target === event.currentTarget) setEnlargedIngredient(null);
            }}
          >
            <section className="ingredient-lightbox" role="dialog" aria-modal="true" aria-label={`Ingredient image: ${enlargedIngredient.name}`}>
              <button
                type="button"
                className="close ingredient-lightbox-close"
                onClick={() => setEnlargedIngredient(null)}
                aria-label="Close enlarged ingredient image"
              >
                ×
              </button>
              <small>SCENTLAB / INGREDIENT REFERENCE</small>
              <h2>{enlargedIngredient.name}</h2>
              <img src={enlargedIngredient.src} alt={enlargedIngredient.caption} />
              <p>{enlargedIngredient.caption}</p>
              <a href={enlargedIngredient.page} target="_blank" rel="noreferrer">
                Image source &amp; attribution ↗
              </a>
            </section>
          </div>
        )}
      </div>
    </>
  );
}

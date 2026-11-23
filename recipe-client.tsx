"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Copy, FlaskConical, Info, Scale, Share2 } from "lucide-react";
import { getRecipe } from "@/lib/recipes";

export default function RecipePage() {
  const params = useParams<{ slug: string }>();
  const recipe = getRecipe(params.slug);
  const [batch, setBatch] = useState("10");
  const [custom, setCustom] = useState("10");
  const target = batch === "custom" ? Math.max(0.01, Number(custom) || 10) : Number(batch);
  const total = recipe?.ingredients.reduce((sum, line) => sum + line.amount, 0) || 1;
  const lines = useMemo(() => recipe ? recipe.ingredients.map(line => ({ ...line, scaled: line.amount / total * target, percent: line.amount / total * 100 })) : [], [recipe, target, total]);
  if (!recipe) return <div className="detail-page"><h1>Recipe not found</h1><p>This recipe may have been removed or is not part of the published starter library.</p><Link href="/">Return to discovery</Link></div>;

  return (
    <div className="detail-page">
      <div className="detail-top"><Link href="/" className="back-link"><ArrowLeft size={16} /> Back to discovery</Link><span className="eyebrow">SCENTLAB RECIPE FILE / {recipe.slug.toUpperCase()}</span></div>
      <div className="detail-hero">
        <div className="detail-image"><img src={recipe.image} alt="" /><span className="image-chip">{recipe.category}</span></div>
        <div className="detail-intro"><span className="eyebrow">THE COMMUNITY FORMULA BOOK · VOL. 001</span><h1>{recipe.title}</h1><p className="detail-subtitle">{recipe.subtitle}</p><p>{recipe.description}</p><div className="detail-byline">FORMULATED AS A CONCEPT BY <strong>{recipe.creator}</strong></div><div className="tag-row">{recipe.tags.map(tag => <span key={tag}>#{tag}</span>)}</div></div>
      </div>
      <div className="safety-banner"><Info size={19} /><div><strong>Educational demo formula — not manufacturing guidance.</strong><p>These quantities are synthetic UI test data. They are not validated, skin-safe, IFRA-compliant, or approved for use on people. Exact material identity, supplier documentation, intended-use category, dilution and qualified safety review are required before real-world use.</p></div></div>
      <div className="workbench">
        <div className="workbench-heading"><span className="eyebrow"><FlaskConical size={14} /> THE WORKBENCH</span><h2>Make it a <em>batch.</em></h2><p>Scale the example formula and see how each line changes.</p></div>
        <div className="scale-panel"><div className="scale-title"><Scale size={18} /><strong>Batch calculator</strong><span>Target total weight</span></div><div className="scale-controls">{["10", "30", "50", "custom"].map(value => <button key={value} onClick={() => setBatch(value)} className={batch === value ? "scale-option selected" : "scale-option"}>{value === "custom" ? "Custom" : `${value} g`}</button>)}{batch === "custom" && <label className="custom-weight"><input type="number" min="0.01" step="0.01" value={custom} onChange={e => setCustom(e.target.value)} /> g</label>}</div></div>
        <div className="formula-head"><div><span className="eyebrow">FORMULA BREAKDOWN</span><h3>Ingredients <span>({recipe.ingredients.length})</span></h3></div><span className="formula-total">TOTAL · {target.toFixed(2)} g</span></div>
        <div className="formula-table"><div className="formula-row formula-labels"><span>MATERIAL / STOCK</span><span>ROLE</span><span>WEIGHT</span><span>FORMULA %</span></div>{lines.map(line => <div className="formula-row" key={line.material}><div><strong>{line.material}</strong><small>{line.stock}</small></div><span className="role-pill">{line.role}</span><strong className="number-cell">{line.scaled.toFixed(3)} g</strong><span className="number-cell">{line.percent.toFixed(2)}%</span></div>)}</div>
        <div className="steps-block"><span className="eyebrow">THE PROCESS</span><h3>How the concept comes together</h3><ol>{recipe.steps.map((step, i) => <li key={step}><span>{String(i + 1).padStart(2, "0")}</span>{step}</li>)}</ol></div>
        <div className="detail-actions"><button className="button button-dark" onClick={() => navigator.clipboard?.writeText(lines.map(x => `${x.material}: ${x.scaled.toFixed(3)} g (${x.percent.toFixed(2)}%)`).join("\n"))}><Copy size={16} /> Copy scaled formula</button><button className="button button-outline" onClick={() => navigator.share?.({ title: recipe.title, url: location.href })}><Share2 size={16} /> Share recipe</button></div>
      </div>
    </div>
  );
}

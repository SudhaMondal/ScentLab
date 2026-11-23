"use client";
import Link from "next/link";
import { Heart, ArrowUpRight } from "lucide-react";
import { useEffect,useState } from "react";
import type { Recipe } from "@/lib/recipes";
import { getSavedSlugs,toggleSavedSlug } from "@/lib/local-store";
export function RecipeCard({recipe,index=0}:{recipe:Recipe;index?:number}){
 const [saved,setSaved]=useState(false);useEffect(()=>setSaved(getSavedSlugs().includes(recipe.slug)),[recipe.slug]);const href=recipe.demo?`/recipes/${recipe.slug}`:`/recipe/?slug=${recipe.slug}`;
 return <article className={`recipe-card card-${recipe.color}`}><Link href={href} className="card-image-wrap"><img src={recipe.image} alt="" className="card-image" loading={index>2?"lazy":"eager"}/><span className="image-chip">{recipe.category}</span><span className="image-arrow"><ArrowUpRight size={18}/></span></Link><div className="card-copy"><div className="card-kicker">{recipe.notes.slice(0,3).join(" · ")}</div><Link href={href} className="card-title">{recipe.title}</Link><p>{recipe.subtitle}</p><div className="card-meta"><span>by {recipe.creator}</span><button className="save-mark" aria-label={saved?"Remove bookmark":"Bookmark recipe"} onClick={()=>setSaved(toggleSavedSlug(recipe.slug).includes(recipe.slug))}><Heart size={16} fill={saved?"currentColor":"none"}/></button></div></div></article>;
}

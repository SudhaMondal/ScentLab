import { recipes } from "@/lib/recipes";
import RecipeClient from "./recipe-client";

export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export default function RecipePage() {
  return <RecipeClient />;
}

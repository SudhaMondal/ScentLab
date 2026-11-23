import type { Recipe } from "@/lib/recipes";

export type CommunityPost = { id: string; author: string; text: string; createdAt: string; likes: number };
export type Profile = { name: string; bio: string; location: string };

const read = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try { const raw = window.localStorage.getItem(key); return raw ? JSON.parse(raw) as T : fallback; }
  catch { return fallback; }
};
const write = (key: string, value: unknown) => {
  if (typeof window !== "undefined") window.localStorage.setItem(key, JSON.stringify(value));
};
export const getLocalRecipes = () => read<Recipe[]>("scentlab:recipes", []);
export const saveLocalRecipe = (recipe: Recipe) => write("scentlab:recipes", [recipe, ...getLocalRecipes()]);
export const getProfile = () => read<Profile>("scentlab:profile", { name: "Scent Explorer", bio: "Learning the language of fragrance, one experiment at a time.", location: "Somewhere fragrant" });
export const saveProfile = (profile: Profile) => write("scentlab:profile", profile);
export const getPosts = () => read<CommunityPost[]>("scentlab:posts", [
  { id: "welcome-1", author: "ScentLab Studio", text: "Welcome to the workbench! What note are you exploring this week — something green, gourmand, floral, or wonderfully strange?", createdAt: new Date(0).toISOString(), likes: 4 },
  { id: "welcome-2", author: "Mira Sol", text: "Today's experiment: can rosemary feel both sunlit and smoky? I am collecting contrasting interpretations of familiar materials.", createdAt: new Date(0).toISOString(), likes: 8 }
]);
export const savePosts = (posts: CommunityPost[]) => write("scentlab:posts", posts);
export const getSavedSlugs = () => read<string[]>("scentlab:saved", []);
export const toggleSavedSlug = (slug: string) => {
  const current = getSavedSlugs();
  const next = current.includes(slug) ? current.filter(x => x !== slug) : [...current, slug];
  write("scentlab:saved", next); return next;
};

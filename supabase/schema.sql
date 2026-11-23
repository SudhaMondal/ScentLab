-- ScentLab database setup
-- Run this script once in Supabase SQL Editor.

create extension if not exists pgcrypto;

-- USER PROFILES
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  bio text,
  created_at timestamptz not null default now()
);

-- RECIPES
create table if not exists public.recipes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  name text not null check (char_length(name) between 2 and 80),
  category text not null default 'Fresh',
  mood text not null default '',
  notes text[] not null default '{}',
  ingredients jsonb not null default '[]'::jsonb,
  color text not null default '#c9dcb8',
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- SAVED RECIPES
create table if not exists public.saved_recipes (
  user_id uuid not null references auth.users(id) on delete cascade,
  recipe_id uuid not null references public.recipes(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, recipe_id)
);

-- RECIPE LIKES
create table if not exists public.recipe_likes (
  user_id uuid not null references auth.users(id) on delete cascade,
  recipe_id uuid not null references public.recipes(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, recipe_id)
);

-- COMMENTS
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid not null references public.recipes(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 1000),
  created_at timestamptz not null default now()
);

-- INDEXES
create index if not exists recipes_created_at_idx
on public.recipes(created_at desc);

create index if not exists comments_recipe_created_idx
on public.comments(recipe_id, created_at);

-- CREATE A PROFILE WHEN A USER REGISTERS
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      split_part(new.email, '@', 1)
    )
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- ENABLE ROW LEVEL SECURITY
alter table public.profiles enable row level security;
alter table public.recipes enable row level security;
alter table public.saved_recipes enable row level security;
alter table public.recipe_likes enable row level security;
alter table public.comments enable row level security;

-- REMOVE OLD POLICIES IF THIS SCRIPT IS RE-RUN
drop policy if exists "Profiles public read" on public.profiles;
drop policy if exists "Users update own profile" on public.profiles;
drop policy if exists "Published recipes public read" on public.recipes;
drop policy if exists "Authenticated create own recipes" on public.recipes;
drop policy if exists "Authors update own recipes" on public.recipes;
drop policy if exists "Authors delete own recipes" on public.recipes;
drop policy if exists "Read own saved recipes" on public.saved_recipes;
drop policy if exists "Save own recipes" on public.saved_recipes;
drop policy if exists "Delete own saves" on public.saved_recipes;
drop policy if exists "Likes public read" on public.recipe_likes;
drop policy if exists "Users create own likes" on public.recipe_likes;
drop policy if exists "Users delete own likes" on public.recipe_likes;
drop policy if exists "Comments public read" on public.comments;
drop policy if exists "Authenticated users comment as self" on public.comments;
drop policy if exists "Authors delete own comments" on public.comments;

-- PROFILE POLICIES
create policy "Profiles public read"
on public.profiles for select
using (true);

create policy "Users update own profile"
on public.profiles for update to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

-- RECIPE POLICIES
create policy "Published recipes public read"
on public.recipes for select
using (is_published = true or auth.uid() = user_id);

create policy "Authenticated create own recipes"
on public.recipes for insert to authenticated
with check (auth.uid() = user_id);

create policy "Authors update own recipes"
on public.recipes for update to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Authors delete own recipes"
on public.recipes for delete to authenticated
using (auth.uid() = user_id);

-- SAVED RECIPE POLICIES
create policy "Read own saved recipes"
on public.saved_recipes for select to authenticated
using (auth.uid() = user_id);

create policy "Save own recipes"
on public.saved_recipes for insert to authenticated
with check (auth.uid() = user_id);

create policy "Delete own saves"
on public.saved_recipes for delete to authenticated
using (auth.uid() = user_id);

-- LIKE POLICIES
create policy "Likes public read"
on public.recipe_likes for select
using (true);

create policy "Users create own likes"
on public.recipe_likes for insert to authenticated
with check (auth.uid() = user_id);

create policy "Users delete own likes"
on public.recipe_likes for delete to authenticated
using (auth.uid() = user_id);

-- COMMENT POLICIES
create policy "Comments public read"
on public.comments for select
using (true);

create policy "Authenticated users comment as self"
on public.comments for insert to authenticated
with check (auth.uid() = user_id);

create policy "Authors delete own comments"
on public.comments for delete to authenticated
using (auth.uid() = user_id);

-- API PERMISSIONS
grant usage on schema public to anon, authenticated;

grant select
on public.profiles, public.recipes,
   public.recipe_likes, public.comments
to anon, authenticated;

grant insert, update
on public.profiles
to authenticated;

grant insert, update, delete
on public.recipes
to authenticated;

grant select, insert, delete
on public.saved_recipes, public.recipe_likes, public.comments
to authenticated;

-- STARTER RECIPES
insert into public.recipes
(name, category, mood, notes, ingredients, color, is_published)
select
  v.name,
  v.category,
  v.mood,
  v.notes,
  v.ingredients::jsonb,
  v.color,
  true
from (
  values
  (
    'Rosemary After Rain',
    'Fresh',
    'A green garden just after a summer storm.',
    array['Rosemary','Bergamot','Cedarwood'],
    '[{"name":"Rosemary accord","grams":4},{"name":"Bergamot accord","grams":3},{"name":"Cedarwood accord","grams":2},{"name":"Perfumer''s alcohol","grams":1}]',
    '#b8d4ad'
  ),
  (
    'Midnight Cacao',
    'Gourmand',
    'Dark chocolate, warm evenings and a little mystery.',
    array['Cacao','Vanilla','Tonka'],
    '[{"name":"Cacao accord","grams":4},{"name":"Vanilla accord","grams":3},{"name":"Tonka accord","grams":2},{"name":"Perfumer''s alcohol","grams":1}]',
    '#c99c7e'
  ),
  (
    'Petals in Paris',
    'Floral',
    'Soft rose petals with a clean, elegant finish.',
    array['Rose','Jasmine','Musk'],
    '[{"name":"Rose accord","grams":4},{"name":"Jasmine accord","grams":2},{"name":"Musk accord","grams":3},{"name":"Perfumer''s alcohol","grams":1}]',
    '#edb7c8'
  ),
  (
    'Golden Hour',
    'Woody',
    'Sun-warmed wood, soft amber and golden light.',
    array['Amber','Sandalwood','Vanilla'],
    '[{"name":"Amber accord","grams":4},{"name":"Sandalwood accord","grams":3},{"name":"Vanilla accord","grams":2},{"name":"Perfumer''s alcohol","grams":1}]',
    '#e4c27b'
  ),
  (
    'Citrus Club',
    'Fresh',
    'A bright citrus opening with a breezy finish.',
    array['Lemon','Sweet Orange','Neroli'],
    '[{"name":"Lemon accord","grams":4},{"name":"Sweet orange accord","grams":3},{"name":"Neroli accord","grams":2},{"name":"Perfumer''s alcohol","grams":1}]',
    '#e9d875'
  ),
  (
    'Velvet Library',
    'Woody',
    'Old books, polished wood and quiet confidence.',
    array['Cedar','Patchouli','Vanilla'],
    '[{"name":"Cedarwood accord","grams":4},{"name":"Patchouli accord","grams":3},{"name":"Vanilla accord","grams":2},{"name":"Perfumer''s alcohol","grams":1}]',
    '#aaa18e'
  )
) as v(name, category, mood, notes, ingredients, color)
where not exists (
  select 1
  from public.recipes r
  where r.name = v.name and r.user_id is null
);

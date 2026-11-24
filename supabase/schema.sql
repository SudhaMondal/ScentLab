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
  instructions text[] not null default '{}',
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


-- Add preparation methods to the six public starter recipes.
update public.recipes
set instructions = case name
  when 'Rosemary After Rain' then array[
    'Prepare clean, dry glass equipment, a precision scale, a glass stirrer and a labelled sample vial. Work with ventilation and suitable protective equipment.',
    'Weigh each accord separately using the quantities shown for your chosen batch size.',
    'Combine the cedarwood and rosemary accords in a glass beaker and stir slowly until uniform.',
    'Add the bergamot accord gradually, stirring gently after each addition.',
    'Add the listed perfumer''s alcohol slowly while stirring. Keep the beaker covered between additions.',
    'Transfer to the labelled vial and leave closed for 48 hours. Evaluate on a blotter strip only; this starter formula is not validated for skin use.'
  ]
  when 'Midnight Cacao' then array[
    'Prepare clean, dry glass equipment, a precision scale, a glass stirrer and a labelled sample vial. Work with ventilation and suitable protective equipment.',
    'Weigh each accord separately using the quantities shown for your chosen batch size.',
    'Combine the tonka and vanilla accords in a glass beaker and stir slowly.',
    'Add the cacao accord in small portions, stirring until the blend is uniform.',
    'Add the listed perfumer''s alcohol gradually while stirring gently.',
    'Transfer to the labelled vial and leave closed for 48 hours. Evaluate on a blotter strip only; this starter formula is not validated for skin use.'
  ]
  when 'Petals in Paris' then array[
    'Prepare clean, dry glass equipment, a precision scale, a glass stirrer and a labelled sample vial. Work with ventilation and suitable protective equipment.',
    'Weigh each accord separately using the quantities shown for your chosen batch size.',
    'Combine the musk and rose accords in a glass beaker and stir gently until uniform.',
    'Add the jasmine accord gradually, mixing slowly.',
    'Add the listed perfumer''s alcohol in small portions while stirring gently.',
    'Transfer to the labelled vial and leave closed for 48 hours. Evaluate on a blotter strip only; this starter formula is not validated for skin use.'
  ]
  when 'Golden Hour' then array[
    'Prepare clean, dry glass equipment, a precision scale, a glass stirrer and a labelled sample vial. Work with ventilation and suitable protective equipment.',
    'Weigh each accord separately using the quantities shown for your chosen batch size.',
    'Combine the sandalwood and vanilla accords in a glass beaker and stir until uniform.',
    'Add the amber accord gradually, stirring slowly.',
    'Add the listed perfumer''s alcohol a little at a time while stirring gently.',
    'Transfer to the labelled vial and leave closed for 48 hours. Evaluate on a blotter strip only; this starter formula is not validated for skin use.'
  ]
  when 'Citrus Club' then array[
    'Prepare clean, dry glass equipment, a precision scale, a glass stirrer and a labelled sample vial. Work with ventilation and suitable protective equipment.',
    'Weigh each accord separately using the quantities shown for your chosen batch size.',
    'Combine the neroli and sweet orange accords in a glass beaker and stir gently.',
    'Add the lemon accord gradually, mixing until uniform.',
    'Add the listed perfumer''s alcohol slowly while stirring.',
    'Transfer to the labelled vial and leave closed for 48 hours. Evaluate on a blotter strip only; this starter formula is not validated for skin use.'
  ]
  when 'Velvet Library' then array[
    'Prepare clean, dry glass equipment, a precision scale, a glass stirrer and a labelled sample vial. Work with ventilation and suitable protective equipment.',
    'Weigh each accord separately using the quantities shown for your chosen batch size.',
    'Combine the vanilla and patchouli accords in a glass beaker and stir slowly.',
    'Add the cedarwood accord gradually, stirring until uniform.',
    'Add the listed perfumer''s alcohol in small portions while stirring gently.',
    'Transfer to the labelled vial and leave closed for 48 hours. Evaluate on a blotter strip only; this starter formula is not validated for skin use.'
  ]
  else instructions
end
where user_id is null
and name in ('Rosemary After Rain','Midnight Cacao','Petals in Paris','Golden Hour','Citrus Club','Velvet Library')
and coalesce(cardinality(instructions), 0) = 0;


-- Replace generic starter instructions with measured, timed blotter-test procedures.
-- These are 10 g educational accord blends, not skin-safe finished perfumes.
update public.recipes
set instructions = case name
  when 'Rosemary After Rain' then array[
    'Standard batch: 10.00 g. Work at 20–25°C with good ventilation, away from flames, sparks and hot surfaces. Wear nitrile gloves and eye protection. Use a 0.01 g scale, clean dry 30–50 mL glass beaker, glass rod, four weighing cups, disposable pipettes, blotter strips and a clean 10–15 mL amber glass vial. Do not heat.',
    'Tare separate cups and weigh: Rosemary accord 4.00 g; Bergamot accord 3.00 g; Cedarwood accord 2.00 g; perfumer''s alcohol 1.00 g. Keep alcohol capped. The app''s live ingredient list recalculates weights for other batch sizes.',
    'Add 2.00 g Cedarwood accord and 4.00 g Rosemary accord to the beaker. Stir slowly for 90 seconds until uniform.',
    'Add 3.00 g Bergamot accord in 3 equal 1.00 g portions, 30 seconds apart. Stir 45 seconds after each portion, then stir 60 seconds more.',
    'Add 1.00 g perfumer''s alcohol in 4 equal 0.25 g portions, 30 seconds apart. Stir 30 seconds after each addition, then stir continuously for 2 minutes. Keep the beaker loosely covered between additions; never seal while mixing.',
    'Transfer to the labelled vial, cap tightly and gently invert 10 times. Record date and ingredient lot numbers. Rest upright in a cool, dark place for 48 hours; assess again after 7 days. Apply one small drop to a blotter and record at 5 minutes, 30 minutes, 2 hours and 24 hours. Blotter-only; not approved for skin use.'
  ]
  when 'Midnight Cacao' then array[
    'Standard batch: 10.00 g. Work at 20–25°C with good ventilation, away from flames, sparks and hot surfaces. Wear nitrile gloves and eye protection. Use a 0.01 g scale, clean dry 30–50 mL glass beaker, glass rod, four weighing cups, disposable pipettes, blotter strips and a clean 10–15 mL amber glass vial. Do not heat.',
    'Tare separate cups and weigh: Cacao accord 4.00 g; Vanilla accord 3.00 g; Tonka accord 2.00 g; perfumer''s alcohol 1.00 g. Keep alcohol capped. The app''s live ingredient list recalculates weights for other batch sizes.',
    'Add 2.00 g Tonka accord and 3.00 g Vanilla accord to the beaker. Stir slowly for 90 seconds until uniform.',
    'Add 4.00 g Cacao accord in 4 equal 1.00 g portions, 30 seconds apart. Stir 45 seconds after each portion, then stir 60 seconds more.',
    'Add 1.00 g perfumer''s alcohol in 4 equal 0.25 g portions, 30 seconds apart. Stir 30 seconds after each addition, then stir continuously for 2 minutes. Keep the beaker loosely covered between additions; never seal while mixing.',
    'Transfer to the labelled vial, cap tightly and gently invert 10 times. Record date and ingredient lot numbers. Rest upright in a cool, dark place for 48 hours; assess again after 7 days. Apply one small drop to a blotter and record at 5 minutes, 30 minutes, 2 hours and 24 hours. Blotter-only; not approved for skin use.'
  ]
  when 'Petals in Paris' then array[
    'Standard batch: 10.00 g. Work at 20–25°C with good ventilation, away from flames, sparks and hot surfaces. Wear nitrile gloves and eye protection. Use a 0.01 g scale, clean dry 30–50 mL glass beaker, glass rod, four weighing cups, disposable pipettes, blotter strips and a clean 10–15 mL amber glass vial. Do not heat.',
    'Tare separate cups and weigh: Rose accord 4.00 g; Jasmine accord 2.00 g; Musk accord 3.00 g; perfumer''s alcohol 1.00 g. Keep alcohol capped. The app''s live ingredient list recalculates weights for other batch sizes.',
    'Add 3.00 g Musk accord and 4.00 g Rose accord to the beaker. Stir gently for 90 seconds until uniform.',
    'Add 2.00 g Jasmine accord in 4 equal 0.50 g portions, 30 seconds apart. Stir 45 seconds after each portion, then stir 60 seconds more.',
    'Add 1.00 g perfumer''s alcohol in 4 equal 0.25 g portions, 30 seconds apart. Stir 30 seconds after each addition, then stir continuously for 2 minutes. Keep the beaker loosely covered between additions; never seal while mixing.',
    'Transfer to the labelled vial, cap tightly and gently invert 10 times. Record date and ingredient lot numbers. Rest upright in a cool, dark place for 48 hours; assess again after 7 days. Apply one small drop to a blotter and record at 5 minutes, 30 minutes, 2 hours and 24 hours. Blotter-only; not approved for skin use.'
  ]
  when 'Golden Hour' then array[
    'Standard batch: 10.00 g. Work at 20–25°C with good ventilation, away from flames, sparks and hot surfaces. Wear nitrile gloves and eye protection. Use a 0.01 g scale, clean dry 30–50 mL glass beaker, glass rod, four weighing cups, disposable pipettes, blotter strips and a clean 10–15 mL amber glass vial. Do not heat.',
    'Tare separate cups and weigh: Amber accord 4.00 g; Sandalwood accord 3.00 g; Vanilla accord 2.00 g; perfumer''s alcohol 1.00 g. Keep alcohol capped. The app''s live ingredient list recalculates weights for other batch sizes.',
    'Add 3.00 g Sandalwood accord and 2.00 g Vanilla accord to the beaker. Stir slowly for 90 seconds until uniform.',
    'Add 4.00 g Amber accord in 4 equal 1.00 g portions, 30 seconds apart. Stir 45 seconds after each portion, then stir 60 seconds more.',
    'Add 1.00 g perfumer''s alcohol in 4 equal 0.25 g portions, 30 seconds apart. Stir 30 seconds after each addition, then stir continuously for 2 minutes. Keep the beaker loosely covered between additions; never seal while mixing.',
    'Transfer to the labelled vial, cap tightly and gently invert 10 times. Record date and ingredient lot numbers. Rest upright in a cool, dark place for 48 hours; assess again after 7 days. Apply one small drop to a blotter and record at 5 minutes, 30 minutes, 2 hours and 24 hours. Blotter-only; not approved for skin use.'
  ]
  when 'Citrus Club' then array[
    'Standard batch: 10.00 g. Work at 20–25°C with good ventilation, away from flames, sparks and hot surfaces. Wear nitrile gloves and eye protection. Use a 0.01 g scale, clean dry 30–50 mL glass beaker, glass rod, four weighing cups, disposable pipettes, blotter strips and a clean 10–15 mL amber glass vial. Do not heat.',
    'Tare separate cups and weigh: Lemon accord 4.00 g; Sweet orange accord 3.00 g; Neroli accord 2.00 g; perfumer''s alcohol 1.00 g. Keep alcohol capped. The app''s live ingredient list recalculates weights for other batch sizes.',
    'Add 2.00 g Neroli accord and 3.00 g Sweet orange accord to the beaker. Stir gently for 90 seconds until uniform.',
    'Add 4.00 g Lemon accord in 4 equal 1.00 g portions, 30 seconds apart. Stir 45 seconds after each portion, then stir 60 seconds more.',
    'Add 1.00 g perfumer''s alcohol in 4 equal 0.25 g portions, 30 seconds apart. Stir 30 seconds after each addition, then stir continuously for 2 minutes. Keep the beaker loosely covered between additions; never seal while mixing.',
    'Transfer to the labelled vial, cap tightly and gently invert 10 times. Record date and ingredient lot numbers. Rest upright in a cool, dark place for 48 hours; assess again after 7 days. Apply one small drop to a blotter and record at 5 minutes, 30 minutes, 2 hours and 24 hours. Blotter-only; not approved for skin use.'
  ]
  when 'Velvet Library' then array[
    'Standard batch: 10.00 g. Work at 20–25°C with good ventilation, away from flames, sparks and hot surfaces. Wear nitrile gloves and eye protection. Use a 0.01 g scale, clean dry 30–50 mL glass beaker, glass rod, four weighing cups, disposable pipettes, blotter strips and a clean 10–15 mL amber glass vial. Do not heat.',
    'Tare separate cups and weigh: Cedarwood accord 4.00 g; Patchouli accord 3.00 g; Vanilla accord 2.00 g; perfumer''s alcohol 1.00 g. Keep alcohol capped. The app''s live ingredient list recalculates weights for other batch sizes.',
    'Add 2.00 g Vanilla accord and 3.00 g Patchouli accord to the beaker. Stir slowly for 90 seconds until uniform.',
    'Add 4.00 g Cedarwood accord in 4 equal 1.00 g portions, 30 seconds apart. Stir 45 seconds after each portion, then stir 60 seconds more.',
    'Add 1.00 g perfumer''s alcohol in 4 equal 0.25 g portions, 30 seconds apart. Stir 30 seconds after each addition, then stir continuously for 2 minutes. Keep the beaker loosely covered between additions; never seal while mixing.',
    'Transfer to the labelled vial, cap tightly and gently invert 10 times. Record date and ingredient lot numbers. Rest upright in a cool, dark place for 48 hours; assess again after 7 days. Apply one small drop to a blotter and record at 5 minutes, 30 minutes, 2 hours and 24 hours. Blotter-only; not approved for skin use.'
  ]
  else instructions
end
where user_id is null
and name in ('Rosemary After Rain','Midnight Cacao','Petals in Paris','Golden Hour','Citrus Club','Velvet Library');


-- SOURCE METADATA FOR PUBLISHED REFERENCE PERFUMES
alter table public.recipes
  add column if not exists formula_type text,
  add column if not exists target_strength numeric,
  add column if not exists finished_batch_grams numeric,
  add column if not exists finished_concentrate_grams numeric,
  add column if not exists finished_alcohol_grams numeric,
  add column if not exists maceration_days integer,
  add column if not exists compliance_status text,
  add column if not exists compliance_basis text,
  add column if not exists source_title text,
  add column if not exists source_url text,
  add column if not exists method_source_title text,
  add column if not exists method_source_url text,
  add column if not exists formula_strength_label text;

-- Published reference formula 1: Citrus Linen.
insert into public.recipes
(name,category,mood,notes,ingredients,color,is_published,instructions,
 formula_type,target_strength,finished_batch_grams,finished_concentrate_grams,
 finished_alcohol_grams,maceration_days,compliance_status,compliance_basis,
 source_title,source_url,method_source_title,method_source_url,formula_strength_label)
select
 'Citrus Linen','Fresh','Bright orange and lavender over a clean, airy woody-musky base.',
 array['Sweet Orange','Lavender','Hedione','Soft Woods','Clean Musk'],
 '[{"name":"Sweet Orange Essential Oil","grams":2},{"name":"Lavender Essential Oil","grams":0.5},{"name":"Hedione","grams":3.5},{"name":"Ethylene Brassylate","grams":1},{"name":"Iso E Super","grams":1.5},{"name":"Ambroxan 10% in DPG","grams":0.9},{"name":"Vanillin 10% in DPG","grams":0.6}]'::jsonb,
 '#e8c47e',true,
 array[
 'Reference concentrate: 10.00 g. Equipment: 0.01 g-resolution scale, clean dry glass beaker with a loose cover, separate labelled weighing cups, glass rod, one clean pipette per liquid material, blotter strips, 25–30 mL glass mixing bottle with a tight cap, and an ethanol-compatible fine filter. Wear nitrile gloves and eye protection; work with ventilation. Perfumer''s ethanol is flammable: keep it away from flames, sparks and heat. Do not heat the mixture.',
 'Weigh the 10.00 g concentrate separately, taring the scale before every material: Ethylene Brassylate 1.00 g; Iso E Super 1.50 g; Ambroxan solution (10% Ambroxan in DPG) 0.90 g; Vanillin solution (10% Vanillin in DPG) 0.60 g; Hedione 3.50 g; Lavender Essential Oil 0.50 g; Sweet Orange Essential Oil 2.00 g. The Ambroxan and Vanillin lines are already 10% solutions: do not add another 10% dilution to them.',
 'Add the heavier base materials first: Ethylene Brassylate, Iso E Super, Ambroxan 10% in DPG and Vanillin 10% in DPG. Add Hedione and Lavender next. Add Sweet Orange Essential Oil last to reduce its exposure to air while weighing. After the final addition, stir slowly for 2 minutes, scraping the bottom and sides until the concentrate is uniform. Keep the beaker loosely covered between additions.',
 'For one 25.00 g finished EDP reference batch, weigh 5.20 g of the 10.00 g concentrate into a clean, dry 25–30 mL glass bottle. Add 19.80 g perfumer''s ethanol (approximately 95–96% ethanol) by weight. This is the source''s worked calculation: the concentrate includes DPG from its two 10% solutions, so 5.20 g concentrate supplies approximately 4.50 g aromatic material. Do not substitute beverage alcohol or measure by drops or volume.',
 'Cap immediately and gently invert 20 times over about 30 seconds. Do not leave the bottle open. Label it with formula name, batch date, 18% aromatic strength, and raw-material lot numbers. Store upright, tightly closed, cool and dark for 90 days.',
 'Maturation checks: Day 2 — with the cap closed, gently invert 10 times. Day 7 — place one drop on a blotter; assess at 30 seconds, 10 minutes and 1 hour. Day 45 — repeat the blotter assessment and record any change. Keep the bottle sealed between checks.',
 'At Day 90, chill the closed bottle at approximately 4°C for 24 hours. While still cold, filter through clean ethanol-compatible fine filter paper or a suitable approximately 1 µm PTFE/cellulose filter into a clean glass vessel. Avoid incompatible plastics. Let the filtered sample stand at room temperature for 24 hours; if haze or sediment returns, re-check stability and filter again before filling. This is a clarity step, not a substitute for a safety assessment.'
 ],
 'published_reference',18,25,5.2,19.8,90,'source_reference_pass',
 'The source reports an IFRA Category 4 reference-calculator pass at 18% aromatic strength using the listed material grades. This is a source-reported calculation, not an IFRA-issued certificate or an independent safety assessment.',
 'PerfuMate — How to make perfume at home','https://perfumate.app/learn/how-to-make-perfume-at-home',
 'PerfuMate — How long to macerate perfume','https://perfumate.app/learn/how-long-to-macerate-perfume',
 'Eau de Parfum · 18% aromatic strength'
where not exists (select 1 from public.recipes where user_id is null and name='Citrus Linen');

-- Published reference formula 2: Citrus Grove Cologne.
insert into public.recipes
(name,category,mood,notes,ingredients,color,is_published,instructions,
 formula_type,target_strength,finished_batch_grams,finished_concentrate_grams,
 finished_alcohol_grams,maceration_days,compliance_status,compliance_basis,
 source_title,source_url,method_source_title,method_source_url,formula_strength_label)
select
 'Citrus Grove Cologne','Fresh','A crisp citrus cologne with aromatic herbs and a light musky-woody backbone.',
 array['Bergamot FCF','Lemon','Petitgrain','Neroli','Rosemary','Lavender'],
 '[{"name":"Ethylene Brassylate","grams":1},{"name":"Iso E Super","grams":0.5},{"name":"Hedione","grams":1.5},{"name":"Lavender Essential Oil","grams":1},{"name":"Rosemary Essential Oil","grams":0.5},{"name":"Neroli Essential Oil","grams":0.5},{"name":"Petitgrain Bigarade Essential Oil","grams":1},{"name":"Lemon Essential Oil (cold-pressed)","grams":1.5},{"name":"Bergamot FCF Essential Oil","grams":2.5}]'::jsonb,
 '#d9d78b',true,
 array[
 'Reference concentrate: 10.00 g. Equipment: 0.01 g-resolution scale, clean dry glass beaker with a loose cover, separate labelled weighing cups, glass rod, one clean pipette per liquid material, blotter strips, 25–30 mL glass mixing bottle with a tight cap, and an ethanol-compatible fine filter. Wear nitrile gloves and eye protection; work with ventilation. Perfumer''s ethanol is flammable: keep it away from flames, sparks and heat. Do not heat the mixture.',
 'Weigh the normalized 10.00 g concentrate, taring the scale before each line: Ethylene Brassylate 1.00 g; Iso E Super 0.50 g; Hedione 1.50 g; Lavender Essential Oil 1.00 g; Rosemary Essential Oil 0.50 g; Neroli Essential Oil 0.50 g; Petitgrain Bigarade Essential Oil 1.00 g; Lemon Essential Oil (cold-pressed) 1.50 g; Bergamot FCF Essential Oil 2.50 g. These are exactly half the 20.00 g concentrate quantities in the source formula; the proportions are unchanged.',
 'Add Ethylene Brassylate, Iso E Super and Hedione first. Add Lavender, Rosemary, Neroli and Petitgrain next. Add cold-pressed Lemon Essential Oil and Bergamot FCF Essential Oil last. Stir slowly for 2 minutes after the final addition until uniform, keeping the beaker loosely covered between additions.',
 'For one 25.00 g finished cologne reference batch at 5% concentrate, weigh 1.25 g of the 10.00 g concentrate into a clean, dry 25–30 mL glass bottle. Add 23.75 g perfumer''s ethanol (approximately 95–96% ethanol) by weight. Cap immediately and gently invert 20 times over about 30 seconds. Do not measure by drops or volume.',
 'Label with formula name, batch date, 5% strength and raw-material lot numbers. Store upright, tightly closed, cool and dark for 60 days. The source''s Category 4 reference check is specific to this formula and its stated grades, including cold-pressed lemon and bergamot FCF; do not replace them with expressed bergamot or a different citrus grade without recalculating.',
 'Maturation checks: Day 2 — with the cap closed, gently invert 10 times. Day 7 — place one drop on a blotter; assess at 30 seconds, 10 minutes and 1 hour. Day 30 — repeat the blotter assessment and record any change. Keep the bottle sealed between checks.',
 'At Day 60, chill the closed bottle at approximately 4°C for 24 hours. While still cold, filter through clean ethanol-compatible fine filter paper or a suitable approximately 1 µm PTFE/cellulose filter into a clean glass vessel. Avoid incompatible plastics. Let the filtered sample stand at room temperature for 24 hours; if haze or sediment returns, re-check stability and filter again before filling.'
 ],
 'published_reference',5,25,1.25,23.75,60,'source_reference_pass',
 'The source reports an IFRA Category 4 reference-calculator pass at 5% strength under the 51st Amendment. Its cold-pressed lemon line sets the stated maximum strength; the check is grade-specific and is not an IFRA-issued certificate or an independent safety assessment.',
 'PerfuMate — Perfume recipes for beginners','https://perfumate.app/learn/perfume-recipes-for-beginners',
 'PerfuMate — How to make an eau de cologne at home','https://perfumate.app/learn/how-to-make-eau-de-cologne',
 'Eau de Cologne · 5% concentrate'
where not exists (select 1 from public.recipes where user_id is null and name='Citrus Grove Cologne');

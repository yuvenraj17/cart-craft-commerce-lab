
-- Update existing products with gender classification
-- 1 = Male, 2 = Female

-- Female perfumes
UPDATE public.products SET gender = 2 WHERE name = 'Eau de Parfum Sensuelle';
UPDATE public.products SET gender = 2 WHERE name = 'Midnight Bloom';
UPDATE public.products SET gender = 2 WHERE name = 'Summer Lily';
UPDATE public.products SET gender = 2 WHERE name = 'Rose Noir Femme';
UPDATE public.products SET gender = 2 WHERE name = 'Vanilla Sky Dream';
UPDATE public.products SET gender = 2 WHERE name = 'Island Hibiscus';
UPDATE public.products SET gender = 2 WHERE name = 'Peony Blush Romance';
UPDATE public.products SET gender = 2 WHERE name = 'Golden Nectar Elixir';

-- Male perfumes
UPDATE public.products SET gender = 1 WHERE name = 'Ocean Breeze for Men';
UPDATE public.products SET gender = 1 WHERE name = 'Gentleman''s Reserve';
UPDATE public.products SET gender = 1 WHERE name = 'Sport Extreme Homme';
UPDATE public.products SET gender = 1 WHERE name = 'Black Pepper & Cedar';

-- Unisex perfumes (using 2 as default, but you can change these)
UPDATE public.products SET gender = 2 WHERE name = 'Citrus Grove Unisex';
UPDATE public.products SET gender = 1 WHERE name = 'Velvet Oud';
UPDATE public.products SET gender = 2 WHERE name = 'Spiced Amber';
UPDATE public.products SET gender = 2 WHERE name = 'Aqua Marine Fresh';
UPDATE public.products SET gender = 2 WHERE name = 'Enchanted Forest';
UPDATE public.products SET gender = 2 WHERE name = 'White Tea Serenity';
UPDATE public.products SET gender = 2 WHERE name = 'Leather & Smoke';
UPDATE public.products SET gender = 2 WHERE name = 'Green Fig & Vetiver';

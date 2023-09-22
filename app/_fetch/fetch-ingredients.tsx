import { Ingredient } from "../_model/ingredient";

const hardCoded: Ingredient[] = [
  {
    slug: "evoo",
    category: "oil",
    name: "Olive Oil (extra virgin)",
    saponificationValue: 0.134,
  },
  {
    slug: "coconut",
    category: "oil",
    name: "Cocos fat",
    saponificationValue: 0.19,
  },
  {
    slug: "coffee-grounds",
    category: "additive",
    name: "Coffee grounds",
    description: "Used to make exfoliating soaps",
  },
  {
    slug: "glycerin",
    category: "additive",
    name: "Glycerin",
    description: "Extra glycerin makes the soap more moisturizing",
  },
  {
    slug: "sandalwood",
    category: "fragrance",
    name: "Sandalwood",
  },
  {
    slug: "rose",
    category: "fragrance",
    name: "Rose",
  },
];

export default async function fetchIngredients(): Promise<Ingredient[]> {
  return [];
}

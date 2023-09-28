export interface IngredientEntry {
  ingredientSlug: string;
  amount: number;
}

export default interface Recipe {
  name: string;
  slug: string;
  description: string;
  superfat: number;
  ingredients: IngredientEntry[];
}

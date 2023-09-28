/**
 * Entry in an ingredient list
 */
export interface IngredientEntry {
  /**
   * Reference to the ingredient's data
   */
  ingredientSlug: string;
  /**
   * Amount of the ingredient
   */
  amount: number;
}

/**
 * Soap recipe.
 */
export default interface Recipe {
  name: string;
  /**
   * Slug that identifies a recipe
   */
  slug: string;
  description: string;
  /**
   * What percentage of the oils should remain in the finished soap.
   */
  superfat: number;
  ingredients: IngredientEntry[];
}

/**
 * Soap ingredient type
 */
export type Category = "oil" | "additive" | "fragrance";

/**
 * An ingredient of a soap
 */
export interface Ingredient {
  /**
   * Slug that identifies the ingredient
   */
  slug: string;
  category: Category;
  name: string;
  description?: string;
  saponificationValue?: number;
}

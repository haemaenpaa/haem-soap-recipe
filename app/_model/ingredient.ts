export type Category = "oil" | "additive" | "fragrance";

export interface Ingredient {
  slug: string;
  category: Category;
  name: string;
  description?: string;
  saponificationValue?: number;
}

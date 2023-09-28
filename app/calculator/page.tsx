import fetchIngredients from "../_fetch/fetch-ingredients";
import Recipe from "../_model/recipe";
import RecipeEditor from "./RecipeEditor";
import "./calculator.module.css";

/**
 * Displays a new recipe for creation.
 * @returns
 */
export default async function CalculatorPage() {
  const ingredients = await fetchIngredients();
  const recipe: Recipe = {
    name: "",
    slug: "",
    description: "",
    superfat: 0.05,
    ingredients: [],
  };
  return (
    <>
      <main className="flex">
        <RecipeEditor recipe={recipe} ingredients={ingredients}></RecipeEditor>
      </main>
    </>
  );
}

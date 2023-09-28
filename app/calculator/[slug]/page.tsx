import fetchIngredients from "../../_fetch/fetch-ingredients";
import Recipe from "../../_model/recipe";
import RecipeEditor from "../RecipeEditor";
import { fetchRecipe } from "@/app/_fetch/fetch-recipes";

export default async function CalculatorPage({
  params,
}: {
  params: { slug: string };
}) {
  const ingredients = await fetchIngredients();
  const recipe: Recipe = await fetchRecipe(params.slug);
  return (
    <>
      <main className="flex">
        <RecipeEditor recipe={recipe} ingredients={ingredients}></RecipeEditor>
      </main>
    </>
  );
}

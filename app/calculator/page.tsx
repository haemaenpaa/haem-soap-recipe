import fetchIngredients from "../_fetch/fetch-ingredients";
import { IngredientSelector } from "./IngredientSelector";
import "./calculator.module.css";

export default async function CalculatorPage() {
  const ingredients = await fetchIngredients();
  return (
    <>
      <main className="flex">
        <IngredientSelector ingredients={ingredients}></IngredientSelector>
      </main>
    </>
  );
}

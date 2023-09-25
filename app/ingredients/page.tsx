import Link from "next/link";
import fetchIngredients from "../_fetch/fetch-ingredients";
import { Ingredient, Category } from "../_model/ingredient";

function IngredientLi(params: { ingredient: Ingredient }) {
  const ing = params.ingredient;
  return (
    <li key={ing.slug}>
      <Link href={`/ingredients/${ing.slug}`}>{ing.name}</Link>
    </li>
  );
}

function IngredientsUl(params: {
  category: Category;
  ingredients: Ingredient[];
}) {
  const { category, ingredients } = params;
  return (
    <ul>
      {ingredients
        .filter((ing) => ing.category === category)
        .map((ing) => (
          <IngredientLi ingredient={ing} />
        ))}
    </ul>
  );
}

export default async function IngredientsPage() {
  const ingredients = await fetchIngredients();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>
        This is where the user can view and edit ingredients available for
        soaps.
      </h1>
      <h1>Oils</h1>
      <IngredientsUl category={"oil"} ingredients={ingredients}></IngredientsUl>
      <h1>Fragrances</h1>
      <IngredientsUl
        category={"fragrance"}
        ingredients={ingredients}
      ></IngredientsUl>
      <h1>Additives</h1>
      <IngredientsUl
        category={"additive"}
        ingredients={ingredients}
      ></IngredientsUl>
    </main>
  );
}

import { fetchRecipeList, saveRecipe } from "@/app/_fetch/fetch-recipes";
import { randomInt } from "crypto";
import { NextResponse } from "next/server";

export async function GET() {
  const ingredients = await fetchRecipeList();
  return NextResponse.json(ingredients);
}

export async function POST(request: Request) {
  console.log("POST");
  const slug = randomSlug();
  const promise = request
    .json()
    .then((recipe) => {
      recipe.slug = slug;
      return saveRecipe(recipe);
    })
    .then((_) => slug);
  return NextResponse.json(await promise);
}

function randomSlug(): string {
  var number = randomInt(1e6);
  return number.toString(16);
}

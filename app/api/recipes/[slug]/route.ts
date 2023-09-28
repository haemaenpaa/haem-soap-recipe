import { fetchRecipe, saveRecipe } from "@/app/_fetch/fetch-recipes";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: { slug: string } }
) {
  return NextResponse.json(await fetchRecipe(params.slug));
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const promise = request
    .json()
    .then(async (recipe) => {
      recipe.slug = params.slug;
      return await saveRecipe(recipe);
    })
    .then((_) => "");
  return NextResponse.json(await promise);
}

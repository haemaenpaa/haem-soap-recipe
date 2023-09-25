import fetchIngredients, {
  createIngredient,
} from "@/app/_fetch/fetch-ingredients";
import { randomInt } from "crypto";
import { NextResponse } from "next/server";

export async function GET() {
  const ingredients = await fetchIngredients();
  return NextResponse.json(ingredients);
}

export async function POST(request: Request) {
  console.log("POST");
  const promise = request.json().then((ing) => {
    ing.slug = randomSlug();
    return createIngredient(ing);
  });
  return NextResponse.json(promise);
}

function randomSlug(): string {
  var number = randomInt(1e6);
  return number.toString(16);
}

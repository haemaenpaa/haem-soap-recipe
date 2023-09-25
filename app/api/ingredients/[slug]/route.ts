import {
  fetchIngredient,
  updateIngredient,
} from "@/app/_fetch/fetch-ingredients";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: { slug: string } }
) {
  return NextResponse.json(await fetchIngredient(params.slug));
}

export async function PUT(request: Request) {
  const promise = request
    .json()
    .then(async (ing) => {
      return await updateIngredient(ing);
    })
    .then((_) => "");
  return NextResponse.json(await promise);
}

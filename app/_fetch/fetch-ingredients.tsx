import { readFile, writeFile } from "fs/promises";
import { Ingredient } from "../_model/ingredient";

const fileName = "ingredients.json";

const hardCoded: Ingredient[] = [
  {
    slug: "evoo",
    category: "oil",
    name: "Olive Oil (extra virgin)",
    saponificationValue: 0.134,
  },
  {
    slug: "coconut",
    category: "oil",
    name: "Cocos fat",
    saponificationValue: 0.19,
  },
  {
    slug: "coffee-grounds",
    category: "additive",
    name: "Coffee grounds",
    description: "Used to make exfoliating soaps",
  },
  {
    slug: "glycerin",
    category: "additive",
    name: "Glycerin",
    description: "Extra glycerin makes the soap more moisturizing",
  },
  {
    slug: "sandalwood",
    category: "fragrance",
    name: "Sandalwood",
  },
  {
    slug: "rose",
    category: "fragrance",
    name: "Rose",
  },
];

export default async function fetchIngredients(): Promise<Ingredient[]> {
  return readFile("ingredients.json", { encoding: "utf8" }).then(
    (buffer) => {
      return JSON.parse(buffer) as Ingredient[];
    },
    (err) => {
      console.error(err);
      return [...hardCoded];
    }
  );
}

export async function fetchIngredient(slug: string): Promise<Ingredient> {
  console.log(`Fetch ${slug}`);

  return new Promise((res, rej) => {
    fetchIngredients().then((ings) => {
      const ingredient = ings.find((ing) => ing.slug === slug);
      if (ingredient) {
        res({ ...ingredient });
      } else {
        rej(`No ingredient with slug ${slug} found`);
      }
    });
  });
}

export async function createIngredient(ingredient: Ingredient): Promise<void> {
  return new Promise((res, rej) => {
    console.log("Create ", ingredient);
    fetchIngredients().then((ings) => {
      const index = ings.findIndex((ing) => ing.slug === ingredient.slug);
      if (index < 0) {
        ings.push(ingredient);
        writeFile(fileName, JSON.stringify(ings)).then(res, rej);
      } else {
        rej("Slug already exists.");
      }
    });
  });
}

export async function updateIngredient(ingredient: Ingredient): Promise<void> {
  return new Promise((res, rej) => {
    console.log("Update ", ingredient);
    fetchIngredients().then((ings) => {
      const index = ings.findIndex((ing) => ing.slug === ingredient.slug);
      if (index >= 0) {
        ings[index] = ingredient;
        writeFile(fileName, JSON.stringify(ings)).then(res, rej);
      } else {
        rej("Ingredient not found.");
      }
    });
  });
}

import { existsSync, mkdirSync } from "fs";
import { readFile, readdir, writeFile } from "fs/promises";
import Recipe from "../_model/recipe";

const dirname = "./recipes";

export interface RecipeListEntry {
  name: string;
  slug: string;
}

export async function fetchRecipeList(): Promise<RecipeListEntry[]> {
  if (!existsSync(dirname)) {
    return [];
  }

  return readdir(dirname).then((files) => {
    const promises = files
      .filter((f) => f.endsWith(".json"))
      .map((f) =>
        readFile(`${dirname}/${f}`, { encoding: "utf8" }).then((buffer) => {
          const recipe = JSON.parse(buffer);
          return { name: recipe.name, slug: recipe.slug } as RecipeListEntry;
        })
      );

    return Promise.all(promises).then((arr) =>
      arr.sort(
        (a, b) => a.name.localeCompare(b.name) || a.slug.localeCompare(b.slug)
      )
    );
  });
}

export async function fetchRecipe(slug: string): Promise<Recipe> {
  return readFile(`${dirname}/${slug}.json`, { encoding: "utf8" }).then(
    (buffer) => JSON.parse(buffer) as Recipe
  );
}

export async function saveRecipe(recipe: Recipe): Promise<void> {
  if (!existsSync(dirname)) {
    mkdirSync(dirname);
  }
  return writeFile(`${dirname}/${recipe.slug}.json`, JSON.stringify(recipe));
}

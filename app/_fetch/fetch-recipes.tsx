import { existsSync, mkdirSync } from "fs";
import { readFile, readdir, writeFile } from "fs/promises";
import Recipe from "../_model/recipe";

const dirname = "./recipes";

/**
 * Entry in a list of recipes.
 */
export interface RecipeListEntry {
  /**
   * Name of the recipe
   */
  name: string;
  /**
   * The slug that identifies the recipe
   */
  slug: string;
}

/**
 * Fetches a list of all recipes and their slugs.
 * @returns A list of recipe names and slugs
 */
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

/**
 * Fetches a recipe by the slug
 * @param slug recipe's slug
 * @returns corresponding recipe
 */
export async function fetchRecipe(slug: string): Promise<Recipe> {
  return readFile(`${dirname}/${slug}.json`, { encoding: "utf8" }).then(
    (buffer) => JSON.parse(buffer) as Recipe
  );
}

/**
 * Saves the recipe, either updates or creates it.
 * @param recipe Recipe to be saved.
 * @returns Promise that can be waited on to wait for saving to complete.
 */
export async function saveRecipe(recipe: Recipe): Promise<void> {
  if (!existsSync(dirname)) {
    mkdirSync(dirname);
  }
  return writeFile(`${dirname}/${recipe.slug}.json`, JSON.stringify(recipe));
}

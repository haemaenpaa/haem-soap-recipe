import Link from "next/link";
import { fetchRecipeList } from "../_fetch/fetch-recipes";
import styles from "./recipes.module.css";

/**
 * Page that displays a list of recipes available to edit.
 * @returns
 */
export default async function RecipesList() {
  const recipeList = await fetchRecipeList();

  return (
    <main className="flex">
      <ul className={styles["recipe-list"]}>
        {recipeList.map((le) => (
          <li key={le.slug}>
            <Link href={`/calculator/${le.slug}`}>{le.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

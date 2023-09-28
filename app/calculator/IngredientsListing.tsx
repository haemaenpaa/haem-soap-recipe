import { useMemo } from "react";
import { Ingredient } from "../_model/ingredient";
import { IngredientEntry } from "../_model/recipe";
import styles from "./calculator.module.css";

const categoryToHeader: any = {
  oil: "Oils",
  fragrance: "Fragrance",
  additive: "Additives",
};

export default function IngredientsListing(props: {
  recipeIngredients: IngredientEntry[];
  ingredientReference: { [key: string]: Ingredient };
  removeIngredient: (slug: string) => void;
  changeAmount: (slug: string, amount: number) => void;
}) {
  const {
    recipeIngredients,
    ingredientReference,
    removeIngredient,
    changeAmount,
  } = props;
  const categorizedIngredients: { [key: string]: IngredientEntry[] } = useMemo(
    () =>
      recipeIngredients.reduce((res, entry) => {
        const ing = ingredientReference[entry.ingredientSlug];

        return {
          ...res,
          [ing.category]: [...(res[ing.category] || []), entry],
        };
      }, {} as { [key: string]: IngredientEntry[] }),
    [recipeIngredients, ingredientReference]
  );
  const categoryTotals: any = useMemo(
    () =>
      Object.keys(categorizedIngredients).reduce(
        (res, k) => ({
          ...res,
          [k]: categorizedIngredients[k].reduce((s, e) => s + e.amount, 0),
        }),
        {}
      ),
    [categorizedIngredients]
  );
  const total = useMemo(
    () => recipeIngredients.reduce((s, e) => s + e.amount, 0),
    [recipeIngredients]
  );
  return (
    <div className={styles["recipe-listing-grid"]}>
      {Object.keys(categorizedIngredients).map((k) => (
        <h1 key={k} className={styles[`${k}-title`]}>
          {categoryToHeader[k]}
        </h1>
      ))}
      {Object.keys(categorizedIngredients).map((k) => (
        <ul key={k} className={`${styles[k]}`}>
          {categorizedIngredients[k].map((entry) => (
            <li key={entry.ingredientSlug}>
              {ingredientReference[entry.ingredientSlug].name}
              <input
                type="number"
                onChange={(ev) =>
                  changeAmount(
                    entry.ingredientSlug,
                    Number.parseFloat(ev.target.value)
                  )
                }
                value={entry.amount}
              ></input>
              <button onClick={() => removeIngredient(entry.ingredientSlug)}>
                X
              </button>
            </li>
          ))}
        </ul>
      ))}
      {Object.keys(categoryTotals).map((k) => (
        <div key={k} className={`ingredient-summary ${styles[k + "-summary"]}`}>
          {k !== "oil" && categoryTotals["oil"] ? (
            <p>
              {Math.round((100 * categoryTotals[k]) / categoryTotals["oil"])}%
              of oil
            </p>
          ) : (
            <></>
          )}
          <p>{categoryTotals[k]}g</p>
        </div>
      ))}
    </div>
  );
}

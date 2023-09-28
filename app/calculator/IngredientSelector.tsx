import { useMemo, useState } from "react";
import { Ingredient } from "../_model/ingredient";
import styles from "./calculator.module.css";

/**
 * Component that lets the user add ingredients to a recipe.
 * @param props list of known ingredients and a callback to add an ingredient.
 * @returns
 */
export function IngredientSelector(props: {
  ingredients: Ingredient[];
  addIngredient: (i: Ingredient, amount: number) => void;
}) {
  const [selected, setSelected] = useState<string | null>("");
  const [amount, setAmount] = useState(0);
  const { ingredients, addIngredient } = props;
  const focusedIngredient: Ingredient | undefined = ingredients.find(
    (i) => i.slug === selected
  );

  const categoryToHeader = {
    oil: "Oils",
    fragrance: "Fragrance",
    additive: "Additives",
  };

  const categorizedIngredients: { [key: string]: Ingredient[] } =
    useMemo(() => {
      const ret: { [key: string]: Ingredient[] } = {};
      for (const k in categoryToHeader) {
        ret[k] = ingredients.filter((i) => i.category === k);
      }
      return ret;
    }, [ingredients]);
  return (
    <div className={styles["ingredient-selector-grid"]}>
      {Object.keys(categoryToHeader).map((k) => (
        <h1
          key={`${k}-title`}
          className={`${styles["selector-title"]} ${styles[`${k}-title`]}`}
        >
          {(categoryToHeader as any)[k]}
        </h1>
      ))}
      {Object.keys(categoryToHeader).map((k) => (
        <div key={k} className={styles[k]}>
          <ul className={styles["ingredient-selector-list"]}>
            {categorizedIngredients[k].map((ing) => (
              <li
                key={ing.slug}
                className={
                  ing.slug === selected ? styles.selected : styles.ingredient
                }
                onClick={() => {
                  setSelected(ing.slug === selected ? null : ing.slug);
                }}
              >
                {ing.name}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {!focusedIngredient ? (
        <></>
      ) : (
        <div className={styles["ingredient-details-view"]}>
          <h1>{focusedIngredient.name}</h1>
          <p>{focusedIngredient.description}</p>
          {focusedIngredient.saponificationValue ? (
            <p>Saponification value: {focusedIngredient.saponificationValue}</p>
          ) : (
            <></>
          )}
          <input
            type="number"
            value={amount}
            onChange={(ev) => setAmount(Number.parseFloat(ev.target.value))}
          ></input>
          <button onClick={(ev) => addIngredient(focusedIngredient, amount)}>
            Add to recipe
          </button>
        </div>
      )}
    </div>
  );
}

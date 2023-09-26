"use client";
import { useState } from "react";
import { Ingredient } from "../_model/ingredient";
import styles from "./calculator.module.css";

export function IngredientSelector(props: { ingredients: Ingredient[] }) {
  const [selected, setSelected] = useState("");
  const { ingredients } = props;
  const focusedIngredient: Ingredient | undefined = ingredients.find(
    (i) => i.slug === selected
  );
  console.log(styles);
  return (
    <div className={styles["ingredient-selector-grid"]}>
      <ul className={styles["ingredient-selector-list"]}>
        {ingredients.map((ing) => (
          <li
            key={ing.slug}
            className={
              ing.slug === selected ? styles.selected : styles.ingredient
            }
            onClick={() => {
              console.log(ing.slug);
              setSelected(ing.slug);
            }}
          >
            {ing.name}
          </li>
        ))}
      </ul>

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
          <button>Add to recipe</button>
        </div>
      )}
    </div>
  );
}

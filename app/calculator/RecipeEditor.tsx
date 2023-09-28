"use client";

import { useMemo, useReducer } from "react";
import { Ingredient } from "../_model/ingredient";
import Recipe, { IngredientEntry } from "../_model/recipe";
import { IngredientSelector } from "./IngredientSelector";
import styles from "./calculator.module.css";
import IngredientsListing from "./IngredientsListing";

interface RecipeAction {
  action:
    | "add"
    | "remove"
    | "setAmount"
    | "setName"
    | "setDescription"
    | "setSuperFat";
  ingredientSlug?: string;
  value?: string;
  amount?: number;
}

export default function RecipeEditor(props: {
  recipe: Recipe;
  ingredients: Ingredient[];
  saveRecipe?: (r: Recipe) => void;
}) {
  const { recipe: initialRecipe, ingredients, saveRecipe } = props;

  const ingredientReference: { [key: string]: Ingredient } = useMemo(
    () => ingredients.reduce((prev, ing) => ({ ...prev, [ing.slug]: ing }), {}),
    [ingredients]
  );
  const [recipe, dispatch] = useReducer(recipeReducer, initialRecipe);
  const lyeAmount = useMemo(
    () =>
      (1 - recipe.superfat) *
      recipe.ingredients.reduce((l: number, entry: IngredientEntry) => {
        if (!(entry.ingredientSlug in ingredientReference)) {
          return l;
        }
        const ing = ingredientReference[entry.ingredientSlug];
        return l + entry.amount * (ing.saponificationValue || 0);
      }, 0),
    [recipe.ingredients, recipe.superfat]
  );
  return (
    <div className={styles["recipe-editor"]}>
      <div className="ingredient-selector">
        <IngredientSelector
          ingredients={ingredients}
          addIngredient={(ing: Ingredient, amount: number) =>
            dispatch({ action: "add", ingredientSlug: ing.slug, amount })
          }
        ></IngredientSelector>
      </div>
      <div className={styles["recipe-list"]}>
        <IngredientsListing
          ingredientReference={ingredientReference}
          recipeIngredients={recipe.ingredients}
          changeAmount={(ingredientSlug, amount) =>
            dispatch({ action: "setAmount", ingredientSlug, amount })
          }
          removeIngredient={(ingredientSlug) =>
            dispatch({ action: "remove", ingredientSlug })
          }
        ></IngredientsListing>
      </div>
      <div className={styles["lye"]}>NaOH {lyeAmount}</div>
    </div>
  );
}

function recipeReducer(recipe: Recipe, action: RecipeAction): Recipe {
  switch (action.action) {
    case "add":
      if (
        recipe.ingredients.find(
          (i) => i.ingredientSlug === action.ingredientSlug
        )
      ) {
        return recipe;
      } else {
        return {
          ...recipe,
          ingredients: [
            ...recipe.ingredients,
            {
              amount: action.amount || 0,
              ingredientSlug: action.ingredientSlug!,
            },
          ],
        };
      }
    case "remove":
      return {
        ...recipe,
        ingredients: recipe.ingredients.filter(
          (i) => i.ingredientSlug != action.ingredientSlug
        ),
      };
    case "setAmount":
      return {
        ...recipe,
        ingredients: recipe.ingredients.map((i) =>
          i.ingredientSlug !== action.ingredientSlug
            ? i
            : { ...i, amount: action.amount! }
        ),
      };
    case "setName":
      return { ...recipe, name: action.value! };
    case "setDescription":
      return { ...recipe, description: action.value! };
    case "setSuperFat":
      return { ...recipe, superfat: action.amount || 0 };
    default:
      throw new Error(`Action ${action.action} not handled yet.`);
  }
}

"use client";
import { useMemo, useReducer } from "react";
import { Ingredient } from "../_model/ingredient";
import Recipe, { IngredientEntry } from "../_model/recipe";
import { IngredientSelector } from "./IngredientSelector";
import styles from "./calculator.module.css";
import IngredientsListing from "./IngredientsListing";
import RecipeDetails from "./RecipeDetails";
import { useRouter } from "next/navigation";

interface RecipeAction {
  action:
    | "add"
    | "remove"
    | "setAmount"
    | "setName"
    | "setDescription"
    | "setSuperfat";
  ingredientSlug?: string;
  value?: string;
  amount?: number;
}

export default function RecipeEditor(props: {
  recipe: Recipe;
  ingredients: Ingredient[];
}) {
  const { recipe: initialRecipe, ingredients } = props;

  const ingredientReference: { [key: string]: Ingredient } = useMemo(
    () => ingredients.reduce((prev, ing) => ({ ...prev, [ing.slug]: ing }), {}),
    [ingredients]
  );
  const router = useRouter();
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
      <div className={styles["details-control"]}>
        <RecipeDetails
          recipe={recipe}
          setName={(value) => dispatch({ action: "setName", value })}
          setDescription={(value) =>
            dispatch({ action: "setDescription", value })
          }
          setSuperfat={(amount) => dispatch({ action: "setSuperfat", amount })}
        ></RecipeDetails>
      </div>
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
      <button
        className={styles["save"]}
        onClick={() =>
          saveRecipe(recipe).then((slug) => {
            if (!recipe.slug) {
              router.push(`/calculator/${slug}`);
            }
          })
        }
      >
        Save
      </button>
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
    case "setSuperfat":
      return { ...recipe, superfat: action.amount || 0 };
    default:
      throw new Error(`Action ${action.action} not handled yet.`);
  }
}

async function saveRecipe(recipe: Recipe): Promise<string> {
  if (recipe.slug) {
    return fetch(`/api/recipes/${recipe.slug}`, {
      method: "PUT",
      body: JSON.stringify(recipe),
    }).then((response) => response.json());
  }
  return fetch("/api/recipes", {
    method: "POST",
    body: JSON.stringify(recipe),
  }).then((response) => response.json());
}

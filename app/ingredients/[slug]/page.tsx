"use client";
import { Category, Ingredient } from "@/app/_model/ingredient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function IngredientEdit({
  params,
}: {
  params: { slug: string };
}) {
  const [ingredient, setIngredient] = useState(
    undefined as unknown as Ingredient
  );
  const [error, setError] = useState();
  const router = useRouter();
  useEffect(() => {
    if (params.slug === "create") {
      setIngredient({
        slug: "",
        name: "",
        description: "",
        saponificationValue: 0,
      } as Ingredient);
    } else {
      fetchInitial(params.slug).then(setIngredient);
    }
  }, [params.slug]);
  if (!ingredient) {
    return <h1>Loading....</h1>;
  }
  const isCreating = ingredient.slug.length === 0;
  return (
    <main className="flex min-h-screen flex-col">
      {error === null ? <></> : <p className="error">{error}</p>}
      {isCreating ? (
        <select
          value={ingredient.category}
          onChange={(ev) =>
            setIngredient({
              ...ingredient,
              category: ev.target.value as Category,
            })
          }
        >
          <option>Select category</option>
          <option value="oil">Oil</option>
          <option value="fragrance">Fragrance</option>
          <option value="additive">Additive</option>
        </select>
      ) : (
        <></>
      )}
      <label htmlFor={`${params.slug}-name`}>Name</label>
      <input
        id={`${params.slug}-name`}
        type="text"
        value={ingredient.name}
        onChange={(ev) =>
          setIngredient({ ...ingredient, name: ev.target.value })
        }
      />
      <label htmlFor={`${params.slug}-desc`}>Description</label>
      <input
        id={`${params.slug}-desc`}
        type="text"
        value={ingredient.description}
        onChange={(ev) =>
          setIngredient({ ...ingredient, description: ev.target.value })
        }
      />
      {ingredient.saponificationValue === undefined && !isCreating ? (
        <></>
      ) : (
        <>
          <label htmlFor={`${params.slug}-sap-input`}>
            Saponification value
          </label>
          <input
            id={`${params.slug}-sap-input`}
            type="number"
            value={ingredient.saponificationValue || 0}
            onChange={(ev) =>
              setIngredient({
                ...ingredient,
                saponificationValue: Number.parseFloat(ev.target.value),
              })
            }
          />
        </>
      )}
      <button
        onClick={() =>
          saveIngredient(ingredient).then(
            (_) => router.push("/ingredients"),
            (err) => setError(err.message)
          )
        }
      >
        Save
      </button>
    </main>
  );
}

async function fetchInitial(slug: string): Promise<Ingredient> {
  return fetch(`/api/ingredients/${slug}`).then((response) => response.json());
}

async function saveIngredient(ingredient: Ingredient): Promise<any> {
  var url = `/api/ingredients/${ingredient.slug}`;
  const requestOptions = {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(ingredient),
  };
  if (ingredient.slug.length === 0) {
    url = "/api/ingredients";
    requestOptions.method = "POST";
  }
  return fetch(url, requestOptions);
}

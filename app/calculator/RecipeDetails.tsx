import Recipe from "../_model/recipe";
import styles from "./calculator.module.css";

export default function RecipeDetails(props: {
  recipe: Recipe;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setSuperfat: (superfat: number) => void;
}) {
  const { recipe, setName, setDescription, setSuperfat } = props;

  return (
    <div className={styles["recipe-details"]}>
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        type="text"
        value={recipe.name}
        onChange={(ev) => setName(ev.target.value)}
      ></input>
      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        onChange={(ev) => setDescription(ev.target.value)}
      >
        {recipe.description}
      </textarea>
      <label htmlFor="superfat">Superfat %</label>
      <input
        id="superfat"
        type="number"
        value={Math.round(100 * recipe.superfat)}
        onChange={(ev) => setSuperfat(Number.parseFloat(ev.target.value) / 100)}
      ></input>
    </div>
  );
}

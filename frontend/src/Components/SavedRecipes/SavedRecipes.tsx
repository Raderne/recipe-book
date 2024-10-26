import { useState } from "react";
import { RecipeGet } from "../../Models/Recipe";
import SavedRecipeItem from "./SavedRecipeItem";

type RecipesListProps = {
  recipes: RecipeGet[] | undefined;
};

const SavedRecipes = ({ recipes: initialRecipes }: RecipesListProps) => {
  const [recipes, setRecipes] = useState<RecipeGet[]>(initialRecipes || []);

  const handleDelete = (id: number) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
      {recipes?.map((recipe) => (
        <div key={recipe.id}>
          <SavedRecipeItem recipe={recipe} onDelete={handleDelete} key={recipe.id} />
        </div>
      ))}
    </div>
  );
};

export default SavedRecipes;

import { Link } from "react-router-dom";
import { Recipe } from "../../../recipes";
import { RecipeGet, RecipePost } from "../../../Models/Recipe";
import { useCallback, useEffect, useState } from "react";
import { saveRecipeApi } from "../../../Services/RecipeServices";
import { handleError } from "../../../Helpers/ErrorHandler";
import { useAuth } from "../../../Context/useAuth";
import { toast } from "react-toastify";

type RecipeItemProps = {
  recipe: Recipe | undefined;
  savedRecipes?: RecipeGet[] | undefined;
};

const RecipeItem = ({ recipe, savedRecipes }: RecipeItemProps) => {
  const [recipeIsSaved, setRecipeIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useAuth();

  const checkSavedRecipe = useCallback(() => {
    if (!recipe || !savedRecipes) return false;
    return savedRecipes.some(
      (savedRecipe) => savedRecipe.tastyApiId === recipe.id
    );
  }, [recipe, savedRecipes]);

  useEffect(() => {
    setRecipeIsSaved(checkSavedRecipe());
  }, [savedRecipes, recipe, checkSavedRecipe]);

  const createRecipePostForm = async () => {
    if (!recipe) return;
    try {
      setLoading(true);
      const recipePostForm: RecipePost = {
        name: recipe.name,
        description: recipe.description,
        thumbnail_url: recipe.thumbnail_url,
        cook_time_minutes: recipe.cook_time_minutes!,
        num_servings: recipe.num_servings!,
        tastyApiId: recipe.id,
      };

      await saveRecipeApi(recipePostForm);
      setRecipeIsSaved(true);
      setLoading(checkSavedRecipe());
      toast.success("Recipe saved successfully");
    } catch (e: unknown) {
      if (e instanceof Error) {
        handleError("Error saving recipe: " + e.message);
      } else {
        handleError("Error saving recipe");
      }
    }
  };

  return (
    <article className="h-[360px] w-full border border-primary relative">
      {isLoggedIn() && (
        <button
          className="absolute top-2 right-2 flex items-center px-2 bg-primary text-white p-1 rounded-md hover:bg-red-500 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={createRecipePostForm}
          disabled={loading || recipeIsSaved}
        >
          <span className="text-xl mr-1">
            {recipeIsSaved ? "Saved" : loading ? "Saving" : "Save"}
          </span>
        </button>
      )}

      <Link to={`/recipe/${recipe?.id}`}>
        <img
          src={recipe?.thumbnail_url}
          alt={recipe?.name}
          className="w-full h-[73%] object-cover object-center"
        />
        <div className="p-4 text-primary flex flex-col items-center justify-center">
          <h3
            className="text-lg font-bold text-pretty text-center line-clamp-1"
            title={recipe?.name}
          >
            {recipe?.name}
          </h3>
          <p>-</p>
          <p className="text-sm font-light">
            {recipe?.nutrition?.calories + " " || 0 + " "}
            Calories
          </p>
        </div>
      </Link>
    </article>
  );
};

export default RecipeItem;

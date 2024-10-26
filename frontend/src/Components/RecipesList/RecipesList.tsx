// Desc: Component to display a list of recipes
import { useEffect, useState } from "react";
import { Recipe } from "../../recipes";
import RecipeItem from "./RecipeItem/RecipeItem";
import { RecipeGet } from "../../Models/Recipe";
import { getAllRecipes } from "../../Services/RecipeServices";
import { useAuth } from "../../Context/useAuth";

type RecipesListProps = {
  recipes: Recipe[] | undefined;
};

const RecipesList = ({ recipes }: RecipesListProps) => {
  const [savedRecipes, setSavedRecipes] = useState<RecipeGet[]>();
  const { user, isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllRecipes(user?.id as string);
      setSavedRecipes(res?.data);
    };

    if (isLoggedIn()) {
      fetchData();
    }
  }, [user?.id, isLoggedIn]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
      {recipes?.map((recipe) => (
        <div key={recipe.id}>
          <RecipeItem recipe={recipe} savedRecipes={savedRecipes} />
        </div>
      ))}
    </div>
  );
};

export default RecipesList;

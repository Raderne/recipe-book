// Desc: Component to display a list of recipes
import { Link } from "react-router-dom";
import { Recipe } from "../../recipes";
import RecipeItem from "./RecipeItem/RecipeItem";

type RecipesListProps = {
  recipes: Recipe[] | undefined;
};

const RecipesList = ({ recipes }: RecipesListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
      {recipes?.map((recipe) => (
        <Link to={`recipe/${recipe.id}`} key={recipe.id}>
          <RecipeItem recipe={recipe} />
        </Link>
      ))}
    </div>
  );
};

export default RecipesList;

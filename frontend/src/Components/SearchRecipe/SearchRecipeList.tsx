import { RecipeResponse } from "../../recipes";
import SearchRecipeItem from "./SearchRecipeItem";

type Props = {
  recipes: RecipeResponse | undefined;
};

const SearchRecipeList = ({ recipes }: Props) => {
  return (
    <div className="flex flex-col overflow-y-auto">
      {recipes?.results?.map((recipe) => (
        <SearchRecipeItem key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default SearchRecipeList;

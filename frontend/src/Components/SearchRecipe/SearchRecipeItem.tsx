import { useNavigate } from "react-router-dom";
import { Recipe } from "../../recipes";
import { useSearch } from "../../Context/useSearch";

type Props = {
  recipe: Recipe;
};

const SearchRecipeItem = ({ recipe }: Props) => {
  const navigate = useNavigate();
  const { setIsModelOpen } = useSearch();

  const handleClick = () => {
    setIsModelOpen(false);
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <div
      className="flex p-6 border-b border-primary cursor-pointer hover:bg-black/90 transition-all duration-300 ease-in-out"
      onClick={handleClick}
    >
      <img
        src={recipe?.thumbnail_url}
        alt={recipe?.name}
        className="w-24 h-24 rounded-xl"
      />
      <div className="flex flex-col justify-center ml-4">
        <h1
          className="text-white font-neue text-pretty text-xl line-clamp-1"
          title={recipe?.name}
        >
          {recipe?.name}
        </h1>
        <p className="text-white">
          {(recipe?.cook_time_minutes ?? 10) > 60
            ? Math.floor((recipe?.cook_time_minutes ?? 10) / 60) + " hours"
            : recipe?.cook_time_minutes + " minutes"}{" "}
          | {recipe?.num_servings} servings
        </p>
      </div>
    </div>
  );
};

export default SearchRecipeItem;

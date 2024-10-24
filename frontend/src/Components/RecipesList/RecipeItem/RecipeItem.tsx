import { Recipe } from "../../../recipies";

type RecipeItemProps = {
  recipe: Recipe;
};

const RecipeItem = ({ recipe }: RecipeItemProps) => {
  return (
    <article className="h-[360px] w-full border border-primary">
      <img
        src={recipe?.thumbnail_url}
        alt={recipe?.name}
        className="w-full h-[73%] object-cover object-center"
      />
      <div className="p-4 text-primary flex flex-col items-center justify-center">
        <h3 className="text-lg font-bold text-pretty text-center line-clamp-1">
          {recipe?.name}
        </h3>
        <p>-</p>
        <p className="text-sm font-light">
          {recipe?.nutrition?.calories + " " || 0 + " "}
          Calories
        </p>
      </div>
    </article>
  );
};

export default RecipeItem;

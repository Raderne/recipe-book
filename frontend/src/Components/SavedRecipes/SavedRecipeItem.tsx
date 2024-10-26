import { MdDeleteOutline } from "react-icons/md";
import { RecipeGet } from "../../Models/Recipe";
import { useState } from "react";
import { deleteRecipeApi } from "../../Services/RecipeServices";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

type RecipeItemProps = {
  recipe: RecipeGet | undefined;
  onDelete: (id: number) => void;
};

const SavedRecipeItem = ({ recipe, onDelete }: RecipeItemProps) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    onDelete(recipe?.id as number);
    const res = await deleteRecipeApi(recipe?.id as number);
    if (res?.status !== 200 && res?.status !== 204) {
      toast.error("Error deleting recipe");
      setDeleting(false);
      return;
    }
    setDeleting(false);
    toast.success("Recipe deleted");
  };

  return (
    <article className="h-[360px] w-full border border-primary relative">
      <button
        className="absolute top-2 right-2 flex items-center px-2 bg-primary text-white p-1 rounded-md hover:bg-red-500 transition-all duration-300 ease-in-out"
        onClick={handleDelete}
        disabled={deleting}
      >
        <MdDeleteOutline className="text-xl mr-1" />
        {deleting ? "Deleting" : "Delete"}
      </button>
      <Link to={`/recipe/${recipe?.tastyApiId}`}>
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
            {(recipe?.cook_time_minutes ?? 0) > 60
              ? Math.floor((recipe?.cook_time_minutes ?? 0) / 60) + " hours"
              : recipe?.cook_time_minutes + " minutes"}
          </p>
        </div>
      </Link>
    </article>
  );
};

export default SavedRecipeItem;

import { useEffect, useState } from "react";
import { Recipe } from "../../recipes";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { FaPlay } from "react-icons/fa";
import { getRecipe } from "../../api";
import { getAllRecipes, saveRecipeApi } from "../../Services/RecipeServices";
import { handleError } from "../../Helpers/ErrorHandler";
import { RecipeGet, RecipePost } from "../../Models/Recipe";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/useAuth";
import CommentsList from "../../Components/CommentsList/CommentsList";

const RecipePage = () => {
  const [recipe, setRecipe] = useState<Recipe>();
  const [loading, setLoading] = useState(true);
  const [playVideo, setPlayVideo] = useState(false);
  const [recipeIsSaving, setRecipeIsSaving] = useState(false);
  const [alreadySaved, setAlreadySaved] = useState(false);
  const [savedRecipe, setSavedRecipe] = useState<RecipeGet>();
  const { id } = useParams<{ id: string }>();
  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllRecipes(user?.id as string);
      setAlreadySaved(
        res?.data?.some(
          (savedRecipe) => savedRecipe.tastyApiId === Number(id)
        ) ?? false
      );
      setSavedRecipe(
        res?.data?.find((savedRecipe) => savedRecipe.tastyApiId === Number(id))
      );
    };

    if (isLoggedIn()) {
      fetchData();
    }
  }, [user?.id, isLoggedIn, id]);

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await getRecipe(Number(id));
      setRecipe(response?.data);
      setLoading(false);
    };
    fetchRecipe();
  }, [id]);

  const createRecipePostForm = async () => {
    if (!recipe) return;
    try {
      setRecipeIsSaving(true);
      const recipePostForm: RecipePost = {
        name: recipe.name,
        description: recipe.description,
        thumbnail_url: recipe.thumbnail_url,
        cook_time_minutes: recipe.cook_time_minutes!,
        num_servings: recipe.num_servings!,
        tastyApiId: recipe.id,
      };

      const res = await saveRecipeApi(recipePostForm);

      if (res?.status !== 201) {
        setRecipeIsSaving(false);
        toast.error("Recipe already saved");
      }

      setSavedRecipe(res?.data);
      setAlreadySaved(true);
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
    <>
      <section className="container mx-auto bg-secondary mb-10 rounded-lg">
        {loading ? (
          <div className="min-h-[80vh] h-full w-screen flex items-center justify-center">
            <BeatLoader color="white" size={30} />
          </div>
        ) : (
          <div className="flex flex-col items-center p-4 text-offwhite space-y-6 pb-10">
            <div className="text-center">
              <h1
                className="text-9xl line-clamp-1 font-black font-neue"
                title={recipe?.name}
              >
                {recipe?.name}
              </h1>
              <p>
                {(recipe?.cook_time_minutes ?? 10) > 60
                  ? Math.floor((recipe?.cook_time_minutes ?? 10) / 60) +
                    " hours"
                  : recipe?.cook_time_minutes + " minutes"}{" "}
                | {recipe?.num_servings} servings
              </p>
            </div>

            <div className="px-40 w-full">
              <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
                {!playVideo ? (
                  <div>
                    <img
                      src={recipe?.thumbnail_url}
                      alt={recipe?.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent text-7xl text-secondary rounded-lg"
                      onClick={() => setPlayVideo(true)}
                    >
                      <FaPlay />
                    </button>
                  </div>
                ) : (
                  <video
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    loop
                  >
                    <source src={recipe?.original_video_url} type="video/mp4" />
                  </video>
                )}
              </div>
            </div>

            <div className="w-full px-4 space-y-4">
              <h2 className="text-5xl font-black font-neue">Ingredients</h2>
              <ul className="list-disc list-inside text-3xl grid grid-cols-3">
                {recipe?.sections[0].components.map((component, index) => (
                  <li key={index}>{component?.raw_text}</li>
                ))}
              </ul>

              <h2 className="text-5xl font-black font-neue">Instructions</h2>
              <ol className="list-decimal list-inside text-2xl space-y-2">
                {recipe?.instructions.map((instruction, index) => (
                  <li key={index}>{instruction?.display_text}</li>
                ))}
              </ol>

              <h2 className="text-5xl font-black font-neue">Nutrition</h2>
              <ul className="list-disc list-inside text-3xl grid grid-cols-3">
                {recipe?.nutrition?.calories && (
                  <li>Calories: {recipe?.nutrition.calories}</li>
                )}
                {recipe?.nutrition?.carbohydrates && (
                  <li>Carbs: {recipe?.nutrition.carbohydrates}</li>
                )}
                {recipe?.nutrition?.fat && (
                  <li>Fat: {recipe?.nutrition.fat}</li>
                )}
                {recipe?.nutrition?.protein && (
                  <li>Protein: {recipe?.nutrition.protein}</li>
                )}
                {recipe?.nutrition?.sugar && (
                  <li>sugar: {recipe?.nutrition.sugar}</li>
                )}
              </ul>

              <h2 className="text-5xl font-black font-neue">Credits</h2>
              <ul className="list-disc list-inside text-3xl">
                {recipe?.credits?.map((credit, index) => (
                  <li key={index}>{credit.name}</li>
                ))}
              </ul>

              <h2 className="text-5xl font-black font-neue">Yields</h2>
              <p className="text-3xl">{recipe?.yields}</p>
            </div>

            {isLoggedIn() && (
              <button
                className="self-end bg-offwhite text-secondary py-2 px-3 border rounded-lg hover:bg-secondary hover:text-offwhite transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={createRecipePostForm}
                disabled={recipeIsSaving || alreadySaved}
              >
                <span className="text-xl">
                  {recipeIsSaving
                    ? "Saving"
                    : alreadySaved
                    ? "Saved To Favorites"
                    : "Save"}
                </span>
              </button>
            )}
          </div>
        )}
      </section>

      <section className="container mx-auto bg-secondary mb-10 rounded-lg mt-10 py-10">
        <div className="flex flex-col items-center py-4 px-8 text-offwhite space-y-6">
          <div className="text-center">
            <h1 className="text-7xl line-clamp-1 font-black font-neue">
              Comments Section
            </h1>
          </div>

          <div className="w-1/2">
            <CommentsList tastyApiId={Number(id)} savedRecipe={savedRecipe} />
          </div>
        </div>
      </section>
    </>
  );
};

export default RecipePage;

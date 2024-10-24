import { useEffect, useState } from "react";
import { Recipe } from "../../recipes";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { FaPlay } from "react-icons/fa";
import { getRecipe } from "../../api";

const RecipePage = () => {
  const [recipe, setRecipe] = useState<Recipe>();
  const [loading, setLoading] = useState(true);
  const [playVideo, setPlayVideo] = useState(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await getRecipe(Number(id));
      setRecipe(response?.data);
      setLoading(false);
    };
    fetchRecipe();
  }, [id]);

  return (
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
                ? Math.floor((recipe?.cook_time_minutes ?? 10) / 60) + " hours"
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
                <li key={index}>{component.raw_text}</li>
              ))}
            </ul>

            <h2 className="text-5xl font-black font-neue">Instructions</h2>
            <ol className="list-decimal list-inside text-2xl space-y-2">
              {recipe?.instructions.map((instruction, index) => (
                <li key={index}>{instruction.display_text}</li>
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
              {recipe?.nutrition?.fat && <li>Fat: {recipe?.nutrition.fat}</li>}
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
        </div>
      )}
    </section>
  );
};

export default RecipePage;

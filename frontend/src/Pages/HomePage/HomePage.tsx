import { useEffect, useState } from "react";
import RecipesList from "../../Components/RecipesList/RecipesList";
import { getRecipesList } from "../../api";
import { RecipeResponse } from "../../recipies";
import BarLoader from "react-spinners/BarLoader";

const HomePage = () => {
  const [recipes, setRecipes] = useState<RecipeResponse>();
  const [from, setFrom] = useState(0);
  const [loading, setLoading] = useState(true);
  const [moreRecipe, setMoreRecipe] = useState(false);

  useEffect(() => {
    const getRecipes = async () => {
      const result = await getRecipesList(from);
      setRecipes((prev) => {
        return {
          count: result?.data?.count ?? 0,
          results: (prev?.results || []).concat(result?.data?.results || []),
        };
      });
      setLoading(false);
      setMoreRecipe(false);
    };
    getRecipes();
  }, [from]);

  return (
    <section className="relative container mx-auto mb-10">
      <div className="w-full py-5">
        <h1 className="text-7xl pb-6 font-black font-neue text-primary text-pretty border-b-2 border-primary">
          Discover Delicious Recipes
        </h1>
      </div>

      {loading ? (
        <div className="w-full flex items-center justify-center">
          <BarLoader color="#2f5f48" />
        </div>
      ) : (
        <>
          <RecipesList recipes={recipes?.results} />
          <div className="w-full flex items-center mt-10">
            <button
              className="mx-auto bg-primary text-white py-2 px-4 rounded-lg"
              onClick={() => {
                setFrom(from + 12);
                setMoreRecipe(true);
              }}
            >
              {moreRecipe ? "Loading..." : "Load More"}
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default HomePage;

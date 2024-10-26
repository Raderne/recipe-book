import { useEffect, useState } from "react";
import { RecipeGet } from "../../Models/Recipe";
import { useAuth } from "../../Context/useAuth";
import { getAllRecipes } from "../../Services/RecipeServices";
import SavedRecipes from "../../Components/SavedRecipes/SavedRecipes";
import { BarLoader } from "react-spinners";

const ProfilePage = () => {
  const [recipesData, setRecipesData] = useState<RecipeGet[]>();
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getAllRecipes(user?.id as string);
      setRecipesData(response?.data);
      setLoading(false);
    };
    fetchData();
  }, [user?.id]);

  return (
    <section className="relative container mx-auto mb-10">
      <div className="w-full py-5">
        <h1 className="text-7xl pb-6 font-black font-neue text-primary text-pretty border-b-2 border-primary">
          Your Recipes
        </h1>
      </div>

      {loading ? (
        <div className="w-full flex items-center justify-center">
          <BarLoader color="#2f5f48" />
        </div>
      ) : (
        <SavedRecipes recipes={recipesData} />
      )}
    </section>
  );
};

export default ProfilePage;

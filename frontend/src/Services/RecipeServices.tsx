import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { RecipeGet, RecipePost } from "../Models/Recipe";

const api = "http://localhost:5191/api/recipe";

export const getAllRecipes = async (userId: string) => {
  try {
    const response = await axios.get<RecipeGet>(`${api}?userId=${userId}`);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const saveRecipeApi = async ({
  name,
  description,
  thumbnail_url,
  cook_time_minutes,
  num_servings,
}: RecipePost) => {
  try {
    const response = await axios.post<RecipeGet>(api, {
      name,
      description,
      thumbnail_url,
      cook_time_minutes,
      num_servings,
    });
    return response;
  } catch (error) {
    handleError(error);
  }
};

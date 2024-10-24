import axios from "axios";
import { RecipeResponse } from "./recipies";

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_RECIPES_API_KEY,
    "x-rapidapi-host": "tasty.p.rapidapi.com",
  },
};

export const getRecipesList = async (from: number) => {
  const params = {
    url: "https://tasty.p.rapidapi.com/recipes/list",
    params: {
      from: from,
      size: 12,
    },
  };

  try {
    const data = await axios.request<RecipeResponse>({
      ...options,
      ...params,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

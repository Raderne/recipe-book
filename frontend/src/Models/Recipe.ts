export type RecipePost = {
  name: string;
  description: string;
  thumbnail_url: string;
  cook_time_minutes: number;
  num_servings: number;
};

export type RecipeGet = {
  name: string;
  description: string;
  thumbnail_url: string;
  cook_time_minutes: number;
  num_servings: number;
  userId: string;
};

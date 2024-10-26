import { CommentGet } from "./Comment";

export type RecipePost = {
  name: string;
  description: string;
  thumbnail_url: string;
  cook_time_minutes: number;
  num_servings: number;
  tastyApiId: number;
};

export type RecipeGet = {
  id: number;
  name: string;
  description: string;
  thumbnail_url: string;
  cook_time_minutes: number;
  num_servings: number;
  userId: string;
  tastyApiId: number;
  comments: CommentGet[];
};

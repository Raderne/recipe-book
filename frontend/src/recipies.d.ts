export interface RecipeResponse {
  count: number;
  results: Recipe[];
}

export interface Recipe {
  approved_at: number;
  aspect_ratio: string;
  beauty_url: string | null;
  brand: any;
  brand_id: any;
  buzz_id: any;
  canonical_id: string;
  compilations: any[];
  cook_time_minutes: number;
  country: string;
  created_at: number;
  credits: Credit[];
  description: string;
  draft_status: string;
  facebook_posts: any[];
  id: number;
  inspired_by_url: any;
  instructions: Instruction[];
  is_app_only: boolean;
  is_one_top: boolean;
  is_shoppable: boolean;
  is_subscriber_content: boolean;
  keywords: string;
  language: string;
  name: string;
  num_servings: number;
  nutrition: Nutrition;
  nutrition_visibility: string;
  original_video_url: string;
  prep_time_minutes: number;
  price: Price;
  promotion: string;
  renditions: any[];
  sections: Section[];
  seo_path: string;
  seo_title: string;
  servings_noun_plural: string;
  servings_noun_singular: string;
  show: Show;
  show_id: number;
  slug: string;
  tags: Tag[];
  thumbnail_alt_text: string;
  thumbnail_url: string;
  tips_and_ratings_enabled: boolean;
  topics: Topic[];
  total_time_minutes: number;
  total_time_tier: TotalTimeTier;
  updated_at: number;
  user_ratings: UserRatings;
  video_ad_content: string;
  video_id: number;
  video_url: string;
  yields: string;
}

export interface Credit {
  name: string;
  type: string;
}

export interface Instruction {
  appliance: any;
  display_text: string;
  end_time: number;
  id: number;
  position: number;
  start_time: number;
  temperature: any;
  hacks?: Hack[];
}

export interface Hack {
  end_index: number;
  id: number;
  match: string;
  start_index: number;
}

export interface Nutrition {
  calories: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
  protein: number;
  sugar: number;
  updated_at: string;
}

export interface Price {
  consumption_portion: number;
  consumption_total: number;
  portion: number;
  total: number;
  updated_at: string;
}

export interface Section {
  components: Component[];
  name: string;
  position: number;
}

export interface Component {
  extra_comment: string;
  id: number;
  ingredient: Ingredient;
  measurements: Measurement[];
  position: number;
  raw_text: string;
  hacks?: Hack2[];
}

export interface Ingredient {
  created_at: number;
  display_plural: string;
  display_singular: string;
  id: number;
  name: string;
  updated_at: number;
}

export interface Measurement {
  id: number;
  quantity: string;
  unit: Unit;
}

export interface Unit {
  abbreviation: string;
  display_plural: string;
  display_singular: string;
  name: string;
  system: string;
}

export interface Hack2 {
  end_index: number;
  id: number;
  match: string;
  start_index: number;
}

export interface Show {
  id: number;
  name: string;
}

export interface Tag {
  display_name: string;
  id: number;
  name: string;
  parent_tag_name?: string;
  root_tag_type: string;
  type: string;
}

export interface Topic {
  name: string;
  slug: string;
}

export interface TotalTimeTier {
  display_tier: string;
  tier: string;
}

export interface UserRatings {
  count_negative: number;
  count_positive: number;
  score: number;
}

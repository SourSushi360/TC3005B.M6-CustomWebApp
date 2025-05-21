/* src/types/games.ts */
export interface Game {
  id: number;
  slug: string;
  name: string;
  released: string;
  tba: boolean;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings_count: number;
  reviews_count: number;
  reviews_text_count: number;
  added: number;
  metacritic: number | null;
  playtime: number;
  suggestions_count: number;
  updated: string;
  saturated_color: string;
  dominant_color: string;
  user_game: any | null;
  clip: any | null;

  genres: Genre[];
  platforms: Platform[];
  parent_platforms: ParentPlatform[];
  stores: Store[];
  tags: Tag[];
  esrb_rating: ESRBRating | null;
  short_screenshots: Screenshot[];
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
}

export interface Platform {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface ParentPlatform {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface Store {
  store: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  language: string;
}

export interface ESRBRating {
  id: number;
  name: string;
  slug: string;
}

export interface Screenshot {
  id: number;
  image: string;
}


import { FormArray, FormControl } from '@angular/forms';

export interface CreateGameFormat {
  title: FormControl<string>;
  description: FormControl<string>;
  price: FormControl<number | undefined>;
  releaseDate: FormControl<Date | undefined>;
  image: FormControl<File | null>;
  categories: FormControl<string[]>;
  platforms: FormControl<string[]>;
}
export interface EditGameFormat {
  title: FormControl<string>;
  description: FormControl<string>;
  price: FormControl<number | undefined>;
  releaseDate: FormControl<Date | undefined>;
  image: FormControl<File | null>;
  categories: FormControl<CategoriesFromGame[]>;
  platforms: FormControl<PlatformsFromGame[]>;
}

export interface GameFormat {
  title: string;
  description: string;
  price: number;
  releaseDate: Date;
  imageUrl: string;
  author: string;
  categories?: string[];
  platforms?: string[];
  likes?: { _id: string; username: string }[];
}
export interface GameFormatResponse extends GameFormat {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GamesCollectionResponse {
  data: GameCollectionSingleResponse[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface GameCollectionSingleResponse {
  _id: string;
  title: string;
  description: string;
  price: number;
  releaseDate: Date;
  imageUrl: string;
  categories?: CategoriesFromGame[];
  platforms?: PlatformsFromGame[];
  author: Author;
  createdAt: Date;
  updatedAt: Date;
  likes?: { _id: string; username: string }[];
}
export interface CategoriesFromGame {
  _id: string;
  name: string;
  description: string;
}
export interface PlatformsFromGame {
  _id: string;
  name: string;
  imageUrl: string;
  author: string;
  likes?: string[];
}
export interface Author {
  _id: string;
  username: string;
  email: string;
}

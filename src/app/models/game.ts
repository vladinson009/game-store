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

export interface GameFormat {
  title: string;
  description: string;
  price: number;
  releaseDate: Date;
  imageUrl: string;
  author: string;
  categories?: string[];
  platforms?: string[];
  likes?: string[];
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
  categories?: Categories[];
  platforms?: PlatformsFromGame[];
  author: Author;
  createdAt: Date;
  updatedAt: Date;
  likes?: [];
}
interface Categories {
  _id: string;
  name: string;
  description: string;
}
export interface PlatformsFromGame {
  _id: string;
  name: string;
  imageUrl: string;
  author: string;
  likes?: [];
}
interface Author {
  _id: string;
  username: string;
  email: string;
}

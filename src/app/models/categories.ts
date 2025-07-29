export interface CategoriesData {
  likes?: string[];
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  author: {
    _id: string;
    username: string;
    email: string;
  };
}
export interface CategoriesCollectionResponse {
  data: CategoriesData[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

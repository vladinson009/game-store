export interface PlatformFormat {
  name: string;
  manufacturer: string;
  imageUrl: string;
}

export interface PlatformFormatResponse extends PlatformFormat {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlatformsCollectionResponse {
  data: PlatformData[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface PlatformData {
  likes: string[];
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  manufacturer: string;
  imageUrl: string;
  author: {
    _id: string;
    username: string;
    email: string;
  };
}

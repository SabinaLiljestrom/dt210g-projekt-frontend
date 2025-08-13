export interface Review {
    _id: string;
    bookId: string;
    userId?: {
      _id: string;
      username: string;
    };
    content: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
  }
  
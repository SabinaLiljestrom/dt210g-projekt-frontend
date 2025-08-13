export interface Review {
    _id: string;
    bookId: string;
    bookTitle: string;         
    bookThumbnail: string | null; 
    userId?: {
      _id: string;
      username: string;
    };
    content: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
  }
  
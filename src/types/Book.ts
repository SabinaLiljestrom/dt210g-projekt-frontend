export type Book = {
    id: string;
    volumeInfo?: {
      title: string;
      authors?: string[];
      imageLinks?: {
        thumbnail?: string;
      };
    };
  };
  
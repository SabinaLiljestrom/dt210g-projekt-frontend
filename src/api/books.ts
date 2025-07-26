import type { Book } from "../types/Book";

export const searchBooks = async (query: string): Promise<Book[]> => {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Kunde inte hämta böcker");
  }

  const data = await response.json();

  return (data.items || [])
    .filter((item: any) => item.volumeInfo) // filtrera bort trasiga
    .map((item: any) => ({
      id: item.id,
      volumeInfo: {
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        imageLinks: item.volumeInfo.imageLinks,
      },
    }));
};

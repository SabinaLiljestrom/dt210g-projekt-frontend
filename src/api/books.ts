
import type { Book } from "../types/Book";
export const searchBooks = async (): Promise<Book[]> => {
  const response = await fetch("http://localhost:3018/books");

  if (!response.ok) {
    throw new Error("Kunde inte hämta böcker");
  }

  const data = await response.json();
  return data;
};



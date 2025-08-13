import { api } from "./client";
import type { Book } from "../types/Book";

export async function searchBooks(query?: string): Promise<Book[]> {
  const q = query ? `?search=${encodeURIComponent(query)}` : "";
  return api(`/books${q}`); 
}

export async function getBookById(id: string): Promise<Book> {
  return api(`/books/${id}`);
}

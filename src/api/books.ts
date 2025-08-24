// src/api/books.ts
import { api } from "./client";
import type { Book } from "../types/Book";

type BooksListResponse = { total: number; items: Book[] };
type BooksExactResponse = { total: number; primary: Book; related: Book[] };
export type BooksResponse = BooksListResponse | BooksExactResponse;

export async function searchBooks(query?: string, opts?: { start?: number; limit?: number; by?: "all" | "title" | "author" }): Promise<BooksResponse> {
  const params = new URLSearchParams();
  if (query) params.set("search", query);
  if (opts?.start != null) params.set("start", String(opts.start));
  if (opts?.limit != null) params.set("limit", String(opts.limit));
  if (opts?.by) params.set("by", opts.by);
  return api(`/books?${params.toString()}`);
}

// Hjälp: platta ut (primary + related) → items
export function flattenBooks(res: BooksResponse): { total: number; items: Book[] } {
  if ("items" in res) return res;
  return { total: res.total, items: [res.primary, ...res.related] };
}

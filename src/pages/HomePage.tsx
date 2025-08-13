import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Bookshelf from "../components/Bookshelf";
import type { Book } from "../types/Book";
import { searchBooks, flattenBooks, type BooksResponse } from "../api/books";
import woodTexture from "../assets/woodTexture.png";

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState<string | undefined>(undefined);
  const [start, setStart] = useState(0);
  const limit = 20;
  const [loading, setLoading] = useState(false);

  // initial load
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res: BooksResponse = await searchBooks(undefined, {
          start: 0,
          limit,
        });
        const flat = flattenBooks(res);
        setBooks(flat.items);
        setTotal(flat.total);
        setStart(limit);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSearch = async (q: string) => {
    setQuery(q || undefined);
    setLoading(true);
    try {
      const res = await searchBooks(q, {
        start: 0,
        limit,
        highlightExact: true, // visa huvudträff när det är exakt titel
      });
      const flat = flattenBooks(res);
      setBooks(flat.items);
      setTotal(flat.total);
      setStart(limit);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    setLoading(true);
    try {
      const res = await searchBooks(query, { start, limit });
      const flat = flattenBooks(res);
      setBooks((prev) => [...prev, ...flat.items]);
      setStart(start + limit);
      setTotal(flat.total);
    } finally {
      setLoading(false);
    }
  };

  const canLoadMore = books.length < total;

  return (
    <div
      style={{
        backgroundImage: `url(${woodTexture})`,
        backgroundRepeat: "repeat",
        backgroundSize: "200px",
        minHeight: "100vh",
        paddingBottom: "3rem",
      }}
    >
      <SearchBar onSearch={handleSearch} />
      <Bookshelf books={books} />

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        {canLoadMore && (
          <button
            onClick={loadMore}
            disabled={loading}
            style={{ padding: "0.6rem 1rem" }}
          >
            {loading ? "Laddar…" : "Ladda fler"}
          </button>
        )}
      </div>
    </div>
  );
}

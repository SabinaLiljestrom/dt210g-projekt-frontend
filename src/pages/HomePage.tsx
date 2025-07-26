import SearchBar from "../components/SearchBar";
import woodTexture from "../assets/woodTexture.png";
import Bookshelf from "../components/Bookshelf";
import { searchBooks } from "../api/books";
import { useEffect, useState } from "react";
import type { Book } from "../types/Book";

const HomePage = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const handleSearch = async (query: string) => {
    try {
      const results = await searchBooks(query);
      setBooks(results);
      console.log("Böcker:", results);
    } catch (err) {
      console.error("Fel vid sökning:", err);
    }
  };

  // Hämta några böcker direkt
  useEffect(() => {
    handleSearch("popular fiction");
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${woodTexture})`,
        backgroundRepeat: "repeat",
        backgroundSize: "200px",
        minHeight: "100vh",
      }}
    >
      <SearchBar onSearch={handleSearch} />
      <Bookshelf books={books} />
    </div>
  );
};

export default HomePage;

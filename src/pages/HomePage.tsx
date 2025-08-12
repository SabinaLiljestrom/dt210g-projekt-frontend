import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Bookshelf from "../components/Bookshelf";
import type { Book } from "../types/Book";
import { searchBooks } from "../api/books";
import woodTexture from "../assets/woodTexture.png";

const HomePage = () => {
  const [books, setBooks] = useState<Book[]>([]);

  //  Körs när sidan laddas
  useEffect(() => {
    const fetchStartBooks = async () => {
      try {
        const results = await searchBooks(); // ingen sökterm längre
        setBooks(results);
      } catch (err) {
        console.error("Fel vid hämtning av startböcker:", err);
      }
    };

    fetchStartBooks();
  }, []);

  //  Körs när man söker
  const handleSearch = async (query: string) => {
    try {
      const results = await searchBooks(query);
      setBooks(results);
    } catch (err) {
      console.error("Fel vid sökning:", err);
    }
  };

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

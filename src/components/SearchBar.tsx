import { useState } from "react";
import "./SearchBar.css";

type SearchMode = "all" | "title" | "author";

interface SearchBarProps {
  onSearch: (query: string, by: SearchMode) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [by, setBy] = useState<SearchMode>("all");

  const handleSearch = () => {
    if (query.trim()) onSearch(query.trim(), by);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Sök titel eller författare…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <select value={by} onChange={(e) => setBy(e.target.value as SearchMode)}>
        <option value="all">Titel eller författare</option>
        <option value="title">Endast titel</option>
        <option value="author">Endast författare</option>
      </select>
      <button onClick={handleSearch}>Sök</button>
    </div>
  );
};

export default SearchBar;

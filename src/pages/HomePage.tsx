import SearchBar from "../components/SearchBar";

const HomePage = () => {
  const handleSearch = (query: string) => {
    console.log("Söker efter:", query);
    // Här kommer anropa API sen
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {/* Här kommer boklistan sen */}
    </div>
  );
};

export default HomePage;

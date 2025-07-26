import SearchBar from "../components/SearchBar";
import woodTexture from "../assets/woodTexture.png";
import Bookshelf from "../components/Bookshelf";

const HomePage = () => {
  const handleSearch = (query: string) => {
    console.log("Söker efter:", query);
    // Här kommer anropa API sen
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
      <Bookshelf />
      {/* Här kommer boklistan sen */}
    </div>
  );
};

export default HomePage;

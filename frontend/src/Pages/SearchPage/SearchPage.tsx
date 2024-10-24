import { useEffect, useState } from "react";
import { useSearch } from "../../Context/useSearch";
import { RecipeResponse } from "../../recipes";
import { getRecipesListByQuery } from "../../api";
import SearchRecipeList from "../../Components/SearchRecipe/SearchRecipeList";
import { FaRegWindowClose, FaSearch } from "react-icons/fa";

const SearchPage = () => {
  const { IsModelOpen, setIsModelOpen } = useSearch();
  const [searchResult, setSearchResult] = useState<RecipeResponse>();
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (IsModelOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    }
  }, [IsModelOpen]);

  const handleSearch = async () => {
    if (query) {
      setLoading(true);
      setSearchResult(undefined);
      const res = await getRecipesListByQuery(query);
      setSearchResult(res?.data);
      setLoading(false);
    }
  };

  if (!IsModelOpen) {
    return null;
  }

  return (
    <div className="h-screen w-screen bg-black/70 absolute flex items-center justify-center z-50">
      <div className="flex flex-col max-w-[35vw] w-full space-y-6">
        <div className="bg-black rounded-xl flex items-center">
          <input
            type="text"
            className="bg-transparent flex-1 px-6 py-4 text-white text-lg focus:outline-none"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button className="text-primary px-4" onClick={handleSearch}>
            <FaSearch className="text-2xl" />
          </button>
        </div>

        <div className="w-full h-[500px] overflow-y-auto bg-black/60 rounded-xl">
          {!searchResult && !loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <h1 className="text-white font-neue text-3xl text-pretty px-20 text-center">
                Please write something in the search bar to get the results
              </h1>
            </div>
          ) : loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <h1 className="text-white font-neue text-3xl text-pretty px-20 text-center">
                Loading...
              </h1>
            </div>
          ) : (
            <SearchRecipeList recipes={searchResult} />
          )}
        </div>
      </div>
      <div className="absolute right-5 top-5">
        <button
          className="text-white text-5xl"
          onClick={() => {
            setIsModelOpen(false);
            setQuery("");
            setSearchResult(undefined);
          }}
        >
          <FaRegWindowClose />
        </button>
      </div>
    </div>
  );
};

export default SearchPage;

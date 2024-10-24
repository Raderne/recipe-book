import { useEffect } from "react";
import { useSearch } from "../../Context/useSearch";

const SearchPage = () => {
  const { IsModelOpen } = useSearch();

  useEffect(() => {
    if (IsModelOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    }
  }, [IsModelOpen]);

  if (!IsModelOpen) {
    return null;
  }

  return (
    <div className="h-screen w-screen bg-black/70 text-7xl absolute flex items-center justify-center z-50">
      SearchPage
    </div>
  );
};

export default SearchPage;

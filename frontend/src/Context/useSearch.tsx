import { createContext, useContext, useState } from "react";

type SearchContextType = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  IsModelOpen: boolean;
  setIsModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type Props = { children: React.ReactNode };

const SearchContext = createContext<SearchContextType>({} as SearchContextType);

export const SearchProvider = ({ children }: Props) => {
  const [search, setSearch] = useState("");
  const [IsModelOpen, setIsModelOpen] = useState(false);

  return (
    <SearchContext.Provider
      value={{ search, setSearch, IsModelOpen, setIsModelOpen }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);

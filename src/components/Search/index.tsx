import "./index.css";
import "./../../styles/globals.css";
import Icon from "../Icon";
import { useEffect, useRef, useState } from "react";
import SearchResult from "./SearchResult";
import useSearch from "../../hooks/useSearch";

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { search } = useSearch();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchActive) {
      inputRef.current?.focus();
    }
  });

  useEffect(() => {
    if (!searchTerm) { setSearchResults([]); return; }
      const searchResults = search(searchTerm);
      setSearchResults(searchResults);
  }, [search, searchTerm]);

  const handleSearchInput = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value);
  };

  const className = `Search ${isSearchActive ? "active" : ""}`;

  return (
    <div className={className}>
      <div
        className="Search-box"
        onClick={() => setIsSearchActive(true)}
        onBlur={() => setIsSearchActive(false)}
      >
        <input
          ref={inputRef}
          className="Search-input"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchInput}
        />
        <Icon name="search" className="Search-icon" />
      </div>
      {searchResults && (
        <div className="Search-results">
          {searchResults.map((result) => {
            return (
              <SearchResult key={result.name}
                result={{ title: result.name, parent: result.name }}
                onClick={() => {}}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Search;

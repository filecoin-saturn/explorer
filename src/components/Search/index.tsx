import "./index.css";
import "./../../styles/globals.css";
import Icon from "../Icon";
import { useEffect, useRef, useState } from "react";
import SearchResult from "./SearchResult";
import useSearch from "../../hooks/useSearch";
import { Continent } from "../../hooks/useContinents";
import { Country } from "../../hooks/useCountries";
import { Location } from "../../hooks/useLocations";
import { Node } from "../../hooks/useNodes";

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<
    (Continent | Country | Location | Node)[]
  >([]);
  const { search } = useSearch();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchActive) {
      inputRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }
    const searchResults = search(searchTerm);
    setSearchResults(searchResults);
  }, [searchTerm]);

  const handleSearchInput = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value);
  };

  const handleResultClick = (id: string) => {
    // todo
    console.log("Go to ", id);
  };

  const computeSearchResultProps = (
    result: Continent | Country | Location | Node
  ) => {
    // todo
    return {
      id: result.id,
      title: result.id,
      parent: result.id,
    };
  };

  const className = `Search ${isSearchActive ? "active" : ""}`;
  return (
    <div
      className={className}
      onClick={() => setIsSearchActive(true)}
      onBlur={() => setIsSearchActive(false)}
    >
      <div className="Search-box">
        <input
          ref={inputRef}
          className="Search-input"
          type="text"
          placeholder="Search"
          onChange={handleSearchInput}
        />
        <Icon name="search" className="Search-icon" />
      </div>
      {searchResults && (
        <div className="Search-results">
          {searchResults.map((result) => {
            return (
              <SearchResult
                key={result.id}
                result={computeSearchResultProps(result)}
                onClick={handleResultClick}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Search;

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
import classnames from "classnames";
import useAppContext from "../../hooks/useAppContext";

export const Search = () => {
  const appState = useAppContext();
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<
    (Continent | Country | Location | Node)[]
  >([]);
  const { search } = useSearch();
  const className = classnames("Search", { active: isSearchActive });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchActive) {
      inputRef.current?.focus();
    }
  }, [isSearchActive]);

  useEffect(() => {
    if (searchTerm) {
      const searchResults = search(searchTerm);
      if (searchResults.length) {
        setSearchResults(searchResults);
      } else {
        setSearchResults([]);
      }
      return;
    }
    setSearchResults([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handleSearchInput = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value);
  };

  const handleResultClick = (result: Continent | Country | Location | Node) => {
    // question: is this enough for navigation?
    appState.setNavbarEntity(result);
    setIsSearchActive(false);
  };

  const renderSearchResults = () => {
    if (isSearchActive && searchResults.length > 0) {
      return (
        <div className="Search-results">
          {searchResults.map((result) => {
            return (
              <SearchResult
                key={`${result.id}${result.type}`}
                result={result}
                onClick={handleResultClick}
              />
            );
          })}
        </div>
      );
    }
  };

  const handleBlur = (e: { currentTarget: any }) => {
    // Prevents onBlur effect if child elements are being navigated through TAB key
    const currentTarget = e.currentTarget;
    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        setIsSearchActive(false);
      }
    }, 0);
  };

  return (
    <div className={className} onBlur={handleBlur}>
      <div className="Search-box" onFocus={() => setIsSearchActive(true)}>
        <input
          ref={inputRef}
          className="Search-input"
          type="text"
          placeholder="Search"
          onChange={handleSearchInput}
        />
        <Icon name="search" className="Search-icon" />
      </div>
      {renderSearchResults()}
    </div>
  );
};

export default Search;

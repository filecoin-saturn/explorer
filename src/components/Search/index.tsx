import "./index.css";
import "./../../styles/globals.css";
import Icon from "../Icon";
import { useEffect, useState } from "react";

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

  const handleWindowSize = () => {
    const width = window.innerWidth;
    setIsMobile(width <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSize);
    return () => window.removeEventListener("resize", handleWindowSize);
  }, []);

  useEffect(() => {
    // todo: perform querying
  }, [searchTerm]);

  const handleSearchInput = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value);
  };

  const className = `Search ${isSearchActive ? "active" : ""}`;

  return (
    <div className={className} 
      onClick={() => setIsSearchActive(true)}
      onBlur={() => setIsSearchActive(false)}>
      <input
        className="Search-input"
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchInput}
      />
      <Icon name="search" className="Search-icon" />
    </div>
  );
};

export default Search;

/* <div>
      <h3 className="Search">{children}</h3>
      <h4 className="Search-result">{children}</h4>
      <p className="Search-resultLabel">{children}</p>
    </div> */

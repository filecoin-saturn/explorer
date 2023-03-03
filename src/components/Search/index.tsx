import "./index.css";
import "./../../styles/globals.css";
import Icon from "../Icon";
import { useEffect, useState } from "react";

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string | undefined>();

  useEffect(() => {
    // todo: perform querying
  }, [searchTerm]);

  const handleSearchInput = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value);
  };

  return (
    <div className="Search">
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

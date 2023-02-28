import "./index.css";

import { ReactNode } from "react";

type SearchProps = {
  children?: ReactNode;
};

export const Search = ({ children }: SearchProps) => {
  return (
    <div>
      <h3 className="Search">{children}</h3>
      <h4 className="Search-result">{children}</h4>
      <p className="Search-resultLabel">{children}</p>
    </div>
  );
};

export default Search;

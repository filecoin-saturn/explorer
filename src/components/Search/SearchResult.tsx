import "./SearchResult.css";
import { Continent } from "../../hooks/useContinents";
import { Country } from "../../hooks/useCountries";
import { Location } from "../../hooks/useLocations";
import { Node } from "../../hooks/useNodes";

export type SearchResultProps = {
  result: Continent | Country | Location | Node;
  onClick: (id: string) => void;
};

export const SearchResult = ({ result, onClick }: SearchResultProps) => {
  // todo: title and subtitle
  const name = result.hasOwnProperty("name") ? result.name : result.id;
  const parent = name;

  return (
    <div className="SearchResult" onClick={() => onClick(result.id)}>
      <div className="SearchResult-title">{name}</div>
      <div className="SearchResult-subtitle">{parent}</div>
    </div>
  );
};

export default SearchResult;

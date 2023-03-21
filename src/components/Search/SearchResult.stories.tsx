import { Country } from "../../hooks/useCountries";
import { SearchResult as SearchResultComponent } from "./SearchResult";

export default {
  component: SearchResultComponent,
};

export const SearchResult = () => {
  const country = {
    shape: [],
    center: [],
    continentId: ["AF"],
    id: "ZW",
    type: 1,
    idAlpha3: "ZWE",
    name: "Zimbabwe",
  } as Country;
  return <SearchResultComponent result={country} onClick={() => {}} />;
};

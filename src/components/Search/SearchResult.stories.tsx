import { SearchResult as SearchResultComponent } from "./SearchResult";

export default {
  component: SearchResultComponent,
};

export const SearchResult = () => (
  <SearchResultComponent
    result={{ title: "Portugal", parent: "Europe" }}
    onClick={() => {}}
  />
);

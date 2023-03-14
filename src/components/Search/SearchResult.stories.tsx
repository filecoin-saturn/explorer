import { SearchResult as SearchResultComponent } from "./SearchResult";

export default {
  component: SearchResultComponent,
};

export const SearchResult = () => (
  <SearchResultComponent
    result={{ id: 'PT', title: "Portugal", parent: "Europe" }}
    onClick={() => {}}
  />
);

import MiniSearch from "minisearch";
import { EntityType } from "../contexts/AppContext";
import useContinents from "./useContinents";
import useCountries from "./useCountries";
import useLocations from "./useLocations";
import { Node } from "./useNodes";

const useSearch = (nodes: Node[]) => {
  const { continents } = useContinents();
  const { countries } = useCountries();
  const { locations } = useLocations();

  // todo: fixup conflicting ids
  const customContinents = continents.map((c) => ({
    ...c,
    iso: c.id,
    id: `c${c.id}`,
  }));

  const documents = [...customContinents, ...countries, ...locations, ...nodes]; //...continents

  const searchEngine = new MiniSearch({
    fields: ["name"],
    storeFields: ["id"],
  });
  searchEngine.addAll(documents);

  const search = (searchQuery: string) => {
    const searchResults = searchEngine.search(searchQuery.toLowerCase(), {
      prefix: true,
      fuzzy: 0.2,
    });

    const resultsIds = searchResults.map((e: any) => e.id);
    const results = documents.filter((doc) => resultsIds.includes(doc.id));
    const relevantResults_ = results?.slice(0, 3);

    const relevantResults = relevantResults_.map((r) => {
      if (r.type === EntityType.continent) {
        const { iso: remove, ...rollback } = r;
        return { ...rollback, id: r.iso };
      }
      return r;
    });

    return relevantResults;
  };

  return { search };
};

export default useSearch;

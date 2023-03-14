import MiniSearch from "minisearch";
import useContinents from "./useContinents";
import useCountries from "./useCountries";
import useLocations from "./useLocations";
import useNodes from "./useNodes";

const useSearch = () => {
  const { continents } = useContinents();
  const { countries } = useCountries();
  const { locations } = useLocations();
  const { nodes } = useNodes();

  const documents = [...countries, ...locations, ...nodes]; //...continents

  const searchEngine = new MiniSearch({
    fields: ["name"],
    storeFields: ["id", "name"],
  });
  searchEngine.addAll(documents);

  const search = (searchQuery: string) => {
    const searchResults = searchEngine.search(searchQuery.toLowerCase(), {
      prefix: true,
      fuzzy: 0.2,
    });

    const resultsIds = searchResults.map((e) => e.id);
    const results = documents.filter((doc) => resultsIds.includes(doc.id));
    return results?.slice(0, 3);
  };

  return { search };
};

export default useSearch;

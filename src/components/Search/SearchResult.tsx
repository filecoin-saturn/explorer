import "./SearchResult.css";
import { Continent, useContinents } from "../../hooks/useContinents";
import { Country, useCountries } from "../../hooks/useCountries";
import { Location, useLocations } from "../../hooks/useLocations";
import { Node } from "../../hooks/useNodes";
import { EntityType } from "../../contexts/AppContext";

export type SearchResultProps = {
  result: Continent | Country | Location | Node;
  onClick: (result: Continent | Country | Location | Node) => void;
};

export const SearchResult = ({ result, onClick }: SearchResultProps) => {
  const { getContinentById } = useContinents();
  const { getCountryById } = useCountries();
  const { getLocationById } = useLocations();

  let title = "";
  let subtitle = "";

  switch (result.type) {
    case EntityType.continent:
      title = result.name;
      break;
    case EntityType.country:
      const countryContinents = result.continentId.map((e) =>
        getContinentById(e)
      );
      title = result.name;
      subtitle = countryContinents.map((e) => e?.name).join(", ");
      break;
    case EntityType.location:
      const locationCountry = getCountryById(result.countryId);
      title = result.name;
      subtitle = locationCountry ? locationCountry.name : "";
      break;
    case EntityType.node:
      const nodeLocation = getLocationById(result.locationId);
      title = result.id.substring(0, 8);
      subtitle = nodeLocation ? nodeLocation.name : "";
      break;
    default:
      title = "N/A";
      subtitle = "N/A";
  }

  return (
    <button
      className="SearchResult"
      onClick={() => onClick(result)}
      tabIndex={0}
    >
      <div className="SearchResult-title">{title}</div>
      <div className="SearchResult-subtitle">{subtitle}</div>
    </button>
  );
};

export default SearchResult;

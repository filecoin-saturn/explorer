import { useState } from "react";
import { EntityType } from "../contexts/AppContext";

export type Location = {
  id: string;
  countryId: string;
  continentId: string;
  name: string;
  type: EntityType.location;
};

export const useLocations = () => {
  const [locations, setLocations] = useState<Location[]>([]);

  const getLocationById = (queryLocationId: string) => {
    return locations.filter((location) => location.id === queryLocationId);
  };

  const getLocationByCountryId = (queryCountryId: string) => {
    return locations.filter(
      (location) => location.countryId === queryCountryId
    );
  };

  return {
    locations,
    setLocations,
    getLocationById,
    getLocationByCountryId,
  };
};

export default useLocations;

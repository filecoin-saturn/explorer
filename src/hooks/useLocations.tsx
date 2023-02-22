import { useState } from "react";

type Location = {
  id: string;
  countryId: string;
  continentId: string;
  name: string;
};

type Locations = Location[];

export const useLocations = () => {
  const [locations, setLocations] = useState<Locations>([]);

  return { locations, setLocations };
};

export default useLocations;

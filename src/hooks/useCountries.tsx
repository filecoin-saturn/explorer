import { useState } from "react";
import { EntityType } from "../contexts/AppContext";

import countriesList from "./countries.json";

export type Country = {
  id: string;
  continentId: string[];
  name: string;
  shape: any;
  center: any;
  type: EntityType.country;
};

type Countries = Country[];

export const useCountries = () => {
  const [countries, setCountries] = useState<Countries>(countriesList);

  const getCountryById = (queryCountryId: string) => {
    return countries.find((country) => country.id === queryCountryId);
  };

  const getCountriesByContinentId = (queryContinentId: string) => {
    return countries.filter((country) =>
      country.continentId.some((id) => id === queryContinentId)
    );
  };

  return { countries, setCountries, getCountryById, getCountriesByContinentId };
};

export default useCountries;

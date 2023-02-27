import { useState } from "react";

import countriesList from "./countries.json";

export type Country = {
  id: string;
  continentId: string;
  name: string;
  shape: any;
  center: any;
};

type Countries = Country[];

export const useCountries = () => {
  const [countries, setCountries] = useState<Countries>(countriesList);

  const getCountryById = (queryCountryId: string) => {
    return countries.find((country) => country.id === queryCountryId);
  };

  const getCountriesByContinentId = (queryContinentId: string) => {
    return countries.filter(
      (country) => country.continentId === queryContinentId
    );
  };

  return { countries, setCountries, getCountryById, getCountriesByContinentId };
};

export default useCountries;

import { useState } from "react";

export type Country = {
  id: string;
  continentId: string;
  name: string;
  shape: any;
  center: any;
};

type Countries = Country[];

export const useCountries = () => {
  const [countries, setCountries] = useState<Countries>([]);

  const getCountryById = (queryCountryId: string) => {
    return countries.filter((country) => country.id === queryCountryId);
  };

  const getCountryByContinentId = (queryContinentId: string) => {
    return countries.filter(
      (country) => country.continentId === queryContinentId
    );
  };

  return { countries, setCountries, getCountryById, getCountryByContinentId };
};

export default useCountries;

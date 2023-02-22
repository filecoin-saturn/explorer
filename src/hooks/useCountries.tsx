import { useState } from "react";

type Country = {
  id: string;
  continentId: string;
  name: string;
  shape: any;
  center: any;
};

type Countries = Country[];

export const useCountries = () => {
  const [countries, setCountries] = useState<Countries>([]);

  return { countries, setCountries };
};

export default useCountries;

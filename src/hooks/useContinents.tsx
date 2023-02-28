import { useState } from "react";

export type Continent = {
  id: string;
  name: string;
  shape: any;
  center: any;
};

type Continents = Continent[];

export const useContinents = () => {
  const [continents, setContinents] = useState<Continents>([]);

  return { continents, setContinents };
};

export default useContinents;

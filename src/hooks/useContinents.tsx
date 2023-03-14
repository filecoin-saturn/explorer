import { useState } from "react";

export type Continent = {
  id: string;
  name: string;
  shape: any;
  center: any;
};

type Continents = Continent[];

const continentsList: Continents = [
  { id: "CAF", name: "Africa", shape: [], center: [] },
  { id: "CAS", name: "Asia", shape: [], center: [] },
  { id: "CEU", name: "Europe", shape: [], center: [] },
  { id: "CNA", name: "North America", shape: [], center: [] },
  { id: "CSA", name: "South America", shape: [], center: [] },
  { id: "COC", name: "Oceania", shape: [], center: [] },
  { id: "CAN", name: "Antarctica", shape: [], center: [] },
];

export const useContinents = () => {
  const [continents, setContinents] = useState<Continents>(continentsList);

  return { continents, setContinents };
};

export default useContinents;

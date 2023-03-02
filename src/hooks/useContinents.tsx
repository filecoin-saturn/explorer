import { useState } from "react";

export type Continent = {
  id: string;
  name: string;
  shape: any;
  center: any;
};

type Continents = Continent[];

const continentsList: Continents = [
  { id: "AF", name: "Africa", shape: [], center: [] },
  { id: "AS", name: "Asia", shape: [], center: [] },
  { id: "EU", name: "Europe", shape: [], center: [] },
  { id: "NA", name: "North America", shape: [], center: [] },
  { id: "SA", name: "South America", shape: [], center: [] },
  { id: "OC", name: "Oceania", shape: [], center: [] },
  { id: "AN", name: "Antarctica", shape: [], center: [] },
];

export const useContinents = () => {
  const [continents, setContinents] = useState<Continents>(continentsList);

  return { continents, setContinents };
};

export default useContinents;

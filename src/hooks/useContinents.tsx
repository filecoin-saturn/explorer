import { useState } from "react";
import { EntityType } from "../contexts/AppContext";

export type Continent = {
  id: string;
  name: string;
  shape: any;
  center: any;
  type: EntityType.continent;
};

type Continents = Continent[];

const continentsList: Continents = [
  {
    type: EntityType.continent,
    id: "AF",
    name: "Africa",
    shape: [],
    center: [],
  },
  { type: EntityType.continent, id: "AS", name: "Asia", shape: [], center: [] },
  {
    type: EntityType.continent,
    id: "EU",
    name: "Europe",
    shape: [],
    center: [],
  },
  {
    type: EntityType.continent,
    id: "NA",
    name: "North America",
    shape: [],
    center: [],
  },
  {
    type: EntityType.continent,
    id: "SA",
    name: "South America",
    shape: [],
    center: [],
  },
  {
    type: EntityType.continent,
    id: "OC",
    name: "Oceania",
    shape: [],
    center: [],
  },
  {
    type: EntityType.continent,
    id: "AN",
    name: "Antarctica",
    shape: [],
    center: [],
  },
];
export const useContinents = () => {
  const [continents, setContinents] = useState<Continents>(continentsList);

  const getContinentById = (queryContinentId: string) => {
    return continents.find((continent) => continent.id === queryContinentId);
  };

  return { continents, setContinents, getContinentById };
};

export default useContinents;

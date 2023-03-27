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
    center: ["20.939444", "6.611111"],
  },
  {
    type: EntityType.continent,
    id: "AS",
    name: "Asia",
    shape: [],
    center: ["104.195397", "35.86166"],
  },
  {
    type: EntityType.continent,
    id: "EU",
    name: "Europe",
    shape: [],
    center: ["10.451526", "51.165691"],
  },
  {
    type: EntityType.continent,
    id: "NA",
    name: "North America",
    shape: [],
    center: ["-95.712891", "37.09024"],
  },
  {
    type: EntityType.continent,
    id: "SA",
    name: "South America",
    shape: [],
    center: ["-63.588653", "-16.290154"],
  },
  {
    type: EntityType.continent,
    id: "OC",
    name: "Oceania",
    shape: [],
    center: ["133.775136", "-25.274398"],
  },
  {
    type: EntityType.continent,
    id: "AN",
    name: "Antarctica",
    shape: [],
    center: ["-0.071389", "-75.250973"],
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

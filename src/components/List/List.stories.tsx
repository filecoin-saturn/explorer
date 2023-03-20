import { NavBarEntity } from "../../contexts/AppContext";
import { List as ListComponent } from "./index";

export default {
  component: ListComponent,
};

const assetEntity = {
  name: "World",
  type: 4,
} as NavBarEntity;
const assetList = [
  {
    type: 0,
    id: "AF",
    name: "Africa",
    shape: [],
    center: [],
  },
  {
    type: 0,
    id: "AS",
    name: "Asia",
    shape: [],
    center: [],
  },
  {
    type: 0,
    id: "EU",
    name: "Europe",
    shape: [],
    center: [],
  },
  {
    type: 0,
    id: "NA",
    name: "North America",
    shape: [],
    center: [],
  },
  {
    type: 0,
    id: "SA",
    name: "South America",
    shape: [],
    center: [],
  },
  {
    type: 0,
    id: "OC",
    name: "Oceania",
    shape: [],
    center: [],
  },
  {
    type: 0,
    id: "AN",
    name: "Antarctica",
    shape: [],
    center: [],
  },
];
const assetStats = {
  entityId: "",
  numberOfNodes: 1590,
  diskSpace: 5033711,
  retrievals: {
    "1d": 202,
    "7d": 1861,
  },
  avgTTFB: 4581,
  estimatedEarnings: {
    "1d": 966.2733,
    "7d": 6223.664,
  },
  bandwidthServed: {
    "1d": 134268,
    "7d": 861976,
  },
  cacheHitRate: 62.77516352201267,
};

export const List = () => (
  <ListComponent
    entity={assetEntity}
    list={assetList}
    stats={assetStats}
    toggleNavbar={() => {}}
    hoverEnd={() => {}}
    hoverStart={() => () => {}}
    onSelect={() => () => {}}
  ></ListComponent>
);

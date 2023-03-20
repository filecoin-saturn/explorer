import { useContext, useEffect, useState } from "react";
import LocationsContext from "../contexts/LocationsContext";
import useContinents, { Continent } from "./useContinents";
import useCountries, { Country } from "./useCountries";
import { Location } from "./useLocations";
import useNodes, { Node } from "./useNodes";

// enum StatType {
//   "Location",
//   "Node",
// }

// type StatValue = string | number;

// export type Stat = {
//   type: StatType;
//   value: StatValue;
//   label: string;
//   icon: string;
// };

// export type Stats = Stat[];

export type LocationStat = {
  entityId: string;
  numberOfNodes: number; //todo convert to stat
  diskSpace: number; //todo convert to stat
  retrievals: { "1d": number; "7d": number }; //todo convert to stat
  bandwidthServed: { "1d": number; "7d": number }; //todo convert to stat
  estimatedEarnings: { "1d": number; "7d": number }; //todo convert to stat
  cacheHitRate: number; //todo convert to stat
  avgTTFB: number; //todo convert to stat
};

const computeStats = (
  nodes: Node[],
  entity: Location | Country | Continent | Node | undefined
) => {
  const numberOfNodes = nodes.length;
  const diskSpace = nodes.reduce((acc, el) => {
    return acc + el.diskSizeGB;
  }, 0);

  const retrievals = nodes.reduce(
    (acc, el) => {
      if (Object.keys(el.retrievalsStats).length) {
        return {
          "1d": +(acc["1d"] + (el.retrievalsStats["1d"] || 0) * 1e-6).toFixed(
            0
          ),
          "7d": +(acc["7d"] + (el.retrievalsStats["7d"] || 0) * 1e-6).toFixed(
            0
          ),
        };
      } else {
        return acc;
      }
    },
    { "1d": 0, "7d": 0 }
  );

  const bandwidthServed = nodes.reduce(
    (acc, el) => {
      if (Object.keys(el.bandwidthServed).length) {
        return {
          "1d": +(
            acc["1d"] +
            (parseInt(el.bandwidthServed["1d"]) || 0) * 1e-9
          ).toFixed(0),
          "7d": +(
            acc["7d"] +
            (parseInt(el.bandwidthServed["7d"]) || 0) * 1e-9
          ).toFixed(0),
        };
      } else {
        return acc;
      }
    },
    { "1d": 0, "7d": 0 }
  );

  const estimatedEarnings = nodes.reduce(
    (acc, el) => {
      if (Object.keys(el.estimatedEarnings).length) {
        return {
          "1d": +(acc["1d"] + (el.estimatedEarnings["1d"] || 0))?.toFixed(4),
          "7d": +(acc["7d"] + (el.estimatedEarnings["7d"] || 0))?.toFixed(4),
        };
      } else {
        return acc;
      }
    },
    { "1d": 0, "7d": 0 }
  );

  const avgTTFB = nodes.reduce((acc, el) => {
    if (el.ttfbStats["p95_24h"]) {
      const contrib = el.ttfbStats["p95_24h"] / numberOfNodes;
      return contrib ? +(acc + contrib).toFixed(0) : acc;
    } else {
      return acc;
    }
  }, 0);

  const cacheHitRate = nodes.reduce((acc, el) => {
    if (el.cacheHitRate["24h"]) {
      const contrib = el.cacheHitRate["24h"] / numberOfNodes;
      return contrib ? acc + contrib : acc;
    } else {
      return acc;
    }
  }, 0);

  return {
    entityId: entity ? entity.id : "",
    numberOfNodes,
    diskSpace,
    retrievals,
    avgTTFB,
    estimatedEarnings,
    bandwidthServed,
    cacheHitRate,
  };
};

export const useStats = () => {
  const {
    nodes: nodesMap,
    getNodesByContinentId,
    getNodesByCountryId,
    getNodesByLocationId,
  } = useNodes();

  const nodes = Array.from(nodesMap.values());

  const { locations } = useContext(LocationsContext);
  const { continents } = useContinents();
  const { countries } = useCountries();

  const [globalStats, setGlobalStats] = useState<LocationStat>();
  const [continentsStats, setContinentsStats] = useState<
    LocationStat[] | undefined
  >();
  const [countriesStats, setCountriesStats] = useState<
    LocationStat[] | undefined
  >();
  const [locationsStats, setLocationsStats] = useState<
    LocationStat[] | undefined
  >();

  const computeGlobalStats = () => {
    if (!nodes) return;
    const globalStats_ = computeStats(nodes, undefined);
    console.log("globalStats_", globalStats_);
    setGlobalStats(globalStats_);
  };

  const computeContinentsStats = () => {
    if (!nodes) return;
    const continentsStats_ = continents.map((continent) => {
      const continentNodes = getNodesByContinentId(continent.id);
      return computeStats(continentNodes, continent);
    });
    setContinentsStats(continentsStats_);
  };

  const computeCountriesStats = () => {
    if (!nodes) return;
    const countriesStats_ = countries.map((country) => {
      const countryNodes = getNodesByCountryId(country.id);
      return computeStats(countryNodes, country);
    });
    setCountriesStats(countriesStats_);
  };

  const computeLocationStats = () => {
    if (!locations) return;
    const locationsStats_ = locations.map((city) => {
      const locationNodes = getNodesByLocationId(city.id);
      return computeStats(locationNodes, city);
    });
    setLocationsStats(locationsStats_);
  };

  // todo: compute when it0s needed instead of everything at the begining
  useEffect(() => {
    computeGlobalStats();
    computeContinentsStats();
    computeCountriesStats();
    computeLocationStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes]);

  const getStatsByContinentId = (continentId: string) => {
    if (!continentsStats) return;
    return continentsStats.find((stat) => stat.entityId === continentId);
  };

  const getStatsByCountryId = (countryId: string) => {
    if (!countriesStats) return;
    return countriesStats.find((stat) => stat.entityId === countryId);
  };

  const getStatsByLocationId = (locationId: string) => {
    if (!locationsStats) return;
    return locationsStats.find((stat) => stat.entityId === locationId);
  };

  const getStatsByNodeId = (nodeId: string) => {
    // todo: compute node stats
    if (!nodes) return;
    const node = nodes.find((node) => node.id === nodeId);
    if (!node) return;
    return computeStats([node], node);
  };

  return {
    globalStats,
    continentsStats,
    countriesStats,
    locationsStats,
    getStatsByContinentId,
    getStatsByCountryId,
    getStatsByLocationId,
    getStatsByNodeId,
  };
};

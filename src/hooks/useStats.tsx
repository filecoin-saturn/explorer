import { number } from "prop-types";
import { useEffect, useState } from "react";
import useContinents from "./useContinents";
import useCountries from "./useCountries";
import useNodes from "./useNodes";

enum StatType {
  "Location",
  "Node",
}

type StatValue = string | number;

export type Stat = {
  type: StatType;
  value: StatValue;
  label: string;
  icon: string;
};

export type Stats = Stat[];

type LocationStat = {
  numberOfNodes: number; //todo convert to stat
  diskSpace: number; //todo convert to stat
  retrievals: { "1d": number; "7d": number }; //todo convert to stat
  bandwidthServed: { "1d": number; "7d": number }; //todo convert to stat
  estimatedEarnings: { "1d": number; "7d": number }; //todo convert to stat
  cacheHitRate: { "1h": number; "24h": number }; //todo convert to stat
  avgTTFB: { "1h": number; "24h": number }; //todo convert to stat
};

export const useStats = () => {
  const { nodes, getByContinentId, getByCountryId, getByLocationId } = useNodes();
  const { continents } = useContinents();
  const { countries } = useCountries();
  const [continentsStats, setContinentsStats] = useState<LocationStat[] | undefined>();
  const [countriesStats, setCountriesStats] = useState<LocationStat[] | undefined>();
  const [locationsStats, setLocationsStats] = useState<LocationStat[] | undefined>();

  const computeContinentsStats = () => {
    const continentsStats_ = continents.map((continent) => {
      const continentNodes = getByContinentId(continent.id);
      const numberOfNodes = continentNodes.length;
      const diskSpace = continentNodes.reduce((acc, el) => {
        return acc + el.diskSizeGB;
      }, 0);

      const retrievals = continentNodes.reduce(
        (acc, el) => {
          if (Object.keys(el.retrievalsStats).length) {
            return {
              "1d": acc["1d"] + el.retrievalsStats["1d"],
              "7d": acc["7d"] + el.retrievalsStats["7d"],
            };
          } else {
            return acc;
          }
        },
        { "1d": 0, "7d": 0 }
      );

      const bandwidthServed = continentNodes.reduce(
        (acc, el) => {
          if (Object.keys(el.bandwidthServed).length) {
            return {
              "1d": acc["1d"] + parseInt(el.bandwidthServed["1d"]),
              "7d": acc["7d"] + parseInt(el.bandwidthServed["7d"]),
            };
          } else {
            return acc;
          }
        },
        { "1d": 0, "7d": 0 }
      );

      const estimatedEarnings = continentNodes.reduce(
        (acc, el) => {
          if (Object.keys(el.estimatedEarnings).length) {
            return {
              "1d": acc["1d"] + el.estimatedEarnings["1d"],
              "7d": acc["7d"] + el.estimatedEarnings["7d"],
            };
          } else {
            return acc;
          }
        },
        { "1d": 0, "7d": 0 }
      );

      const avgTTFB = continentNodes.reduce(
        (acc, el) => {
          if (Object.keys(el.ttfbStats).length) {
            const p95_1h = el.ttfbStats["p95_1h"] > 0 ? el.ttfbStats["p95_1h"] / numberOfNodes : 0;
            const p95_24h = el.ttfbStats["p95_24h"] > 0 ? el.ttfbStats["p95_24h"] / numberOfNodes : 0;
            return {
              "1h": acc["1h"] + p95_1h,
              "24h": acc["24h"] + p95_24h,
            };
          } else {
            return acc;
          }
        },
        { "1h": 0, "24h": 0 }
      );

      const cacheHitRate = continentNodes.reduce(
        (acc, el) => {
          if (Object.keys(el.cacheHitRate).length) {
            return {
              "1h": acc["1h"] + el.cacheHitRate["1h"],
              "24h": acc["24h"] + el.cacheHitRate["24h"],
            };
          } else {
            return acc;
          }
        },
        { "1h": 0, "24h": 0 }
      );

      console.log(
        continent.name,
        "numberOfNodes:",
        numberOfNodes,
        "diskSpace:",
        diskSpace,
        "retrievals:",
        retrievals,
        "avgTTFB:",
        avgTTFB,
        "earnings:",
        estimatedEarnings,
        "bandwidthServed:",
        bandwidthServed,
        "cacheHitRate:",
        cacheHitRate
      );
      return { numberOfNodes, diskSpace, retrievals, avgTTFB, estimatedEarnings, bandwidthServed, cacheHitRate };
    });

    setContinentsStats(continentsStats_);
  };

  const computeCountryStats = () => {
    // todo
  };

  const computeLocationStats = () => {
    // todo
  };

  useEffect(() => {
    computeLocationStats();
    computeCountryStats();
    computeContinentsStats();
  }, [nodes]);

  const getContinentStats = (continentId: string) => {
    // return continentStats.find((stat) => stat.continentId = continentId))
  };

  const getCountryStats = (countryId: string) => {};

  const getLocationStats = (locationId: string) => {};

  const getNodeStats = (nodeId: string) => {};

  return {
    continentsStats,
    getContinentStats,
    getCountryStats,
    getLocationStats,
    getNodeStats,
  };
};

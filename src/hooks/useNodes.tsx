import { useCallback, useEffect, useState } from "react";
import { EntityType } from "../contexts/AppContext";

export enum NodeState {
  Active = "active",
  Draining = "draining",
  Inactive = "inactive",
  Down = "down",
}

export type Node = {
  id: string;
  name: string;
  createdAt: Date;
  geoloc: {
    city: string;
    continent: {
      code: string;
      name: string;
    };
    coordinates: string;
    country: string;
    countryCode: string;
    region: string;
  };
  diskSizeGB: number;
  bandwidthServed: {
    "1d": string;
    "7d": string;
  };
  cacheHitRate: {
    "1h": number;
    "24h": number;
  };
  estimatedEarnings: {
    "1d": number;
    "7d": number;
  };
  retrievalsStats: {
    "1d": number;
    "7d": number;
  };
  type: EntityType.node;
  state: NodeState;
  ttfbStats: {
    p95_1h: number;
    p95_24h: number;
  };
};

export type Nodes = Node[];

const nodesMap = new Map();
const refreshInterval = 3600000; // 10000 // in seconds

export const useNodes = () => {
  const [nodes, setNodes] = useState<Map<string, Node>>(new Map());

  useEffect(() => {
    const getResults = async () => {
      let buffer = "";

      const response = await fetch("https://orchestrator.strn.pl/explorer");

      const decoder = new TextDecoder();
      const reader = response.body?.getReader();

      const onChunck = ({ done, value }: ReadableStreamReadResult<Uint8Array>): void => {
        let data;

        if (buffer.length) {
          const newData = decoder.decode(value);
          data = newData.concat(buffer).split("\n");
          buffer = "";
        } else {
          data = decoder.decode(value).split("\n");
        }

        data.forEach((line) => {
          if (!line.length) return;

        try {
          const node = JSON.parse(line);
          nodesMap.set(node.id, {
            ...node,
            name: node.id.substring(0, 8),
            type: EntityType.node,
          });
        } catch (error) {
          buffer = line;
        }
      });

        setNodes(new Map(nodesMap));
        if (!done) {
          requestIdleCallback(() => {
            reader?.read().then(onChunck);
          });
        }
      };

      requestIdleCallback(() => {
        reader?.read().then(onChunck);
      });
    };

    getResults();
    const interval = setInterval(getResults, refreshInterval);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const getByID = (queryNodeId: string) => {
    return nodes.get(queryNodeId);
  };

  const getByLocationId = (queryLocationId: string) => {
    return Array.from(nodes.values()).filter(
      (node) => node.geoloc.city === queryLocationId
    );
  };

  const getByCountryId = (queryCountryId: string) => {
    return Array.from(nodes.values()).filter(
      (node) => node.geoloc.countryCode === queryCountryId
    );
  };

  const getByContinentId = (queryContinentId: string) => {
    return Array.from(nodes.values()).filter((node) => node.geoloc.continent.code === queryContinentId);
  };

  const getByActivityState = (activityState: NodeState) => {
    return Array.from(nodes.values()).filter((node) => node.state === activityState);
  };

  return {
    nodes,
    setNodes,
    getByID,
    getByLocationId,
    getByCountryId,
    getByContinentId,
    getByActivityState,
  };
};

export default useNodes;

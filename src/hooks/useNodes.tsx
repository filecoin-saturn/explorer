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
  createdAt: Date;
  bandwidthServed: {
    "1d": string;
    "7d": string;
  };
  cacheHitRate: {
    "1d": number;
    "7d": number;
  };
  diskSizeInGB: number;
  estimatedEarnings: {
    "1d": number;
    "7d": number;
  };
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
  retrievalStats: {
    "1d": number;
    "7d": number;
  };
  state: NodeState;
  ttdbStats: {
    "1d": number;
    "7d": number;
  };
  type: EntityType.node;
};

export type Nodes = Node[];

const nodesMap = new Map();

export const useNodes = () => {
  const [nodes, setNodes] = useState<Map<string, Node>>(new Map());

  const getResults = useCallback(async () => {
    let buffer = "";

    const response = await fetch("https://orchestrator.strn.pl/explorer");

    const decoder = new TextDecoder();
    const reader = response.body?.getReader();

    const onChunck = ({
      done,
      value,
    }: ReadableStreamReadResult<Uint8Array>): void => {
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
          nodesMap.set(node.id, node);
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
  }, [setNodes]);

  useEffect(() => {
    getResults();
    const interval = setInterval(getResults, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [getResults]);

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
    return Array.from(nodes.values()).filter(
      (node) => node.geoloc.continent.code === queryContinentId
    );
  };

  const getByActivityState = (activityState: NodeState) => {
    return Array.from(nodes.values()).filter(
      (node) => node.state === activityState
    );
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

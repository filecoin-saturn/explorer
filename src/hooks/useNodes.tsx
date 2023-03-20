import { useContext, useEffect, useState } from "react";
import { EntityType } from "../contexts/AppContext";
import NodesContext from "../contexts/NodesContext";

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

export const useNodes = () => {
  const { nodes } = useContext(NodesContext);

  const getNodeByID = (queryNodeId: string) => {
    return nodes.find((node) => node.id === queryNodeId);
  };

  const getNodesByLocationId = (queryLocationId: string) => {
    return nodes.filter((node) => node.geoloc.city === queryLocationId);
  };

  const getNodesByCountryId = (queryCountryId: string) => {
    return nodes.filter((node) => node.geoloc.countryCode === queryCountryId);
  };

  const getNodesByContinentId = (queryContinentId: string) => {
    return nodes.filter(
      (node) => node.geoloc.continent.code === queryContinentId
    );
  };

  const getNodesByActivityState = (activityState: NodeState) => {
    return nodes.filter((node) => node.state === activityState);
  };

  return {
    nodes,
    getNodeByID,
    getNodesByLocationId,
    getNodesByCountryId,
    getNodesByContinentId,
    getNodesByActivityState,
  };
};

export default useNodes;

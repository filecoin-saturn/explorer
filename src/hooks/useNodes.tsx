import { useState } from "react";

export enum NodeState {
  Active = "active",
  Draining = "draining",
  Inactive = "inactive",
  Down = "down",
}

export type NodeBiases = {
  baseBias: number;
  ttfbBias: number;
  randomBias: number;
  speedPenalty: number;
  weightedTtfb: number;
  speedtestBias: number;
  cpuLoadPenalty: number;
  errorRatePenalty: string;
  weightedHitsRatio: string;
  cacheHitRatePenalty: string;
  weightedErrorsRatio: string;
  healthCheckFailuresPenalty: string;
};

export type NodeTTFBStats = {
  p1_1h: number;
  p5_1h: number;
  p1_24h: number;
  p50_1h: number;
  p5_24h: number;
  p95_1h: number;
  p99_1h: number;
  hits_1h: number;
  p50_24h: number;
  p95_24h: number;
  p99_24h: number;
  hits_24h: number;
  errors_1h: number;
  errors_24h: number;
  reqs_served_1h: number;
  reqs_served_24h: number;
};

export type NodeGeoLoc = {
  region: string;
  city: string;
  country: string;
  countryCode: string;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
};

export type NodeSpeedTest = {
  isp: string;
  server: {
    location: string;
    country: string;
  };
  upload: {
    bandwidth: number;
  };
  download: {
    bandwidth: number;
  };
  ping: {
    latency: number;
  };
};

export type NodeDiskStats = {
  usedDisk: number;
  totalDisk: number;
  usedDiskMB: number;
  totalDiskMB: number;
  availableDisk: number;
  availableDiskMB: number;
};

export type NodeMemoryStats = {
  freeMemory: number;
  totalMemory: number;
  freeMemoryKB: number;
  totalMemoryKB: number;
  availableMemory: number;
  availableMemoryKB: number;
};

export type NodeCpuStats = {
  numCPUs: number;
  loadAvgs: number[];
};

export type NodeNicStats = {
  bytesSent: number;
  interface: string;
  packetsSent: number;
  bytesReceived: number;
  packetsReceived: number;
  bytesSentSinceLast: number;
  packetsSentSinceLast: number;
  bytesReceivedSinceLast: number;
  packetsReceivedSinceLast: number;
};

export type NodeHealthCheckFailure = {
  dataValues: {
    created_at: Date;
    error: string;
    reason: string;
  };
  _previousDataValues: {
    created_at: Date;
    error: string;
    reason: string;
  };
  uniqno: number;
  isNewRecord: boolean;
  reason: string;
};

export type NodeData = {
  id: string;
  state: NodeState;
  ipAddress: string;
  lastRegistration: Date;
  bias: number;
  biases: NodeBiases;
  ttfbStats: NodeTTFBStats;
  maxSpeed: number;
  sunrise: boolean;
  level: number;
  version: string;
  geoloc: NodeGeoLoc;
  speedtest: NodeSpeedTest;
  diskStats: NodeDiskStats;
  memoryStats: NodeMemoryStats;
  cpuStats: NodeCpuStats;
  nicStats: NodeNicStats;
  uploadRate: number;
  createdAt: Date;
  HealthCheckFailures: NodeHealthCheckFailure[];
};

export type Node = {
  id: string;
  countryId: string;
  locationId: string;
  continentId: string;
  data: NodeData;
};

export type Nodes = Node[];

export const useNodes = () => {
  const [nodes, setNodes] = useState<Nodes>([]);

  const getByID = (queryNodeId: string) => {
    return nodes.filter((node) => node.id === queryNodeId)
  }

  const getByLocationId = (queryLocationId: string) => {
    return nodes.filter((node) => node.locationId === queryLocationId)
  }
  
  const getByCountryId = (queryCountryId: string) => {
    return nodes.filter((node) => node.countryId === queryCountryId)
  }

  const getByContinentId = (queryContinentId: string) => {
    return nodes.filter((node) => node.continentId === queryContinentId)
  }

  const getByActivityState = (activityState: NodeState) => {
    return nodes.filter((node) => node.data.state === activityState)
  }

  return { 
    nodes,
    setNodes,
    getByID,
    getByLocationId,
    getByCountryId,
    getByContinentId,
    getByActivityState
  };
};

export default useNodes;

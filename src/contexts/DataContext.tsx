import { createContext, ReactElement, ReactNode, useState } from "react";
import { Node } from "../hooks/useNodes";
import { Location } from "../hooks/useLocations";

type DataContextType = {
  nodes: Node[] | [];
  locations: Location[] | [];
  setNodes: (nodes: Node[] | []) => void;
  setLocations: (locations: Location[] | []) => void;
};

const initialValues = {
  nodes: [],
  locations: [],
  setNodes: () => {},
  setLocations: () => {},
};

const DataContext = createContext<DataContextType>(initialValues);
export const DataContextProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [nodes, setNodes] = useState<Node[] | []>([]);
  const [locations, setLocations] = useState<Location[] | []>([]);

  const value = {
    nodes,
    locations,
    setNodes,
    setLocations,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataContext;

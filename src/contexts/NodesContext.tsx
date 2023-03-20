import { createContext, ReactElement, ReactNode, useState } from "react";
import { Node } from "../hooks/useNodes";

type NodesContextType = {
  nodes: Node[] | [];
  setNodes: (nodes: Node[] | []) => void;
};

const initialValues = {
  nodes: [],
  setNodes: () => {},
};

const NodesContext = createContext<NodesContextType>(initialValues);
export const NodesContextProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [nodes, setNodes] = useState<Node[] | []>([]);

  const value = {
    nodes,
    setNodes,
  };
  return (
    <NodesContext.Provider value={value}>{children}</NodesContext.Provider>
  );
};

export default NodesContext;

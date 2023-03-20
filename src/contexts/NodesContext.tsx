import {
  createContext,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Node } from "../hooks/useNodes";
import { EntityType } from "./AppContext";

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

  useEffect(() => {
    console.log(">>> useEffect");
    const getResults = async () => {
      console.log("Call results triggered");
      let buffer = "";

      const response = await fetch("https://orchestrator.strn.pl/explorer");

      const decoder = new TextDecoder();
      const reader = response.body?.getReader();
      const nodesMap = new Map<string, Node>();

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
            nodesMap.set(node.id, {
              ...node,
              name: node.id.substring(0, 8),
              type: EntityType.node,
            });
          } catch (error) {
            buffer = line;
          }
        });

        setNodes(Array.from(nodesMap.values()));
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
  }, []);

  const value = {
    nodes,
    setNodes,
  };
  return (
    <NodesContext.Provider value={value}>{children}</NodesContext.Provider>
  );
};

export default NodesContext;

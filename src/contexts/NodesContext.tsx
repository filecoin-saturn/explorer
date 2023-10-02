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
  globalStats: { medianTTFB: number };
};

const initialValues = {
  nodes: [],
  setNodes: () => {},
  globalStats: { medianTTFB: 0 },
};

const NodesContext = createContext<NodesContextType>(initialValues);

export const NodesContextProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [nodes, setNodes] = useState<Node[] | []>([]);
  const [tempNodes, setTempNodes] = useState<Node[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [globalStats, setGlobalStats] = useState<{ medianTTFB: number }>({ medianTTFB: 0 });

  useEffect(() => {
    let animationFrameId: number;
    const getResults = async () => {
      setIsLoading(true);
      let buffer = "";
      const response = await fetch("https://orchestrator.strn.pl/explorer");

      const decoder = new TextDecoder();
      const reader = response.body?.getReader();
      const nodesMap = new Map<string, Node>();
      const medianTTFB = Number(response.headers.get("x-saturn-median-ttfb")) || 0;

      setGlobalStats({ medianTTFB });

      const onChunk = ({
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

        setTempNodes(Array.from(nodesMap.values()));
        if (!done) {
          animationFrameId = requestAnimationFrame(() => {
            reader?.read().then(onChunk);
          });
        } else {
          setIsLoading(false);
        }
      };

      animationFrameId = requestAnimationFrame(() => {
        reader?.read().then(onChunk);
      });
    };

    getResults();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    if (isLoading === false) {
      setNodes(tempNodes);
      setTempNodes([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const value = {
    globalStats,
    nodes,
    setNodes,
  };
  return (
    <NodesContext.Provider value={value}>{children}</NodesContext.Provider>
  );
};

export default NodesContext;

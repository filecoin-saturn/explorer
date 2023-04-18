import { Layer, LayerProps } from "react-map-gl";

export const NodeLocation = ({ srcId }: { srcId: string }) => {
  const circleLayer = {
    id: "node-location",
    source: srcId,
    type: "circle",
    paint: {
      "circle-radius": ["interpolate", ["linear"], ["zoom"], 1, 30, 10, 65],
      "circle-opacity": ["interpolate", ["linear"], ["zoom"], 6, 0, 8, 0.3],
      "circle-color": [
        "case",
        ["boolean", ["feature-state", "highlight"], false],
        "#10FFD4",
        "transparent",
      ],
    },
  } as LayerProps;

  return <Layer {...circleLayer} />;
};

export default NodeLocation;

import { Layer, LayerProps } from "react-map-gl";

export const Nodes = ({ srcId }: { srcId: string }) => {
  const circleLayer = {
    id: "circle-background",
    source: srcId,
    type: "circle",
    filter: ["has", "point_count"],
    paint: {
      "circle-radius": ["interpolate", ["linear"], ["zoom"], 1, 15, 10, 20],
      "circle-color": [
        "interpolate",
        ["linear"],
        ["get", "point_count"],
        1,
        "#011157",
        5,
        "#054D8E",
        15,
        "#00ABD0",
        30,
        "#10FFD4",
      ],
    },
  } as LayerProps;

  const circleUnclustered = {
    id: "circle-background-unclustered",
    source: srcId,
    type: "circle",
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-radius": ["interpolate", ["linear"], ["zoom"], 1, 10, 10, 20],
      "circle-color": "#011157",
    },
  } as LayerProps;

  const count = {
    id: "cluster-count",
    type: "symbol",
    source: srcId,
    filter: ["has", "point_count"],
    layout: {
      "text-field": ["get", "point_count_abbreviated"],
      "text-size": 14,
      "text-allow-overlap": true,
    },
    paint: {
      "text-color": [
        "interpolate",
        ["exponential", 2],
        ["get", "point_count"],
        2,
        "white",
        14,
        "white",
        15,
        "#011157",
        30,
        "#011157",
      ],
    },
  } as LayerProps;

  const countUnclustered = {
    id: "cluster-count-unclustered",
    type: "symbol",
    source: srcId,
    filter: ["!", ["has", "point_count"]],
    layout: {
      "text-field": "1",
      "text-size": 16,
      "text-allow-overlap": true,
    },
    paint: {
      "text-color": "white",
    },
  } as LayerProps;

  return (
    <>
      <Layer {...circleUnclustered} />
      <Layer {...circleLayer} />
      <Layer {...countUnclustered} />
      <Layer {...count} />
    </>
  );
};

export default Nodes;

import { Layer, LayerProps } from "react-map-gl";

export const Nodes = ({ srcId, max }: { srcId: string; max: number }) => {
  const circleLayer = {
    id: "circle-background",
    source: srcId,
    type: "circle",
    filter: ["has", "point_count"],
    paint: {
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["get", "point_count"],
        0,
        14,
        300,
        30,
      ],
      "circle-color": [
        "interpolate",
        ["linear"],
        ["get", "point_count"],
        0,
        "#011157",
        max / 3,
        "#054D8E",
        max / 2,
        "#00ABD0",
        max,
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
      "circle-radius": 10,
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
    },
    paint: {
      "text-color": [
        "interpolate",
        ["linear"],
        ["get", "point_count"],
        0,
        "white",
        max / 2,
        "white",
        max,
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
      "text-size": 14,
    },
    paint: {
      "text-color": "white",
    },
  } as LayerProps;

  return (
    <>
      <Layer {...circleLayer} />
      <Layer {...circleUnclustered} />
      <Layer {...count} />
      <Layer {...countUnclustered} />
    </>
  );
};

export default Nodes;

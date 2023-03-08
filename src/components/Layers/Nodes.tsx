import { Layer } from "react-map-gl";

export const Nodes = ({ srcId }: { srcId: string }) => {
  
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
        1,
        10,
        200,
        30,
      ],
      "circle-color": [
        "interpolate",
        ["linear"],
        ["get", "point_count"],
        1,
        "#011157",
        50,
        "#054D8E",
        100,
        "#00ABD0",
        200,
        "#10FFD4",
      ],
    },
  };

  const circleUnclusteder = {
    id: "circle-background-unclustered",
    source: srcId,
    type: "circle",
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-radius": 10,
      "circle-color": "#011157",
    },
  };

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
      "text-color": "white",
    },
  };

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
  };

  return (
    <>
      <Layer {...circleLayer} />
      <Layer {...circleUnclusteder} />
      <Layer {...count} />
      <Layer {...countUnclustered} />
    </>
  );
};

export default Nodes;

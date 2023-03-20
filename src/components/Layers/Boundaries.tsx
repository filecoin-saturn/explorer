import { Layer } from "react-map-gl";

export const Boundaries = () => {
  const boundaryLayer = {
    id: "boundaries-fill",
    type: "fill",
    source: "boundaries",
    "source-layer": "country_boundaries",
    paint: {
      "fill-color": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        [
          "interpolate",
          ["linear"],
          ["feature-state", "nodes"],
          0,
          "#2A1CF7",
          1,
          "#113CA9",
          20,
          "#1E5DFF",
          50,
          "#22AFFF",
          380,
          "#00FFD1",
        ],
        [
          "interpolate",
          ["linear"],
          ["feature-state", "nodes"],
          0,
          "transparent",
          1,
          "#113CA9",
          20,
          "#1E5DFF",
          50,
          "#22AFFF",
          380,
          "#00FFD1",
        ],
      ],
      "fill-opacity": 0.6,
      "fill-outline-color": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        [
          "interpolate",
          ["linear"],
          ["feature-state", "nodes"],
          0,
          "#2A1CF7",
          1,
          "#113CA9",
          20,
          "#1E5DFF",
          50,
          "#22AFFF",
          380,
          "#00FFD1",
        ],
        "transparent",
      ],
    },
  };

  //@ts-ignore
  return <Layer {...boundaryLayer}></Layer>;
};

export default Boundaries;

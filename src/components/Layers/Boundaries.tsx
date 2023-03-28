import { Layer } from "react-map-gl";

export const Boundaries = ({
  max,
  srcId,
}: {
  max: number | undefined;
  srcId: string;
}) => {
  const steps = [
    max && max > 200 ? max * 0.1 : 20,
    max && max > 200 ? max * 0.4 : 50,
    max && max > 200 ? max * 0.6 : 380,
  ];

  const boundaryLayer = {
    id: "boundaries-fill",
    type: "fill",
    source: srcId,
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
          "#275cc4",
          1,
          "#113CA9",
          steps[0],
          "#1E5DFF",
          steps[1],
          "#22AFFF",
          steps[2],
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
          steps[0],
          "#1E5DFF",
          steps[1],
          "#22AFFF",
          steps[2],
          "#00FFD1",
        ],
      ],
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        0.4,
        0.3,
      ],
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
          steps[0],
          "#1E5DFF",
          steps[1],
          "#22AFFF",
          steps[2],
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

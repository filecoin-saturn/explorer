import { Layer } from "react-map-gl";

export const Boundaries = ({
  max,
  srcId,
}: {
  max: number | undefined;
  srcId: string;
}) => {
  const boundaryLayer = {
    id: "boundaries-fill",
    type: "fill",
    source: srcId,
    "source-layer": "country_boundaries",
    paint: {
      "fill-color": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        "#275cc4",
        "#113CA9",
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
        "#2A1CF7",
        "#113CA9",
      ],
    },
  };

  //@ts-ignore
  return <Layer {...boundaryLayer}></Layer>;
};

export default Boundaries;

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
      "fill-color": "transparent",
      "fill-outline-color": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        "#fff",
        "transparent",
      ],
    },
  };

  //@ts-ignore
  // return <Layer />;
  return <Layer {...boundaryLayer}></Layer>;
};

export default Boundaries;

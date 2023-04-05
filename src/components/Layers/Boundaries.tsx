import { Layer, LayerProps } from "react-map-gl";

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
    },
  } as LayerProps;

  const boundaryLayer2 = {
    id: "boundaries-outline",
    type: "line",
    source: srcId,
    "source-layer": "country_boundaries",
    paint: {
      "line-width": 2,
      "line-color": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        "rgba(255,255,255,0.8)",
        "transparent",
      ],
    },
  } as LayerProps;

  return (
    <>
      <Layer {...boundaryLayer} />
      <Layer {...boundaryLayer2} />
    </>
  );
};

export default Boundaries;

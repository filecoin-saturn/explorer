import { Layer, LayerProps } from "react-map-gl";

export const Heatmap = ({ srcId }: { srcId: string }) => {
  const config = {
    id: "load-heat",
    type: "heatmap",
    source: srcId,
    paint: {
      "heatmap-weight": [
        "interpolate",
        ["linear"],
        ["get", "ttfb"],
        800,
        1,
        3000,
        0.2,
      ],
      "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 1, 1],
      "heatmap-color": [
        "interpolate",
        ["linear"],
        ["heatmap-density"],
        0,
        "transparent",
        0.1,
        "rgba(0, 255, 209, 0.3)",
        1,
        "rgba(0, 255, 209, 0.7)",
      ],
      "heatmap-radius": [
        "interpolate",
        ["exponential", 2],
        ["zoom"],
        0,
        5,
        2,
        20,
        9,
        1500,
      ],
    },
  } as LayerProps;

  const overlay = {
    id: "bg",
    type: "background",
    paint: {
      "background-color": "rgb(0,  255, 209)",
      "background-opacity": 0.2,
    },
  } as LayerProps;
  return (
    <>
      <Layer {...overlay} />
      <Layer {...config} />;
    </>
  );
};

export default Heatmap;

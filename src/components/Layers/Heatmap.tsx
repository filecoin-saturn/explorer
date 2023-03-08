import { Layer } from "react-map-gl";

export const Heatmap = ({ srcId }: { srcId: string }) => {
  const config = {
    id: "load-heat",
    type: "heatmap",
    source: srcId,
    paint: {
      "heatmap-weight": ["interpolate", ["linear"], ["get", "load"], 1, 1],
      "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 1, 1],
      "heatmap-color": [
        "interpolate",
        ["linear"],
        ["heatmap-density"],
        0,
        "rgba(33,102,172,0)",
        0.2,
        "#113CA9",
        0.4,
        "#1E5DFF",
        0.6,
        "#22AFFF",
        0.8,
        "#00FFD1",
        1,
        "#00FFD1",
      ],
      "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 1, 15, 10, 5],
    },
  };

  return <Layer {...config} />;
};

export default Heatmap;

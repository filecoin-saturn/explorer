import "mapbox-gl/dist/mapbox-gl.css";

import { Map, Source, useMap } from "react-map-gl";
//@ts-ignore
import mapboxgl from "mapbox-gl/dist/mapbox-gl";
//@ts-ignore
import MapboxWorker from "mapbox-gl/dist/mapbox-gl-csp-worker";
import useNodes, { Node } from "../../hooks/useNodes";
import useAppContext from "../../hooks/useAppContext";
import { ViewMode } from "../../contexts/AppContext";
import Nodes from "../Layers/Nodes";
import Heatmap from "../Layers/Heatmap";
import Boundaries from "../Layers/Boundaries";
import { useCallback, useEffect, useState } from "react";
import Scale from "../Scale";
import useLocations from "../../hooks/useLocations";
mapboxgl.workerClass = MapboxWorker;

const viewState = {
  zoom: 1,
  longitude: -8.629105,
  latitude: 4.157944,
};

const projection = "globe";

const mapStyle = "mapbox://styles/joaoferreira18/cleedx6a6003x01qg41yehikx";

export const Globe = () => {
  const { nodes, getNodesByLocationId } = useNodes();
  const { map } = useMap();
  const { locations } = useLocations();
  const appState = useAppContext();
  const [scaleLimits, setScaleLimits] = useState<{
    higher: { step: number; label: string };
    lower: { step: number; label: string };
  }>({
    higher: { label: "N/A", step: 1 },
    lower: { label: "N/A", step: 0 },
  });

  const { viewMode } = appState;

  const geoJson = {
    type: "FeatureCollection",
    features: nodes.map((node: Node) => ({
      type: "Feature",
      properties: {
        city: node.geoloc.city,
        country: node.geoloc.countryCode,
        continent: node.geoloc.continent.code,
        ttfb: node.ttfbStats.p95_24h || 20000,
      },
      geometry: {
        type: "Point",
        coordinates: node.geoloc.coordinates.split(",").reverse(),
      },
    })),
  };

  const onMapLoad = useCallback(() => {
    if (!map) return;

    map.on("click", ["circle-background", "cluster-count"], (event) => {
      //@ts-ignore
      const [feature] = event.features;

      if (feature) {
        map.flyTo({ center: feature.geometry.coordinates, zoom: 6 });
      }
    });

    map.on(
      "click",
      ["circle-background-unclustered", "cluster-count-unclustered"],
      (event) => {
        //@ts-ignore
        const [feature] = event.features;

        if (feature) {
          map.flyTo({ center: feature.geometry.coordinates, zoom: 7 });
        }
      }
    );
  }, [map]);

  useEffect(() => {
    if (viewMode === ViewMode.Cluster) {
      const nodesNumber = locations.map(
        ({ id }) => getNodesByLocationId(id).length
      );

      let max = 1;
      let min = 0;
      if (nodesNumber.length) {
        max = Math.max(...nodesNumber);
        min = Math.min(...nodesNumber);
      }

      setScaleLimits({
        higher: { label: "", step: max },
        lower: { label: "", step: min },
      });
    }

    if (viewMode === ViewMode.Heatmap) {
      const ttfbNumber = locations.flatMap(({ id }) =>
        getNodesByLocationId(id)
          .map((node) => node.ttfbStats.p95_24h)
          .filter((number) => !!number)
      );

      let max = 1;
      let min = 0;
      if (ttfbNumber.length) {
        min = Math.max(...ttfbNumber);
        max = Math.min(...ttfbNumber);
      }

      setScaleLimits({
        higher: { label: "ms", step: max },
        lower: { label: "ms", step: min },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations]);

  return (
    <>
      <Scale higher={scaleLimits.higher} lower={scaleLimits.lower} />
      <Map
        id="map"
        mapLib={mapboxgl}
        onLoad={onMapLoad}
        mapStyle={mapStyle}
        projection={projection}
        initialViewState={viewState}
        mapboxAccessToken={process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN}
      >
        {viewMode === ViewMode.Density && (
          <Source
            id="boundaries"
            type="vector"
            url="mapbox://mapbox.country-boundaries-v1"
            name="boundaries"
          >
            <Boundaries
              srcId="boundaries"
              max={scaleLimits ? parseInt(scaleLimits.higher.step) : 0}
            />
          </Source>
        )}

        {viewMode === ViewMode.Heatmap && (
          <Source
            id="heat-src"
            type="geojson"
            //@ts-ignore
            data={geoJson}
          >
            <Heatmap
              srcId="heat-src"
              max={scaleLimits.higher.step}
              min={scaleLimits.lower.step}
            />
          </Source>
        )}

        {viewMode === ViewMode.Cluster && (
          <Source
            id="nodes"
            type="geojson"
            //@ts-ignore
            data={geoJson}
            cluster={true}
            clusterRadius={20}
          >
            <Nodes srcId="nodes" max={scaleLimits.higher.step} />
          </Source>
        )}
      </Map>
    </>
  );
};

export default Globe;

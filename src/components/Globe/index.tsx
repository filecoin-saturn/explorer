import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";
import { isMobile } from "react-device-detect";
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
mapboxgl.workerClass = MapboxWorker;

const viewState = {
  zoom: 1,
};

const projection = "globe";

// const mapStyle = "mapbox://styles/joaoferreira18/cleedx6a6003x01qg41yehikx";
const mapStyle =
  "mapbox://styles/joaoferreira18/clg287ff4004m01p0izt5pymm?optimize=true";
const mapBoundariesLayerURL =
  "mapbox://poliveiraatsubvisualco.countries-simplification";

export const Globe = () => {
  const { nodes } = useNodes();
  const { map } = useMap();
  const appState = useAppContext();
  const { viewMode } = appState;
  const [scaleLimits, setScaleLimits] = useState<{
    higher: { step: string; label: string };
    lower: { step: string; label: string };
  }>();

  useEffect(() => {
    if (viewMode === ViewMode.Heatmap) {
      const sortedNodes = nodes.sort(
        (a, b) => a.ttfbStats.p95_24h - b.ttfbStats.p95_24h
      );
      const maxScale = sortedNodes[0].ttfbStats.p95_24h || 1000;
      const minScale = 3000;

      setScaleLimits({
        higher: { label: "ms", step: `${maxScale}` },
        lower: { label: "ms", step: `${minScale}` },
      });
    } else {
      setScaleLimits(undefined);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode]);

  const geoJson = {
    type: "FeatureCollection",
    features: nodes.map((node: Node) => ({
      type: "Feature",
      properties: {
        city: node.geoloc.city,
        country: node.geoloc.countryCode,
        continent: node.geoloc.continent.code,
        ttfb: node.ttfbStats.p95_24h | 2000,
      },
      geometry: {
        type: "Point",
        coordinates: node.geoloc.coordinates.split(",").reverse(),
      },
    })),
  };

  const onMouseLeave = useCallback(
    (options: any) => () => {
      if (options.id !== null) {
        map?.setFeatureState(
          {
            source: options.source,
            sourceLayer: options.sourceLayer,
            id: options.id,
          },
          { hover: false }
        );
      }
      options.id = null;
    },
    [map]
  );

  const onMouseMove = useCallback(
    (options: any) => (event: any) => {
      if (!event.features?.length || !map) return;
      const [feature] = event.features;
      const { id: nextId } = feature;

      if (options.id === nextId) return;

      if (options.id !== null) {
        map.setFeatureState(
          {
            source: options.source,
            sourceLayer: options.sourceLayer,
            id: options.id,
          },
          { hover: false }
        );
      }

      options.id = nextId;

      map.setFeatureState(
        {
          source: options.source,
          sourceLayer: options.sourceLayer,
          id: nextId,
        },
        { hover: true }
      );
    },
    [map]
  );

  const onMapLoad = useCallback(
    (nodes: Node[]) => {
      if (!map) return;
      if (nodes.length === 0) return;

      let hoveredStateId = null;

      const countryOptions = {
        id: hoveredStateId,
        source: "countries-simplification-data",
        sourceLayer: "countries",
      };

      map.on("mousemove", "boundaries-fill", onMouseMove(countryOptions));
      map.on("mouseleave", "boundaries-fill", onMouseLeave(countryOptions));

      map.on(
        "mouseenter",
        [
          "boundaries-fill",
          "circle-background",
          "circle-background-unclustered",
        ],
        () => {
          map.getCanvas().style.cursor = "pointer";
        }
      );

      map.on(
        "mouseleave",
        [
          "boundaries-fill",
          "circle-background",
          "circle-background-unclustered",
        ],
        () => {
          map.getCanvas().style.cursor = "grab";
        }
      );

      map.on("load", () => {
        map.easeTo({
          padding: { ...map.getPadding(), left: isMobile ? 0 : 250 },
          duration: 3000,
          zoom: !isMobile ? 2.5 : 1,
          center: [-43.733608, 42.875964],
          essential: true,
        });
      });

      return () => {
        map.off("mouseleave", onMouseLeave(countryOptions));
        map.off("mousemove", onMouseMove(countryOptions));
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [map, nodes]
  );

  const renderScale = () => {
    if (!scaleLimits) return;
    const colorScale = viewMode === ViewMode.Heatmap ? "secondary" : "primary";
    return (
      <Scale
        higher={scaleLimits.higher}
        lower={scaleLimits.lower}
        colorSchema={colorScale}
      />
    );
  };

  return (
    <>
      {renderScale()}
      <div className="Map">
        {nodes.length > 0 && (
          <Map
            id="map"
            mapLib={mapboxgl}
            onLoad={onMapLoad(nodes)}
            mapStyle={mapStyle}
            projection={projection}
            initialViewState={viewState}
            mapboxAccessToken={process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN}
            maxZoom={8.1}
            minZoom={0}
            doubleClickZoom={false}
            fadeDuration={1}
          >
            <Source
              id="countries-simplification-data"
              type="vector"
              url={mapBoundariesLayerURL}
              name="countries-simplification-data"
            >
              <Boundaries
                srcId="countries-simplification-data"
                max={scaleLimits ? parseInt(scaleLimits.higher.step) : 0}
              />
            </Source>
            {viewMode === ViewMode.Heatmap && (
              <Source
                id="heat-src"
                type="geojson"
                //@ts-ignore
                data={geoJson}
              >
                <Heatmap srcId="heat-src" />
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
                <Nodes srcId="nodes" />
              </Source>
            )}
          </Map>
        )}
      </div>
    </>
  );
};

export default Globe;

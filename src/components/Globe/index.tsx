import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";

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
import { useStats } from "../../hooks/useStats";
import useCountries from "../../hooks/useCountries";
mapboxgl.workerClass = MapboxWorker;

const viewState = {
  zoom: 1,
  longitude: -8.629105,
  latitude: 4.157944,
};

const projection = "globe";

const mapStyle = "mapbox://styles/joaoferreira18/cleedx6a6003x01qg41yehikx";

export const Globe = () => {
  const { nodes } = useNodes();
  const { map } = useMap();
  const { getStatsByCountryId } = useStats();
  const { countries } = useCountries();
  const appState = useAppContext();
  const { viewMode } = appState;
  const [scaleLimits, setScaleLimits] = useState<{
    higher: { step: string; label: string };
    lower: { step: string; label: string };
  }>();

  useEffect(() => {
    const countriesCounters = countries.map((c) => getStatsByCountryId(c.id));

    const nodesCounts = countriesCounters.flatMap((o) =>
      o ? o.numberOfNodes : 0
    );

    const maxScale =
      +((Math.max(...nodesCounts) * 0.85) / 100).toFixed(0) * 100;
    const minScale = +(0.05 * maxScale).toFixed(0);

    setScaleLimits({
      higher: { label: "> #Nodes", step: `${maxScale}` },
      lower: { label: "< #Nodes", step: `${minScale}` },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, viewMode]);

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
        {
          hover: true,
          nodes: options.boundariesLoad && options.boundariesLoad[options.id],
        }
      );
    },
    [map]
  );

  const onMapLoad = useCallback(
    (nodes: Node[]) => {
      if (!map) return;
      if (nodes.length === 0) return;

      const boundariesLoad = map
        ?.querySourceFeatures("boundaries", {
          sourceLayer: "country_boundaries",
        })
        .reduce((acc, feature) => {
          const amountOfNodes = nodes.filter(
            (node: Node) =>
              node.geoloc.countryCode === feature.properties?.iso_3166_1
          ).length;

          map.setFeatureState(
            {
              source: "boundaries",
              sourceLayer: "country_boundaries",
              id: feature.id,
            },
            { hover: false, nodes: amountOfNodes }
          );

          return {
            ...acc,
            [feature.id as string]: amountOfNodes,
          };
        }, {});

      let hoveredStateId = null;

      const countryOptions = {
        id: hoveredStateId,
        source: "boundaries",
        sourceLayer: "country_boundaries",
        boundariesLoad,
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

      return () => {
        map.off("mouseleave", onMouseLeave(countryOptions));
        map.off("mousemove", onMouseMove(countryOptions));
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [map, nodes]
  );

  return (
    <>
      {scaleLimits && (
        <Scale higher={scaleLimits.higher} lower={scaleLimits.lower} />
      )}
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
          >
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

import "mapbox-gl/dist/mapbox-gl.css";

import { Map, useMap } from "react-map-gl";
//@ts-ignore
import mapboxgl from "mapbox-gl/dist/mapbox-gl";
//@ts-ignore
import MapboxWorker from "mapbox-gl/dist/mapbox-gl-csp-worker";
import { useCallback, useState } from "react";
mapboxgl.workerClass = MapboxWorker;

const viewState = {
  zoom: 1,
  longitude: -8.629105,
  latitude: 4.157944,
};

const projection = "globe";

const mapStyle = "mapbox://styles/joaoferreira18/cleedx6a6003x01qg41yehikx";

export const Globe = () => {
  const { map } = useMap();

  const [spinEnabled, setSpinEnabled] = useState<boolean>(true);
  const maxSpinZoom = 3;
  const secondsPerRevolution = 10;
  const slowSpinZoom = 3;

  const spinGlobe = () => {
    if (map) {
      const zoom = map.getZoom();
      if (spinEnabled) {
        let distancePerSecond = 360 / secondsPerRevolution;
        if (zoom > slowSpinZoom) {
          const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
          distancePerSecond *= zoomDif;
        }
        const center = map.getCenter();
        center.lng -= distancePerSecond;
        map.easeTo({ center, duration: 1000, easing: (n) => n });
      }
    }
  };
  const onMapLoad = useCallback(() => {
    if (!map) return;
    spinGlobe();
  }, [map]);

  return (
    <Map
      id="map"
      onLoad={onMapLoad}
      mapLib={mapboxgl}
      mapStyle={mapStyle}
      projection={projection}
      initialViewState={viewState}
      mapboxAccessToken={process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN}
    ></Map>
  );
};

export default Globe;

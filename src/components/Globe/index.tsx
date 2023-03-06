import "mapbox-gl/dist/mapbox-gl.css";

import { Map } from "react-map-gl";
//@ts-ignore
import mapboxgl from "mapbox-gl/dist/mapbox-gl";
//@ts-ignore
import MapboxWorker from "mapbox-gl/dist/mapbox-gl-csp-worker";
mapboxgl.workerClass = MapboxWorker;

const viewState = {
  zoom: 1,
  longitude: -8.629105,
  latitude: 4.157944,
};

const projection = "globe";

const mapStyle = "mapbox://styles/joaoferreira18/cldirckg4002w01rn7xzlzjf7";

export const Globe = () => {
  return (
    <Map
      id="map"
      mapLib={mapboxgl}
      mapStyle={mapStyle}
      projection={projection}
      initialViewState={viewState}
      mapboxAccessToken={process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN}
    ></Map>
  );
};

export default Globe;

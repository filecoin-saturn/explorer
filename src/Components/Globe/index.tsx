import "mapbox-gl/dist/mapbox-gl.css";

import { Map, Source } from "react-map-gl";

const viewState = {
  longitude: -8.629105,
  latitude: 4.157944,
  zoom: 1,
};

const Globe = () => {
  return (
    <Map
      id="map"
      // onLoad={onMapLoad}
      initialViewState={viewState}
      mapboxAccessToken="pk.eyJ1Ijoiam9hb2ZlcnJlaXJhMTgiLCJhIjoiY2xkaXJhb3J4MWd4ZjNucGlrMTBxOXJoZyJ9.Hf3N8ndtLrE1R2bg6w92Dw"
      mapStyle="mapbox://styles/joaoferreira18/cldirckg4002w01rn7xzlzjf7"
      projection={"globe"}
    >
      <Source
        type="vector"
        id="boundaries"
        name="boundaries"
        url="mapbox://mapbox.country-boundaries-v1"
      >
        {/* <Boundaries /> */}
      </Source>
    </Map>
  );
};

export default Globe;

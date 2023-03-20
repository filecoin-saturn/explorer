import React from "react";
import ReactDOM from "react-dom/client";
import { MapProvider } from "react-map-gl";
import "./index.css";
import "./styles/globals.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AppContextProvider } from "./contexts/AppContext";
import { NodesContextProvider } from "./contexts/NodesContext";
import { LocationsContextProvider } from "./contexts/LocationsContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppContextProvider>
      <NodesContextProvider>
        <LocationsContextProvider>
          <MapProvider>
            <App />
          </MapProvider>
        </LocationsContextProvider>
      </NodesContextProvider>
    </AppContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);

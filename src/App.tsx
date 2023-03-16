import "./App.css";

import Globe from "./components/Globe";
import Logo from "./components/Logo";
import Toolbar from "./components/Toolbar";
import Navbar from "./components/Navbar";
import useNodes from "./hooks/useNodes";
import useLocations, { Location } from "./hooks/useLocations";
import { useEffect } from "react";
import { EntityType } from "./contexts/AppContext";

function App() {
  const { nodes, getByCountryId, getByLocationId } = useNodes();
  const { locations, setLocations, getLocationByCountryId } = useLocations();

  useEffect(() => {
    const locationsMap = new Map<string, Location>();

    Array.from(nodes.values()).forEach((node) =>
      locationsMap.set(node.geoloc.city, {
        id: node.geoloc.city,
        name: node.geoloc.city,
        countryId: node.geoloc.countryCode,
        continentId: node.geoloc.continent.code,
        type: EntityType.location,
      })
    );

    setLocations(Array.from(locationsMap.values()));
  }, [nodes, setLocations]);

  return (
    <div className="App">
      <Logo />
      <Navbar
        nodes={nodes}
        locations={locations}
        getByCountryId={getByCountryId}
        getByLocationId={getByLocationId}
        getLocationByCountryId={getLocationByCountryId}
      />
      <Toolbar />
      <Globe />
    </div>
  );
}

export default App;

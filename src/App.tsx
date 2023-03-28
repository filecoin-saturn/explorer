import "./App.css";

import Globe from "./components/Globe";
import Logo from "./components/Logo";
import Toolbar from "./components/Toolbar";
import Navbar from "./components/Navbar";
import useLocations, { Location } from "./hooks/useLocations";
import { useContext, useEffect } from "react";
import { EntityType } from "./contexts/AppContext";
import NodesContext from "./contexts/NodesContext";

function App() {
  const { nodes } = useContext(NodesContext);
  const { setLocations } = useLocations();

  useEffect(() => {
    const locationsMap = new Map<string, Location>();

    Array.from(nodes.values()).forEach((node) =>
      locationsMap.set(node.geoloc.city, {
        id: node.geoloc.city,
        name: node.geoloc.city,
        countryId: node.geoloc.countryCode,
        continentId: node.geoloc.continent.code,
        center: node.geoloc.coordinates.split(",").reverse(),
        type: EntityType.location,
      })
    );

    setLocations(Array.from(locationsMap.values()));
  }, [nodes, setLocations]);

  return (
    <div className="App">
      <Logo />
      <Navbar />
      <Toolbar />
      <Globe />;
    </div>
  );
}

export default App;

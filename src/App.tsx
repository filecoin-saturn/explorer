import "./App.css";

import Globe from "./components/Globe";
import Logo from "./components/Logo";
import Toolbar from "./components/Toolbar";
import Navbar from "./components/Navbar";
import useNodes from "./hooks/useNodes";
import useLocations, { Location } from "./hooks/useLocations";
import { useEffect } from "react";
import { EntityType } from "./contexts/AppContext";
import { useStats } from "./hooks/useStats";

function App() {
  const {
    nodes,
    getNodesByCountryId,
    getNodesByLocationId,
    getNodesByContinentId,
  } = useNodes();
  const { locations, setLocations, getLocationByCountryId } = useLocations();

  const {
    setNodes: setStatsNodes,
    setLocations: setStatsLocations,
    globalStats,
    getStatsByContinentId,
    getStatsByCountryId,
    getStatsByLocationId,
    getStatsByNodeId,
  } = useStats({
    getNodesByContinentId,
    getNodesByCountryId,
    getNodesByLocationId,
  });

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

  useEffect(() => {
    setStatsNodes(Array.from(nodes.values()));
    setStatsLocations(locations);
  }, [locations, nodes, setStatsLocations, setStatsNodes]);

  return (
    <div className="App">
      <Logo />
      <Navbar
        nodes={nodes}
        locations={locations}
        getNodesByCountryId={getNodesByCountryId}
        getNodesByLocationId={getNodesByLocationId}
        getLocationByCountryId={getLocationByCountryId}
        globalStats={globalStats}
        getStatsByContinentId={getStatsByContinentId}
        getStatsByCountryId={getStatsByCountryId}
        getStatsByLocationId={getStatsByLocationId}
        getStatsByNodeId={getStatsByNodeId}
      />
      <Toolbar />
      <Globe />
    </div>
  );
}

export default App;

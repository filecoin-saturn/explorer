import "./index.css";

import { useEffect, useState } from "react";
import classNames from "classnames";
import {
  NavBarEntity,
  HoverEntity,
  EntityType,
  World,
} from "../../contexts/AppContext";
import useContinents from "../../hooks/useContinents";
import useAppContext from "../../hooks/useAppContext";

import Breadcrumb from "../Breadcrumb";
import useCountries from "../../hooks/useCountries";
import List from "../List";
import Stat from "../Stat";
import BarChart from "../BarChart/BarChart";
import { Node } from "../../hooks/useNodes";
import { Location } from "../../hooks/useLocations";
import { LocationStat } from "../../hooks/useStats";

type NavbarProps = {
  nodes: Map<string, Node>;
  locations: Location[];
  globalStats: LocationStat | undefined;
  getStatsByContinentId: (query: string) => LocationStat | undefined;
  getStatsByCountryId: (query: string) => LocationStat | undefined;
  getStatsByLocationId: (query: string) => LocationStat | undefined;
  getStatsByNodeId: (query: string) => LocationStat | undefined;
  getNodesByCountryId: (query: string) => Node[];
  getNodesByLocationId: (query: string) => Node[];
  getLocationByCountryId: (query: string) => Location[];
};

export const Navbar = ({
  nodes,
  locations,
  globalStats,
  getStatsByContinentId,
  getStatsByCountryId,
  getStatsByLocationId,
  getStatsByNodeId,
  getNodesByCountryId,
  getNodesByLocationId,
  getLocationByCountryId,
}: NavbarProps) => {
  const { continents } = useContinents();
  const { getCountriesByContinentId } = useCountries();

  const appState = useAppContext();
  const [breadcrumbs, setBreadcrumbs] = useState<NavBarEntity[]>([
    { name: "World", type: EntityType.world } as World,
  ]);
  const [active, setActive] = useState(false);
  const className = classNames({ Navbar: true, active });

  const toggleNavbar = () => {
    setActive(!active);
  };

  const selectEntity = (item: NavBarEntity) => () => {
    appState.setNavbarEntity(item);
    setBreadcrumbs([...breadcrumbs, item]);
  };

  useEffect(() => {
    appState.setNavbarEntity(breadcrumbs[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearSelectedEntity =
    (breadcrumb: NavBarEntity, index: number) => () => {
      if (breadcrumb?.name === appState.navbarEntity?.name) {
        return;
      }

      setBreadcrumbs(breadcrumbs.slice(0, index + 1));
      appState.setNavbarEntity(breadcrumb);
    };

  const hoverStart = (item: HoverEntity) => () => {
    appState.setHoverEntity(item);
  };

  const hoverEnd = () => {
    appState.setHoverEntity(undefined);
  };

  let list;
  let entityStats;
  switch (appState.navbarEntity?.type) {
    case EntityType.continent:
      list = getCountriesByContinentId(appState.navbarEntity.id);
      entityStats = getStatsByContinentId(appState.navbarEntity.id);
      break;
    case EntityType.country:
      list = getLocationByCountryId(appState.navbarEntity.id);
      entityStats = getStatsByCountryId(appState.navbarEntity.id);
      break;
    case EntityType.location:
      list = getNodesByLocationId(appState.navbarEntity.id);
      entityStats = getStatsByLocationId(appState.navbarEntity.id);
      break;
    case EntityType.node:
      list = getNodesByLocationId(appState.navbarEntity.geoloc.city);
      // entityStats = getStatsByLocationId(appState.navbarEntity.id);
      break;
    default:
      list = continents;
      entityStats = globalStats;
      break;
  }

  if (!appState.navbarEntity) return null;

  return (
    <nav className={className}>
      <div className="Navbar-breadcrumbs">
        {breadcrumbs.reverse().map((breadcrumb, index) => {
          const active = index === breadcrumbs.length - 1;
          return (
            <Breadcrumb
              entity={breadcrumb}
              onClick={clearSelectedEntity(breadcrumb, index)}
              active={active}
            />
          );
        })}
      </div>
      <div className="Navbar-content">
        <List
          list={list}
          entity={appState.navbarEntity}
          stats={entityStats}
          toggleNavbar={toggleNavbar}
          onSelect={selectEntity}
          hoverEnd={hoverEnd}
          hoverStart={hoverStart}
          getStatsByContinentId={getStatsByContinentId}
          getStatsByCountryId={getStatsByCountryId}
          getStatsByLocationId={getStatsByLocationId}
          getStatsByNodeId={getStatsByNodeId}
        />
      </div>
      <div className="Navbar-overview">
        <div className="Navbar-breadcrumb">
          <Breadcrumb entity={breadcrumbs[breadcrumbs.length - 1]} active />
        </div>
        <div className="Navbar-regionStats" onClick={toggleNavbar}>
          <Stat
            icon="nodes-green"
            value={entityStats?.numberOfNodes}
            label="NODES"
          />
          <Stat
            icon="ttfb"
            value={entityStats?.avgTTFB}
            units="ms"
            label="Avg TTFB"
          />
          <Stat
            icon="fil"
            units="FIL"
            value={entityStats?.estimatedEarnings["7d"]}
            label="Earnings"
          />
          <Stat
            icon="space"
            value={entityStats?.bandwidthServed["7d"]}
            units="GB"
            label="Bandwidth"
          />
          <Stat
            icon="retrievals"
            value={entityStats?.retrievals["7d"]}
            label="Retrievals"
          />
          {/* <div className="Navbar-chart">
            <BarChart
              dataset={[
                { date: "01/02/2023", earnings: 1 },
                { date: "02/02/2023", earnings: 31 },
                { date: "03/02/2023", earnings: 54 },
                { date: "04/02/2023", earnings: 3 },
                { date: "05/02/2023", earnings: 22 },
                { date: "06/02/2023", earnings: 11 },
                { date: "07/02/2023", earnings: 9 },
                { date: "08/02/2023", earnings: 9 },
                { date: "09/02/2023", earnings: 9 },
                { date: "10/02/2023", earnings: 40 },
                { date: "11/02/2023", earnings: 40 },
                { date: "12/02/2023", earnings: 40 },
                { date: "13/02/2023", earnings: 40 },
              ]}
            />
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

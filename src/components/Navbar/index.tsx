import "./index.css";

import { useEffect, useState } from "react";
import { useMap } from "react-map-gl";
import classNames from "classnames";

import {
  NavBarEntity,
  HoverEntity,
  EntityType,
  World,
} from "../../contexts/AppContext";
import useContinents, { Continent } from "../../hooks/useContinents";
import useAppContext from "../../hooks/useAppContext";

import Breadcrumb from "../Breadcrumb";
import useCountries, { Country } from "../../hooks/useCountries";
import List from "../List";
import Stat from "../Stat";
import useNodes, { Node } from "../../hooks/useNodes";
import useLocations, { Location } from "../../hooks/useLocations";
import { useStats } from "../../hooks/useStats";
import Icon from "../Icon";

const worldEntity = { name: "World", type: EntityType.world } as World;

export const Navbar = () => {
  const { map } = useMap();
  const { continents } = useContinents();
  const { countries, getCountriesByContinentId } = useCountries();
  const { getLocationByCountryId } = useLocations();
  const { getNodesByLocationId } = useNodes();
  const {
    getGlobalStats,
    getStatsByContinentId,
    getStatsByLocationId,
    getStatsByCountryId,
    getStatsByNodeId,
  } = useStats();

  const appState = useAppContext();
  const [breadcrumbs, setBreadcrumbs] = useState<NavBarEntity[]>([worldEntity]);
  const [active, setActive] = useState(false);
  const className = classNames("Navbar", {
    active,
    expanded: breadcrumbs.length > 1,
  });

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

  useEffect(() => {
    const onMapClick = (event: any) => {
      if (!event.features?.length) return;

      const [feature] = event.features;
      const country = countries.find(
        (country) => country.id === feature.properties?.iso_3166_1
      );
      const continent = continents.find((continent) =>
        country?.continentId.includes(continent.id)
      );

      if (appState.navbarEntity?.id === country?.id) return;

      if (appState.navbarEntity?.type === EntityType.world) {
        setBreadcrumbs([worldEntity, continent]);
        appState.setNavbarEntity(continent);
      } else {
        setBreadcrumbs([worldEntity, continent, country]);
        appState.setNavbarEntity(country);
      }
    };

    map?.on("click", "boundaries-fill", onMapClick);

    return () => {
      map?.off("click", onMapClick);
    };
  }, [map, countries, continents, appState]);

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

  let list: Continent[] | Country[] | Location[] | Node[] | [];
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
      list = [];
      entityStats = getStatsByNodeId(appState.navbarEntity.id);
      break;
    default:
      list = continents;
      entityStats = getGlobalStats();
      break;
  }

  if (!appState.navbarEntity) return null;

  return (
    <nav className={className}>
      <div className="Navbar-breadcrumbs">
        {breadcrumbs.map((breadcrumb, index) => {
          const active = index === breadcrumbs.length - 1;

          return (
            <Breadcrumb
              key={breadcrumb?.name}
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
        />
      </div>
      <button className="Navbar-button" onClick={toggleNavbar}>
        <Icon name="arrow-up" className="Navbar-arrowUp" />
        <Icon name="arrow-down" className="Navbar-arrowDown" />
      </button>
      <div className="Navbar-overview">
        <div className="Navbar-breadcrumb">
          <Breadcrumb entity={breadcrumbs[breadcrumbs.length - 1]} active />
        </div>
        <div className="Navbar-regionStats" onClick={toggleNavbar}>
          <div className="Navbar-regionStatsGrid">
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
          </div>
          <div className="Stat-highlight">
            <Stat
              highlight
              icon="fil"
              units="FIL"
              value={entityStats?.estimatedEarnings["7d"]}
              label="Earnings"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

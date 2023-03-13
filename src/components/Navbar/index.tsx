import "./index.css";

import { useState } from "react";
import classNames from "classnames";
import {
  NavBarEntity,
  HoverEntity,
  EntityType,
} from "../../contexts/AppContext";
import useContinents from "../../hooks/useContinents";
import useAppContext from "../../hooks/useAppContext";

import Breadcrumb from "../Breadcrumb";
import useCountries from "../../hooks/useCountries";
import useLocations from "../../hooks/useLocations";
import useNodes from "../../hooks/useNodes";
import List from "../List";
import Stat from "../Stat";
import BarChart from "../BarChart/BarChart";

export const Navbar = () => {
  const { continents } = useContinents();
  const { getCountriesByContinentId } = useCountries();
  const { getLocationByCountryId } = useLocations();
  const { getByCountryId } = useNodes();

  const appState = useAppContext();
  const [breadcrumbs, setBreadcrumbs] = useState([{ name: "World" }]);
  const [active, setActive] = useState(false);
  const className = classNames({ Navbar: true, active });

  const toggleNavbar = () => {
    setActive(!active);
  };

  const selectEntity = (item: NavBarEntity) => () => {
    appState.setNavbarEntity(item);
    //@ts-ignore
    setBreadcrumbs([...breadcrumbs, item]);
  };

  const clearSelectedEntity = (breadcrumb: any, index: number) => () => {
    if (breadcrumb.name === appState.navbarEntity?.name) {
      return;
    }

    setBreadcrumbs(breadcrumbs.slice(0, index + 1));
    appState.setNavbarEntity(breadcrumb as NavBarEntity);
  };

  const hoverStart = (item: HoverEntity) => () => {
    appState.setHoverEntity(item);
  };

  const hoverEnd = () => {
    appState.setHoverEntity(undefined);
  };

  let list;
  switch (appState.navbarEntity?.type) {
    case EntityType.continent:
      list = getCountriesByContinentId(appState.navbarEntity.id);
      break;
    case EntityType.country:
      list = getLocationByCountryId(appState.navbarEntity.id);
      break;
    case EntityType.location:
      list = getByCountryId(appState.navbarEntity.id);
      break;
    default:
      list = continents;
      break;
  }

  console.log(appState.navbarEntity);

  return (
    <nav className={className}>
      <div className="Navbar-breadcrumbs">
        {breadcrumbs.reverse().map((breadcrumb, index) => {
          const active = index === breadcrumbs.length - 1;
          return (
            <Breadcrumb
              name={breadcrumb.name}
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
          stats={[]}
          toggleNavbar={toggleNavbar}
          onSelect={selectEntity}
          hoverEnd={hoverEnd}
          hoverStart={hoverStart}
        />
      </div>
      <div className="Navbar-overview">
        <div className="Navbar-breadcrumb">
          <Breadcrumb name={breadcrumbs[breadcrumbs.length - 1].name} active />
        </div>
        <div className="Navbar-regionStats" onClick={toggleNavbar}>
          <Stat icon="nodes-green" value={2324} label="NODES" />
          <Stat icon="ttfb" value={194} units="ms" label="Avg TTFB" />
          <Stat icon="fil" value={124.35} label="$87.08" />
          <Stat icon="space" value={1450} units="GB" label="Bandwidth" />
          <Stat icon="retrievals" value={1244} label="Retrievals" />
          <div className="Navbar-chart">
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

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

export const Navbar = () => {
  const { continents } = useContinents();
  const { getCountriesByContinentId } = useCountries();
  const { getLocationByCountryId } = useLocations();
  const { getByCountryId } = useNodes();

  const appState = useAppContext();
  const [breadcrumbs, setBreadcrumbs] = useState([{ name: "World" }]);
  const [active, setActive] = useState(true);
  const className = classNames({ Navbar: true, active });

  const toggleNavbar = () => {
    // setActive(!active);
  };

  const selectEntity = (item: NavBarEntity) => () => {
    appState.setNavbarEntity(item);
    //@ts-ignore
    setBreadcrumbs([...breadcrumbs, item]);
  };

  const clearSelectedEntity = (breadcrumb: any) => () => {
    if (breadcrumb.name === appState.navbarEntity?.name) {
      return;
    }
    if (breadcrumbs.length > 1) {
      setBreadcrumbs(breadcrumbs.slice(0, breadcrumbs.length - 1));
    }

    appState.setNavbarEntity(
      breadcrumbs[breadcrumbs.length - 1] as NavBarEntity
    );
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

  return (
    <nav className={className} onClick={toggleNavbar}>
      <div className="Navbar-breadcrumbs">
        {breadcrumbs.map((breadcrumb, index) => {
          const active = index === breadcrumbs.length - 1;
          return (
            <Breadcrumb
              name={breadcrumb.name}
              onClick={clearSelectedEntity(breadcrumb)}
              active={active}
            />
          );
        })}
      </div>
      <div className="Navbar-content">
        <List list={list} name={breadcrumbs[0].name} stats={[]}></List>
      </div>
    </nav>
  );
};

export default Navbar;

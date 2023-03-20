import "./index.css";

import { useEffect, useState } from "react";
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

export const Navbar = () => {
  const { continents } = useContinents();
  const { getCountriesByContinentId } = useCountries();
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
        {breadcrumbs.reverse().map((breadcrumb, index) => {
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
        {!active && (
          <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
          >
            <g filter="url(#a)" transform="matrix(1 0 0 -1 0 40)">
              <circle
                cx="20"
                cy="20"
                r="20"
                fill="url(#b)"
                fill-opacity=".24"
              />
              <circle cx="20" cy="20" r="19.5" stroke="url(#c)" />
            </g>
            <path
              d="M12.7 20.7c.183.183.417.28.7.288a.91.91 0 0 0 .7-.263l4.9-4.9V27c0 .283.096.521.288.713A.967.967 0 0 0 20 28a.97.97 0 0 0 .713-.287A.97.97 0 0 0 21 27V15.825l4.9 4.9a.91.91 0 0 0 .7.263.994.994 0 0 0 .7-.288.948.948 0 0 0 .275-.7.948.948 0 0 0-.275-.7l-6.6-6.6a.682.682 0 0 0-.312-.213 1.232 1.232 0 0 0-.388-.062c-.133 0-.258.02-.375.062a.883.883 0 0 0-.325.213l-6.6 6.6a.948.948 0 0 0-.275.7c0 .283.092.517.275.7Z"
              fill="#10FFD4"
            />
            <defs>
              <linearGradient
                id="b"
                x1="39.41"
                y1="37.611"
                x2="-3.989"
                y2="16.172"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#06F" stop-opacity=".9" />
                <stop offset=".521" stop-color="#0085FF" stop-opacity=".79" />
                <stop offset="1" stop-color="#00A3FF" stop-opacity=".86" />
              </linearGradient>
              <linearGradient
                id="c"
                x1=".197"
                y1="-.619"
                x2="33.756"
                y2="17.455"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#9DE2FF" stop-opacity=".64" />
                <stop offset="1" stop-color="#D9FFF8" stop-opacity="0" />
              </linearGradient>
              <filter
                id="a"
                x="-32"
                y="-32"
                width="104"
                height="104"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="16" />
                <feComposite
                  in2="SourceAlpha"
                  operator="in"
                  result="effect1_backgroundBlur_675_55"
                />
                <feBlend
                  in="SourceGraphic"
                  in2="effect1_backgroundBlur_675_55"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        )}
        {active && (
          <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
          >
            <g filter="url(#a)">
              <circle
                cx="20"
                cy="20"
                r="20"
                fill="url(#b)"
                fill-opacity=".24"
              />
              <circle cx="20" cy="20" r="19.5" stroke="url(#c)" />
            </g>
            <path
              d="M12.7 19.3a.994.994 0 0 1 .7-.288.91.91 0 0 1 .7.263l4.9 4.9V13c0-.283.096-.521.288-.713A.967.967 0 0 1 20 12a.97.97 0 0 1 .713.287A.97.97 0 0 1 21 13v11.175l4.9-4.9a.91.91 0 0 1 .7-.263.994.994 0 0 1 .7.288.948.948 0 0 1 .275.7.948.948 0 0 1-.275.7l-6.6 6.6a.682.682 0 0 1-.312.213 1.232 1.232 0 0 1-.388.062c-.133 0-.258-.02-.375-.062a.883.883 0 0 1-.325-.213l-6.6-6.6a.948.948 0 0 1-.275-.7c0-.283.092-.517.275-.7Z"
              fill="#10FFD4"
            />
            <defs>
              <linearGradient
                id="b"
                x1="39.41"
                y1="37.611"
                x2="-3.989"
                y2="16.172"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#06F" stop-opacity=".9" />
                <stop offset=".521" stop-color="#0085FF" stop-opacity=".79" />
                <stop offset="1" stop-color="#00A3FF" stop-opacity=".86" />
              </linearGradient>
              <linearGradient
                id="c"
                x1=".197"
                y1="-.619"
                x2="33.756"
                y2="17.455"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#9DE2FF" stop-opacity=".64" />
                <stop offset="1" stop-color="#D9FFF8" stop-opacity="0" />
              </linearGradient>
              <filter
                id="a"
                x="-32"
                y="-32"
                width="104"
                height="104"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="16" />
                <feComposite
                  in2="SourceAlpha"
                  operator="in"
                  result="effect1_backgroundBlur_675_64"
                />
                <feBlend
                  in="SourceGraphic"
                  in2="effect1_backgroundBlur_675_64"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        )}
      </button>
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

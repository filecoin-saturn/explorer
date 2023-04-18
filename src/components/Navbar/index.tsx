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
  const { nodes } = useNodes();
  const { continents, getContinentById } = useContinents();
  const { countries, getCountriesByContinentId, getCountryById } =
    useCountries();
  const { getLocationByCountryId, getLocationById } = useLocations();
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
  const [isReady, setIsReady] = useState<boolean>(false);
  const className = classNames("Navbar", {
    active,
    isReady,
    expanded: breadcrumbs.length > 1,
  });

  const navbarBtnClassName = classNames("Navbar-button", { isReady, active });

  const toggleNavbar = () => {
    setActive(!active);
  };

  const selectEntity = (item: NavBarEntity) => () => {
    appState.setNavbarEntity(item);
    setBreadcrumbs([...breadcrumbs, item]);
  };

  useEffect(() => {
    if (nodes.length === 0 || isReady) return;
    setIsReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes]);

  useEffect(() => {
    appState.setNavbarEntity(breadcrumbs[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let country;
    let location;
    switch (appState.navbarEntity?.type) {
      case EntityType.continent:
        setBreadcrumbs([worldEntity, appState.navbarEntity]);
        return;
      case EntityType.country:
        setBreadcrumbs([
          worldEntity,
          getContinentById(appState.navbarEntity.continentId[0]),
          appState.navbarEntity,
        ]);
        return;
      case EntityType.location:
        country = getCountryById(appState.navbarEntity.countryId);
        if (!country) return;
        setBreadcrumbs([
          worldEntity,
          getContinentById(country.continentId[0]),
          country,
          appState.navbarEntity,
        ]);
        return;
      case EntityType.node:
        location = getLocationById(appState.navbarEntity.geoloc.city);
        if (!location) break;
        country = getCountryById(location.countryId);
        if (!country) return;

        setBreadcrumbs([
          worldEntity,
          getContinentById(country.continentId[0]),
          country,
          location,
        ]);
        return;
      default:
        setBreadcrumbs([worldEntity]);
        return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState]);

  const [highlightedNode, setHighlightedNode] = useState<string | undefined>();
  useEffect(() => {
    if (!appState.navbarEntity || !map) return;
    if (appState.navbarEntity?.type !== EntityType.location) {
      if (highlightedNode) {
        map?.setFeatureState(
          {
            source: "node-location",
            id: highlightedNode,
          },
          { highlight: false }
        );
        setHighlightedNode(undefined);
      }
      return;
    }

    const candidates = map
      .querySourceFeatures("node-location")
      .filter((e: any) => {
        return (
          appState.navbarEntity && appState.navbarEntity.id === e.properties.id
        );
      });

    if (candidates) {
      const nextHighlightedNode = candidates[0].id as string;
      if (nextHighlightedNode === highlightedNode) return;

      if (highlightedNode !== undefined) {
        map?.setFeatureState(
          {
            source: "node-location",
            id: highlightedNode,
          },
          { highlight: false }
        );
      }
      setHighlightedNode(nextHighlightedNode);
      map?.setFeatureState(
        {
          source: "node-location",
          id: nextHighlightedNode,
        },
        { highlight: true }
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState.navbarEntity, map]);

  useEffect(() => {
    const onBoundariesClick = (feature: any) => {
      const country = countries.find(
        (country) => country.id === feature.properties?.ISO_A2
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

    const onClusterClick = (feature: any, clusterSource: any) => {
      const clusterId = feature.id;
      const pointCount = feature.properties.point_count;

      if (
        feature.layer.id === "cluster-count-unclustered" ||
        feature.layer.id === "circle-background-unclustered"
      ) {
        const targetLocation = getLocationById(feature.properties.city);
        if (targetLocation) appState.setNavbarEntity(targetLocation);
        return;
      }
      clusterSource.getClusterLeaves(
        clusterId,
        pointCount,
        0,
        (error: any, features: any) => {
          const targetLocation = getLocationById(features[0].properties.city);
          if (targetLocation) appState.setNavbarEntity(targetLocation);
        }
      );
    };

    const onMapClick = (event: any) => {
      event.originalEvent.preventDefault();
      if (!event.features?.length) return;
      const zoomLevel = event.target.getZoom();
      const nodeFeature = event.features.find(
        (feature: any) => feature.source === "nodes"
      );
      const boundaryFeature = event.features.find(
        (feature: any) => feature.source === "countries-simplification-data"
      );

      if (nodeFeature && zoomLevel > 3.4) {
        onClusterClick(nodeFeature, event.target.getSource("nodes"));
      } else {
        onBoundariesClick(boundaryFeature);
      }
    };

    map?.on(
      "click",
      [
        "boundaries-fill",
        "cluster-count",
        "cluster-count-unclustered",
        "circle-background",
        "circle-background-unclustered",
      ],
      onMapClick
    );

    return () => {
      map?.off("click", onMapClick);
    };
  }, [map, countries, continents, appState, getLocationById]);

  useEffect(() => {
    const navbarEntity = appState.navbarEntity;
    if (!navbarEntity) return;
    const flyOptions = { essential: true, duration: 2000 };
    const item =
      navbarEntity?.type !== EntityType.node
        ? navbarEntity
        : getLocationById(navbarEntity.geoloc.city);

    if (item?.type === EntityType.world && nodes.length > 0) {
      map?.flyTo({
        zoom: 2,
        ...flyOptions,
      });
    }

    if (item?.type === EntityType.continent) {
      map?.flyTo({
        center: item.center,
        zoom: 3.5,
        ...flyOptions,
      });
    }

    if (item?.type === EntityType.country) {
      map?.flyTo({
        center: item.center,
        zoom: 5,
        ...flyOptions,
        minZoom: 5.5,
      });
    }

    if (item?.type === EntityType.location) {
      map?.flyTo({
        center: item.center,
        zoom: 8,
        ...flyOptions,
        minZoom: 7.8,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState.navbarEntity]);

  const clearSelectedEntity =
    (breadcrumb: NavBarEntity, index: number) => () => {
      if (breadcrumb?.id === appState.navbarEntity?.id) {
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
      list = getNodesByLocationId(appState.navbarEntity.geoloc.city);
      entityStats = getStatsByNodeId(appState.navbarEntity.id);
      break;
    default:
      list = continents;
      entityStats = getGlobalStats();
      break;
  }

  if (!appState.navbarEntity) return null;

  const computeHeadEntity = () => {
    const navbarEntity = appState.navbarEntity;
    const item =
      navbarEntity?.type !== EntityType.node
        ? navbarEntity
        : getLocationById(navbarEntity.geoloc.city);
    return item;
  };

  const computeSelectedNode = () => {
    return appState.navbarEntity?.type === EntityType.node
      ? appState.navbarEntity
      : undefined;
  };

  return (
    <>
      <button className={navbarBtnClassName} onClick={toggleNavbar}>
        <Icon name="arrow-up" className="Navbar-arrowUp" />
        <Icon name="arrow-down" className="Navbar-arrowDown" />
      </button>
      <nav className={className}>
        <div className="Navbar-breadcrumbs">
          {breadcrumbs.map((breadcrumb, index) => {
            const active = index === breadcrumbs.length - 1;

            return (
              <Breadcrumb
                key={`${breadcrumb?.id} + ${breadcrumb?.name}`}
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
            defaultSelectedNode={computeSelectedNode()}
            entity={computeHeadEntity()}
            stats={entityStats}
            toggleNavbar={toggleNavbar}
            onSelect={selectEntity}
            hoverEnd={hoverEnd}
            hoverStart={hoverStart}
          />
        </div>
        <div className="Navbar-overview">
          <div className="Navbar-breadcrumb">
            <Breadcrumb
              entity={breadcrumbs[breadcrumbs.length - 1]}
              active
              trim
            />
          </div>
          <div className="Navbar-regionStats" onClick={toggleNavbar}>
            <div className="Navbar-regionStatsGrid">
              <Stat
                icon="nodes-green"
                value={entityStats?.numberOfNodes}
                units="units"
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
                units="bytes"
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
                units="Fil"
                value={entityStats?.estimatedEarnings["7d"]}
                label="Earnings"
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

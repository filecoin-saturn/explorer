import { createContext, ReactElement, ReactNode, useState } from "react";
import { Continent } from "../hooks/useContinents";
import { Country } from "../hooks/useCountries";
import { Location } from "../hooks/useLocations";
import { Node } from "../hooks/useNodes";

export enum EntityType {
  "continent",
  "country",
  "location",
  "node",
  "world",
}

export type World = {
  id: string;
  name: string;
  type: EntityType.world;
};

export type NavBarEntity =
  | World
  | Continent
  | Country
  | Location
  | Node
  | undefined;
export type HoverEntity = Continent | Country | undefined;

export enum ViewMode {
  Cluster = "cluster",
  Heatmap = "heatmap",
  Density = "density",
}

type AppContextType = {
  navbarEntity: NavBarEntity;
  hoverEntity: HoverEntity;
  viewMode: ViewMode | undefined;
  setNavbarEntity: (entity: NavBarEntity) => void;
  setHoverEntity: (entity: HoverEntity) => void;
  toggleViewMode: () => void;
};

const initialValues = {
  navbarEntity: undefined,
  hoverEntity: undefined,
  viewMode: ViewMode.Density,
  setNavbarEntity: () => {},
  setHoverEntity: () => {},
  toggleViewMode: () => {},
};

const AppContext = createContext<AppContextType>(initialValues);

export const AppContextProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [navbarEntity, setNavbarEntity] = useState<NavBarEntity>(undefined);
  const [hoverEntity, setHoverEntity] = useState<HoverEntity>(undefined);
  const [currentViewMode, setCurrentViewMode] = useState<ViewMode>(
    ViewMode.Cluster
  );

  const toggleViewMode = () => {
    if (currentViewMode === ViewMode.Cluster) {
      setCurrentViewMode(ViewMode.Heatmap);
    } else if (currentViewMode === ViewMode.Heatmap) {
      setCurrentViewMode(ViewMode.Cluster);
    }
  };
  const setCurrentHoverEntity = (entity: HoverEntity) => {
    if (entity !== hoverEntity) {
      setHoverEntity(entity);
    }
  };
  const setCurrentNavbarEntity = (entity: NavBarEntity) => {
    if (entity !== navbarEntity) {
      setNavbarEntity(entity);
    }
  };

  const value = {
    navbarEntity,
    hoverEntity,
    viewMode: currentViewMode,
    setNavbarEntity: setCurrentNavbarEntity,
    setHoverEntity: setCurrentHoverEntity,
    toggleViewMode,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;

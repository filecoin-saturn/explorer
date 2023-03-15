import { createContext, ReactElement, ReactNode, useState } from "react";
import { Node } from "../hooks/useNodes";
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
  setViewMode: (mode: ViewMode | undefined) => void;
};

const initialValues = {
  navbarEntity: undefined,
  hoverEntity: undefined,
  viewMode: ViewMode.Density,
  setNavbarEntity: () => {},
  setHoverEntity: () => {},
  setViewMode: () => {},
};

const AppContext = createContext<AppContextType>(initialValues);

export const AppContextProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [currentNavbarEntity, setCurrentNavbarEntity] =
    useState<NavBarEntity>(undefined);
  const [currentHoverEntity, setCurrentHoverEntity] =
    useState<HoverEntity>(undefined);
  const [currentViewMode, setCurrentViewMode] = useState<ViewMode | undefined>(
    ViewMode.Density
  );

  const value = {
    navbarEntity: currentNavbarEntity,
    hoverEntity: currentHoverEntity,
    viewMode: currentViewMode,
    setNavbarEntity: setCurrentNavbarEntity,
    setHoverEntity: setCurrentHoverEntity,
    setViewMode: setCurrentViewMode,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;

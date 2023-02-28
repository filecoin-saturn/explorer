import { createContext, useState } from 'react';
import { Continent } from '../hooks/useContinents';
import { Country } from '../hooks/useCountries';
import { Location } from '../hooks/useLocations';

type AppContextType = {
  navbarEntity: Continent | Country | Location | undefined, 
  hoverEntity: Continent | Country | undefined,
  viewMode: 'cluster' | 'heatmap' | undefined,
  setNavbarEntity: (entity: Continent | Country | Location | undefined) => void,
  setHoverEntity: (entity: Continent | Country | undefined) => void,
  setViewMode: (mode: 'cluster' | 'heatmap' | undefined) => void,
}

const initialValues = {
  navbarEntity: undefined,
  hoverEntity: undefined,
  viewMode: undefined,
  setNavbarEntity: () => {},
  setHoverEntity: () => {},
  setViewMode: () => {}
}

const AppContext = createContext<AppContextType | undefined>(initialValues);

export const AppContextProvider = ({ children }: { children: JSX.Element }): JSX.Element => {

  const [currentNavbarEntity, setCurrentNavbarEntity] = useState<AppContextType['navbarEntity']>(undefined)
  const [currentHoverEntity, setCurrentHoverEntity] = useState<AppContextType['hoverEntity']>(undefined)
  const [currentViewMode, setCurrentViewMode] = useState<AppContextType['viewMode']>(undefined)

  const value = {
    navbarEntity: currentNavbarEntity,
    hoverEntity: currentHoverEntity,
    viewMode: currentViewMode,
    setNavbarEntity: setCurrentNavbarEntity,
    setHoverEntity: setCurrentHoverEntity,
    setViewMode: setCurrentViewMode
  }
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
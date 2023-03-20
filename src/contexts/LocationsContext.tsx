import { createContext, ReactElement, ReactNode, useState } from "react";
import { Location } from "../hooks/useLocations";

type LocationsContextType = {
  locations: Location[] | [];
  setLocations: (locations: Location[] | []) => void;
};

const initialValues = {
  locations: [],
  setLocations: () => {},
};

const LocationsContext = createContext<LocationsContextType>(initialValues);
export const LocationsContextProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [locations, setLocations] = useState<Location[] | []>([]);

  const value = {
    locations,

    setLocations,
  };
  return (
    <LocationsContext.Provider value={value}>
      {children}
    </LocationsContext.Provider>
  );
};

export default LocationsContext;

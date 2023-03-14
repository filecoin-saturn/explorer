import { useContext } from "react";
import AppContext from "../contexts/AppContext";

const useAppContext = () => {
  const appState = useContext(AppContext);

  return appState;
};

export default useAppContext;

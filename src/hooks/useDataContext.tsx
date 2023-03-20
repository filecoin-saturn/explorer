import { useContext } from "react";
import DataContext from "../contexts/DataContext";

const useDataContext = () => {
  const dataState = useContext(DataContext);

  return dataState;
};

export default useDataContext;

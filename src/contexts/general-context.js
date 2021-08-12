import { createContext, useReducer, useContext } from "react";
import { generalReducer } from "../reducer/general-reducer";

const GeneralContext = createContext();

const initialState = {
  videos: [],
  videoFilter: "all",
  hamMenu: true,
  loader: false,
  views: 0
};

export const GeneralContextProvider = ({ children }) => {
  const [state, dispatchgeneral] = useReducer(generalReducer, initialState);
  console.log(dispatchgeneral);
  return (
    <GeneralContext.Provider value={{ ...state,  dispatchgeneral }}>
      {children}
    </GeneralContext.Provider>
  );
};

export const useGeneralContext = () => {
  return useContext(GeneralContext);
};
import { createContext, useReducer, useContext } from "react";
import { watchListReducer } from "../reducer/watchlist-reducer";
const WatchListContext = createContext();

const initialState = {
  watchList: []
};

export const WatchListProvider = ({ children }) => {
  const [state, dispatchwatchlist] = useReducer(watchListReducer, initialState);
  return (
    <WatchListContext.Provider value={{ ...state, dispatchwatchlist }}>
      {children}
    </WatchListContext.Provider>
  );
};

export const useWatchList = () => {
  return useContext(WatchListContext);
};
import { createContext, useContext, useReducer } from "react";
import { likeReducer } from "../reducer/like-reducer";
const LikeContext = createContext();

const initialState = {
  likeList: []
};

export const LikeProvider = ({ children }) => {
  const [state, dispatchlike] = useReducer(likeReducer, initialState);
  return (
    <LikeContext.Provider value={{ ...state, dispatchlike }}>
      {children}
    </LikeContext.Provider>
  );
};

export const useLike = () => {
  return useContext(LikeContext);
};
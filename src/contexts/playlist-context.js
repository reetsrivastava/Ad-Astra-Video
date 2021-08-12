import { createContext, useContext, useReducer } from "react";
import { playlistReducer } from "../reducer/playlist-reducer";
const PlaylistContext = createContext();

const initialState = {
  playList: [],
  showPlaylistModal: {
    status: false,
    videoData: "",
  },
  inputPlaylistBox: false,
};

export const PlaylistProvider = ({ children }) => {
  const [state, dispatchplaylist] = useReducer(playlistReducer, initialState);
  return (
    <PlaylistContext.Provider value={{ ...state, dispatchplaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => {
  return useContext(PlaylistContext);
};
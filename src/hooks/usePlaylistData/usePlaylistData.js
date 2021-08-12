import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "../../contexts/auth-context";
import { useGeneralContext } from "../../contexts/general-context";
import { usePlaylist } from "../../contexts/playlist-context";

export const usePlaylistData = () => {
  const { dispatchplaylist } = usePlaylist();
  const { dispatchgeneral } = useGeneralContext();
  const { token } = useAuth();
  const getData = async () => {
    dispatchgeneral({ type: "SET_LOADER" });
    try {
      const {
        status,
        data: {
          success,
          playlistData: { playlist },
        },
      } = await axios.get(
        `https://ThornyConsciousAstronomy.reetrs.repl.co/playlists`
      );
      if (status === 200 && success === true) {
        dispatchplaylist({ type: "SAVE_TO_PLAYLIST", payload: playlist });
      }
    } catch (error) {
      if (error?.response.status) {
        console.log("Playlist not created yet");
      }
    } finally {
      dispatchgeneral({ type: "SET_LOADER" });
    }
  };

  useEffect(() => {
    if (token) {
      getData();
    }
  }, [token]);
};
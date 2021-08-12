import axios from "axios";
import { toastMessages } from "../../utils/toastMessages";
export const deletePlaylist = async (listId, dispatchplaylist, token) => {
  try {
    const {
      status,
      data: {
        success,
        playlistData: { playlist },
      },
    } = await axios.delete(
      `https://ThornyConsciousAstronomy.reetrs.repl.co/playlists/${listId}`
    );
    if (status === 200 && success === true) {
      dispatchplaylist({ type: "DELETE_PLAYLIST", payload: playlist });
      toastMessages("Playlist Deleated");
    }
  } catch (error) {
    console.log(error.stack);
    console.log(error.message);
  }
};
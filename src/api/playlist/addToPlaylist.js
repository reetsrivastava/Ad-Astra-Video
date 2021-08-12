import axios from "axios";
import { toastMessages } from "../../utils/toastMessages";

export const addToPlaylist = async (
  listId,
  dispatchplaylist,
  videoData,
  token
) => {
  try {
    const {
      status,
      data: {
        success,
        playlistData: { playlist },
      },
    } = await axios.post(
      `https://ThornyConsciousAstronomy.reetrs.repl.co/playlists/${listId}`,
      {
        videodata: videoData,
      }
    );
    if (status === 201 && success === true) {
      dispatchplaylist({
        type: "SAVE_TO_PLAYLIST",
        payload: playlist,
      });
      toastMessages("Video Added to Playlist");
    }
  } catch (error) {
    console.log(error.message);
    console.log(error.stack);
  }
};
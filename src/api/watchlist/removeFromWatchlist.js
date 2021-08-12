import axios from "axios";
import { toastMessages } from "../../utils/toastMessages";

export const removeFromWatchlist = async (
  videoId,
  dispatchwatchlist,
  token
) => {
  try {
    const {
      status,
      data: { success },
    } = await axios.delete(
      `https://ThornyConsciousAstronomy.reetrs.repl.co/watchlist/${videoId}`
    );
    if (status === 200 && success === true) {
      dispatchwatchlist({ type: "REMOVE_FROM_WATCHLIST", payload: videoId });
      toastMessages("Video Removed from Watch List");
    }
  } catch (error) {
    console.log(error.stack);
    console.log(error.message);
  }
};
import axios from "axios";
import { toastMessages } from "../../utils/toastMessages";

export const removeFromLikes = async (videoId, dispatchlikes, token) => {
  try {
    const {
      status,
      data: { success },
    } = await axios.delete(
      `https://ThornyConsciousAstronomy.reetrs.repl.co/likes/${videoId}`
    );
    if (status === 200 && success === true) {
      dispatchlikes({ type: "REMOVE_FROM_LIKES", payload: videoId });
      toastMessages("Video Removed from Likes");
    }
  } catch (error) {
    console.log(error.stack);
    console.log(error.message);
  }
};
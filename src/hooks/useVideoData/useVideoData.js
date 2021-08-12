import axios from "axios";
import { useEffect } from "react";
import { useGeneralContext } from "../../contexts/general-context";

export const useVideoData = () => {
  const { videos, dispatchgeneral } = useGeneralContext();

  const getData = async () => {
    dispatchgeneral({ type: "SET_LOADER" });
    try {
      const {
        status,
        data: { success, videodata },
      } = await axios.get("https://ThornyConsciousAstronomy.reetrs.repl.co/videos");
      if (status === 200 && success === true) {
        dispatchgeneral({
          type: "SET_INITIAL_DATA",
          payload: videodata,
        });
      }
    } catch (error) {
      console.log(error.message);
      console.log(error.stack);
    } finally {
      dispatchgeneral({ type: "SET_LOADER" });
    }
  };

  useEffect(() => {
    if (videos.length === 0) {
      getData();
    }
  }, []);
};
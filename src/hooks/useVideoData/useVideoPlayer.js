import axios from "axios";
import { useEffect, useState } from "react";
import { useGeneralContext } from "../../contexts/general-context";

export const useVideoPlayer = (videoId) => {
  const { dispatchgeneral } = useGeneralContext();
  const [videoData, setvideoData] = useState();
  const getData = async () => {
    dispatchgeneral({ type: "SET_LOADER" });
    try {
      const {
        status,
        data: { videodata, success },
      } = await axios.get(
        `https://ThornyConsciousAstronomy.reetrs.repl.co/videos/${videoId}`
      );

      if (status === 200 && success === true) {
        setvideoData(videodata);
      }
    } catch (error) {
      console.log(error.message);
      console.log(error.stack);
    } finally {
      dispatchgeneral({ type: "SET_LOADER" });
    }
  };

  useEffect(() => {
    getData();
  }, [videoId]);
  return videoData;
};
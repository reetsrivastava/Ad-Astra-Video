import { useEffect } from "react";
import { useGeneralContext } from "../contexts/general-context";
import { useLike } from "../contexts/like-context";
import { usePlaylist } from "../contexts/playlist-context";
import { useWatchList } from "../contexts/watchlist-context";

export const useLocalStorage = () => {
  const { dispatchplaylist } = usePlaylist();
  const { dispatchgeneral } = useGeneralContext();
  const { dispatchwatchlist } = useWatchList();
  const { dispatchlike } = useLike();
  useEffect(() => {
    const response = JSON.parse(localStorage.getItem("playlistid"));
    dispatchplaylist({ type: "SAVE_PLAYLIST_ID", payload: response });
  }, []);

  useEffect(() => {
    const response = JSON.parse(localStorage.getItem("historyid"));
    dispatchgeneral({ type: "SAVE_HISTORY_ID", payload: response });
  }, []);

  useEffect(() => {
    const response = JSON.parse(localStorage.getItem("watchid"));
    dispatchwatchlist({ type: "SAVE_WATCHLIST_ID", payload: response });
  }, []);

  useEffect(() => {
    const response = JSON.parse(localStorage.getItem("likeid"));
    dispatchlike({ type: "SAVE_LIKES_ID", payload: response });
  }, []);
};
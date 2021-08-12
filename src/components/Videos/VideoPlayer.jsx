import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import ReactPlayer from "react-player";
import { usePlaylist } from "../../contexts/playlist-context";
import { useLike } from "../../contexts/like-context";
import { useWatchList } from "../../contexts/watchlist-context";
import { useGeneralContext } from "../../contexts/general-context";
import { PlaylistModal } from "./PlaylistModal";
import { addToWatchlist } from "../../api/watchlist/addToWatchlist";
import { removeFromWatchlist } from "../../api/watchlist/removeFromWatchlist";
import { addToLikes } from "../../api/likes/addToLikes";
import { removeFromLikes } from "../../api/likes/removeFromLikes";
import { useVideoPlayer } from "../../hooks/useVideoData/useVideoPlayer";
import { useAuth } from "../../contexts/auth-context";
import "../../css/videoplayer.css"

export function VideoPlayer() {
    const { token } = useAuth();
    const { dispatchplaylist } = usePlaylist();
    const { likeList, dispatchlike } = useLike();
    const { watchList, dispatchwatchlist } = useWatchList();
    const { loader, dispatchgeneral } = useGeneralContext();
    const { id } = useParams();
    const videoData = useVideoPlayer(id);
    const navigate = useNavigate();
    const [views, setviews] = useState(0);

    useEffect(() => {
        dispatchgeneral({ type: "ADD_VIEWS", payload: 0 });
    },[dispatchgeneral]);

    const handleLikeHandler = (videoData) => {
        if(token) {
            if(likeList.some(item => item._id === id)) {
                removeFromLikes(videoData._id, dispatchlike, token)
            } else {
                addToLikes(videoData, dispatchlike, token)
            }
        } else {
            navigate("/login");
        }
    }

    const handleWatchlistHandler = (videoData) => {
        if(token) {
            if(watchList.some(item => item._id === id)) {
                removeFromWatchlist(videoData._id, dispatchwatchlist, token)
            } else {
                addToWatchlist(videoData, dispatchwatchlist, token)
            }
        } else {
            navigate("/login");
        }
    }

    const playlistModalHandler = () => {
        if(token) {
            dispatchplaylist({
                type: "SHOW_PLAYLIST_MODAL",
                payload: videoData
            });
        } else {
            navigate("/login");
        }
    }

    const watchListToggle = (itemid) => {
        if(watchList.some(item => item._id === itemid)) {
            return "watchlist-active";
        } else {
            return undefined;
        }
    }

    const likeListToggle = (itemid) => {
        if(likeList.some(item => item._id === itemid)) {
            return "likelist-active";
        } else {
            return undefined;
        }
    }

    const addViews = async (id, dispatchgeneral) => {
        try {
            const {
                status,
                data: { views }
            } = await axios.post("https://ThornyConsciousAstronomy.reetrs.repl.co/views", { videoid: id });
            if(status === 201) {
                setviews(views);
            }
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className="video-player-container">
            { loader && "Loading..." }
            { videoData && (
                <div className="player-box">
                    <div className="player">
                        <ReactPlayer 
                        className="react-player"
                        width="100%"
                        height="100%"
                        controls
                        onPlay={() => addViews(id, dispatchgeneral)}
                        url={`https://www.youtube.com/watch?v=${id}`} 
                        />
                    </div>
                    <div className="heading">
                        <p className="text">{videoData.name}</p>
                        <p className="category">{videoData.category}</p>
                    </div>
                    <div className="controls-wrapper">
                        
                        <div className="btn-controls">
                            <span className={`${watchListToggle(
                            videoData._id
                            )}`}
                            onClick={() => handleWatchlistHandler(videoData)}>
                                <i className="far fa-clock"></i> {watchListToggle(
                            videoData._id
                            ) ? "Watchlisted" : "Watch Later"}
                            </span>

                            <span className={`${likeListToggle(
                            videoData._id
                            )}`}
                            onClick={() => handleLikeHandler(videoData)}>
                                <i className="far fa-thumbs-up"></i> { likeListToggle(
                            videoData._id
                            ) ? "Unlike" : "Like"}
                            </span>

                            <span className="btn-playlist" onClick={playlistModalHandler}>
                                <i className="far fa-list-alt"></i> Save
                            </span>
                        </div>
                    </div>
                    <PlaylistModal />
                </div>
            ) }
        </div>
    )
}
import React from "react";
import { usePlaylist } from "../../contexts/playlist-context";
import { useParams, Link } from "react-router-dom";
import { PageHeading } from "../PageHeading";
import { thumbnail } from "../../utils/thumbnail";
import { useSinglelistData } from "../../hooks/usePlaylistData/useSinglistData";
import { useGeneralContext } from "../../contexts/general-context";
import { removeFromPlaylist } from "../../api/playlist/removeFromPlaylist";
import { useAuth } from "../../contexts/auth-context";

export function PlaylistCard() {
    const { token } = useAuth();
    const { playList, dispatchplaylist } = usePlaylist();
    const { loader } = useGeneralContext();
    const { id } = useParams();
    const playlist = useSinglelistData(id);

    const getPlaylistData = (list, id) => {
        return list?.find(item => item._id === id);
    }

    const playlistData = playList.length !== 0 ? getPlaylistData(playList, id) : getPlaylistData(playlist, id);

    return (
        <div className="container">
            <PageHeading name={`Playlist/${playlistData ? playlistData.name : "..."}`} />
            { loader && "Still Loading..." }
            <div className="playlist-wrapper">
                
                { playlistData?.list.map((playlistitem) => {
                    return (
                        <div className="card video-card">
                            <Link to={`/${playlistitem._id}`} className="link">
                                <img src={thumbnail(playlistitem._id)} alt={playlistitem.name} />
                            </Link>
                            <div className="card-body">
                                <span className="circle-icon" onClick={() =>
                                removeFromPlaylist(
                                id,
                                playlistitem._id,
                                dispatchplaylist,
                                token
                                )}>
                                <i className="far fa-trash-alt"></i>
                                </span>
                                <p className="card-title">{playlistitem.name}</p>
                                <strong className="card-text">{playlistitem.category}</strong>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
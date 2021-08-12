import React from "react";
import { Link } from "react-router-dom";
import { deletePlaylist } from "../../api/playlist/deletePlaylist";
import { useAuth } from "../../contexts/auth-context";
import { usePlaylist } from "../../contexts/playlist-context";
import Image from "../../assets/images/default2.png";

export function PlaylistContainer({ playlist }) {
    const { dispatchplaylist } = usePlaylist();
    const { token } = useAuth();
    const playListImage = (list) => list[0]._id;

    const checkImageExist = (list) => {
        if(list.length !== 0) {
            return `https://img.youtube.com/vi/${playListImage(list)}/mqdefault.jpg`;
        }
        return Image;
    }

    return (
        <div className="playlist-container">
            <div key={playlist._id} className="card video-card">
                <img src={checkImageExist(playlist.list)} alt={playlist.name} />
                <div className="card-body">
                    <div>
                       <Link to={`/playlists/${playlist._id}`}>
                       <button className="btn btn-link">
                           Watch Playlist
                        </button>
                        </Link> 
                    </div>
                    <span className="circle-icon" onClick={() => deletePlaylist(playlist._id, dispatchplaylist, token)}>
                        <i className="far fa-trash-alt"></i>
                    </span>
                    <span className="card-title">{playlist.name} ({playlist.list.length})</span>
                </div>
            </div>
        </div>
    )
}
import React, { useState } from "react";
import { usePlaylist } from "../../contexts/playlist-context";
import { createPlaylist } from "../../api/playlist/createPlaylist";
import { addToPlaylist } from "../../api/playlist/addToPlaylist";
import { removeFromPlaylist } from "../../api/playlist/removeFromPlaylist";
import { useAuth } from "../../contexts/auth-context";
import "../../css/playlistmodal.css";

export function PlaylistModal() {
    const [text,setText] = useState("");
    const { playList, showPlaylistModal, dispatchplaylist } = usePlaylist();
    const { token } = useAuth();

    const handleKeyPress = (e) => {
        if(e.key === "Enter")
            handleOnClick();
    }

    const handleOnClick = () => {
        dispatchplaylist({ type: "DISPLAY_INPUT_BOX" });
        text !== "" && createPlaylist(dispatchplaylist, text, token);
        setText("");
    }

    const handlePlaylistCheckbox = (e, token) => {
        let listId = e.target.id;
        if(e.target.checked === true) {
            let videoData = showPlaylistModal.videoData;
            addToPlaylist(listId, dispatchplaylist, videoData, token);
        } else {
            let videoId = showPlaylistModal.videoData._id;
            removeFromPlaylist(listId, videoId, dispatchplaylist, token);
        }
    }

    const itemChecked = (id) => {
        return playList
            .filter(item => item._id === id)[0]
            .list.some(item => {
                return item._id === showPlaylistModal.videoData._id ? true : false;
            });
    }

    return (
        <div className={`modal ${
            showPlaylistModal.status ? "modal-show" : "modal-hide"
        }`}>
            <h2 className="modal-title">Playlists</h2>
            <span onClick={() => dispatchplaylist({ type: "SHOW_PLAYLIST_MODAL" })} className="circle-icon modal-circle-icon">
                <i className="fas fa-minus-square"></i>
            </span>
            <div className="modal-content">
                {/* { inputPlaylistBox && ( */}
                    <div className="modal-input">
                        <input type="text" placeholder="Enter Playlist Name" onChange={(e) => setText(e.target.value)} onKeyPress={(e) => handleKeyPress(e)} />

                        <button onClick={handleOnClick} className="btn modal-btn">
                            Create
                        </button>
                    </div>
                {/* )} */}
                { playList.map((item) => {
                    return (
                        <div key={item._id} className="playlist-names">
                            <input type="checkbox" name="playlist-item" id={item._id} className="checkbox" checked={itemChecked(item._id)} onChange={(e) => handlePlaylistCheckbox(e, token)} />
                            
                            <label htmlFor={item._id}>{item.name}</label>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
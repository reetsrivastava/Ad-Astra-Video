import React from "react";
import { useAuth } from "../../contexts/auth-context";
import { useGeneralContext } from "../../contexts/general-context";
import { useLike } from "../../contexts/like-context";
import { usePlaylist } from "../../contexts/playlist-context";
import { useWatchList } from "../../contexts/watchlist-context";
import "../../css/userDetails.css";

export function UserDetails() {
    const { 
        userData: { username, email },
         logOut
    } = useAuth();

    const { dispatchplaylist } = usePlaylist();
    const { dispatchwatchlist } = useWatchList();
    const { dispatchgeneral } = useGeneralContext();
    const { dispatchlike } = useLike();

    const logoutHandler = () => {
        dispatchgeneral({ type: "RESET"});
        dispatchlike({ type: "RESET"});
        dispatchplaylist({ type: "RESET"});
        dispatchwatchlist({ type: "RESET"});
        logOut();
    }

    return (
        <div className="user-container">
            
            <h3>User Profile</h3>
            <p className="user username">
                Username : <strong>{username}</strong>
            </p>
            <p className="user user-email">
                Email : <i>{email}</i>
            </p>
            <button className="btn btn-logout" onClick={() => logoutHandler()} >
                Logout
            </button>
        </div>
    )

}
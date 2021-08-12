import React from "react";
import { Link } from "react-router-dom";
import { removeFromWatchlist } from "../../api/watchlist/removeFromWatchlist";
import { useAuth } from "../../contexts/auth-context";
import { useWatchList } from "../../contexts/watchlist-context";
import { thumbnail } from "../../utils/thumbnail";
import "../../css/videocard.css";

export function WatchCard({ watchlist }) {
    const { dispatchwatchlist } = useWatchList();
    const { _id, name, category } = watchlist;
    const { token } = useAuth();

    return (
        <div className="card video-card">
            <Link to={`/${_id}`} className="link">
                <img src={thumbnail(_id)} alt={name} />
            </Link>
            <div className="card-body">
                <span className="circle-icon" onClick={() => removeFromWatchlist(_id, dispatchwatchlist, token)}>
                    <i className="far fa-trash-alt"></i>
                </span>
                <p className="card-title">{name}</p>
                <strong className="card-text">{category}</strong>
            </div>
        </div>
    )
}
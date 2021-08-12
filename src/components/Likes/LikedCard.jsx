import React from "react";
import { Link } from "react-router-dom";
import { removeFromLikes } from "../../api/likes/removeFromLikes";
import { useAuth } from "../../contexts/auth-context";
import { useLike } from "../../contexts/like-context";
import { thumbnail } from "../../utils/thumbnail";

export function LikedCard({ likedItem }) {
    const { dispatchlike } = useLike();
    const { _id, name, category } = likedItem;
    const { token } = useAuth();

    return (
        <div className="card video-card liked">
            <Link to={`/${_id}`} className="link">
                <img src={thumbnail(_id)} alt={name} />
            </Link>
            <div className="card-body">
                <span className="circle-icon liked-circle-icon" onClick={() => removeFromLikes(_id, dispatchlike, token)}>
                <i class="far fa-thumbs-down"></i>
                </span>
                <p className="card-title">{name}</p>
                <strong className="card-text">{category}</strong>
            </div>
        </div>
    )
}
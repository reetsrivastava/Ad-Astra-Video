import React from "react";
import { Link } from "react-router-dom";
import { thumbnail } from "../../utils/thumbnail";
import "../../css/videocard.css";

export function VideoCard({ videos }) {
    const { _id, name, category } = videos;

    return (
        <div className="card video-card">
            <Link to={`/${_id}`}>
                <img src={thumbnail(_id)} alt={name} />
            </Link>
            <div className="card-body">
                <p className="card-title">{name}</p>
                <strong className="card-text">{category}</strong>
            </div>
        </div>
    )
}
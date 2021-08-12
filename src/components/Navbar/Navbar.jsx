import React from "react";
import { Link } from "react-router-dom";
import { useGeneralContext } from "../../contexts/general-context";
import "../../css/navbar.css";

export function Navbar() {
    const { dispatchgeneral } = useGeneralContext();

    return (
        <div className="navbar">
            <nav class="main-nav">
                <input type="checkbox" id="check" />
                <label for="check" class="menu-btn">
                <i className="fas fa-bars"></i>
                </label>
                <Link to="/" className="logo">Ad Astra</Link>
                <ul class="navlinks">
                    <li>
                        <Link to="/" className="link">
                            <i className="fas fa-h-square"></i> Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/liked-videos" className="link">
                            <i className="fas fa-thumbs-up"></i> Likes
                        </Link>
                    </li>
                    <li>
                        <Link to="/watch-list" className="link">
                            <i className="far fa-clock"></i> Watch Later
                        </Link>
                    </li>
                    <li>
                        <Link to="/playlists" className="link">
                            <i className="fas fa-list"></i> Playlists
                        </Link>
                    </li>
                    <li>
                        <Link to="/user" className="link">
                            <i className="fas fa-portrait"></i> Profile
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
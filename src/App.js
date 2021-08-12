/* eslint-disable no-undef */
import "./App.css";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router";
import { useVideoData } from "./hooks/useVideoData/useVideoData";
import { useLikeData } from "./hooks/useLikesData/useLikesData";
import { usePlaylistData } from "./hooks/usePlaylistData/usePlaylistData";
import { useWatchlistData } from "./hooks/useWatchListData/useWatchlistData";
import {
    LikedVideos,
    Navbar,
    Playlist,
    PlaylistCard,
    VideoPlayer,
    Videos,
    WatchList,
    PrivateRoute,
    Login,
    Signup,
    UserDetails,
  } from "./components/index";

export default function App() {
    useVideoData();
    useLikeData();
    usePlaylistData();
    useWatchlistData();

    return (
        <div className="App">
            <div>
                <Navbar />
                <div className="main-section">
                <Routes>
                    <Route path="/" element={<Videos />} />
                    <Route path=":id" element={<VideoPlayer />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <PrivateRoute path="/user" element={<UserDetails />} />
                    <PrivateRoute path="/playlists" element={<Playlist />} />
                    <PrivateRoute path="/playlists/:id" element={<PlaylistCard />} />
                    <PrivateRoute path="/liked-videos" element={<LikedVideos />} />
                    <PrivateRoute path="/watch-list" element={<WatchList />} />
                </Routes>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}
import React from "react";
import { PlaylistContainer } from "./PlaylistContainer";
import { usePlaylist } from "../../contexts/playlist-context";
import { PageHeading } from "../PageHeading";
import { useGeneralContext } from "../../contexts/general-context";
import { EmptyPage } from "../EmptyPage";

export function Playlist() {
    const { playList } = usePlaylist();
    const { loader } = useGeneralContext();

    return (
        <div className="container">
            <PageHeading name="Playlists" />
            <div className="playlist-wrapper">
                { loader && "Still Loading..." }
                { playList?.length === 0 && <EmptyPage pageName="Playlist" /> }
                { playList?.map((playlist) => {
                    return <PlaylistContainer key={playlist._id} playlist={playlist} />
                })}
            </div>
        </div>
    )
}
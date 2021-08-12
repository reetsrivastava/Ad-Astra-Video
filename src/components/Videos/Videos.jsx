import React from "react";
import { VideoCard } from "./VideoCard";
import { useGeneralContext } from "../../contexts/general-context";
import { useVideoData } from "../../hooks/useVideoData/useVideoData";
import "../../css/videos.css";

export function Videos() {
    useVideoData();
    const { videos, loader } = useGeneralContext();

    return (
        <div className="videos-container">
            <div className="wrapper">
                { loader && "Loading..." }
                { React.Children.toArray(
                    videos.map((videos) => {
                        return <VideoCard videos={videos} />
                    } )
                )}
            </div>
        </div>
    )
}
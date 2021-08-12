import React from "react";
import { LikedCard } from "./LikedCard";
import { useLike } from "../../contexts/like-context";
import { PageHeading } from "../PageHeading";
import { useGeneralContext } from "../../contexts/general-context";
import { EmptyPage } from "../EmptyPage";

export function LikedVideos() {
    const { loader } = useGeneralContext();
    const { likeList } = useLike();

    return (
        <div className="container">
            <PageHeading name="Likes" />
            <div className="liked-list">
                { loader && "Still Loading..."}
                { likeList?.length === 0 && <EmptyPage pageName="Liked List" />}
                { likeList?.map((item) => (
                    <LikedCard key={item._id} likedItem={item} />
                ))}
            </div>
        </div>
    )
}
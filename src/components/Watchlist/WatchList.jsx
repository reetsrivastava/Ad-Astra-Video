import React from "react";
import { WatchCard } from "./WatchCard";
import { useWatchList } from "../../contexts/watchlist-context";
import { PageHeading } from "../PageHeading";
import { useGeneralContext } from "../../contexts/general-context";
import { EmptyPage } from "../EmptyPage";

export function WatchList() {
    const { watchList } = useWatchList();
    const { loader } = useGeneralContext();

    return (
        <div className="container">
            <PageHeading name="WatchList" />
            <div className="watch-list">
                { loader && "Loading..." }
                { watchList?.length === 0 && <EmptyPage pageName="Watchlist" /> }
                { watchList?.map((item) => (
                    <WatchCard key={item._id} watchlist={item} />
                )) }
            </div>
        </div>
    )
}
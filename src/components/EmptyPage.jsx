import React from "react";
import empty from "../assets/images/empty.svg";

export function EmptyPage({ pageName }) {
    return (
        <div className="empty-container">
            <img src={empty} alt="Empty Tag" />
            <h3>Seems like {pageName} is empty</h3>
        </div>
    )
}
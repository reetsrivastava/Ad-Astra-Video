import { Route, Navigate } from "react-router-dom";

export function PrivateRoute({ path, ...props}) {
    const token = JSON.parse(localStorage.getItem("token"));

    if(token) {
        return (
            <Route path={path} {...props} />
        );
    }

    return (
        <Navigate state={{ from: path }} replace to="/login" />
    );
}
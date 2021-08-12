import axios from "axios";

export function setUpAuthExceptionHandler(logOut, navigate) {
    const UNAUTHORIZED = 401;
    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if(error?.response?.status === UNAUTHORIZED) {
                console.log("Running");
                logOut();
                navigate("/login");
            }
            return Promise.reject(error);
        }
    )
}

export function setUniversalRequestToken(token) {
    if(token) {
        return (axios.defaults.headers.common["Authorization"] = token);
    }
    delete axios.defaults.headers.common["Authorization"];
}
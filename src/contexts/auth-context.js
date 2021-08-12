import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { setUniversalRequestToken, setUpAuthExceptionHandler } from "./helpers/helpers";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [userData, setUserData] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [token, setToken] = useState(null);
    const [authLoader, setAuthloader] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        const user = JSON.parse(localStorage.getItem("user"));
        setUniversalRequestToken(token);
        setUpAuthExceptionHandler(logOut, navigate);
        setToken(token);
        setUserData(user);
    },[]);

    const logOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUserData("");
        navigate("/login");
    }

    const checkUserPass = async (userIdentifier, password) => {
        try {
            setErrorMessage("");
            setAuthloader(true);
            const {
                status,
                data: { success, token, userdata }
            } = await axios.post(
                "https://ThornyConsciousAstronomy.reetrs.repl.co/auth/login",
                { user: {
                    userCredential: userIdentifier,
                    password: password
                } }
            );
            if(success === true && status === 200) {
                setUniversalRequestToken(token);
                setUpAuthExceptionHandler(logOut, navigate);
                setToken(token);
                setUserData(userData);
                localStorage.setItem("token", JSON.stringify(token));
                localStorage.setItem("user", JSON.stringify(userdata));
                console.log(userData)
            }
        } catch (error) {
            console.log(error.message);
            if(error?.response.status === 403) {
                setErrorMessage("Incorrect Credentials");
            }
        } finally {
            setAuthloader(false);
        }
    }

    return (
        <AuthContext.Provider
        value={{
            errorMessage, setErrorMessage, token, setToken, userData, setUserData, checkUserPass, authLoader, setAuthloader, logOut
        }} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}
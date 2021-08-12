import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../../contexts/auth-context";
import { Link } from "react-router-dom";
import { refineUserData } from "./util/stringHandler.js";
import "../../css/auth.css";

export function Login() {
    const { checkUserPass, errorMessage, setErrorMessage, authLoader } = useAuth();
    const { state } = useLocation();
    const navigate = useNavigate();
    const [userIdentifier, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = async (e) => {
        e.preventDefault();
        await checkUserPass(refineUserData(userIdentifier), password);
        navigate(state?.from ? state.from : "/user");
    }

    useEffect(() => {
        setTimeout(() => setErrorMessage(""), 4000);
        return () => clearTimeout();
    },[errorMessage]);

    return (
        <div className="form-container">
            <form id="form" className="form" onSubmit={loginHandler}>
                <h1>LOGIN</h1>
                <div className="form-label">
                    <label htmlFor="userid">Username</label>
                    <input type="userid" id="userid" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} required />
                    <small>{ errorMessage }</small>
                </div>
                <div className="form-label">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="form-button">
                    <button className="btn-auth">
                        { authLoader ? "Loading..." : "Sign In" }
                    </button>
                </div>

                <strong className="form-message">Not a Existing User ? 
                <Link to="/signup" className="message-link">Signup Instead</Link></strong>
            </form>
        </div>
    )
}
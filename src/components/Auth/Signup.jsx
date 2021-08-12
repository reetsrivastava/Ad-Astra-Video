import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth-context";
import { Link } from "react-router-dom";
import { toastMessages }from "../../utils/toastMessages";
import axios from "axios";
import { refineUserData } from "./util/stringHandler";
import "../../css/auth.css";

export function Signup() {
    const [formError, setFormError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { authLoader, setAuthloader } = useAuth();
    const [values, setValues] = useState({
        email: "",
        username: "",
        password: "",
        confirmpassword: ""
    });

    useEffect(() => {
        setTimeout(() => setErrorMessage(""), 4000);
        return () => clearTimeout();
    }, [errorMessage]);

    const createUser = async (email, username, password) => {
        try {
            setErrorMessage("");
            setFormError("");
            setAuthloader(value => !value);
            const {
                status,
                data: { success, message }
            } = await axios.post(
                "https://ThornyConsciousAstronomy.reetrs.repl.co/auth/signup",
                {
                    user: {
                        username: username,
                        email: email,
                        password: password
                    }
                }
            );
            console.log(message);
            if(status === 201 && success === true) {
                setValues({
                    email:"",
                    username: "",
                    password: "",
                    confirmpassword: ""
                });
                toastMessages("Account Successfully Created");
            }
        } catch (error) {
            setErrorMessage("Account Already Exists");
            console.log(error);
        } finally {
            setAuthloader(value => !value);
        }
    }

    const handleChange = (e) => {
        setValues((values) => ({
            ...values,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = (e) => {
        const { email, username, password, confirmpassword } = values;
        e.preventDefault();
        if(password !== confirmpassword) {
            setFormError("Password Not matching")
        } else {
            setFormError("");
            createUser(refineUserData(email), refineUserData(username), password);
        }
    }

    return (
        <div className="form-container">
            <form id="form" className="form" onSubmit={handleSubmit}>
                <h1>Create Account</h1>
                <div className="form-label">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" placeholder="Enter Username" name="username" value={values.username} onChange={handleChange} required />
                    <small>{errorMessage}</small>
                </div>

                <div className="form-label">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Enter Your Email" name="email" value={values.email} onChange={handleChange} required />
                    <small>{errorMessage}</small>
                </div>

                <div className="form-label">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter Your password" name="password" value={values.password} onChange={handleChange} required />
                    <small>{errorMessage}</small>
                </div>

                <div className="form-label">
                    <label htmlFor="password2">Confirm Passsord</label>
                    <input type="password" id="password2" placeholder="Confirm Your Password Again" name="confirmpassword" value={values.confirmpassword} onChange={handleChange} required />
                    <small>{errorMessage}</small>
                    <div>
                    <small>{formError}</small>
                    </div>
                </div>

                <div className="form-button">
                    <button className="btn-auth">
                        { authLoader ? "Loading..." : "Sign Up" }
                    </button>
                </div>

                <strong className="form-message">Existing User? <Link to="/login" className="message-link">Login Instead</Link></strong>
            </form>
        </div>
    )
}
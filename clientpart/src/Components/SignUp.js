import React, { useEffect, useState } from "react";
import "./SignIn.css"
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { SessionUtils } from "./SessionUtils";

const SignUp = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState({
        email: "",
        password: "",
        confirm_password: "",
    });
    const {ifSessionExist} = SessionUtils();

    useEffect(() => {
        ifSessionExist('/contact')
    }, [])

    const handleChange = (e) => {
        setLogin((curr) => ({ ...curr, [e.target.name]: e.target.value }))
    };

    const URL = "http://localhost:5000/v1"
    const signUpUrl = `${URL}/signup`;
    const signUpUser = (userData) => {

            axios.post(signUpUrl, userData)
                .then((res) => {
                    alert(res.data.message);
                    navigate("/")
                })
                .catch((err) => {
                    // console.log('err', err);
                    alert(err.message);
                })
    }
    //   const {signUpUser}= context(); //useAPI();
    const UserLogin = () => {
        signUpUser(login)
    };
    return (
        <div className="login-page">
            <h1>Logo</h1>
            <p>create a new account</p>
            <div className="login-container">
                <form onSubmit={(e) => { e.preventDefault() }}>
                    <input
                        onChange={(e) => handleChange(e)}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="abc@xyz"
                        value={login.email}
                    />
                    <input
                        onChange={(e) => handleChange(e)}
                        type="password"
                        name="password"
                        className="password"
                        placeholder="Password"
                        value={login.password}
                    />
                    <input
                        onChange={(e) => handleChange(e)}
                        type="password"
                        name="confirm_password"
                        className="password"
                        placeholder="Confirm Password"
                        value={login.confirm_password}
                    />
                    <div className="signUpbtnContainer">
                        <button onClick={UserLogin} className="signup">
                            Sign Up
                        </button>
                        <button className="signup signinAnkit" onClick={() => navigate("/")}>
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default SignUp
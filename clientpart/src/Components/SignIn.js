import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSessionContext } from './Context'
import './SignIn.css'
import axios from "axios"
import { SessionUtils } from './SessionUtils'

const SignIn = () => {
    const [login, setLogin] = useState({
        email: "",
        password: ""
    });
    const [userEmail, setUserEmail] = useState("");
    const navigate = useNavigate();
    const {setUserData} = useSessionContext();
    const {ifSessionExist} = SessionUtils();

    useEffect(() => {
        ifSessionExist('/contact')
    }, [])

    const URL = "http://localhost:5000/v1"
    const loginUrl = `${URL}/signin`

    const loginUser = async (loginData) => {
        await axios
            .post(loginUrl, loginData)
            .then((res) => {
                // console.log(res);
                if (res.status === 200) {
                    setUserData(true)
                    navigate("/contact")
                    const token = res.data.token;
                    localStorage.setItem("token", token)
                    setUserEmail(loginData.email);
                    localStorage.setItem("userEmail", login.email)
                } else {
                    alert("User does not Exist");
                }

            }).catch((err) => {
                console.log(err)
                alert("Invalid Credentials . Try Again")
            })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        loginUser(login);
    };

    const handleChange = (e) => {
        setLogin((curr) => ({ ...curr, [e.target.name]: e.target.value }));
    };

    return (
        <div className='login-page'>
            <h1>Logo</h1>
            <p>Enter your credentials to access your account</p>
            <div className='login-container'>
                <form method='POST' onSubmit={submitHandler}>
                    <input
                        onChange={(e) => handleChange(e)}
                        type="email"
                        name="email"
                        value={login.email}
                        className="email"
                        placeholder="abc@xyz.com"
                    />

                    <input
                        onChange={(e) => handleChange(e)}
                        type="password"
                        name="password"
                        className="password"
                        value={login.password}
                        placeholder="Password"
                    />

                    <button className="signIn">
                        Sign In
                    </button>


                </form>
                <Link id="signup" to="/signup">Sign Up</Link>
            </div>

        </div>
    )
}

export default SignIn
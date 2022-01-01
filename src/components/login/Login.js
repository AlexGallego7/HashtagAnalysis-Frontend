import React, { useState } from 'react';
import GLogin from "./GLogin";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";

function Login() {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const handleSubmit = async e => {
        e.preventDefault();

        let url = "http://127.0.0.1:8000/users/login"

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        }

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(
                (result) => {
                    localStorage.setItem('token', result)
                    window.location.href = "/me"
                })
            .catch(error => {
                console.log(error)
                setError("Wrong credentials. Please try again.")
            })
    }

    return(
        <div>
            <p>HEADER</p>
            <p>HEADER</p>
            <div>
                <h1 className="title">Please Log In</h1>
            </div>
            <div className="login-box">
                <form onSubmit={handleSubmit}>
                    <div>
                        <TextField id="username-input" name="username" label="Username" type="text" onChange={e => setUserName(e.target.value)}/>
                    </div>
                    <div>
                        <TextField id="pwd-input" name="password" label="Password" type="password" onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <Button variant="contained" type="submit" color="primary">Login</Button><br/>
                        <GLogin/>
                    </div>
                    <NavLink to="/register">Do you have an account?</NavLink><br/>
                    <label style={{color: "red"}}>{error}</label>
                </form>
            </div>
        </div>
    )
}


export default Login;
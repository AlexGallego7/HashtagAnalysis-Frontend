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
                    <small style={{color: "red", marginTop: 20}}>{error}</small>
                    <div>
                        <TextField id="username-input" name="username" label="Username" type="text" onChange={e => setUserName(e.target.value)}/>
                    </div>
                    <div>
                        <TextField id="pwd-input" name="password" label="Password" type="password" onChange={e => setPassword(e.target.value)}/>
                    </div><br/>
                    <div style={{textAlign: "center"}}>
                        <Button variant="contained" type="submit" color="primary">Login</Button><br/><br/>
                        <GLogin/>
                    </div><br/>
                    <NavLink to="/register">Do you have an account?</NavLink><br/>
                </form>
            </div>
        </div>
    )
}


export default Login;
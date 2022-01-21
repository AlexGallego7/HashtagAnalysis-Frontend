import React from 'react'
import {GoogleLogin} from 'react-google-login'

const clientId = '33797170213-dm39mlprsjib8i1bgp2abebvvqimlmu6.apps.googleusercontent.com'

function GLogin() {
    const onSuccess = (res) => {

        let url = "https://tfg-backend-app.herokuapp.com/users/glogin"

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: res.profileObj.email,
                username: res.profileObj.email.split("@")[0],
                first_name: res.profileObj.givenName,
                last_name: res.profileObj.familyName
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
            })

        console.log('[GLogin success] currentUser: ', res)
    };

    const onFailure = (res) => {
        console.log('[GLogin failed] error: ', res)
    };

    return(
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Sign in with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{marginTop: '100px'}}
                />
        </div>
    );
}

export default GLogin;
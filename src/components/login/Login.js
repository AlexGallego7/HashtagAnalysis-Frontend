import React from 'react'
import {GoogleLogin, useGoogleLogin} from 'react-google-login'

import { refreshTokenSetup } from '../utils/refreshToken';


const clientId = '33797170213-dm39mlprsjib8i1bgp2abebvvqimlmu6.apps.googleusercontent.com'

function Login() {
    const onSuccess = (res) => {
        console.log('[Login success] currentUser: ', res.profileObj)

        refreshTokenSetup(res)
    };

    const onFailure = (res) => {
        console.log('[Login failed] error: ', res)
    };

    return(
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{marginTop: '100px'}}
                isSignedIn={true}
                />
        </div>
    );
}

export default Login;
import React from 'react'
import {GoogleLogin} from 'react-google-login'

const clientId = '33797170213-dm39mlprsjib8i1bgp2abebvvqimlmu6.apps.googleusercontent.com'

function GLogin() {
    const onSuccess = (res) => {
        console.log('[GLogin success] currentUser: ', res.profileObj)
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
                isSignedIn={true}
                />
        </div>
    );
}

export default GLogin;
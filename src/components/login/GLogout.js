import React from 'react'
import {GoogleLogout} from 'react-google-login'


const clientId = '33797170213-dm39mlprsjib8i1bgp2abebvvqimlmu6.apps.googleusercontent.com'

function GLogout() {
    const onSuccess = () => {
        localStorage.removeItem('token')
        alert('GLogout made successfully')
    };

    return(
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="GLogout"
                onLogoutSuccess={onSuccess}
            />
        </div>
    );
}

export default GLogout;
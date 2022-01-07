import React from 'react';

function Logout() {

    const logout = () => {
        console.log("hey crack")
        localStorage.removeItem('token')


    }

    return(
        <div>
            {localStorage.removeItem('token')}
            {window.location.href = "/"}
        </div>
    )
}


export default Logout;
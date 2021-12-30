import React from 'react';

function Logout() {

    const logout = () => {
        console.log("hey crack")
        localStorage.removeItem('token')

        window.location.href = "/"

    }

    return(
        <div>
            {logout}
        </div>
    )
}


export default Logout;
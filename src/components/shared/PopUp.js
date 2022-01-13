import React from 'react';
import Popup from 'reactjs-popup';

function PopUp(props) {

    const retrain_model = () => {

        let url = "https://tfg-hashtagapi-dev-we-app.herokuapp.com/train"

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: null
        }

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(
                () => { })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <Popup
            trigger={props.trigger}
            modal
        >
            {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <div className="header"> Modal Title</div>
                    <div className="content">
                        {' '}
                        We will take into account your noticing. Thanks for that!
                    </div>
                    <div className="actions">
                        <button
                            className="button"
                            onClick={() => {
                                retrain_model();
                                close();
                            }}
                        >
                            close modal
                        </button>
                    </div>
                </div>
            )}
        </Popup>
    )
}

export default PopUp
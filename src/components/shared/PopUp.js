import React from 'react';
import Popup from 'reactjs-popup';
import Button from "@material-ui/core/Button";

function PopUp(props) {

    const retrain_model = () => {

        let url = "http://127.0.0.1:8000/train"

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
            trigger={props.trigger} modal closeOnDocumentClick
        >
            {close => (
                <div className="modal">
                    <Button className="close" onClick={() => {
                        retrain_model();
                        close();
                    }} style={{float: "right", background: "white"}}>
                        &times;
                    </Button>
                    <br/><br/>
                    <div className="header"> Notification of wrong prediction </div><br/><br/>
                    <div className="content">
                        {' '}
                        Thanks for letting us know. <br/>We will take this notification into account and take further
                        action!
                    </div><br/>
                    <div className="actions">
                        <Button
                            className="button" style={{background: "white"}}
                            onClick={() => {
                                retrain_model();
                                close();
                            }}
                        >
                            Close
                        </Button>
                    </div>
                </div>
            )}
        </Popup>
    )
}

export default PopUp
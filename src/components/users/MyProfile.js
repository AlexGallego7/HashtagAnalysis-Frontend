import React from "react";
import {Link} from 'react-router-dom'

import TimeAgo from "timeago-react";

class MyProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: [],
            user: [],
            url: "https://hashtag.../api/myprofile",
            about: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'X-API-KEY': localStorage.getItem('token')
            }
        };

        fetch(this.state.url, requestOptions)
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        user: result
                    })
                })
            .catch(error => {
                console.log(error)
            });
    }

    handleSubmit(e) {
        let k = {
            about: this.state.about
        }
        e.preventDefault()
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': localStorage.getItem('token')
            },
            body: JSON.stringify(k)
        };

        fetch(this.state.url, requestOptions)

            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        user: result
                    })
                })
            .catch(error => {
                console.log(error)
            });
    }

    handleChange(e) {
        this.setState({
            about: e.target.value
        })
    }

    render() {
        const user = this.state.user;
        return(
            <div className="content">
                <div>
                    <p><strong>Username:</strong>&nbsp;&nbsp;{user.username}</p>
                    <p><strong>Created:</strong>&emsp;&nbsp;&nbsp;&nbsp;
                        <TimeAgo datetime={user.created_at} locale='en_US'/>
                    </p>
                    <p><strong>Points:</strong>&emsp;&emsp;&nbsp;&nbsp;{user.points}</p>
                    <p>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;</p>

                    <p><strong>About:</strong>&emsp;&emsp;&emsp;<textarea className="bottomMar" rows="6" cols="60"
                                                                          name="about" defaultValue={user.about}
                                                                          onChange={this.handleChange}/></p>


                    <p>
                        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;
                        <Link  to={'/hashtags/users/' + user.id}>hashtags analyzed</Link>
                    </p>

                    <div className="actions">

                        <input className="bottomMar" type="submit" value="change about" onClick={this.handleSubmit}/>
                    </div>

                </div>
            </div>
            );
    }
}

export default MyProfile;
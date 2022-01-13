import React from 'react'
import TimeAgo from "timeago-react";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";

class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            id: parseInt(window.location.href.split('/')[4]),
            user: [],
            analyzed: [],
            friends: []
        }
    }

    componentDidMount() {
        this.fetchUser()
        this.fetchAnalyzed()
        this.fetchFriends()
    }

    fetchAnalyzed() {
        let url = "https://tfg-hashtagapi-dev-we-app.herokuapp.com/users/" + this.state.id + "/analysis"

        fetch(url)
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        analyzed: result
                    })
                })
            .catch(error => {
                console.log(error)
            })
    }

    fetchUser() {
        let url = "https://tfg-hashtagapi-dev-we-app.herokuapp.com/users/" + this.state.id

        fetch(url)
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        user: result
                    })
                })
            .catch(error => {
                console.log(error)
            })
    }


    fetchFriends() {
        let url = "https://tfg-hashtagapi-dev-we-app.herokuapp.com/friendships/my_friends"

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: localStorage.getItem('token'),
            })
        }

        fetch(url, requestOptions)
            .then(response => response.json())
            .then( (result) => {
                console.log(result)
                this.setState({
                    friends: result
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const user = this.state.user

        const friends = this.state.friends
            .map((e, i) => {
                return (
                    <div key={i}>
                        <div>
                            <ul>
                                <li><NavLink to={() => this.fetchUser((e.to_username === user.username) ? e.from_user : e.to_user)}>
                                    {(e.to_username === user.username) ? e.from_username : e.to_username}</NavLink></li>
                                <small><TimeAgo datetime={e.created_at} locale='en_US'/><br/></small><hr/>
                            </ul>
                        </div>
                    </div>

                )})

        const hashtags = this.state.analyzed
            .map((e, i) => {
                return (
                    <div key={i}>
                        <div>
                            <ul>
                                <li>{e.hashtag}</li>
                                <small><TimeAgo datetime={e.created_at} locale='en_US'/><br/></small><hr/>
                                <strong style={{color: "green"}}>Positive tweets: </strong>{e.positive}<br/>
                                <strong style={{color: "yellow"}}>Neutral tweets: </strong>{e.neutral}<br/>
                                <strong style={{color: "red"}}>Negative tweets: </strong>{e.negative}<br/>
                                <strong>Analyzed tweets: </strong>{e.tweets}<br/><br/>
                                <Button variant="contained" type="submit" color="primary"
                                        onClick={() => this.analyze(e.hashtag)}>Analyze</Button>
                            </ul>
                        </div>
                    </div>

                )})

        return (
            <div>
                <p>HEADER</p>
                <p>HEADER</p>
                <div>
                    <h1 className="title">Profile of {user.username}</h1>
                </div>
                <div className="user-box">
                    <div className="info">
                        <h2>Information: </h2>
                        <strong>Username:</strong>&nbsp;&nbsp;&nbsp;{user.username}<br/><br/>
                        <strong>First Name:</strong>&nbsp;{user.first_name}<br/><br/>
                        <strong>Last Name:</strong>&nbsp;&nbsp;{user.last_name}<br/><br/>
                        <strong>Created:</strong>&emsp;&nbsp;&nbsp;
                        <TimeAgo datetime={user.created_at} locale='en_US'/><br/><br/>

                        <strong>Points:</strong>&emsp;&emsp;&nbsp;{user.points}<br/><br/>

                        <strong>About:</strong>&emsp;&emsp;&emsp;<textarea className="bottomMar" rows="6" cols="30"
                                                                           name="about" defaultValue={user.about}
                                                                           onChange={this.handleChange}/><br/><br/>
                    </div>
                    <div className="analyzed-hashtags">
                        <h2>Saved Analysis:</h2>
                        {hashtags}
                    </div>
                    <div className="friends">
                        <h2>Friends:</h2>
                        {friends}
                    </div>
                </div>

            </div>
        )
    }
}

export default UserProfile
import React from "react";
import TimeAgo from "timeago-react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {NavLink} from "react-router-dom";
import { confirm } from "react-confirm-box";

class MyProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: "",
            error_r: "",
            user: [],
            about: "",
            password: "",
            r_password: "",
            analyzed: [],
            change_pwd: false,
            friends: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.changePasswordPressed = this.changePasswordPressed.bind(this);
        this.handlePasswordRChange = this.handlePasswordRChange.bind(this);
    }

    componentDidMount() {
        this.fetchUser()
        this.fetchAnalyzed()
        this.fetchFriends()
    }

    fetchAnalyzed() {
        let url = "https://tfg-hashtagapi-dev-we-app.herokuapp.com/users/" + localStorage.getItem('token') +"/analysis"

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                token: localStorage.getItem('token'),
            })
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        analyzed: result
                    })
                })
            .catch(error => {
                console.log(error)
            });
    }

    fetchUser() {

        let url = "https://tfg-hashtagapi-dev-we-app.herokuapp.com/users/me"

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                token: localStorage.getItem('token'),
            })
        };

        fetch(url, requestOptions)
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

    handleSubmit() {

        let url = "https://tfg-hashtagapi-dev-we-app.herokuapp.com/users/me_put"

        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                about: this.state.about,
                token: localStorage.getItem('token')
            })
        };

        fetch(url, requestOptions)

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

    analyze(val) {
        let url = "https://tfg-hashtagapi-dev-we-app.herokuapp.com/hashtags"

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: val,
                num: 100
            })
        }

        fetch(url, requestOptions)
            .then(response => response.json())
            .then( () => {

                if(val[0] === '#')
                    window.location.href="analysis/" + val.substr(1, val.length)
                else
                    window.location.href="analysis/" + val

            })
            .catch(error => {
                console.log(error)
            })
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value,
            error: ""
        })
        if(e.target.value.length < 8) {
            this.setState({
                error: "Password must be 8 or more characters long"
                }
            )
        }
    }

    handlePasswordRChange(e) {
        this.setState({
            r_password: e.target.value,
            error_r: ""
        })
        if(e.target.value !== this.state.password) {
            this.setState({
                    error_r: "Passwords must coincide"
                }
            )
        }
    }

    changePasswordPressed() {
        if(!this.state.change_pwd) {
            this.setState({
                change_pwd: true
            })
        }
        else {
            this.setState({
                change_pwd: false
            })

            let url = "https://tfg-hashtagapi-dev-we-app.herokuapp.com/users/me_put"

            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: localStorage.getItem('token'),
                    password: this.state.password
                })
            };

            fetch(url, requestOptions)

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
    }

    async deleteUser() {

        const options = {
            render: (message, onConfirm, onCancel) => {
                return (
                    <div>
                        <h1>Are you sure?</h1>
                        <Button variant="contained" type="submit" color="primary"
                                onClick={onConfirm}>Yes</Button>
                        <Button  style={{float: "right"}} variant="contained" type="submit" color="secondary"
                                onClick={onCancel}>No</Button>
                    </div>
                );
            }
        };

        const result = await confirm("Are you sure?", options);

        if(result) {
            let url = "https://nameless-sea-14571.herokuapp.com/https://tfg-hashtagapi-dev-we-app.herokuapp.com/users/"
                + localStorage.getItem('token')

            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            };

            fetch(url, requestOptions)

                .then(response => response.json())
                .then(
                    () => {
                    })
                .catch( () => {
                    localStorage.removeItem('token')
                    window.location.href = "/"
                });
        }
    }

    render() {
        const user = this.state.user;
        const changing_password = this.state.change_pwd;
        const renderPassword =
            (
                <div>
                    <strong>Password: </strong>&nbsp;&nbsp;{this.state.user.password}<br/><br/>
                </div>
            )
        const renderPasswordChanging =
            (
                <div>
                    <strong>New password: </strong><br/>
                    <TextField required name="password" label="Password" type="password"
                               onChange={this.handlePasswordChange} onBlur={this.handlePasswordChange}
                               error={this.state.error !== ""}
                               {...(this.state.error !== "" && {
                                   error: true,
                                   helperText: this.state.error
                               })}
                    /><br/><br/>
                    <strong>Repeat password: </strong><br/>
                    <TextField required name="r_password" label="Repeat password" type="password"
                               onChange={this.handlePasswordRChange} onBlur={this.handlePasswordRChange}
                               error={this.state.error_r !== ""}
                               {...(this.state.error_r !== "" && {
                                   error_r: true,
                                   helperText: this.state.error_r
                               })}
                    /><br/><br/>
                </div>
            )

        const friends = this.state.friends
            .map((e, i) => {
                return (
                    <div key={i}>
                        <div>
                            <ul>
                                <li><NavLink to={"/profile/" + ((e.to_username === user.username) ? e.from_user : e.to_user)}>
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
        return(
            <div>
                <p>HEADER</p>
                <p>HEADER</p>
                <div>
                    <h1 className="title">My profile</h1>
                </div>
                <div className="user-box">
                    <div className="info">
                        <h2>Information: </h2>
                        <strong>Username:</strong>&nbsp;&nbsp;&nbsp;{user.username}<br/><br/>
                        <strong>First Name:</strong>&nbsp;{user.first_name}<br/><br/>
                        <strong>Last Name:</strong>&nbsp;&nbsp;{user.last_name}<br/><br/>
                        <strong>Email:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user.email}<br/><br/>
                        {
                            changing_password ?
                                renderPasswordChanging
                                : renderPassword
                        }
                        <strong>Token:</strong>&emsp;&emsp;&emsp;&nbsp;{user.token}<br/><br/>
                        <strong>Created:</strong>&emsp;&nbsp;&nbsp;
                            <TimeAgo datetime={user.created_at} locale='en_US'/><br/><br/>

                        <strong>Points:</strong>&emsp;&emsp;&nbsp;{user.points}<br/><br/>

                        <strong>About:</strong>&emsp;&emsp;&emsp;<textarea className="bottomMar" rows="6" cols="30"
                                                                              name="about" defaultValue={user.about}
                                                                              onChange={this.handleChange}/><br/><br/>
                        <Button style={{marginTop: 10, marginBottom: 10}} variant="contained" type="submit" color="primary"
                                onClick={this.handleSubmit}>Update about</Button>

                        <Button style={{marginTop: 10, marginLeft: 10, marginBottom: 10}}
                                variant="contained" type="submit" color="primary"
                                disabled={this.state.error !== "" || (this.state.change_pwd && this.state.password === "")}
                                onClick={this.changePasswordPressed}>
                            {changing_password ? "Save password" : "Change password"}
                        </Button>
                        <Button style={{marginTop: 10, marginLeft: 10, marginBottom: 10}} variant="contained" type="submit" color="secondary"
                                onClick={this.deleteUser}>Delete profile</Button>
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
            );
    }
}

export default MyProfile;
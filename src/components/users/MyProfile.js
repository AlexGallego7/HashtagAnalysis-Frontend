import React from "react";
import TimeAgo from "timeago-react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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
    }

    fetchAnalyzed() {
        let url = "http://127.0.0.1:8000/users/" + localStorage.getItem('token') +"/analysis"

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

        let url = "http://127.0.0.1:8000/users/me"

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

    handleSubmit() {

        let url = "http://127.0.0.1:8000/users/me_put"

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
        let url = "http://127.0.0.1:8000/hashtags"

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

            let url = "http://127.0.0.1:8000/users/me_put"

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

    render() {
        const user = this.state.user;
        const changing_password = this.state.change_pwd;
        const renderPassword =
            (
                <div>
                    <strong>Password: </strong>{this.state.user.password}<br/><br/>
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
                <div className="user-box">
                    <div className="info">
                        <strong>Username:</strong>&nbsp;&nbsp;{user.username}<br/><br/>
                        <strong>First Name:</strong>&nbsp;&nbsp;{user.first_name}<br/><br/>
                        <strong>Last Name:</strong>&nbsp;&nbsp;{user.last_name}<br/><br/>
                        <strong>Email:</strong>&nbsp;&nbsp;{user.email}<br/><br/>
                        {
                            changing_password ?
                                renderPasswordChanging
                                : renderPassword
                        }
                        <strong>Token:</strong>&nbsp;&nbsp;{user.token}<br/><br/>
                        <strong>Created:</strong>&emsp;&nbsp;&nbsp;&nbsp;
                            <TimeAgo datetime={user.created_at} locale='en_US'/><br/><br/>

                        <strong>Points:</strong>&emsp;&emsp;&nbsp;&nbsp;{user.points}<br/><br/>

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
                    </div>
                    <div className="analyzed-hashtags">
                        <h2>Saved Analysis:</h2>
                        {hashtags}
                    </div>
                </div>
            </div>
            );
    }
}

export default MyProfile;
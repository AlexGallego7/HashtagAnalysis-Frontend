import React from "react";
import TimeAgo from "timeago-react";
import Button from "@material-ui/core/Button";

class MyProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: [],
            user: [],
            about: "",
            analyzed: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    render() {
        const user = this.state.user;
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
                        <strong>Password:</strong>&nbsp;&nbsp;{user.password}<br/><br/>
                        <strong>Token:</strong>&nbsp;&nbsp;{user.token}<br/><br/>
                        <strong>Created:</strong>&emsp;&nbsp;&nbsp;&nbsp;
                            <TimeAgo datetime={user.created_at} locale='en_US'/><br/><br/>

                        <strong>Points:</strong>&emsp;&emsp;&nbsp;&nbsp;{user.points}<br/><br/>

                        <strong>About:</strong>&emsp;&emsp;&emsp;<textarea className="bottomMar" rows="6" cols="30"
                                                                              name="about" defaultValue={user.about}
                                                                              onChange={this.handleChange}/><br/><br/>
                        <Button style={{marginTop: 10}} variant="contained" type="submit" color="primary"
                                onClick={this.handleSubmit}>Change about</Button>
                    </div>
                    <div className="analyzed-hashtags">
                        <h2>Analyzed Hashtags:</h2>
                        {hashtags}
                    </div>
                </div>
            </div>
            );
    }
}

export default MyProfile;
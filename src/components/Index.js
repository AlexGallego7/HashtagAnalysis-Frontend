import React from "react";
import TextField from "@material-ui/core/TextField";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Button from "@material-ui/core/Button";
import {DatePicker, LocalizationProvider} from "@mui/lab";
import {NavLink} from "react-router-dom";
import TimeAgo from "timeago-react";
import {trackPromise} from "react-promise-tracker";
import LoaderIndicator from "./shared/LoaderIndicator";

class Index extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            error: null,
            hashtag: "",
            tweets: [],
            friend: "",
            friends: [],
            pending: [],
            message_success: "",
            message_error: "",
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.addFriend = this.addFriend.bind(this)
    }

    componentDidMount() {
        if(localStorage.getItem('token')) {
            this.fetchPending()
        }
    }

    handleChange(event) {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    }

    fetchPending() {
        let url = "https://tfg-backend-app.herokuapp.com/friendships/pending"

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
                this.setState({
                        pending: result
                    }
                )
            })
            .catch(error => {
                console.log(error)
            })
    }

    addFriend() {

        if(!localStorage.getItem('token'))
            window.location.href = "/login"
        else {
            let url = "https://tfg-backend-app.herokuapp.com/friendships"

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from_user: localStorage.getItem('token'),
                    to_user: this.state.friend,
                    from_username: localStorage.getItem('token'),
                    to_username: this.state.friend,
                    accepted: false,
                })
            }

            fetch(url, requestOptions)
                .then(response => response.json())
                .then( (result) => {
                    if ('id' in result) {
                        this.setState({
                            message_success: "You have sent a friend request to " + this.state.friend,
                            message_error: "",
                        })
                    }
                    else {
                        this.setState({
                            message_success: "",
                            message_error: result.message
                        })
                    }

                })
                .catch(error => {
                    console.log(error)

                })
        }
    }

    handleChangeDate(newDate) {
        this.setState({
            date: newDate
        })
    }

    handleSubmit(event) {
        this.postHashtag()
        event.preventDefault()
    }

    postHashtag() {

        let url = "https://tfg-backend-app.herokuapp.com/hashtags"

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.hashtag,
                num: this.state.number,
                date: this.state.date
            })
        }
        trackPromise(
            fetch(url, requestOptions)
                .then(response => response.json())
                .then( () => {
                    if(this.state.hashtag[0] === '#')
                        window.location.href="analysis/" + this.state.hashtag.substr(1, this.state.hashtag.length)
                    else
                        window.location.href="analysis/" + this.state.hashtag

                })
                .catch(error => {
                    console.log(error)
                }))
    }

    acceptFriendRequest(id) {

        let url = "https://tfg-backend-app.herokuapp.com/friendships/" + id

        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                accepted: true,
                token: localStorage.getItem('token')
            }),

        }

        fetch(url, requestOptions)
            .then(response => response.json())
            .then( (result) => {
                this.setState({
                    pending: result
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    rejectFriendRequest(id) {
        let url = "https://tfg-backend-app.herokuapp.com/friendships/" + id

        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: localStorage.getItem('token')
            })
        }

        fetch(url, requestOptions)
            .then(response => response.json())
            .then( () => {
                this.fetchPending()
           })
            .catch(error => {
                console.log(error)
                this.fetchPending()
            })
    }

    render() {
        const login =
            <div className="login-info">
                In case you want to see your pending friend requests and share your
                analysis with your friends, please log in and start analyzing!<br/>
                <Button style={{marginTop: 10}} variant="contained" type="submit" color="primary"
                        onClick={() => window.location.href = "/login"}>Log in</Button>
            </div>

        const no_pr =
            <div className="login-info">
                No pending friend requests at the moment.
            </div>


        const pendingRequests = this.state.pending
            .map((e, i) => {
                return(
                    <div key={i}>
                        <div>
                            <ul>
                                <li><NavLink to={"profile/" + e.from_user}>{e.from_username}</NavLink></li>
                                <small><TimeAgo datetime={e.created_at} locale='en_US'/><br/></small>
                                <Button style={{marginTop: 10, marginRight: 10}} variant="contained" type="submit" color="primary"
                                        onClick={() => this.acceptFriendRequest(e.id)}>Accept</Button>
                                <Button style={{marginTop: 10}} variant="contained" type="submit" color="secondary"
                                        onClick={() => this.rejectFriendRequest(e.id)}>Reject</Button>
                            </ul>
                        </div>
                    </div>
                )
            })
        return (
            <div className="search">
                <div>
                    <p>HEADER</p>
                    <p>HEADER</p>
                </div>
                <div>
                    <h1 className="title" style={{textAlign: "left"}}>Analyze</h1>
                </div>
                <div className="search-box">
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <TextField id="hashtag-input" name="hashtag" label="Hashtag or keyword" type="text" onChange={this.handleChange}/>
                        </div>
                        <div className="filters">
                            <TextField id="number-input" name="number" label="Number of tweets" type="number" onChange={this.handleChange}/>
                            <span> </span>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    value={this.state.date}
                                    label="Pick a date"
                                    onChange={this.handleChangeDate}
                                    renderInput={(params) => <TextField {...params} />}
                                    disableFuture
                                />
                            </LocalizationProvider>
                        </div>
                        <div>
                            <Button style={{marginTop: 10, marginBottom: 10}} variant="contained" type="submit" color="primary">Submit</Button>
                            <LoaderIndicator/>
                        </div>
                    </form>
                </div>
                <div style={{display: 'flex', textAlign: "justify"}}>
                    <div>
                        <div>
                            <h1 className="title" style={{textAlign: "left"}}>Add friends</h1>
                        </div>
                        <div className="friend-box">
                            <TextField style={{color: 'white', marginTop: 30}} name="friend" label="Add a friend"
                                       type="text" onChange={this.handleChange}/>
                            <Button style={{marginLeft: 10, marginTop: 30, marginBottom: 10}} variant="contained" type="submit"
                                    color="primary" onClick={this.addFriend}>Add friend</Button><br/>
                            <div style={{marginTop: 10}}>
                                <small style={{color: "red"}}>{this.state.message_error}</small>
                                <small style={{color: "green"}}>{this.state.message_success}</small>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h1 className="title" style={{marginLeft: "auto"}}>Pending requests</h1>
                        </div>
                        <div className="pending">
                            {
                                localStorage.getItem('token') ?
                                    (pendingRequests.length > 0) ? pendingRequests : no_pr : login
                            }
                        </div>
                    </div>
                    <div>
                        <div>
                            <h1 className="title" style={{textAlign: "left", marginLeft: '5rem'}}>How to use?</h1>
                        </div>
                        <div className="how-to">
                            <p style={{marginTop: 20, marginLeft: 20, marginRight: 20, marginBottom: 20}}>
                                Welcome to Hashtag Analyzer. To begin analyzing, enter any #hashtag or keyword and
                                the amount of tweets to use in the analysis. Hope you like it!<br/><br/>

                                Also don't miss out on the trends happening right now around the globe and
                                analyze them by clicking&nbsp;<NavLink to={"/trending"}>here</NavLink>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Index
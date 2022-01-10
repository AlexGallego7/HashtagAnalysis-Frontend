import React from "react";
import TextField from "@material-ui/core/TextField";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Button from "@material-ui/core/Button";
import {DatePicker, LocalizationProvider} from "@mui/lab";
import {NavLink} from "react-router-dom";

class Index extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            error: null,
            hashtag: "",
            tweets: [],
            friend: "",
            message: ""
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.addFriend = this.addFriend.bind(this)
    }

    handleChange(event) {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    }

    addFriend() {

        if(!localStorage.getItem('token'))
            window.location.href = "/login"
        else {
            let url = "http://127.0.0.1:8000/friendships"

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from_user: localStorage.getItem('token'),
                    to_user: this.state.friend,
                    accepted: false,
                })
            }

            fetch(url, requestOptions)
                .then(response => response.json())
                .then( (result) => {
                    if ('id' in result) {
                        this.setState({
                            message: "You have sent a friend request to " + this.state.friend
                        })
                    }
                    else {
                        this.setState({
                            message: result.message
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

        let url = "http://127.0.0.1:8000/hashtags"

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
            })
    }

    render() {
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
                            <TextField id="hashtag-input" name="hashtag" label="Hashtag or message" type="text" onChange={this.handleChange}/>
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
                            <Button style={{marginTop: 10}} variant="contained" type="submit" color="primary">Submit</Button>
                        </div>
                    </form>
                </div>
                <div style={{display: 'flex'}}>
                    <div>
                        <div>
                            <h1 className="title" style={{textAlign: "left"}}>Add friends</h1>
                        </div>
                        <div className="friend-box">
                            <TextField style={{color: 'white', marginTop: 30}} name="friend" label="Add a friend" type="text" onChange={this.handleChange}/>
                            <Button style={{marginLeft: 10, marginTop: 30}} variant="contained" type="submit" color="primary" onClick={this.addFriend}>Add friend</Button><br/>
                            <div style={{marginTop: 10}}>
                                <small>{this.state.message}</small>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h1 className="title" style={{textAlign: "left"}}>How to use?</h1>
                        </div>
                        <div className="how-to">
                                <p style={{marginTop: 20}}>
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
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Button from "@material-ui/core/Button";
import {DatePicker, LocalizationProvider} from "@mui/lab";

class Index extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            error: null,
            hashtag: "",
            tweets: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
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
            </div>
        )
    }
}

export default Index
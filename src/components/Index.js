import React from 'react'
import Button from '@mui/material/Button';
import ShowTweets from "./tweets/ShowTweets";

class Index extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            hashtag: "",
            tweets: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            hashtag: event.target.value
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
                name: this.state.hashtag
            })
        }

        fetch(url, requestOptions)
            .then(response => response.json())
            .then( () => {
                window.location.href="analysis/" + this.state.hashtag.substr(1, this.state.hashtag.length)
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
                <label>
                    Hashtag:<br/>
                    <input type="text" value={this.state.hashtag}
                           onChange={this.handleChange}/>
                </label>
                <Button onClick={this.handleSubmit} variant="contained">Submit</Button>
            </div>
        )
    }
}

export default Index
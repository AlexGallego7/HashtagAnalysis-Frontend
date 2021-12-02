import React from 'react'
import Button from '@mui/material/Button';


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

        console.log("HEy")
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
                this.props.history.push('/path')
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
            <div className="search">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Hashtag:
                        <input type="text" value={this.state.hashtag}
                               onChange={this.handleChange}/>
                    </label>
                    <Button variant="contained">Submit</Button>
                        <input type="submit" value="Submit"/>
                </form>

            </div>
        )
    }
}

export default Index
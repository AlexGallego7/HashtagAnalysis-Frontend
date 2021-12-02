import React from 'react'
import { TwitterTweetEmbed } from 'react-twitter-embed';
import positive from '../../assets/positive.png'
import negative from '../../assets/negative.png'
import neutral from '../../assets/neutral.png'
import TopTweets from "./TopTweets";

class ShowTweets extends React.Component {

    constructor(props) {
        super(props);
        this.stateChange(1)
        this.state = {
            error: null,
            tweets: []
        }
    }

    stateChange(newState) {
        setTimeout(function () {
            if (newState === -1) {
                alert('VIDEO HAS STOPPED');
            }
        }, 5000);
    }

    componentDidMount() {
        this.fetchTweets()
    }

    fetchTweets() {
        let url = "http://127.0.0.1:8000/tweets"

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: null
        }

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        tweets: result
                    })
                    console.log(result)
                })
            .catch(error => {
                console.log(error)
            })
    }

    sentimentImage(sentiment) {
        let img = ""
        if(sentiment === "POSITIVE") {
            img = positive
        }
        else if(sentiment === "NEGATIVE") {
            img = negative
        }
        else {
            img = neutral
        }
        return (
            <img src={img} alt="Sentiment"/>
        )
    }

    render() {
        let tweets = this.state.tweets.map((e, i) => {
            return (
                    <div key={i} className="tweets">
                        <div className="tweet">
                            <div className="tweet2">
                                <p>{e.username}</p>
                                <p>{e.text}</p>
                                <p>Created at: {e.date}</p>
                                <p>Sentiment: {e.score.substr(0, 5)}</p>
                                <p>Likes: {e.likes}</p>
                                <p>Retweets: {e.retweets}</p>
                                <p></p>
                            </div>
                        </div>
                        <span className="sentiment">{this.sentimentImage(e.sentiment)}</span>
                    </div>

        )
        })
        return (
            <div>
                <div>
                    <p>HEADER</p>
                    <p>HEADER</p>
                </div>
                <div>
                    <TopTweets hashtag={"nice"}/>
                </div>
                <div>
                    {
                        tweets
                    }
                </div>
            </div>
        );
    }
}

export default ShowTweets;
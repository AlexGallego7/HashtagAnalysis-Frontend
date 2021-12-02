import React from 'react'
import { TwitterTweetEmbed } from 'react-twitter-embed';
import positive from '../../assets/positive.png'
import negative from '../../assets/negative.png'
import neutral from '../../assets/neutral.png'

class TopTweets extends React.Component {

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
        let url = "http://127.0.0.1:8000/hashtags/" + this.props.hashtag + "/top"

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
                    <span className="tweet">
                        <TwitterTweetEmbed
                            tweetId={e.tweet_id.toString()}
                            options={{
                                cards: 'hidden',
                                conversation: 'none',
                                align: 'center',
                                theme: 'dark',
                            }}
                            placeholder={e.text}
                        />
                    </span>
            )
        })
        return (
            <div>
                <h2>Top Tweets</h2>
                {
                    tweets
                }
            </div>
        );
    }
}

export default TopTweets;
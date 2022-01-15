import React from 'react'
import { TwitterTweetEmbed } from 'react-twitter-embed';

class TopTweets extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            tweets: []
        }
    }

    componentDidMount() {
        this.fetchTweets()
    }

    fetchTweets() {

        let url = "https://tfg-hashtagapi-dev-we-app.herokuapp.com/hashtags/" + window.location.href.split('/')[4] + "/top"

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
                })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        let tweets = this.state.tweets.map((e, i) => {
            return (
                    <span key={i} className="tweet">
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
                <h1 className="title">Top Tweets</h1>
                {
                    tweets
                }
            </div>
        );
    }
}

export default TopTweets;
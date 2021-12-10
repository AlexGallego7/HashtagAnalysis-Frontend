import React from 'react'
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
            tweets: [],
            currentPage: 1,
            tweetsPerPage: 10,
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
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
                    console.log(this)
                })
            .catch(error => {
                console.log(error)
            })
    }

    sentimentImage(sentiment) {
        let img
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
        const tweets = this.state.tweets;
        const currentPage = this.state.currentPage;
        const tweetsPerPage = this.state.tweetsPerPage;
        const hashtag = this.state.hashtag;
        const indexOfLastTweet = currentPage * tweetsPerPage;
        const indexOfFirstTweet = indexOfLastTweet - tweetsPerPage;
        const currentTweets = tweets.slice(indexOfFirstTweet, indexOfLastTweet);

        const renderTweets = currentTweets.map((e, i) => {
            return (
                <div key={i} className="tweets">
                    <div className="tweet">
                        <ul>
                            <li>@{e.username}</li>
                            <p>{e.text}</p>
                            <p>Created at: {e.date}</p>
                            <p>Sentiment: {e.score.substr(0, 5)}</p>
                            <p>Likes: {e.likes}</p>
                            <p>Retweets: {e.retweets}</p>
                            <p/>
                        </ul>
                    </div>
                    <span className="sentiment">{this.sentimentImage(e.sentiment)}</span>
                </div>

            )})

        const pageNumbers = [];

        for(let i = 1; i <= Math.ceil(tweets.length / tweetsPerPage); i++) {
            pageNumbers.push(i)
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return(
                <li key={number} id={number} onClick={this.handleClick}>
                    {number}
                </li>
            )
        });

        return (
            <div>
                <div>
                    <p>HEADER</p>
                    <p>HEADER</p>
                </div>
                <div>
                    <TopTweets hashtag={hashtag}/>
                </div>
                <div>
                    <h1 className="title">Tweets</h1>
                    {renderTweets}
                    <ul className="page-numbers">
                        {renderPageNumbers}
                    </ul>
                </div>
            </div>
        );
    }
}

export default ShowTweets;
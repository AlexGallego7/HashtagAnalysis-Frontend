import React from 'react'
import positive from '../../assets/positive.png'
import negative from '../../assets/negative.png'
import neutral from '../../assets/neutral.png'
import alert from '../../assets/alert.png'
import TopTweets from "./TopTweets";
import Chart from "../shared/Piechart";
import Popup from 'reactjs-popup';
import PopUp from "../shared/PopUp";

class ShowTweets extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            tweets: [],
            currentPage: 1,
            tweetsPerPage: 10,
            hashtag: "",
            selectedSentiment: "",
            showPopUp: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
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
                        tweets: result,
                        hashtag: result[0].hashtag
                    })
                    console.log(this.state)
                })
            .catch(error => {
                console.log(error)
            })
    }

    getTweetsBySentiment = (sentiment) => {
        this.setState({
            selectedSentiment: sentiment
        })
        this.render()
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
        const sentiment = this.state.selectedSentiment
        const tweets = this.state.tweets;
        const currentPage = this.state.currentPage;
        const tweetsPerPage = this.state.tweetsPerPage;
        const hashtag = this.state.hashtag;
        const indexOfLastTweet = currentPage * tweetsPerPage;
        const indexOfFirstTweet = indexOfLastTweet - tweetsPerPage;
        let currentTweets;
        if(sentiment !== "") {
            currentTweets = tweets.filter(ct => ct.sentiment === sentiment)
                .slice(indexOfFirstTweet, indexOfLastTweet);
        }
        else {
            currentTweets = tweets.slice(indexOfFirstTweet, indexOfLastTweet);
        }

        const renderTweets = currentTweets
            .map((e, i) => {
            return (
                <div key={i} className="tweets">
                    <PopUp trigger={<img className="alert" src={alert} alt="Alert"/>}/>
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

        const length = Math.ceil(((sentiment === "") ?
            tweets.length : tweets.filter(t => t.sentiment === sentiment).length) / tweetsPerPage)

        for(let i = 1; i <= length; i++) {
            pageNumbers.push(i)
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return(
                <li key={number} id={number} onClick={this.handleClick}>
                    {number}
                </li>
            )
        });


        const data = [
            { title: 'Positive', value: tweets.filter(t => t.sentiment === 'POSITIVE').length, color: '#31ce68' },
            { title: 'Neutral', value: tweets.filter(t => t.sentiment === 'NEUTRAL').length, color: '#898976' },
            { title: 'Negative', value: tweets.filter(t => t.sentiment === 'NEGATIVE').length, color: '#cc4133' },
        ];

        return (
            <div>
                <div>
                    <p>HEADER</p>
                    <p>HEADER</p>
                </div>
                <div className="analysis">
                    <Chart data={data} parentCallback={this.getTweetsBySentiment}/>
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
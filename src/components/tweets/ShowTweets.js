import React from 'react'
import positive from '../../assets/positive.png'
import negative from '../../assets/negative.png'
import neutral from '../../assets/neutral.png'
import alert from '../../assets/alert.png'
import TopTweets from "./TopTweets";
import Chart from "../shared/Piechart";
import PopUp from "../shared/PopUp";
import Button from "@material-ui/core/Button";

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
        this.saveAnalysis  =this.saveAnalysis.bind(this);
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
        let url = "https://tfg-hashtagapi-dev-we-app.herokuapp.com/tweets"

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

    saveAnalysis() {

        let url = "https://tfg-hashtagapi-dev-we-app.herokuapp.com/analysis"

        const positive = this.state.tweets.filter(t => t.sentiment === 'POSITIVE').length
        const neutral = this.state.tweets.filter(t => t.sentiment === 'NEUTRAL').length
        const negative = this.state.tweets.filter(t => t.sentiment === 'NEGATIVE').length
        const tweets = this.state.tweets.length

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: localStorage.getItem('token'),
                hashtag_id: this.state.hashtag,
                hashtag: this.state.hashtag,
                positive: positive,
                neutral: neutral,
                negative: negative,
                tweets: tweets
            })
        }

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(
                () => { })
            .catch(error => {
                console.log(error)
            })

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
            { title: 'Neutral', value: tweets.filter(t => t.sentiment === 'NEUTRAL').length, color: '#e8de17' },
            { title: 'Negative', value: tweets.filter(t => t.sentiment === 'NEGATIVE').length, color: '#cc4133' },
        ];

        return (
            <div>
                <div>
                    <p>HEADER</p>
                    <p>HEADER</p>
                </div>
                <div>
                    <h1 className="title">Analysis of {this.state.hashtag}</h1>
                    { (localStorage.getItem('token')) ?
                        <Button style={{marginTop: 10, marginLeft: 160}} variant="contained" type="submit" color="primary"
                                onClick={this.saveAnalysis}>Save Analysis</Button>
                        : null
                    }

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
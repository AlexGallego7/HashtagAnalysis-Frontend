import React from 'react'
import {TwitterHashtagButton} from "react-twitter-embed";

class Trending extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            hashtags: [],
            country_id : 1
        };

    }

    componentDidMount() {
        this.fetchTrending()
    }

    fetchTrending() {
        let url = "http://127.0.0.1:8000/trending/" + this.state.country_id

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
                        hashtags: result,
                    })
                    console.log(this.state)
                })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const hashtags = this.state.hashtags;
        const renderTrends = hashtags.map((e, i) => {
            return (
                <div key={i}>
                    <div className="tweet">
                        <ul>
                            <li>{e.name}</li>
                            {
                                e.name[0] === "#" &&
                                    <TwitterHashtagButton tag={e.name}/>
                            }
                          <p/>
                        </ul>
                    </div>
                </div>

            )})

        return (
            <div>
                <div>
                    <p>HEADER</p>
                    <p>HEADER</p>
                </div>
                <div>
                    <h1 className="title">Trending</h1>
                    {renderTrends}
                </div>
            </div>
        );
    }
}

export default Trending;
import React from 'react'
import {TwitterHashtagButton} from "react-twitter-embed";
import SelectCountry from "./SelectCountry";
import Button from "@material-ui/core/Button";
import {trackPromise} from "react-promise-tracker";
import LoaderIndicator from "../shared/LoaderIndicator";

class Trending extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            hashtags: [],
            hashtag: "",
            country_id : 1
        };
        this.fetchTrending = this.fetchTrending.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    getCountryCode = (country_id) => {
        this.setState({
            country_id: country_id
        })

        this.fetchTrending(country_id)
    }

    componentDidMount() {
        this.fetchTrending(1)
    }

    handleSubmit(val, event) {
        this.postHashtag(val.name)
        event.preventDefault()
    }

    postHashtag(val) {

        let url = "http://127.0.0.1:8000/hashtags"

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: val,
                num: 100
            })
        }

        trackPromise(
            fetch(url, requestOptions)
                .then(response => response.json())
                .then( () => {

                    if(val[0] === '#')
                        window.location.href="analysis/" + val.substr(1, val.length)
                    else
                        window.location.href="analysis/" + val

                })
                .catch(error => {
                    console.log(error)
                }))
    }

    fetchTrending(country_id) {
        let url = "http://127.0.0.1:8000/trending/" + country_id

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
                <div key={i} className="trendings">
                    <div className="hashtags">
                        <ul>
                            <li>{e.name}</li>
                            <div style={{marginTop: 10}}>
                                {
                                    e.name[0] === "#" &&
                                    <TwitterHashtagButton tag={e.name}/>
                                }
                            </div>
                            <Button style={{marginTop: 10}} variant="contained" type="submit" color="primary"
                                    onClick={ (event) => this.handleSubmit(e, event)}>Analyze</Button>
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
                    <div className="select-box">
                        <SelectCountry parentCallback={this.getCountryCode}/>
                    </div>
                    <br/>
                    <LoaderIndicator/>
                    <br/>
                    <div>
                        {renderTrends}
                    </div>
                </div>
            </div>
        );
    }
}

export default Trending;
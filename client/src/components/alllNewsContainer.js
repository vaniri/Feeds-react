import React, { Component } from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';

class AllNewsContainer extends Component {
    constructor(props) {
        super(props);
        this.State = { news: [] }
    }

    showNews = async () => {
        try {
            console.log(window.location.pathname);
            let res = await axios.get(`/api/source/${window.location.pathname}`);
            if (res.mesage === "OK") {
                console.log("Successfully got news data");
                this.setState = { news: res.data.news };
            } else {
                console.log("Fail get news!");
            }
        } catch (err) {
            console.log(`Fail get news: ${err}`);
        }
    }

    componentDidMount() {
        this.showNews();
    }

    render() {
        console.log(window.location.pathname);
        return (
            <div>
                {this.news.map(news => (
                    <Grid className="news-info" maxWidth="sm">
                        <h6>{news.headline}</h6>
                        <a href={`/news/${news._id}`}>read more...</a>
                    </Grid>
                ))}
            </div>
        )
    }
}

export default AllNewsContainer;


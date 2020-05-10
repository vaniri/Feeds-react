import React, { Component } from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';

class NewsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { news: [] }
        this.newsId = props;
    }

    showNews = async () => {
        try {
            let res = await axios.get(`http://localhost:3001/news/${this.newsId.newsId}`);
            if (res.data.message === "OK") {
                console.log("Successfully got news data");
                this.setState({ news: res.data.newsObj });
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
        return (
            <div>
                <Grid className="news-info" maxWidth="sm">
                        <h6>{this.state.news.headline}</h6>
                        <p>{this.state.news.author}</p>
                        <p>{this.state.news.pubDate}</p>
                        <p>{this.state.news.summary}</p>
                        <a href={this.state.news.url}>read more...</a>
                </Grid>
            </div>
        )
    }
}

export default NewsContainer;


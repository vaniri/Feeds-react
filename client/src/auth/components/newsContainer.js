import React, { Component } from 'react';
import axios from 'axios';
import { apiUrl } from '../../utils';
import { Grid } from '@material-ui/core';
import '../../style/index.css';

class NewsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { news: [] }
        this.newsId = props;
    }

    showNews = async () => {
        try {
            let res = await axios.get(apiUrl(`/api/news/${this.newsId.newsId}`));
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
                <Grid className="news-info">
                        <h6 className="news-headline">{this.state.news.headline}</h6>
                        <h7>{this.state.news.author}</h7>
                        <p className="date">{this.state.news.pubDate}</p>
                        <p className="comment-body">{this.state.news.summary}</p>
                        <a href={this.state.news.url}>read more...</a>
                </Grid>
            </div>
        )
    }
}

export default NewsContainer;


import React, { Component } from 'react';
import axios from 'axios';
import { Grid} from '@material-ui/core';

class AllNewsContainer extends Component {
    constructor (props) {
        super (props);
        this.state = { news: []}
    }
    
    showNews = async () => {
        try {
            let res = await axios.get(`/api/source/${source}`);
            if (res.mesage === "OK") {
                console.log("Successfully got news data");
                this.setState = { news: res.data.news};
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
            {this.news.map(news => (
                <Grid className="news-info" maxWidth="sm">
                    <h6>{news.headline}</h6>
                    <p>{news.author}</p>
                    <p>{news.pubDate}</p>
                    <p>{news.summary}</p>
                    <a href={news.url}>read more...</a>
                </Grid>
            ))
            }
        </div>
    )
}
}

export default AllNewsContainer;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../../utils';
import { Grid } from '@material-ui/core';

const NewsContainer = ({ newsId }) => {
    const [ news, setNews ] = useState([]);

    const showNews = async () => {
        try {
            let res = await axios.get(apiUrl(`/api/news/${newsId}`));
            if (res.data.message === "OK") {
                console.log("Successfully got news data");
                setNews(res.data.newsObj);
            } else {
                console.log("Fail get news!");
            }
        } catch (err) {
            console.log(`Fail get news: ${err}`);
        }
    }

    useEffect(() => {
        showNews();
    }, [])

        return (
            <div>
                <Grid className="news-info">
                        <h6 className="news-headline">{news.headline}</h6>
                        <h7>{news.author}</h7>
                        <p className="date">{news.pubDate}</p>
                        <p className="comment-body">{news.summary}</p>
                        <a href={news.url}>read more...</a>
                </Grid>
            </div>
        )
}

export default NewsContainer;


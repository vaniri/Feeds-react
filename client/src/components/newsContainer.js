import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from '@material-ui/core';

const NewsContainer = (url) => {

    let { news, setNews } = useState("");

    useEffect = () => {
        showNews(url);
    }

    const showNews = async (url) => {
        try {
            let news = await axios.get(url);
            if (res.mesage === "OK") {
                console.log("Successfully got news data");
                setNews(news);
            } else {
                console.log("Fail get news!");
            }
        } catch (err) {
            console.log(`Fail get news: ${err}`);
        }
    }
    return (
        <div>
            {news.map(news => {
                <Container className="news-info" maxWidth="sm">
                    <h6>{news.headline}</h6>
                    <p>{news.author}</p>
                    <p>{news.pubDate}</p>
                    <p>{news.summary}</p>
                    <a href={news.url}>read more...</a>
                </Container>
            })
            }
        </div>
    )
}

export default NewsContainer;
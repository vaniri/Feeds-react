import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, responsiveFontSizes } from '@material-ui/core';

const SingleNewsContainer = () => {

    let { news, setNews } = useState("");

    const showNews = async () => {
        try {
            let news = await axios.get('api/source/:source');
            if (res.message === "OK") {
                console.log("Successfully got news data")
                setNews(news);
            } else {
                console.log("FAIL get news");
            }
        } catch (err) {
            console, log(`FAIL get news data ${err}`);
        }

        useEffect = () => {
            showNews();
        }

        return (
            <div>
                <Container maxWidth="sm">
                    <h6>{news.headline}</h6>
                    <p>{news.author}</p>
                    <p>{news.pubDate}</p>
                    <p>{news.summary}</p>
                    <a href={news.url}>read more...</a>
                </Container>
            </div>
        )

    }
}

export default SingleNewsContainer;
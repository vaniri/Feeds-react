import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../../utils';
import { Grid, List, ListItem, ListItemText } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const AllNewsContainer = ({ source }) => {
    const [ news, setNews ] = useState([]);
  
    const showNews = async () => {
        try {
            let res = await axios.get(apiUrl(`/api/source/${source}`))
            if (res.data.message === "OK") {
                console.log("Successfully got news data");
                setNews(res.data.news);
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
                <Grid item xs={12} md={12}>
                        <div id="demo">
                            <List>
                                {news.map(news => (
                                    <ListItem key={news._id} className="news-li">
                                        <MoreHorizIcon />
                                        <ListItemText
                                            primary={<a className="news-link" href={`/news/${news._id}`}><h6>{news.headline}</h6></a>}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                </Grid>
            </div>
        )
}

export default AllNewsContainer;


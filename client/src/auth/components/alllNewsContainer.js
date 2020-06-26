import React, { Component } from 'react';
import axios from 'axios';
import { apiUrl } from '../../utils';
import { Grid, List, ListItem, ListItemText } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import '../../style/index.css';

const count = 20;

class AllNewsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { news: [] };
        this.source = props;
        this.start = 0;
    }

    showNews = async () => {
        try {
            let res = await axios.get(apiUrl(`/api/source/${this.source.source}`), { params: { count, start: this.start } });
            if (res.data.message === "OK") {
                console.log(res.data.news)
                console.log("Successfully got news data");
                this.setState({ news: res.data.news });
                console.log(this.state.news)
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
            <div className="allnews-container">
                <Grid item xs={12} md={12}>
                        <div id="demo">
                            <List>
                                {this.state.news.map(news => (
                                    <ListItem className="news-li">
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
}

export default AllNewsContainer;


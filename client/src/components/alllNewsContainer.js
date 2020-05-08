import React, { Component } from 'react';
import axios from 'axios';
import { Grid, List, ListItem, ListItemText } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import '../style/index.css';

class AllNewsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { news: [] };
        this.source = props;
    }

    showNews = async () => {
        try {
            let res = await axios.get(`http://localhost:3001/source/${this.source.source}`)
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
        console.log(this.state.news)
        return (
            <div>
                <Grid container spacing={0}>
                    <Grid item xs={12} md={12}>
                        <div className="demo">
                            <List>
                                {this.state.news.map(news => (
                                    <ListItem className="news-container" id="news">
                                        <MoreHorizIcon />
                                        <ListItemText
                                            primary={<a className="news-link" href={`/news/${news._id}`}><h6>{news.headline}</h6></a>}
                                        />
                                    </ListItem>
                                ))}
                                
                            </List>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default AllNewsContainer;


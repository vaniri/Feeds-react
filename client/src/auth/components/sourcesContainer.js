import React, { Component } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Avatar, Grid, Typography } from '@material-ui/core';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import '../../style/index.css';

class SouresContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { sources: [] };
    }

    getSources = async () => {
        try {
            let res = await axios.get('http://localhost:3001/sources');
            if (res.data.message === "OK") {
                console.log("Soorces recived successfully");
                this.setState({ sources: res.data.sources });
            }   else {
                console.log("Fail get sources");
            }
        } catch (err) {
            console.log(`FAIl get sorces ${err}`);
        }
    }

    componentDidMount() {
        this.getSources();
    }

    render() {
        return (
            <div id="sources_container">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <div id="source-container">
                            <List>
                                {this.state.sources.map(source => (
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar alt={source.name} src={source.img} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={<a href={`/source/${source._id}`}>{source.name}</a>}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default SouresContainer;
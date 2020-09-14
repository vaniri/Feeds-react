import React from 'react';
import { List, ListItem, ListItemText, Avatar, Grid, Typography } from '@material-ui/core';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import '../../style/index.css';

const SouresContainer = ({ sources }) => {

        return (
            <div id="sources_container">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <div id="source-container">
                            <List>
                                {sources.map(source => (
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar alt={source.name} src={source.img} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            id="source"
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

export default SouresContainer;
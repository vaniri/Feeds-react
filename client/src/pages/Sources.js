import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import SourcesContainer from '../components/sourcesContainer';
import AddFeedForm from '../components/addFeedContainer';
import '../style/index.css';


const useStyles = makeStyles((theme) => ({
    root: {
       width: '100%',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
}));

const Sources = () => {
    const classes = useStyles();

    return (
        <Grid container component="main" className={classes.root} id="source">
            <Grid>
                <SourcesContainer />
            </Grid>
            <Grid>
                <AddFeedForm />
            </Grid>
        </Grid>
    )

}

export default Sources;
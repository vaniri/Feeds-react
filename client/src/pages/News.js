import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import AllNewsContainer from '../components/alllNewsContainer';


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    }
}));

const News = ({ source }) => {
    const classes = useStyles();

    return (
        <Grid container component="main" className={classes.root}>
            <AllNewsContainer source={source}/>
        </Grid>
    )

}

export default News;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../../utils';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import SourcesContainer from '../components/sourcesContainer';
import AddFeedForm from '../components/addFeedContainer';
import '../../style/index.css';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random/?news)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        minHeight: '100%'
    }
}));

const Sources = () => {
    const classes = useStyles();
    const [ sources, setSources ] = useState([]);

    const getSources = async () => {
        try {
            let res = await axios.get(apiUrl('/api/sources'));
            if (res.data.message === "OK") {
                console.log("Soorces recived successfully");
                setSources(res.data.sources);
                console.log(sources)
            }   else {
                console.log("Fail get sources");
            }
        } catch (err) {
            console.log(`FAIl get sorces ${err}`);
        }
    }

    useEffect(() => {
        getSources();
    }, [ ])


    return (
        <Grid container component="main" className={classes.root}>
            <Grid id="source" item xs={12} md={12}>
                <Grid>
                <SourcesContainer sources={sources}/>
                <AddFeedForm addHandler={getSources}/>
                </Grid>
                <Grid className={classes.image} item xs={12} md={12}></Grid>
            </Grid>
        </Grid>
    )

}

export default Sources;
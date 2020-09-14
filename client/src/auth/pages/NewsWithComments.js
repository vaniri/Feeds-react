import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import NewsContainer from '../components/newsContainer';
import CommentsContainer  from '../components/comentsContainer';
import '../../style/index.css';


const useStyles = makeStyles((theme) => ({

    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    source: {
        display: 'grid',
        width: '70%',
        margin: '1em  auto'
    }
}));

const NewsWithComments = ({ newsId }) => {
    const classes = useStyles();

    return (
        <Grid container component="main" className={classes.source}>
            <Grid>
                <NewsContainer newsId={newsId}/>
            </Grid>
            <Grid>
                <CommentsContainer  newsId={newsId}/> 
            </Grid>
            
        </Grid>
    )

}

export default NewsWithComments;
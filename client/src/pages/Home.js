import React, { useState } from 'react';
import LogInForm from '../components/loginForm';
import CreateUserForm from '../components/createUserForm';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Paper, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(4, 6),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '80%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Home = () => {
    const isAlreadyAuthorized = !!localStorage.token;
    const [isAuthorized, setAuthorized] = useState(isAlreadyAuthorized);
    const classes = useStyles();

    let cleanStorage = () => {
        localStorage.token = "";
        localStorage.userId = "";
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <LogInForm
                    classes={classes}
                    logoutHandler={() => { setAuthorized(false); cleanStorage(); }} /> :
                <CreateUserForm
                    classes={classes}
                    loginHandler={() => setAuthorized(true)} />
            </Grid>
        </Grid>
    )

}

export default Home;
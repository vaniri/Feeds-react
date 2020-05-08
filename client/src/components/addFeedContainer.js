import React, { useState } from 'react';
import { Avatar, Button, TextField, Typography } from '@material-ui/core';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    paper: {
        margin: theme.spacing(8, 4),
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
        background: 'linear-gradient(45deg, lightgreen 30%, aqua 90%)',
        color: 'black'
    }
}));

const AddFeedForm = () => {
    const [url, setUrl] = useState("");
    const classes = useStyles();

    let saveFeed = async () => {
        try {
            const res = await axios.post('http://localhost:3001/sources', { url });
            if (res.data.message === "OK") {
                console.log("feed save successfully");
            } else {
                console.log("FAIL save feed");
            }
        } catch (err) {
            console.log(`FAIL save feed ${err}`);
        }
    }

    let handleSubmit = event => {
        event.preventDefault();
        saveFeed();
    }

    return (
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                add new Feed  <RssFeedIcon />
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="feed url"
                    name="feed-url"
                    autoFocus
                    onChange={e => setUrl(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onSubmit={handleSubmit}
                >
                    Submit
              </Button>
            </form>
        </div>
    );
}

export default AddFeedForm;
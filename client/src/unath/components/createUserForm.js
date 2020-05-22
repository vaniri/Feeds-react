import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Avatar, Button, TextField, Grid, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


const CreateUserForm = ({ classes }) => {

    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const history = useHistory();

    let logInHandler = () => {
      let path = '/sources';
      history.push(path);
    }

    let createUser = async () => {
        try {
            let res = await axios.post('http://localhost:3001/user', { username, email, password });
            if (res.data.message === "OK") {
                console.log("User create successfully");
                localStorage.token = res.data.token;
                localStorage.username = res.data.user.username;
                localStorage.userId = res.data.user.userId;
                logInHandler();
            } else {
                console.log("FAIL creating new user", res.err);
            }
        } catch (err) {
            console.log(`FAIL creating new user ${err}`);
        }
    }

    let handleSubmit = event => {
        event.preventDefault();
        createUser();
    }

    return (
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign up
        </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            onChange={e => setUsername(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onSubmit={handleSubmit}
                >
                    Sign Up
          </Button>
            </form>
        </div>
    );
}

export default CreateUserForm;
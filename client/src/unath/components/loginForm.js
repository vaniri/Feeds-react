import React, { useState } from 'react';
import { Avatar, Button, TextField, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';
import { apiUrl } from '../../utils';

const LoginForm = ({ classes, loginHandler }) => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    let logInUser = async () => {
        try {
            const res = await axios.post(apiUrl('/api/login'), { email, password });
            if (res.data.message === "OK") {
                console.log("user Log in successfully");
                localStorage.token = res.data.token;
                localStorage.userId = res.data.userId;
                localStorage.username = res.data.username;
                loginHandler();
            } else {
                console.log("FAIL log in");
            }
        } catch (err) {
            console.log(`FAIL log in: ${err}`);
        }
    }

    let handleSubmit = event => {
        event.preventDefault();
        logInUser();
    }
  
    return (
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={e => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onChange={handleSubmit}
              >
                Sign In
              </Button>
            </form>
          </div>
    );
  }

  export default LoginForm;
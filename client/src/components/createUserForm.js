import React, { useState } from 'react';
import axios from 'axios';
import { Container, FilledInput, Button } from '@material-ui/core';


const CreateUserForm = props => {

    const { username, setUsername } = useState("");
    const { email, setEmail } = useState("");
    const { password, setPassword } = useState("");
    const { logInHandler } = props;

    let createUser = async () => {
        try {
            let res = await axios.post('/api/users', { username, email, password });
            if (res.message === "OK") {
                console.log("User create successfully");
                localStorage.token = res.data.token;
                localStorage.username = res.data.username;
                localStorage.userId = res.data.userId;
                logInHandler();
            } else {
                console.log("FAIL creating new user");
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
        <div>
            <Container maxWidth="sm">>
                <FilledInput
                    autoFocus
                    placeholder="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    require
                >
                </FilledInput>
                <FilledInput
                    color="primary"
                    autoFocus
                    placeholder="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    require
                >
                </FilledInput>
                <FilledInput
                    color="primary"
                    autoFocus
                    placeholder="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    require
                >
                </FilledInput>
                <Button
                    size="small"
                    type="submit"
                    onSubmit={handleSubmit}
                >
                </Button>
            </Container>
        </div>
    )
}

export default CreateUserForm
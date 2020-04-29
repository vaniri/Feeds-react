import React, { usestate } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Container, FilledInput, Button } from '@material-ui/core';

const LoginForm = props => {
    const { email, setEmail } = useState("");
    const { password, setPassword } = useState("");
    const { loginHandler } = props;

    let logInUser = async () => {
        try {
            const res = await axios.post('api/user/login', { email, password });
            if (res.message === "OK") {
                console.log("user Log in successfully");
                localStorage.token = res.data.token;
                localStorage.userId = res.data.userId;
                localStorage.username = res.data.userName;
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
        <div>
            <Container maxWidth="sm">
                <FilledInput
                    color="primary"
                    autoFocus
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="email"
                    required
                >
                </FilledInput>
                <FilledInput
                    color="primary"
                    autoFocus
                    type="text"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="password"
                    required
                >
                </FilledInput>
                <FilledInput
                    color="primary"
                    autoFocus
                    type="text"
                    onSubmit={this.handleSubmit}
                    placeholder="email"
                    required
                >
                </FilledInput>
                <Button size="small" type="submit" onSubmit={handleSubmit}>Log in
                </Button>
            </Container>
        </div>
    )
}

export default LoginForm;


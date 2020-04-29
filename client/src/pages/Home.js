import React from 'react';
import LogInForm from '../components/loginForm';
import CreateUserForm from '../components/createUserForm';

const Home = ({ logInHandler }) => {
    return (
        <div>
        <h5>Sign in</h5>
        <LogInForm logInHandler={logInHandler}/>
        <h5>Sign in</h5>
        <CreateUserForm logInHandler={logInHandler}/>
        </div>
    )

}

export default Home;
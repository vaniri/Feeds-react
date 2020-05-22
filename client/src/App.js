  
import React, { useState } from 'react';
import AuthoApp from './auth/authApp';
import UnauthoApp from './unath/unauthoApp';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const isAlreadyAuthorized = !!localStorage.token;
    const [isAuthorized, setAuthorized] = useState(isAlreadyAuthorized);

    let cleanStorage = () => {
        localStorage.token = "";
        localStorage.userId = "";
    }

    return (
        isAuthorized ?
            <AuthoApp logoutHandler={() => { setAuthorized(false); cleanStorage(); } } /> :
            <UnauthoApp loginHandler={() => setAuthorized(true)} />
    );
}

export default App;
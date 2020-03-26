import React, { useContext } from 'react';
import { auth, provider } from '../utils/firebase';
import UserContext from '../contexts/UserContext';
import Button from './Button';

const Auth = () => {
    const { setUser } = useContext(UserContext);

    const login = async () => {
        const { user } = await auth.signInWithPopup(provider);
        setUser(user);
    };

    return (
        <>
            <h1>Sueca App</h1>
            <Button onClick={login}>Entrar</Button>
        </>
    );
};

export default Auth;

import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { auth } from './lib/utils/firebase';
import UserContext from './lib/contexts/UserContext';
import Home from './lib/components/Home';
import Game from './lib/components/Game';
import Auth from './lib/components/Auth';

const App = () => {
    const [state, setState] = useState({
        user: null
    });

    const setUser = (user) => {
        setState(prevState => ({...prevState, user }));
    }

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setState(prevState => ({...prevState, user }));
            } else {
                setState(prevState => ({...prevState, user: null }));
            }
        });
    }, []);

    return (
        <UserContext.Provider value={{ user: state.user, setUser}}>
            <Router>
                <Switch>
                    <Route path="/games/:gameId">
                        {state.user ? <Game /> : <Auth />}
                    </Route>
                    <Route path="/">
                        {state.user ? <Home /> : <Auth />}
                    </Route>
                </Switch>
            </Router>
        </UserContext.Provider>
    );
}

export default App;

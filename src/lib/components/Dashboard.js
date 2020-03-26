import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import shuffleList from 'shuffle-list';
import deck from '../utils/cards';
import firebase, { auth } from '../utils/firebase';
import UserContext from '../contexts/UserContext';
import Button from './Button';

const Dashboard = () => {
    const [state, setState] = useState(false);

    const { user } = useContext(UserContext);

    const history = useHistory();

    const logout = async () => {
        await auth.signOut();
    };

    const createGame = () => {
        const gamesRef = firebase.database().ref('games');
        const gameDeck = shuffleList(shuffleList(deck));
        const trump = gameDeck[0].suit;
        const ownerHand = gameDeck.splice(0, 10);
        setState(true);
        gamesRef.push({
            trump,
            rounds: null,
            deck: gameDeck,
            players: [{
                uid: user.uid,
                email: user.email,
                owner: true,
                hand: ownerHand
            }]
        });
    };

    useEffect(() => {
        const handleGamesRefValue = (snapshot) => {
            if (state) {
                history.push(`/games/${snapshot.key}`);
            }
        }
        const gamesRef = firebase.database().ref('games').limitToLast(1);
        gamesRef.on('child_added', handleGamesRefValue);

        return () => gamesRef.off('child_added', handleGamesRefValue);
    }, [state, history]);

    return (
        <>
            <div>
                <Button onClick={createGame}>Criar um novo jogo</Button>
            </div>
            <br />
            <div>
                <Button onClick={logout}>Log Out</Button>
            </div>
        </>
    )
};

export default Dashboard;

import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import Button from './Button';

const JoinGame = ({ gameSnapshot }) => {
    const { user } = useContext(UserContext);

    const history = useHistory();

    const joinGame = () => {
        const deck = gameSnapshot.val().deck;
        const hand = deck.splice(0, 10);
        gameSnapshot.ref.transaction(currentGame => ({
            ...currentGame,
            deck,
            players:[
                ...currentGame.players,
                {
                    uid: user.uid,
                    email: user.email,
                    owner: false,
                    hand
                }
            ]
        }));
    };

    useEffect(() => {
        const handleChildChanged = (snapshot) => {
            history.push(`/games/${gameSnapshot.key}`);
        };
        gameSnapshot.ref.on('child_changed', handleChildChanged);
        return () => gameSnapshot.ref.off('child_changed', handleChildChanged);
    }, [gameSnapshot, history]);

    return (
        <>
            {gameSnapshot.val().players.length < 4 ? (
                <>
                    <h1>Você ainda não faz parte desse jogo</h1>
                    <h3>Clique no botão abaixo para participar</h3>
                    <Button onClick={joinGame}>Entrar no jogo</Button>
                </>
            ) : (
                <h1>Tarde demais, este jogo já está completo.</h1>
            )}
        </>
    );
};

export default JoinGame;

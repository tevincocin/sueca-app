import React, { useState, useEffect, useContext } from 'react';
import { find, remove, maxBy } from 'lodash';
import { useParams } from 'react-router-dom';
import firebase from '../utils/firebase';
import { getPlayer } from '../utils/game';
import UserContext from '../contexts/UserContext';
import JoinGame from './JoinGame';
import LoggedInLayout from './LoggedInLayout';
import GameRoom from './GameRoom';

const Game = () => {
    const [state, setState] = useState({
        gameSnapshot: null
    });

    const { user } = useContext(UserContext);

    const { gameId } = useParams();

    const player = state.gameSnapshot && getPlayer(state.gameSnapshot.val(), user);

    const sumRoundPoints = round => round.bets.reduce((points, bet) => (
        points + bet.card.value
    ), 0);

    const getWinningBet = (round, trump) => {
        const trumps = round.bets.filter(bet => (
            bet.card.suit.symbol === trump.symbol
        ));

        const leads = round.bets.filter(bet => (
            bet.card.suit.symbol === round.bets[0].card.suit.symbol
        ));

        if (trumps.length) {
            return maxBy(trumps, bet => bet.card.value);
        }

        if (leads.length) {
            return maxBy(leads, bet => bet.card.value);
        }

        return maxBy(round.bets, bet => bet.card.value);
    }

    const playRound = (bet) => {
        state.gameSnapshot.ref.transaction(currentGame => {
            if (currentGame.rounds){
                if (currentGame.rounds[0].bets.length < 4) {
                    currentGame.rounds[0].bets.push(bet);
                } else {
                    currentGame.rounds.unshift({ bets: [ bet ] });
                }
            } else {
                currentGame.rounds = [ { bets: [ bet ] } ];
            }

            const gamePlayer = find(currentGame.players, gamePlayer => (
                gamePlayer.uid === bet.player.uid
            ));

            remove(gamePlayer.hand, handCard => (
                handCard.symbol === bet.card.symbol
                && handCard.suit.symbol === bet.card.suit.symbol
            ));

            return currentGame;
        });
    }

    const countRound  = () => {
        state.gameSnapshot.ref.transaction(currentGame => {
            const totalPoints = sumRoundPoints(currentGame.rounds[0]);
            const winningBet = getWinningBet(currentGame.rounds[0], currentGame.trump);
            currentGame.rounds[0].result = {
                points: totalPoints,
                winner: winningBet.player
            };
            return currentGame;
        });
    }

    const handleGameRefValue = (snapshot) => {
        setState(prevState => ({ ...prevState, gameSnapshot: snapshot }));
    };

    useEffect(() => {
        const gameRef = firebase.database().ref(`games/${gameId}`);
        gameRef.on('value', handleGameRefValue);

        return () => gameRef.off('value', handleGameRefValue);
    }, [gameId]);

    return state.gameSnapshot && (
        <LoggedInLayout>
            {player ? (
                <GameRoom
                    game={state.gameSnapshot.val()}
                    player={player}
                    countRound={countRound}
                    playRound={playRound}
                />
            ) : (
                <JoinGame gameSnapshot={state.gameSnapshot}/>
            )}
        </LoggedInLayout>
    );
};

export default Game;

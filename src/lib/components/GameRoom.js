import React from 'react';
import { find, findIndex } from 'lodash';
import styled from 'styled-components';
import { getTeams, canPlay, getRounds } from '../utils/game';
import Button from './Button';
import PlayerHand from './PlayerHand';
import Card from './Card';

const TeamTable = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 0.5em;
    > div {
        flex-basis: 0;
        flex-grow:1;

        &:first-child {
            background: #c3fdc6;
        }

        &:last-child {
            background: #c1f3ff;
        }
    }
`;

const GameTable = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    font-size: 0.5em;
    background: #99b599;
    > div {
        min-height: 90px;
        &:nth-child(1), &:nth-child(3) {
            display: flex;
            justify-content: center;
        }

        &:nth-child(2) {
            display: flex;
            justify-content: space-between;
        }
    }
`;

const GameRoom = ({ game, player, playRound, countRound }) => {
    if (game.players.length < 4) {
        return (
            <div style={{color:'red'}}>
                {(4 - game.players.length)} jogadores faltando pra começar a partida.
            </div>
        );
    } else {
        const teams = getTeams(game);

        const rounds = getRounds(game);

        const playerTeamIndex = findIndex(teams, team => (
            find(team, teamPlayer => player.uid === teamPlayer.uid)
        ));

        const playerIndex = findIndex(teams[playerTeamIndex], teamPlayer => (
            player.uid === teamPlayer.uid
        ));

        const player1Bet = rounds[0]
            && find(rounds[0].bets, bet => bet.player.uid === player.uid);

        const player2Bet = rounds[0]
            && teams[playerTeamIndex][playerIndex === 0 ? 1 : 0]
            && find(rounds[0].bets, bet => (
                bet.player.uid === teams[playerTeamIndex][playerIndex === 0 ? 1 : 0].uid
            ));

        const player3Bet = rounds[0]
            && teams[playerTeamIndex ? 0 : 1][0]
            && find(rounds[0].bets, bet => (
                bet.player.uid === teams[playerTeamIndex ? 0 : 1][0].uid
            ));

        const player4Bet = rounds[0]
            && teams[playerTeamIndex ? 0 : 1][1]
            && find(rounds[0].bets, bet => (
                bet.player.uid === teams[playerTeamIndex ? 0 : 1][1].uid
            ));

        return (
            <>
                <TeamTable>
                    <div>
                        <strong>Dupla A</strong>
                        <br />
                        <strong>Pontos: {rounds.reduce((prev, next) => {
                            if (next.result && (
                                (teams[0][0] && next.result.winner.uid === teams[0][0].uid)
                                || (teams[0][1] && next.result.winner.uid === teams[0][1].uid)
                            )) {
                                return prev + next.result.points
                            } else {
                                return prev;
                            }
                        }, 0)}
                        </strong>
                        <br />
                        <small>{teams[0][0] && teams[0][0].email}</small>
                        <br />
                        <small>{teams[0][1] && teams[0][1].email}</small>
                    </div>
                    <div>
                        <strong>Dupla B</strong>
                        <br />
                        <strong>Pontos: {rounds.reduce((prev, next) => {
                            if (next.result && (
                                (teams[1][0] && next.result.winner.uid === teams[1][0].uid)
                                || (teams[1][1] && next.result.winner.uid === teams[1][1].uid)
                            )) {
                                return prev + next.result.points
                            } else {
                                return prev;
                            }
                        }, 0)}
                        </strong>
                        <br />
                        <small>{teams[1][0] && teams[1][0].email}</small>
                        <br />
                        <small>{teams[1][1] && teams[1][1].email}</small>
                    </div>
                </TeamTable>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <strong>Trunfo: {game.trump.name}</strong>
                    <Button
                        onClick={countRound}
                        disabled={rounds[0] && rounds[0].bets.length < 4}
                    >
                        Contar rodada
                    </Button>
                </div>
                <PlayerHand
                    hand={player.hand || []}
                    isAllowedToPlay={canPlay(game, player)}
                    onCardSelected={card => playRound({
                        card,
                        player: {
                            uid: player.uid,
                            email: player.email
                        }
                    })}
                />
                {rounds.length > 0 && (
                    <>
                        <div>
                            <strong>Rodada: {rounds.length}</strong>
                        </div>
                        <GameTable>
                            <div>
                                {player1Bet && (
                                    <div>
                                        <div>{player1Bet.player.email}</div>
                                        <Card color={player1Bet.card.suit.symbol.match(/o|c/) && 'red'}>{player1Bet.card.name} de {player1Bet.card.suit.name}</Card>
                                    </div>
                                )}
                            </div>
                            <div>
                                <div>
                                    {player3Bet && (
                                        <div>
                                            <div>{player3Bet.player.email}</div>
                                            <Card color={player3Bet.card.suit.symbol.match(/o|c/) && 'red'}>{player3Bet.card.name} de {player3Bet.card.suit.name}</Card>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    {player4Bet && (
                                        <div>
                                            <div>{player4Bet.player.email}</div>
                                            <Card color={player4Bet.card.suit.symbol.match(/o|c/) && 'red'}>{player4Bet.card.name} de {player4Bet.card.suit.name}</Card>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                {player2Bet && (
                                    <div>
                                        <div>{player2Bet.player.email}</div>
                                        <Card color={player2Bet.card.suit.symbol.match(/o|c/) && 'red'}>{player2Bet.card.name} de {player2Bet.card.suit.name}</Card>
                                    </div>
                                )}
                            </div>
                        </GameTable>
                    </>
                )}
            </>
        );
    }
};

export default GameRoom;

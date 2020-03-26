import { find } from 'lodash';

const x = process.env.NODE_ENV === 'development' ? 2 : 4;

const y = process.env.NODE_ENV === 'development' ? 2 : 1;

export const getTeams = (game) => {
    const players = game.players.map(player => ({
        uid: player.uid,
        email: player.email
    }));

    return process.env.NODE_ENV === 'development'
        ? [
            [players[0]],
            [players[1]]
        ]
        : [
            [players[0], players[2]],
            [players[1], players[3]]
        ];
};

export const getPlayer = (game, user) => find(game.players, player => player.uid === user.uid);

export const getRounds = (game) => game.rounds || [];

export const teamsAreReady = (players) => players.length === x;

export const playerAlreadyBet = (player, rounds) => player.hand && player.hand.length <= (10 - (rounds.length * y));

export const isRoundComplete = (rounds) => !rounds.length || rounds[0].result !== undefined;

export const canPlay = (game, player) => teamsAreReady(game.players) && (!playerAlreadyBet(player, getRounds(game)) || isRoundComplete(getRounds(game)));

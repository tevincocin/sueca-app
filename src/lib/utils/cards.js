import { cloneDeep } from 'lodash';

const cards = [
    {
        name: 'Ás',
        symbol: 'a',
        value: 11
    },
    {
        name: 'Sete',
        symbol: '7',
        value: 10
    },
    {
        name: 'Rei',
        symbol: 'k',
        value: 4
    },
    {
        name: 'Valete',
        symbol: 'j',
        value: 3
    },
    {
        name: 'Dama',
        symbol: 'q',
        value: 2
    },
    {
        name: 'Seis',
        symbol: '6',
        value: 0
    },
    {
        name: 'Cinco',
        symbol: '5',
        value: 0
    },
    {
        name: 'Quatro',
        symbol: '4',
        value: 0
    },
    {
        name: 'Três',
        symbol: '3',
        value: 0
    },
    {
        name: 'Dois',
        symbol: '2',
        value: 0
    }
];

const suits = [
    {
        name: 'Ouros',
        symbol: 'o',
    },
    {
        name: 'Espadas',
        symbol: 'e',
    },
    {
        name: 'Copas',
        symbol: 'c',
    },
    {
        name: 'Paus',
        symbol: 'p',
    }
]

const deck = suits.reduce((deck, suit) => {
    return [...deck, ...cloneDeep(cards).map(card => ({...card, suit}))];
}, []);

export default deck;

import React from 'react';
import styled from 'styled-components';
import Card from './Card';

const CardRow =  styled.div`
    overflow: scroll;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    > * {
        flex-basis: 0;
        flex-grow: 1;
        flex-shrink: none;
    }
`;

const PlayerHand = ({ hand, onCardSelected, isAllowedToPlay = true }) => {
    return (
        <CardRow>
            {hand.map((card, index) => (
                <Card
                    key={index}
                    disabled={!isAllowedToPlay}
                    color={card.suit.symbol.match(/o|c/) && 'red'}
                    onClick={() => onCardSelected(card)}
                >
                    {card.name} de {card.suit.name}
                </Card>
            ))}
        </CardRow>
    )
};

export default PlayerHand;

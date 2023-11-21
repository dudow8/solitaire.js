import React from 'react';
import { styled } from 'styled-components';
import useSolitaireState from '../../hooks';
import Card from '../card';

const Foundation = () => {
    const foundation = useSolitaireState('foundation');
    const piles = [1, 2, 3, 4];
    return (
        <Container>
            {piles.map((pile, key) => (
                <Pile key={key}>
                    {foundation.piles[pile].map((card, key) =>
                        <Card
                            key={key}
                            label={card.value}
                            suit={card.suit} />
                    )}
                </Pile>
            ))}

        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: flex-start;
`;

const Pile = styled.div`
    width: 125px;
    height: 180px;
    margin: 0 5px;
    border: 2px inset #125734;
    border-radius: 10px;
    box-sizing: content-box;
    display: flex;
    flex-direction: column;

    > * {
        position: absolute;
    }
`;

export default Foundation;

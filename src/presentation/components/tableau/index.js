import React from 'react';
import { styled } from 'styled-components';
import useSolitaireState from '../../hooks';
import Card from '../card';

const Tableau = () => {
    const tableau = useSolitaireState('tableau');
    const piles = Object.keys(tableau.piles);

    return (
        <Container>
            {piles.map((pile, pile_index) => (
                <Pile key={pile_index}>
                    {tableau.piles[pile].map((card, card_index) =>
                        <Card
                            key={card_index}
                            label={card.value}
                            suit={card.suit}
                            flipped={card.flipped} />
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
    margin: 0 6px;
    box-sizing: content-box;
    display: flex;
    flex-direction: column;

    > * {
        margin-bottom: -145px;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, .5);
    }
`;

export default Tableau;

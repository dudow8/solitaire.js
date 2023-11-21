import React from 'react';
import { styled } from 'styled-components';
import useSolitaireState from '../../hooks';
import Card from '../card';

const Tableau = () => {
    const tableau = useSolitaireState('tableau');
    const piles = [1, 2, 3, 4, 5, 6, 7];

    return (
        <Container>
            {piles.map((pile, key) => (
                <Pile key={key}>
                    {tableau.piles[pile].map((card, key) =>
                        <Card
                            key={key}
                            label={card.value}
                            suit={card.suit}
                            flipped={true}/>
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

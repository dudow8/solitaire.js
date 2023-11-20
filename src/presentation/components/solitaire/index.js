import React, { useSyncExternalStore } from 'react';
import { styled, createGlobalStyle } from 'styled-components';
import useSolitaireState from '../../hooks';
import { newGame } from '../../../application/index';
import Card from '../card';

const GlobalStyle = createGlobalStyle`
    html, body {
        margin: 0px;
        padding: 0px;
    }

    #root {
        margin: 0px;
        padding: 0px;
        position: fixed;
        width: 100vw;
        height: 100vh;
        background-color: darkgreen;
    }
`;

newGame();

const Solitaire = () => {
    const tableau = useSolitaireState('tableau');
    return (
        <>
            <GlobalStyle />
            {tableau.piles[7].map((card, key) =>
                <Card
                    key={key}
                    label={card.value}
                    suit={card.suit} />
            )}
        </>
    );
}

export default Solitaire;

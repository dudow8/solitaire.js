import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { newGame } from '../../../application/index';

import Tableau from '../tableau';
import Foundation from '../foundation';
import Stock from '../stock';
import { DragAndDropProvider, useGameplayState } from '../../hooks';

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
        background-color: #1A4314;
        display: flex;
        justify-content: center;

        > div {
            /* transform: scale(65%);
            transform-origin: top left; */
        }
    }
`;

const GameLayout = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
`;

const GameLayoutHead = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const Score = styled.div`
    color: white;
    font-size: 30px;
    margin: 10px 100px 50px;
    display: flex;
    justify-content: space-between;
`;

newGame();

const Solitaire = () => {
    const gameplay = useGameplayState('score');
    return (
        <DragAndDropProvider>
            <GameLayout>
                <GlobalStyle />
                <Score>
                    <span>score: {gameplay.score}</span>
                    <span>moves: {gameplay.moves}</span>
                    <span>state: {gameplay.game_state}</span>
                </Score>
                <GameLayoutHead>
                    <Foundation />
                    <Stock />
                </GameLayoutHead>
                <Tableau />
            </GameLayout>
        </DragAndDropProvider>
    );
}

export default Solitaire;

import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { DragAndDropProvider } from '../../hooks/daganddrop';
import { KeyBindingProvider } from '../../hooks/keybinding';
import Tableau from '../tableau';
import Foundation from '../foundation';
import Stock from '../stock';
import Controls from '../controls';

const GlobalStyle = createGlobalStyle`
    html, body {
        margin: 0px;
        padding: 0px;
        width: 100vw;
        min-height: 100vh;
        font-family: sans-serif;
        background-color: #1A4314;
    }

    #root {
        width: 100vw;
        min-height: 100vh;
        margin: 0px;
        padding: 0px;
        display: flex;
        justify-content: center;
        overflow: hidden;

        /* zoom: 64%; */
        /* transform: scale(100%); */
        /* transform-origin: top center; */
    }
`;

const GameLayout = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
    gap: 25px;
`;

const GameLayoutHead = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Solitaire = () => {
    return (
        <DragAndDropProvider>
            <KeyBindingProvider>
                <GlobalStyle />
                <GameLayout>
                    <Controls />
                    <GameLayoutHead>
                        <Foundation />
                        <Stock />
                    </GameLayoutHead>
                    <Tableau />
                </GameLayout>
            </KeyBindingProvider>
        </DragAndDropProvider>
    );
}

export default Solitaire;

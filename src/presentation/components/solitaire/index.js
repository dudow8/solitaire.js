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
    }

    #root {
        width: 100vw;
        min-height: 100vh;
        margin: 0px;
        padding: 0px;
        background-color: #1A4314;
        display: flex;
        justify-content: center;
        overflow: hidden;

        > div {
            /* zoom: 64%; */
            /* transform: scale(60%) translateX(20%); */
            /* transform-origin: top left; */
        }
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

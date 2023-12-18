import React from 'react';
import { newGame } from '../../../application/factory';
import { useGameplayState } from '../../hooks/state';
import { Game } from '../../../model';
import styled from "styled-components";

const Controls = () => {
    const gameplay = useGameplayState('score');
    const isPlaying = [
        Game.STATE.PLAYING,
        Game.STATE.COMPLETED,
    ].includes(gameplay.game_state);

    return (
        <Content>
            <Actions>
                <Action onClick={newGame}>
                    New Game
                </Action>
            </Actions>
            {isPlaying &&
                <Score>
                    <ScoreItem>
                        <ScoreItemLabel>score</ScoreItemLabel>
                        {gameplay.score}
                    </ScoreItem>
                    <ScoreItem>
                        <ScoreItemLabel>moves</ScoreItemLabel>
                        {gameplay.moves}
                    </ScoreItem>
                </Score>
            }
        </Content>
    );
};

const Content = styled.div`
    border-bottom: 2px solid #125734;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding: 5px 25px;
    background-color: rgba(18,87,52, .2);
`;

const Actions = styled.div`
    display: flex;
    flex-direction: row;
`;

const Action = styled.button`
    height: 40px;
    border-radius: 10px;
    padding: 0px 20px;
    background-color: rgba(18,87,52, .6);
    color: rgba(255, 255, 255, .8);
    outline: none;
    border: none;
    transition: .2s ease;

    &:hover {
        background-color: rgba(18,87,52, 1);
        color: rgba(255, 255, 255, 1);
        transition: .2s ease;
    }
`;

const Score = styled.div`
    color: white;
    gap: 30px;
    display: flex;
    justify-content: space-between;
`;

const ScoreItem = styled.span`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 25px;
`;

const ScoreItemLabel = styled.span`
    font-size: 14px;
    color: rgba(255, 255, 255, .8);
`;

export default Controls;

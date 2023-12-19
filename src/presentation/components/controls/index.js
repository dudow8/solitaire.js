import React from 'react';
import application from '../../../application/factory';
import { useGameplayState } from '../../hooks/state';
import { useGameplayTime } from './hooks';
import { Game } from '../../../model';
import * as S from './styles';

const Controls = () => {
    const gameplay = useGameplayState('score');
    const { gameplayTime, resetTimer } = useGameplayTime();
    const isPlaying = [
        Game.STATE.PLAYING,
        Game.STATE.COMPLETED,
    ].includes(gameplay.game_state);

    const newGame = () => {
        resetTimer();
        application.newGame();
    };

    return (
        <S.Content>
            <S.Actions>
                <S.Action onClick={newGame}>
                    New Game
                </S.Action>
            </S.Actions>
            {isPlaying &&
                <S.Score>
                    <S.ScoreItem>
                        <S.ScoreItemLabel>time</S.ScoreItemLabel>
                        {gameplayTime}
                    </S.ScoreItem>
                    <S.ScoreItem>
                        <S.ScoreItemLabel>score</S.ScoreItemLabel>
                        {gameplay.score}
                    </S.ScoreItem>
                    <S.ScoreItem>
                        <S.ScoreItemLabel>moves</S.ScoreItemLabel>
                        {gameplay.moves}
                    </S.ScoreItem>
                </S.Score>
            }
        </S.Content>
    );
};

export default Controls;

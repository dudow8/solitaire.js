import { useEffect, useState } from 'react';
import { Game } from '../../../model';
import { useGameplayState } from '../../hooks/state';

const computeGameplayTime = (game_initialized_timestamp) => {
    if (!game_initialized_timestamp)
        return '00:00'

    const time = new Date().getTime() - game_initialized_timestamp;
    const minutes = new Date(time).getMinutes().toString().padStart(2, '0');
    const seconds = new Date(time).getSeconds().toString().padStart(2, '0');

    return `${minutes}:${seconds}`;
};

const computeTotalGameplayTime = (game_initialized_timestamp, game_completed_timestamp) => {
    if (!game_initialized_timestamp || !game_completed_timestamp)
        return '00:00'

    const time = game_completed_timestamp - game_initialized_timestamp;
    const minutes = new Date(time).getMinutes().toString().padStart(2, '0');
    const seconds = new Date(time).getSeconds().toString().padStart(2, '0');

    return `${minutes}:${seconds}`;
};

const getInitialGameplayTime = ({ game_state, game_initialized_timestamp, game_completed_timestamp }) => {
    if (game_state === Game.STATE.COMPLETED) {
        return computeTotalGameplayTime(
            game_initialized_timestamp,
            game_completed_timestamp,
        );
    }

    return computeGameplayTime(game_initialized_timestamp);
}

const useGameplayTime = () => {
    const gameplay = useGameplayState('score');
    const [gameplayTime, setGameplayTime] = useState(
        getInitialGameplayTime(gameplay)
    );

    const resetTimer = () => {
        setGameplayTime('00:00');
    }

    useEffect(() => {
        if (gameplay.game_state === Game.STATE.PLAYING) {
            const timer = setInterval(() => {
                const time = computeGameplayTime(gameplay.game_initialized_timestamp);
                setGameplayTime(time);
            }, 1000);

            return () => {
                clearInterval(timer);
            }
        }
    }, [gameplay.game_state, gameplay.game_id]);

    return {
        gameplayTime,
        resetTimer,
    };
};

export {
    useGameplayTime,
};

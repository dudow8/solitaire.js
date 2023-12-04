import { useSyncExternalStore } from 'react';
import ModelProjection from '../../../projection/model';
import GameplayProjection from '../../../projection/gameplay';

const useSolitaireState = (selector = null) => {
    const state = useSyncExternalStore(
        ModelProjection.subscribe,
        ModelProjection.getSnapshot,
    );
    if (selector) {
        return state[selector] || null;
    }
    return state;
};

const useGameplayState = (selector = null) => {
    const state = useSyncExternalStore(
        GameplayProjection.subscribe,
        GameplayProjection.getSnapshot,
    );
    if (selector) {
        return state[selector] || null;
    }
    return state;
};

export {
    useSolitaireState,
    useGameplayState
};

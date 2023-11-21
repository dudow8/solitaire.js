import { useSyncExternalStore } from 'react';
import { getSnapshot, subscribe } from '../../projection/model';


const useSolitaireState = (selector = null) => {
    const state = useSyncExternalStore(subscribe, getSnapshot);
    if (selector) {
        return state[selector] || null;
    }
    return state;
};

export default useSolitaireState;

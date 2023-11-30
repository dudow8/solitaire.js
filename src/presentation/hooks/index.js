import React from 'react';
import { useSyncExternalStore, useState, createContext, useContext } from 'react';
import ModelProjection from '../../projection/model';
import GameplayProjection from '../../projection/gameplay';

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

const DragAndDropContext = createContext(null);

const DragAndDropProvider = ({ children }) => {
    const [event, setEvent] = useState(null);
    const contextValue = {
        event,
        setEvent,
    };

    return (
        <DragAndDropContext.Provider value={contextValue}>
            {children}
        </DragAndDropContext.Provider>
    );
};

const useDragAndDropContext = () => {
    const { event, setEvent } = useContext(DragAndDropContext);

    return {
        drag: (content_type, payload) => {
            const event = {
                content_type,
                payload,
            }
            setEvent(event);
        },
        drop: () => {
            const data = Object.assign({}, event);
            setEvent(null);
            return data;
        }
    };
};

export {
    useSolitaireState,
    useGameplayState,
    useDragAndDropContext,
    DragAndDropProvider,
};

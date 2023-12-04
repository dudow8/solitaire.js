import React from 'react';
import { useState, createContext, useContext } from 'react';

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
    useDragAndDropContext,
    DragAndDropProvider,
};

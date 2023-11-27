const eventStore = [];

const dispatch = (event) => {
    eventStore.push(event);
};

const getEventStore = () => {
    return Array.from(eventStore);
};

const dropEventStore = () => {
    eventStore.length = 0;
};

const computeState = (state = {}, events, reduces) => {
    const stateObjectKeys = Object.keys(reduces);
    return events.reduce((state, event) => {
        return stateObjectKeys.reduce((snapshot, stateKey) => {
            const reducer = reduces[stateKey][event.type];
            const stateObject = Object.freeze(state[stateKey]);
            if (reducer) {
                const obj = {
                    ...snapshot,
                    [stateKey]: reducer(stateObject, event),
                };
                return obj;
            }
            return snapshot;
        }, state);
    }, state);
};

module.exports = {
    dispatch,
    getEventStore,
    computeState,
    dropEventStore,
};

const reduces = require('../reduces');

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
}

const eventStore = [];

const dispatch = (event) => {
    eventStore.push(event);
};

const getSnapshot = (state = {}) => {
    const snapshot = computeState(state, eventStore, reduces);
    return Object.freeze(snapshot);
};

module.exports = {
    computeState,
    getSnapshot,
    dispatch,
};

const { computeState, getEventStore } = require('../../commons/store');
const stock = require('./stock');
const tableau = require('./tableau');
const foundation = require('./foundation');

const hooks = {
    stock,
    tableau,
    foundation,
};

const getSnapshot = (state = {}) => {
    const eventStore = getEventStore();
    const snapshot = computeState(state, eventStore, hooks);
    return Object.freeze(snapshot);
};

module.exports = {
    getSnapshot,
};

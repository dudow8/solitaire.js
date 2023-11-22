const store = require('../../commons/store');
const stock = require('./stock');
const tableau = require('./tableau');
const foundation = require('./foundation');

const hooks = {
    stock,
    tableau,
    foundation,
};

const subscribers = [];
let snapshot = {};

const subscribe = (callback) => {
    if (typeof callback === "function") {
        subscribers.push(callback);
        return () => { unsubscribe(callback) };
    }
    return null;
};

const unsubscribe = (callback) => {
    const index = subscribers.indexOf(callback);
    subscribers.splice(index, 1);
};

const dispatch = (event) => {
    if (event) {
        store.dispatch(event);
        cacheSnapshot(event);
        subscribers.forEach((notify) => {
            notify();
        });
    }
};

const cacheSnapshot = (event) => {
    const state = event ? snapshot : {};
    const eventStore = event ? store.getEventStore() : [event];

    snapshot = store.computeState(state, eventStore, hooks);
    snapshot = Object.freeze(snapshot);
};

const dropEventStore = () => {
    store.dropEventStore();
    snapshot = {};
}

const getSnapshot = () => {
    return snapshot;
};

module.exports = {
    getSnapshot,
    subscribe,
    dispatch,
    dropEventStore,
};

const store = require('../store');
const pubsub = require('../pubsub');

const projectionFactory = (PUBSUB_TOPIC, hooks) => {
    let snapshot = {};

    const onStoreAppendEvent = (event) => {
        cacheSnapshot(event);
        pubsub.notify(PUBSUB_TOPIC);
    };
    store.subscribe(onStoreAppendEvent);

    const subscribe = (callback) => {
        const unsubscribe = pubsub.subscribe(PUBSUB_TOPIC, callback);
        return unsubscribe;
    };

    const getSnapshot = () => {
        return snapshot;
    };

    const dropEventStore = () => {
        store.dropEventStore();
        snapshot = {};
    }

    const cacheSnapshot = (event) => {
        const state = getSnapshot();
        const eventStore = [event];

        snapshot = store.computeState(state, eventStore, hooks);
        snapshot = Object.freeze(snapshot);
    };

    return {
        subscribe,
        getSnapshot,
        dropEventStore,
    };
};

module.exports = projectionFactory;

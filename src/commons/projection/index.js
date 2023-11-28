const store = require('../store');
const pubsub = require('../pubsub');

const projectionFactory = (PUBSUB_TOPIC, hooks) => {
    let snapshot = {};

    const append = (event) => {
        if (event) {
            store.append(event);
            cacheSnapshot(event);
            pubsub.notify(PUBSUB_TOPIC);
        }
    };

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
        append,
        subscribe,
        getSnapshot,
        dropEventStore,
    };
};

module.exports = projectionFactory;

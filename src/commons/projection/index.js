const { EVENTS: STORE_EVENTS } = require('../store');

const projection = (store, pubsub, PUBSUB_TOPIC, hooks) => {
    let snapshot = {};

    const onStoreAppendEvent = (event) => {
        cacheSnapshot(event);
        pubsub.notify(PUBSUB_TOPIC);
    };

    const onDropEventStore = (event) => {
        if (event.type === STORE_EVENTS.DROP_STORE)
            snapshot = {};
    }

    const storeSubscribe = () => {
        const subscribe = [
            onStoreAppendEvent,
            onDropEventStore,
        ];
        subscribe.map(store.subscribe);
    }

    const subscribe = (callback) => {
        const unsubscribe = pubsub.subscribe(PUBSUB_TOPIC, callback);
        return unsubscribe;
    };

    const getSnapshot = () => {
        return snapshot;
    };

    const cacheSnapshot = (event) => {
        const state = getSnapshot();
        const eventStore = [event];

        snapshot = store.computeState(state, eventStore, hooks);
        snapshot = Object.freeze(snapshot);
    };

    storeSubscribe();

    return {
        subscribe,
        getSnapshot,
    };
};

module.exports = projection;

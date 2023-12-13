const projection = (store, pubsub, PUBSUB_TOPIC, hooks) => {
    let snapshot = {};

    const onStoreAppendEvent = (event) => {
        cacheSnapshot(event);
        pubsub.notify(PUBSUB_TOPIC);
    };

    const storeSubscribe = () => {
        store.subscribe(onStoreAppendEvent);
    }

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

    storeSubscribe();

    return {
        subscribe,
        getSnapshot,
        dropEventStore,
    };
};

module.exports = projection;

const { EVENTS: STORE_EVENTS } = require('../store');

const EVENTS = {
    INITIALIZED: 'projection/on-create',
};

const projection = (store, pubsub, PUBSUB_TOPIC, hooks) => {
    let snapshot = {};

    const onCreate = () => {
        const events = store.getEvents();
        if (events.length) {
            loadEvents(events);
        }
        else {
            const event = { type: EVENTS.INITIALIZED };
            cacheSnapshot(event);
        }

        storeSubscribe();
    };

    const onStoreAppendEvent = (event) => {
        cacheSnapshot(event);
        pubsub.notify(PUBSUB_TOPIC);
    };

    const onDropEventStore = (event) => {
        if (event.type === STORE_EVENTS.DROPPED)
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
        const eventStore = [event];
        loadEvents(eventStore)
    };

    const loadEvents = (eventStore) => {
        const state = getSnapshot();
        snapshot = computeState(state, eventStore, hooks);
        snapshot = Object.freeze(snapshot);
    }

    const computeState = (state, events, reduces) => {
        if (state === null || typeof state !== 'object') {
            return null;
        }

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

    onCreate();

    return {
        subscribe,
        loadEvents,
        getSnapshot,
        computeState,
    };
};

module.exports = {
    EVENTS,
    projection,
};

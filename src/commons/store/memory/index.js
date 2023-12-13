const PUBSUB_TOPIC = 'event-store';

const memoryEventStore = (pubsub) => {
    const eventStore = [];

    const append = (event) => {
        if (event === null)
            throw 'error trying to append a null event to the store';

        eventStore.push(event);
        pubsub.notify(PUBSUB_TOPIC, event);
    };

    const getEventStore = () => {
        return Array.from(eventStore);
    };

    const dropEventStore = () => {
        eventStore.length = 0;
    };

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

    const subscribe = (callback) => {
        const unsubscribe = pubsub.subscribe(PUBSUB_TOPIC, callback);
        return unsubscribe;
    };

    return {
        append,
        subscribe,
        getEventStore,
        computeState,
        dropEventStore,
    };
}

module.exports = memoryEventStore;

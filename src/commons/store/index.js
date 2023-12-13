const PUBSUB_TOPIC = 'event-store';
const EVENTS = {
    DROP_STORE: 'event-store/drop',
};

const eventStore = (stream, pubsub) => {
    const append = (event) => {
        if (event === null)
            throw 'error trying to append a null event to the store';

        stream.append(event);
        pubsub.notify(PUBSUB_TOPIC, event);
    };

    const getEventStore = () => {
        return stream.getAll();
    };

    const dropEventStore = () => {
        const event = {
            type: EVENTS.DROP_STORE,
        };
        stream.drop();
        pubsub.notify(PUBSUB_TOPIC, event);
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

module.exports = {
    eventStore,
    EVENTS,
};

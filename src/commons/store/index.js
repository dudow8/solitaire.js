const PUBSUB_TOPIC = 'event-store';
const EVENTS = {
    DROPPED: 'event-store/dropped',
};

const eventStore = (stream, pubsub) => {
    const getEvents = () => {
        return stream.getAll();
    };

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
            type: EVENTS.DROPPED,
        };
        stream.drop();
        pubsub.notify(PUBSUB_TOPIC, event);
    };

    const subscribe = (callback) => {
        const unsubscribe = pubsub.subscribe(PUBSUB_TOPIC, callback);
        return unsubscribe;
    };

    return {
        append,
        getEvents,
        subscribe,
        getEventStore,
        dropEventStore,
    };
}

module.exports = {
    eventStore,
    EVENTS,
};

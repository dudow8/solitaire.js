const pubsub = require('../pubsub');
const memoryEventStore = require('./memory');

let eventStore = null;

const eventStoreFactory = () => {
    if (!eventStore)
    eventStore = memoryEventStore(pubsub);

    return eventStore;
};

module.exports = eventStoreFactory();

const pubsub = require('../pubsub');
const memory = require('./memory');

let memoryEventStore = null;

const memoryStoreFaEventctory = () => {
    if (!memoryEventStore)
        memoryEventStore = memory(pubsub);

    return memoryEventStore;
}

module.exports = {
    memoryEventStore: memoryStoreFaEventctory(),
};

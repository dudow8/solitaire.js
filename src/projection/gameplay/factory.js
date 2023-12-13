const pubsub = require('../../commons/pubsub');
const { memoryEventStore } = require('../../commons/store/factory');
const score = require('./score');
const projection = require('../../commons/projection');

let projectionWithMemoryEventStore = null;
const PUBSUB_TOPIC = 'projection-gameplay';
const hooks = { score };

const projectionWithMemoryEventStoreFactory = () => {
    if (!projectionWithMemoryEventStore)
        projectionWithMemoryEventStore = projection(memoryEventStore, pubsub, PUBSUB_TOPIC, hooks);

    return projectionWithMemoryEventStore;
}

module.exports = projectionWithMemoryEventStoreFactory();

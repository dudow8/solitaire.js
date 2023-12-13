const pubsub = require('../../commons/pubsub');
const { memoryEventStore } = require('../../commons/store/factory');
const stock = require('./stock');
const tableau = require('./tableau');
const foundation = require('./foundation');
const projection = require('../../commons/projection');

let projectionWithMemoryEventStore = null;
const PUBSUB_TOPIC = 'projection-model';
const hooks = { stock, tableau, foundation };

const projectionWithMemoryEventStoreFactory = () => {
    if (!projectionWithMemoryEventStore)
        projectionWithMemoryEventStore = projection(memoryEventStore, pubsub, PUBSUB_TOPIC, hooks);

    return projectionWithMemoryEventStore;
}

module.exports = projectionWithMemoryEventStoreFactory();

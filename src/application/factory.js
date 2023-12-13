const application = require('./index');
const { memoryEventStore } = require('../commons/store/factory');
const projection = require('../projection/model/factory');

let applcationWithMemoryEventStore = null;

const applcationWithMemoryEventStoreFactory = () => {
    if (!applcationWithMemoryEventStore)
        applcationWithMemoryEventStore = application(
            memoryEventStore,
            projection
        );

    return applcationWithMemoryEventStore;
};

module.exports = applcationWithMemoryEventStoreFactory()

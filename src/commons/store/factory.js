const pubsub = require('../pubsub');
const localStorageStream = require('./localstorage');
const memoryStorageStream = require('./memorystorage');
const { eventStore } = require('./index');

let _eventStore = null;

const getStream = () => {
    if (process.env.presentation === 'web')
        return localStorageStream.factory()

    return memoryStorageStream.factory();
};

const eventStoreFactory = () => {
    if (!_eventStore) {
        const stream = getStream();
        _eventStore = eventStore(stream, pubsub);
    }

    return _eventStore;
};

module.exports = eventStoreFactory();

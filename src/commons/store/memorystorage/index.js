const EVENT_STORE_KEY = 'solitaire/evens';
const memoryStorage = {};

const memoryStorageStream = () => {
    const append = (event) => {
        if (event) {
            const store = getAll();
            const eventStore = [...store, event];
            memoryStorage[EVENT_STORE_KEY] = eventStore;
        }
    };

    const getAll = () => {
        const eventStore = memoryStorage[EVENT_STORE_KEY] || [];
        return eventStore;
    };

    const drop = () => {
        memoryStorage[EVENT_STORE_KEY] = [];
    };

    return { append, getAll, drop };
};

const factory = () => {
    return memoryStorageStream();
}

module.exports = {
    memoryStorageStream,
    factory,
};

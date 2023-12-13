const EVENT_STORE_KEY = 'solitaire/evens';

const localStorageStream = (localStorage) => {
    const append = (event) => {
        if (event) {
            const store = getAll();
            const eventStore = [...store, event];
            localStorage.setItem(EVENT_STORE_KEY, JSON.stringify(eventStore));
        }
    };

    const getAll = () => {
        const rawData = localStorage.getItem(EVENT_STORE_KEY) || `[]`;
        const eventStore = JSON.parse(rawData);
        return eventStore;
    };

    const drop = () => {
        localStorage.clear();
    };

    return { append, getAll, drop };
};

const factory = () => {
    return localStorageStream(window.localStorage);
}

module.exports = {
    localStorageStream,
    factory,
};

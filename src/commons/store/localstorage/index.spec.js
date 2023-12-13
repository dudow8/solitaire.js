const { localStorageStream } = require('./index');

let mockStorage = null;
const mockLocalStorage = {
    setItem: (event, value) => { mockStorage = value },
    getItem: () => mockStorage,
    clear: () => mockStorage = null,
}

describe('Commons/Store/LocalStorage', () => {
    const { append, getAll, drop } = localStorageStream(mockLocalStorage);

    beforeEach(() => {
        mockStorage = null
    });

    test('getAll() should return an empty eventStore', () => {
        const eventStore = getAll();
        expect(eventStore).toEqual([]);
    });

    test('append() should add a new event to the eventStore', () => {
        const event = {
            type: 'test'
        };
        append(event);
        expect(getAll()).toEqual([event]);
    });

    test('drop() should remove all eventStore data', () => {
        const event = {
            type: 'test'
        };
        append(event);
        expect(getAll()).toEqual([event]);

        drop();
        expect(getAll()).toEqual([]);
    });
});
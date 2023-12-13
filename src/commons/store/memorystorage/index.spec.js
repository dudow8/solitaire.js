const { memoryStorageStream } = require('./index');

describe('Commons/Store/LocalStorage', () => {
    const { append, getAll, drop } = memoryStorageStream();

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

        drop();
        append(event);
        expect(getAll()).toEqual([event]);

        drop();
        expect(getAll()).toEqual([]);
    });
});

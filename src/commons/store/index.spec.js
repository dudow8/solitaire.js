const pubsub = require('../pubsub');
const { eventStore } = require('./index');
const memoryStorageStream = require('./memorystorage');

describe('Commons/Store', () => {
    const stream = memoryStorageStream.factory()
    const {
        append,
        getEventStore,
        dropEventStore,
        subscribe,
    } = eventStore(stream, pubsub);

    describe('dropEventStore()', () => {
        test('eventStore should be [] after dropEventStore being invoked', () => {
            const events = [{
                type: 'state/started',
                payload: {}
            }, {
                type: 'state/changed',
                payload: {}
            }];

            events.map(append);
            const eventStoreBeforeDrop = getEventStore();

            dropEventStore();
            const eventStoreAfterDrop = getEventStore();

            expect(eventStoreAfterDrop).toEqual([]);
            expect(eventStoreBeforeDrop.length).toBe(2);
        });
    })

    describe('append()', () => {
        test('should throw an exception if event is null', () => {
            const event = null;

            expect(() => {
                append(event);
            }).toThrowError();
        });
    })

    describe('subscribe()', () => {
        test('should assert all subscription and notification flow', () => {
            const callback = jest.fn();
            const unsubscribe = subscribe(callback);
            const events = [{
                type: 'state/started',
                payload: {}
            }, {
                type: 'state/changed',
                payload: {}
            }];

            events.map(append);
            expect(callback).toBeCalledTimes(2);

            expect(typeof unsubscribe).toBe('function');
            getEventStore();
        });
    })
});

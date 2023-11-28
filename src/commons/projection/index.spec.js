const projectionFactory = require('./index');
const { initializeGame } = require('../../model/game');
const store = require('../store');
const stock = require('../../projection/model/stock');

describe('Commons/Projection', () => {
    const {
        append,
        subscribe,
        getSnapshot,
        dropEventStore,
    } = projectionFactory('projection-model', { stock });

    test('should invoke a subscribed callback after a event append', () => {
        const callback = jest.fn();

        subscribe(callback);
        append({
            type: 'test',
            payload: {},
        });

        expect(callback).toBeCalled();
    });

    test('should return null if the subscribe callback param is not a function', () => {
        const unsubscribe = subscribe({});
        expect(unsubscribe).toBeNull();
    });

    test('shouldn\'t invoke the callback after being unsubscribe', () => {
        const callback = jest.fn();

        const unsubscribe = subscribe(callback);
        unsubscribe();
        append({
            type: 'test',
            payload: {},
        });

        expect(callback).not.toBeCalled();

    });

    test('dropEventStore should erease a previus snapshot', () => {
        const dropEventStoreMock = jest.spyOn(store, 'dropEventStore');
        const event = initializeGame();
        append(event);

        const cachedSnapshotBeforeDrop = getSnapshot();
        dropEventStore();
        const cachedSnapshotAfterDrop = getSnapshot();

        expect(dropEventStoreMock).toBeCalled();
        expect(Object.keys(cachedSnapshotBeforeDrop).length).toBeGreaterThan(0);
        expect(cachedSnapshotAfterDrop).toEqual({});
    });
});
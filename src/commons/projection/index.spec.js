const { projection } = require('./index');
const { initializeGame } = require('../../model/game');
const store = require('../store/factory');
const pubsub = require('../pubsub');
const stock = require('../../projection/model/stock');

describe('Commons/Projection', () => {
    const {
        subscribe,
        getSnapshot,
        computeState,
    } = projection(store, pubsub, 'projection-model', { stock });

    test('onCreate() should loadEvents() if theres events on the storage', () => {
        const mock_events = [{ type: 'mock-event' }];
        const mock_store = {
            getEvents: jest.fn(() => mock_events),
            subscribe: jest.fn(),
        };
        const test_projection = projection(mock_store, pubsub, 'projection-model', { stock });
        expect(mock_store.getEvents).toBeCalled();
    });

    test('should return a projection instance without exceptions', () => {
        expect(() => {
            {
                projection(store, pubsub, 'projection-model', { stock });
            }
        }).not.toThrowError();

        expect(() => {
            {
                projection();
            }
        }).toThrowError();
    });

    test('should invoke a subscribed callback after a event append', () => {
        const callback = jest.fn();

        subscribe(callback);
        store.append({
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
        store.append({
            type: 'test',
            payload: {},
        });

        expect(callback).not.toBeCalled();

    });

    test('dropEventStore should erease a previus snapshot', () => {
        const dropEventStoreMock = jest.spyOn(store, 'dropEventStore');
        const event = initializeGame();
        store.append(event);

        const cachedSnapshotBeforeDrop = getSnapshot();
        store.dropEventStore();
        const cachedSnapshotAfterDrop = getSnapshot();

        expect(dropEventStoreMock).toBeCalled();
        expect(Object.keys(cachedSnapshotBeforeDrop).length).toBeGreaterThan(0);
        expect(cachedSnapshotAfterDrop).toEqual({});
    });

    describe('computeState()', () => {
        test('a snapshot should be created based on the eventStore and hooks', () => {
            const reduces = {
                stateObjectA: {
                    'state/started': (state, event) => ({
                        started: 'stateObjectA'
                    }),
                    'state/changed': (state, event) => ({
                        ...state,
                        changed: 'stateObjectA'
                    })
                },
                stateObjectB: {
                    'state/started': (state, event) => ({
                        started: 'stateObjectB'
                    })
                }
            };

            const events = [{
                type: 'state/started',
                payload: {}
            }, {
                type: 'state/changed',
                payload: {}
            }];

            const state = {
                stateObjectC: {
                    started: 'stateObjectC'
                }
            };

            const snapshot = computeState(state, events, reduces);

            expect(Object.keys(snapshot).length).toBe(3);

            expect(snapshot.stateObjectA.started).toBe('stateObjectA');
            expect(snapshot.stateObjectA.changed).toBe('stateObjectA');
            expect(snapshot.stateObjectB.started).toBe('stateObjectB');
            expect(snapshot.stateObjectC.started).toBe('stateObjectC');
        });

        test('should return null case initial state is not a valid object', () => {
            const reduces = {
                stateObjectB: {
                    'state/started': (state, event) => ({
                        started: 'stateObjectB'
                    })
                }
            };

            const events = [{
                type: 'state/started',
                payload: {}
            }, {
                type: 'state/changed',
                payload: {}
            }];

            const snapshotWithNullState = computeState(null, events, reduces);
            const snapshotWithIntegerState = computeState(100, events, reduces);

            expect(snapshotWithNullState).toBeNull();
            expect(snapshotWithIntegerState).toBeNull();
        });
    });
});

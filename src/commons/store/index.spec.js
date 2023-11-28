const {
    append,
    computeState,
    getEventStore,
    dropEventStore,
} = require('./index');

describe('Commons/Store', () => {
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
});

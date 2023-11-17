const {
    computeState
} = require('./index');

describe('Projection/Store', () => {
    describe('computeState()', () => {
        test('computeState', () => {
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
            },{
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
    });
});

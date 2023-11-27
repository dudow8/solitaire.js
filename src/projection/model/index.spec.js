const {
    subscribe,
    dispatch,
} = require('./index');

describe('Projection', () => {
    test('should invoke a subscribed callback after a event dispatch', () => {
        const callback = jest.fn();

        subscribe(callback);
        dispatch({
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
        dispatch({
            type: 'test',
            payload: {},
        });

        expect(callback).not.toBeCalled();

    });
});

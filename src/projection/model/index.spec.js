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

    test('shouldn\'t invoke the callback after being unscribed', () => {
        const callback = jest.fn();

        const unscribe = subscribe(callback);
        unscribe();
        dispatch({
            type: 'test',
            payload: {},
        });

        expect(callback).not.toBeCalled();

    });
});

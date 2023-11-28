const {
    subscribe,
    notify,
} = require('./index');

const TOPIC = 'test-topic';

describe('Commons/PubSub', () => {
    test('should invoke a subscribed callback after notification', () => {
        const callback = jest.fn();

        subscribe(TOPIC, callback);
        notify(TOPIC);

        expect(callback).toBeCalled();
        expect(callback).toHaveBeenCalledWith(null);
    });

    test('should invoke a subscribed callback passing data after notification', () => {
        const callback = jest.fn();
        const data = { data: 'test' };

        subscribe(TOPIC, callback);
        notify(TOPIC, data);

        expect(callback).toBeCalled();
        expect(callback).toHaveBeenCalledWith(data);
    });

    test('subscribe should return null if the subscribe callback param is not a function', () => {
        const unsubscribe = subscribe(TOPIC, { content: 'not-a-function' });
        expect(unsubscribe).toBeNull();
    });

    test('should return unsusbscription function', () => {
        const callback = jest.fn();
        const unsubscribe = subscribe(TOPIC, callback);
        expect(typeof unsubscribe).toBe('function');
    });

    test('should not raise an error case the notify function is invoked and no previous initialized topic', () => {
        expect(() => {
            notify(`${TOPIC}-new`);
        }).not.toThrowError();
    });
});
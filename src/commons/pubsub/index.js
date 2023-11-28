const subscribers = {};

const subscribe = (topic, callback) => {
    if (typeof callback === "function") {
        subscribers[topic] = subscribers[topic] || [];
        subscribers[topic].push(callback);
        return () => { unsubscribe(topic, callback) };
    }
    return null;
};

const unsubscribe = (topic, callback) => {
    const index = subscribers[topic].indexOf(callback);
    subscribers[topic].splice(index, 1);
};

const notify = (topic, data = null) => {
    const queue = subscribers[topic] || [];
    queue.forEach((notify) => {
        notify(data);
    });
};

module.exports = {
    subscribe,
    notify,
};

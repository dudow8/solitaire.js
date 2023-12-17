const pubsub = require('../../commons/pubsub');
const eventStore = require('../../commons/store/factory');
const score = require('./score');
const { projection } = require('../../commons/projection');

let _projection = null;
const PUBSUB_TOPIC = 'projection-gameplay';
const hooks = { score };

const projectionFactory = () => {
    if (!_projection)
        _projection = projection(eventStore, pubsub, PUBSUB_TOPIC, hooks);

    return _projection;
}

module.exports = projectionFactory();

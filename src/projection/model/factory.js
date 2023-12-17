const pubsub = require('../../commons/pubsub');
const eventStore = require('../../commons/store/factory');
const stock = require('./stock');
const tableau = require('./tableau');
const foundation = require('./foundation');
const { projection } = require('../../commons/projection');

let _projection = null;
const PUBSUB_TOPIC = 'projection-model';
const hooks = { stock, tableau, foundation };

const projectionFactory = () => {
    if (!_projection)
        _projection = projection(eventStore, pubsub, PUBSUB_TOPIC, hooks);

    return _projection;
}

module.exports = projectionFactory();

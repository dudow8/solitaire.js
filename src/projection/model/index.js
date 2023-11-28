const stock = require('./stock');
const tableau = require('./tableau');
const foundation = require('./foundation');
const projectionFactory = require('../../commons/projection');

const PUBSUB_TOPIC = 'projection-model';
const hooks = { stock, tableau, foundation };
const projection = projectionFactory(PUBSUB_TOPIC, hooks);

module.exports = projection;

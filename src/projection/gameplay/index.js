const score = require('./score');
const projectionFactory = require('../../commons/projection');

const PUBSUB_TOPIC = 'projection-gameplay';
const hooks = { score };
const projection = projectionFactory(PUBSUB_TOPIC, hooks);

module.exports = projection;

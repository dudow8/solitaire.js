const application = require('./index');
const eventStore = require('../commons/store/factory');
const projection = require('../projection/model/factory');

let _application = null;

const applcationFactory = () => {
    if (!_application)
        _application = application(
            eventStore,
            projection
        );

    return _application;
};

module.exports = applcationFactory()

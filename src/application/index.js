const {
    dispatch,
    getSnapshot,
    dropEventStore,
} = require('../projection/model');

const {
    Game,
    Foundation,
    Stock
} = require('../model/index');

const newGame = () => {
    dropEventStore();
    const event = Game.initializeGame();
    dispatch(event);
};

module.exports = {
    newGame,
};

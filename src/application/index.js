const { dispatch } = require('../commons/store');
const { getSnapshot } = require('../projection/model');
const {
    Game,
    Foundation,
    Stock
} = require('../model/index');

let state  = {};

const newGame = () => {
    const event = Game.newGame();
    dispatch(event);
    state = getSnapshot();
};

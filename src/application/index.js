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

const heartAceCard = {
    index: 0,
    value: 'A',
    suit: 'heart',
};
const heartTwoCard = {
    index: 1,
    value: '2',
    suit: 'heart',
};

const newGame = () => {
    dropEventStore();
    const event = Game.initializeGame();
    eventMock = {
        ...event,
        payload: {
            ...event.payload,
            foundation: {
                1: [heartAceCard],
                2: [],
                3: [],
                4: [],
            }
        }
    }
    // dispatch(event);
    dispatch(eventMock);
};

const flipStockCard = () => {
    const snapshot = getSnapshot();
    const event = Stock.flipStockCard(snapshot);
    dispatch(event);
}

module.exports = {
    newGame,
    flipStockCard,
};

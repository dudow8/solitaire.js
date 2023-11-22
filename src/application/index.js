const {
    dispatch,
    getSnapshot,
    dropEventStore,
} = require('../projection/model');

const {
    Game,
    Stock,
    Foundation,
    Tableau,
} = require('../model/index');

const newGame = () => {
    dropEventStore();
    const event = Game.initializeGame();
    dispatch(event);
};

const flipStockCard = () => {
    const snapshot = getSnapshot();
    const event = Stock.flipStockCard(snapshot);
    dispatch(event);
}

const moveCardFromStockToFoundation = (stockIndex, foundationPileIndex) => {
    const snapshot = getSnapshot();
    const payload = {
        stockIndex,
        foundationPileIndex,
    };
    const event = Foundation.moveCardFromStockToFoundation(snapshot, payload);
    dispatch(event);
}

const moveCardFromTableauToFoundation = (tableauPileIndex, foundationPileIndex) => {
    const snapshot = getSnapshot();
    const payload = {
        tableauPileIndex,
        foundationPileIndex,
    };
    const event = Foundation.moveCardFromTableauToFoundation(snapshot, payload);
    dispatch(event);
}

const moveCardStackBetweenTableauPiles = (fromTableauPileIndex, fromPileCardPosition, toTableauPileIndex) => {
    const snapshot = getSnapshot();
    const payload = {
        fromTableauPileIndex,
        fromPileCardPosition,
        toTableauPileIndex,
    };
    const event = Tableau.moveCardStackBetweenTableauPiles(snapshot, payload);
    dispatch(event);
}

const moveCardFromStockToTableau = (stockIndex, tableauPileIndex) => {
    const snapshot = getSnapshot();
    const payload = {
        stockIndex,
        tableauPileIndex,
    };
    const event = Tableau.moveCardFromStockToTableau(snapshot, payload);
    dispatch(event);
}

const moveCardFromFoundationToTableau = (foundationPileIndex, tableauPileIndex) => {
    const snapshot = getSnapshot();
    const payload = {
        foundationPileIndex,
        tableauPileIndex,
    };
    const event = Tableau.moveCardFromFoundationToTableau(snapshot, payload);
    dispatch(event);
}

module.exports = {
    newGame,
    flipStockCard,
    moveCardFromStockToFoundation,
    moveCardFromTableauToFoundation,
    moveCardStackBetweenTableauPiles,
    moveCardFromStockToTableau,
    moveCardFromFoundationToTableau,
};

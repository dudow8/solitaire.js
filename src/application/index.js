const { append } = require('../commons/store');
const {
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
    append(event);
};

const flipStockCard = () => {
    const snapshot = getSnapshot();
    const event = Stock.flipStockCard(snapshot);
    append(event);
}

const moveCardFromStockToFoundation = (stockIndex, foundationPileIndex) => {
    const snapshot = getSnapshot();
    const payload = {
        stockIndex,
        foundationPileIndex,
    };
    const event = Foundation.moveCardFromStockToFoundation(snapshot, payload);
    append(event);
}

const moveCardFromTableauToFoundation = (tableauPileIndex, foundationPileIndex) => {
    const snapshot = getSnapshot();
    const payload = {
        tableauPileIndex,
        foundationPileIndex,
    };
    const event = Foundation.moveCardFromTableauToFoundation(snapshot, payload);
    append(event);
}

const moveCardStackBetweenTableauPiles = (fromTableauPileIndex, fromPileCardPosition, toTableauPileIndex) => {
    const snapshot = getSnapshot();
    const payload = {
        fromTableauPileIndex,
        fromPileCardPosition,
        toTableauPileIndex,
    };
    const event = Tableau.moveCardStackBetweenTableauPiles(snapshot, payload);
    append(event);
}

const moveCardFromStockToTableau = (stockIndex, tableauPileIndex) => {
    const snapshot = getSnapshot();
    const payload = {
        stockIndex,
        tableauPileIndex,
    };
    const event = Tableau.moveCardFromStockToTableau(snapshot, payload);
    append(event);
}

const moveCardFromFoundationToTableau = (foundationPileIndex, tableauPileIndex) => {
    const snapshot = getSnapshot();
    const payload = {
        foundationPileIndex,
        tableauPileIndex,
    };
    const event = Tableau.moveCardFromFoundationToTableau(snapshot, payload);
    append(event);
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

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

const response = (payload = {}) => ({
    success: { status: 'success', payload },
    error: { status: 'error', payload },
});

const checkGameComplete = () => {
    const snapshot = getSnapshot();
    const event = Game.completeGame(snapshot);
    if (event) {
        append(event);
    }
};

const newGame = () => {
    dropEventStore();
    const event = Game.initializeGame();

    if (event) {
        append(event);
        return response().success;
    }
    return response().error;
};

const flipStockCard = () => {
    const snapshot = getSnapshot();
    const event = Stock.flipStockCard(snapshot);

    if (event) {
        append(event);
        return response().success;
    }
    return response().error;
}

const moveCardFromStockToFoundation = (stockIndex, foundationPileIndex) => {
    const snapshot = getSnapshot();
    const payload = {
        stockIndex,
        foundationPileIndex,
    };
    const event = Foundation.moveCardFromStockToFoundation(snapshot, payload);

    if (event) {
        append(event);
        checkGameComplete();
        return response().success;
    }
    return response().error;
}

const moveCardFromTableauToFoundation = (tableauPileIndex, foundationPileIndex) => {
    const snapshot = getSnapshot();
    const payload = {
        tableauPileIndex,
        foundationPileIndex,
    };
    const event = Foundation.moveCardFromTableauToFoundation(snapshot, payload);

    if (event) {
        append(event);
        checkGameComplete();
        return response().success;
    }
    return response().error;
}

const moveCardStackBetweenTableauPiles = (fromTableauPileIndex, fromPileCardPosition, toTableauPileIndex) => {
    const snapshot = getSnapshot();
    const payload = {
        fromTableauPileIndex,
        fromPileCardPosition,
        toTableauPileIndex,
    };
    const event = Tableau.moveCardStackBetweenTableauPiles(snapshot, payload);

    if (event) {
        append(event);
        return response().success;
    }
    return response().error;
}

const moveCardFromStockToTableau = (stockIndex, tableauPileIndex) => {
    const snapshot = getSnapshot();
    const payload = {
        stockIndex,
        tableauPileIndex,
    };
    const event = Tableau.moveCardFromStockToTableau(snapshot, payload);

    if (event) {
        append(event);
        return response().success;
    }
    return response().error;
}

const moveCardFromFoundationToTableau = (foundationPileIndex, tableauPileIndex) => {
    const snapshot = getSnapshot();
    const payload = {
        foundationPileIndex,
        tableauPileIndex,
    };
    const event = Tableau.moveCardFromFoundationToTableau(snapshot, payload);

    if (event) {
        append(event);
        return response().success;
    }
    return response().error;
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

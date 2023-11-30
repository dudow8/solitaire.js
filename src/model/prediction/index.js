const Foundation = require('../foundation');
const Tableau = require('../tableau');

const predict = (state, steps, payload) => {
    for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        const event = step(state, payload);
        if (event !== null) {
            return event;
        }
    };

    return null;
};

const predictStockMoveToFoundation = (state) => {
    const { index: stockIndex } = state.stock.active;
    const piles = Object.keys(state.foundation.piles);

    const event = piles.reduce((event, foundationPileIndex) => {
        if (event !== null) {
            return event;
        }
        const payload = { stockIndex, foundationPileIndex };
        return Foundation.moveCardFromStockToFoundation(state, payload);
    }, null);

    return event;
};

const predictStockMoveToTableau = (state) => {
    const { index: stockIndex } = state.stock.active;
    const piles = Object.keys(state.tableau.piles);

    const event = piles.reduce((event, tableauPileIndex) => {
        if (event !== null) {
            return event;
        }
        const payload = { stockIndex, tableauPileIndex };
        return Tableau.moveCardFromStockToTableau(state, payload);
    }, null);

    return event;
};

const predictStockMove = (state) => {
    const steps = [
        predictStockMoveToFoundation,
        predictStockMoveToTableau,
    ];

    const event = predict(state, steps);
    return event;
};

const predictTableauMoveToFoundation = (state, { fromTableauPileIndex, fromPileCardPosition }) => {
    const fromPile = state.tableau.piles[fromTableauPileIndex];

    if (fromPileCardPosition === fromPile.length - 1) {
        const piles = Object.keys(state.foundation.piles);

        const event = piles.reduce((event, foundationPileIndex) => {
            if (event !== null) {
                return event;
            }
            const payload = {
                tableauPileIndex: fromTableauPileIndex,
                foundationPileIndex
            };
            return Foundation.moveCardFromTableauToFoundation(state, payload);
        }, null);

        return event;
    }

    return null;
};

const predictTableauMoveBetweenPiles = (state, { fromTableauPileIndex, fromPileCardPosition }) => {
    const tableauPiles = state.tableau.piles;
    const topMovingCard = tableauPiles[fromTableauPileIndex][fromPileCardPosition];

    if (!topMovingCard.flipped) {
        const piles = Object.keys(tableauPiles);

        const event = piles.reduce((event, pile_index) => {
            if (event !== null) {
                return event;
            }

            const payload = {
                fromTableauPileIndex,
                fromPileCardPosition,
                toTableauPileIndex: pile_index,
            };
            return Tableau.moveCardStackBetweenTableauPiles(state, payload);
        }, null);

        return event;
    }

    return null;
};

const predictTableauMove = (state, { fromTableauPileIndex, fromPileCardPosition }) => {
    const steps = [
        predictTableauMoveToFoundation,
        predictTableauMoveBetweenPiles,
    ];
    const payload = {
        fromTableauPileIndex,
        fromPileCardPosition,
    };

    const event = predict(state, steps, payload);
    return event;
};

module.exports = {
    predictStockMove,
    predictTableauMove,
};

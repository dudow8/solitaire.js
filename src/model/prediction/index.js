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

const predictTableauMoveToFoundation = (state, { from_tableau_pile_index, from_pile_card_position }) => {
    const from_pile = state.tableau.piles[from_tableau_pile_index];

    if (from_pile_card_position === from_pile.length - 1) {
        const piles = Object.keys(state.foundation.piles);

        const event = piles.reduce((event, foundationPileIndex) => {
            if (event !== null) {
                return event;
            }
            const payload = {
                tableauPileIndex: from_tableau_pile_index,
                foundationPileIndex
            };
            return Foundation.moveCardFromTableauToFoundation(state, payload);
        }, null);

        return event;
    }

    return null;
};

const predictTableauMove = (state, { from_tableau_pile_index, from_pile_card_position }) => {
    const steps = [
        predictTableauMoveToFoundation,
    ];
    const payload = {
        from_tableau_pile_index,
        from_pile_card_position,
    };

    const event = predict(state, steps, payload);
    return event;
};

module.exports = {
    predictStockMove,
    predictTableauMove,
};

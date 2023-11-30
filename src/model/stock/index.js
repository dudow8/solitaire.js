const Foundation = require('../foundation');
const Tableau = require('../tableau');

const EVENTS = {
    STOCK_CARD_FLIPPED: 'stock/stock-card-flipped',
};

const selectNextIndex = (pile, active_index) => {
    if (active_index === null)
        return 0;

    if (active_index + 1 < pile.length)
        return active_index + 1

    return null;
}

const selectNextActiveCard = (pile, active_index) => {
    if (active_index !== null) {
        return pile[active_index];
    }

    return null;
};

const flipStockCard = (state) => {
    const stock = state.stock;
    if (stock.pile.length) {
        const active_index = selectNextIndex(stock.pile, stock.active.index);
        const active_card = selectNextActiveCard(stock.pile, active_index);

        return {
            type: EVENTS.STOCK_CARD_FLIPPED,
            payload: {
                active_index,
                active_card,
            }
        };
    }

    return null;
};

const predictMoveToFoundation = (state) => {
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

const predictMoveToTableau = (state) => {
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

const predictMove = (state) => {
    const moveToFoundationEvent = predictMoveToFoundation(state);
    if (moveToFoundationEvent) {
        return moveToFoundationEvent;
    }

    const moveToTableauEvent = predictMoveToTableau(state);
    if (moveToTableauEvent) {
        return moveToTableauEvent;
    }

    return null;
};

module.exports = {
    EVENTS,
    flipStockCard,
    predictMove,
};

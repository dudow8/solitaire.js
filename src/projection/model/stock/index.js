const {
    Game,
    Stock,
    Tableau,
    Foundation,
} = require('../../../model');
const Projection = require('../../../commons/projection');

const onCreate = () => ({
    active: {
        index: null,
        card: null,
    },
    pile: [],
});

const selectNextIndex = (pile, active_index) => {
    if (pile.length < 1) {
        return null;
    }

    if (active_index - 1 >= 0) {
        return active_index - 1;
    }

    return null;
}

const selectNextActiveCard = (pile, active_index) => {
    if (active_index !== null) {
        return pile[active_index];
    }

    return null;
};

const gameInitialized = (state, { payload }) => {
    const pile = payload.stock;
    return {
        active: {
            index: null,
            card: null,
        },
        pile,
    }
};

const stockCardFlipped = (state, { payload }) => {
    return {
        ...state,
        active: {
            index: payload.active_index,
            card: payload.active_card,
        }
    }
};

const cardMovedFromStockToTableau = (state, { payload }) => {
    const pile = [].concat(
        state.pile.slice(0, payload.stock_index),
        state.pile.slice(payload.stock_index + 1),
    );

    const active_index = selectNextIndex(pile, state.active.index);
    const active_card = selectNextActiveCard(pile, active_index);

    return {
        active: {
            index: active_index,
            card: active_card,
        },
        pile,
    };
};

const cardMovedFromStockToFoundation = (state, { payload }) => {
    const pile = [].concat(
        state.pile.slice(0, payload.stock_index),
        state.pile.slice(payload.stock_index + 1),
    );

    const active_index = selectNextIndex(pile, state.active.index);
    const active_card = selectNextActiveCard(pile, active_index);

    return {
        active: {
            index: active_index,
            card: active_card,
        },
        pile,
    };
};

module.exports = {
    [Projection.EVENTS.INITIALIZED]: onCreate,
    [Game.EVENTS.GAME_INITIALIZED]: gameInitialized,
    [Stock.EVENTS.STOCK_CARD_FLIPPED]: stockCardFlipped,
    [Tableau.EVENTS.CARD_MOVED_FROM_STOCK_TO_TABLEAU]: cardMovedFromStockToTableau,
    [Foundation.EVENTS.CARD_MOVED_FROM_STOCK_TO_FOUNDATION]: cardMovedFromStockToFoundation,
};

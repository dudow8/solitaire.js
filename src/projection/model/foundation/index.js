const {
    Game,
    Tableau,
    Foundation,
} = require('../../../model');
const Projection = require('../../../commons/projection');

const onCreate = () => ({
    piles: {
        1: [],
        2: [],
        3: [],
        4: [],
    }
});

const gameInitialized = (state, { payload }) => {
    const { foundation: piles } = payload;
    return {
        piles,
    };
};

const cardMovedFromTableauToFoundation = (state, { payload }) => {
    const pile = state.piles[payload.foundation_pile].concat(payload.card)
    const piles = {
        ...state.piles,
        [payload.foundation_pile]: pile,
    };
    return { ...state, piles };
};

const cardMovedFromStockToFoundation = (state, { payload }) => {
    const pile = state.piles[payload.foundation_pile].concat(payload.card)
    const piles = {
        ...state.piles,
        [payload.foundation_pile]: pile,
    };
    return { ...state, piles };
};

const cardMovedFromFoundationToTableau = (state, { payload }) => {
    const pile = state.piles[payload.foundation_pile].slice(0, -1);
    const piles = {
        ...state.piles,
        [payload.foundation_pile]: pile,
    }
    return { ...state, piles };
};

module.exports = {
    [Projection.EVENTS.INITIALIZED]: onCreate,
    [Game.EVENTS.GAME_INITIALIZED]: gameInitialized,
    [Foundation.EVENTS.CARD_MOVED_FROM_TABLEAU_TO_FOUNDATION]: cardMovedFromTableauToFoundation,
    [Foundation.EVENTS.CARD_MOVED_FROM_STOCK_TO_FOUNDATION]: cardMovedFromStockToFoundation,
    [Tableau.EVENTS.CARD_MOVED_FROM_FOUNDATION_TO_TABLEAU]: cardMovedFromFoundationToTableau,
};

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
    'solitaire/game-initialized': gameInitialized,
    'foundation/card-moved-from-tableau-to-foundation': cardMovedFromTableauToFoundation,
    'foundation/card-moved-from-stock-to-foundation': cardMovedFromStockToFoundation,
    'tableau/card-moved-from-foundation-to-tableau': cardMovedFromFoundationToTableau,
};

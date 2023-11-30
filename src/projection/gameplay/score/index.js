const {
    Game,
    Stock,
    Tableau,
    Foundation,
} = require('../../../model');

const constraintMinScore = (score) => {
    if (score < 0) {
        return 0;
    }
    return score;
}

const gameInitialized = (state, payload) => {
    return { score: 0, moves: 0 };
};

const stockCardFlipped = (state, payload) => {
    const moves = state.moves + 1;
    return { ...state, moves };
};

const cardMovedFromStockToFoundation = (state, payload) => {
    const score = state.score + 10;
    const moves = state.moves + 1;
    return { score, moves };
};

const cardMovedFromTableauToFoundation = (state, payload) => {
    const score = state.score + 10;
    const moves = state.moves + 1;
    return { score, moves };
};

const cardMovedFromFoundationToTableau = (state, payload) => {
    const score = constraintMinScore(state.score - 15);
    const moves = state.moves + 1;
    return { score, moves };
};

const cardStackMovedBetweenTableauPiles = (state, payload) => {
    const score = state.score + 5;
    const moves = state.moves + 1;
    return { score, moves };
};

const cardMovedFromStockToTableau = (state, payload) => {
    const score = state.score + 5;
    const moves = state.moves + 1;
    return { score, moves };
};

module.exports = {
    [Game.EVENTS.GAME_INITIALIZED]: gameInitialized,
    [Stock.EVENTS.STOCK_CARD_FLIPPED]: stockCardFlipped,
    [Foundation.EVENTS.CARD_MOVED_FROM_STOCK_TO_FOUNDATION]: cardMovedFromStockToFoundation,
    [Foundation.EVENTS.CARD_MOVED_FROM_TABLEAU_TO_FOUNDATION]: cardMovedFromTableauToFoundation,
    [Tableau.EVENTS.CARD_MOVED_FROM_FOUNDATION_TO_TABLEAU]: cardMovedFromFoundationToTableau,
    [Tableau.EVENTS.CARD_STACK_MOVED_BETWEEN_TABLEAU_PILES]: cardStackMovedBetweenTableauPiles,
    [Tableau.EVENTS.CARD_MOVED_FROM_STOCK_TO_TABLEAU]: cardMovedFromStockToTableau,
};

const {
    suits,
    isValidCardSetSequence,
} = require('../cards');

const isValidTableauCardSuitSequence = (bottomCard, topCard) => {
    if (suits[bottomCard.suit].neast.includes(topCard.suit))
        return true;

    return false;
}

const isValidTableauSequence = (bottomCard, topCard) => {
    if (!bottomCard && topCard.value === 'KING') {
        return true;
    }

    if (bottomCard && isValidTableauCardSuitSequence(bottomCard, topCard) && isValidCardSetSequence(topCard, bottomCard))
        return true;

    return false;
}

const moveCardStackFromPileToTableau = (state, { from, position, to }) => {
    if (from === to)
        return null;

    const pileFrom = state.tableau[from];
    const pileTo = state.tableau[to];

    const topCard = pileFrom[position];
    const bottomCard = pileTo.pop();

    if (isValidTableauSequence(bottomCard, topCard)) {
        return {
            type: 'MOVE_CARD_STACK_FROM_PILE_TO_TABLEAU',
            payload: {
                from,
                position,
                to
            }
        };
    }

    return null;
};

const moveCardStackFromStockToTableau = (state, { position, to }) => {
    const pileTo = state.tableau[to];

    const topCard = state.stock[position];
    const bottomCard = pileTo.pop();

    if (isValidTableauSequence(bottomCard, topCard)) {
        return {
            type: 'MOVE_CARD_STACK_FROM_STOCK_TO_TABLEAU',
            payload: {
                position,
                to
            }
        };
    }

    return null;
};

const moveCardStackFromFoundationToTableau = (state, { from, to }) => {
    const pileTo = state.tableau[to];

    const topCard = state.foundation[from].pop();
    const bottomCard = pileTo.pop();

    if (isValidTableauSequence(bottomCard, topCard)) {
        return {
            type: 'MOVE_CARD_STACK_FROM_FOUNDATION_TO_TABLEAU',
            payload: {
                from,
                to
            }
        };
    }

    return null;
};

module.exports = {
    moveCardStackFromPileToTableau,
    moveCardStackFromStockToTableau,
    moveCardStackFromFoundationToTableau,
};

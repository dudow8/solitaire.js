const {
    cards,
    suits,
    isValidCardSetSequence,
} = require('../cards');

const isValidFoundationCardSuitSequence = (bottomCard, topCard) => {
    if (bottomCard.suit === topCard.suit)
        return true;

    return false;
};

const isValidFoundationSequence = (bottomCard, topCard) => {
    if (!bottomCard && topCard.value === 'ACE') {
        return true;
    }

    if (bottomCard && isValidFoundationCardSuitSequence(bottomCard, topCard) && isValidCardSetSequence(bottomCard, topCard))
        return true;

    return false;
}

const moveCardStackFromTableauToFoundation = (state, { from, position, to }) => {
    const tableauPile = state.tableau[from];
    const foundationPile = state.foundation[to];

    const tableauCard = tableauPile[position];
    const foundationCard = Array.from(foundationPile).pop();

    if (isValidFoundationSequence(foundationCard, tableauCard)) {
        return {
            type: 'MOVE_CARD_STACK_FROM_TABLEAU_TO_FOUNDATION',
            payload: {
                from,
                position,
                to,
            }
        };
    }

    return null;
};

const moveCardStackFromStockToFoundation = (state, { position, to }) => {
    const foundationPile = state.foundation[to];

    const stockCard = state.stock[position];
    const foundationCard = foundationPile.pop();

    if (isValidFoundationSequence(foundationCard, stockCard)) {
        return {
            type: 'MOVE_CARD_STACK_FROM_STOCK_TO_FOUNDATION',
            payload: {
                position,
                to
            }
        };
    }

    return null;
};

module.exports = {
    moveCardStackFromTableauToFoundation,
    moveCardStackFromStockToFoundation,
};

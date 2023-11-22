const {
    cards,
    suits,
    isValidCardSetSequence,
} = require('../../entity/cards');

const isValidFoundationCardSuitSequence = (bottomCard, topCard) => {
    if (bottomCard.suit === topCard.suit)
        return true;

    return false;
};

const isValidFoundationSequence = (bottomCard, topCard) => {
    if (!bottomCard && topCard.value === 'A') {
        return true;
    }

    if (bottomCard && isValidFoundationCardSuitSequence(bottomCard, topCard) && isValidCardSetSequence(bottomCard, topCard))
        return true;

    return false;
}

const moveCardFromTableauToFoundation = (state, { tableauPileIndex, foundationPileIndex }) => {
    const tableauPile = state.tableau.piles[tableauPileIndex];
    const foundationPile = state.foundation.piles[foundationPileIndex];

    const tableauCard = tableauPile[tableauPile.length - 1];
    const foundationTopCard = foundationPile[foundationPile.length - 1] || null;

    if (isValidFoundationSequence(foundationTopCard, tableauCard)) {
        return {
            type: 'foundation/card-moved-from-tableau-to-foundation',
            payload: {
                tableau_pile: tableauPileIndex,
                foundation_pile: foundationPileIndex,
                card: tableauCard,
            }
        };
    }

    return null;
};

const moveCardFromStockToFoundation = (state, { stockIndex, foundationPileIndex }) => {
    const foundationPile = state.foundation.piles[foundationPileIndex];

    const stockCard = state.stock.pile[stockIndex];
    const foundationTopCard = foundationPile[foundationPile.length - 1] || null;

    if (isValidFoundationSequence(foundationTopCard, stockCard)) {
        return {
            type: 'foundation/card-moved-from-stock-to-foundation',
            payload: {
                stock_index: stockIndex,
                foundation_pile: foundationPileIndex,
                card: stockCard,
            }
        };
    }

    return null;
};

module.exports = {
    moveCardFromTableauToFoundation,
    moveCardFromStockToFoundation,
};

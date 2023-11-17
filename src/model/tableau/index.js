const {
    suits,
    isValidCardSetSequence,
} = require('../../entity/cards');

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

const moveCardStackBetweenTableauPiles = (state, { fromTableauPileIndex, fromPileCardPosition, toTableauPileIndex }) => {
    if (fromTableauPileIndex === toTableauPileIndex)
        return null;

    const pileOrigin = state.tableau.piles[fromTableauPileIndex];
    const pileDestination = state.tableau.piles[toTableauPileIndex];
    const stackToMove = pileOrigin.slice(fromPileCardPosition);

    const firstCardFromOriginStack = pileOrigin[fromPileCardPosition];
    const topCardFromDestinationPile = pileDestination[pileDestination.length - 1] || null;

    if (isValidTableauSequence(topCardFromDestinationPile, firstCardFromOriginStack)) {
        return {
            type: 'tableau/card-stack-moved-between-tableau-piles',
            payload: {
                from_pile: fromTableauPileIndex,
                from_pile_card_position: fromPileCardPosition,
                to_pile: toTableauPileIndex,
                card_stack: stackToMove,
            }
        };
    }

    return null;
};

const moveCardFromStockToTableau = (state, { stockIndex, tableauPileIndex }) => {
    const tableauPile = state.tableau.piles[tableauPileIndex];

    const stockCard = state.stock.pile[stockIndex];
    const tableauTopCard = tableauPile[tableauPile.length - 1] || null;

    if (isValidTableauSequence(tableauTopCard, stockCard)) {
        return {
            type: 'tableau/card-moved-from-stock-to-tableau',
            payload: {
                stock_index: stockIndex,
                tableau_pile: tableauPileIndex,
                card: stockCard,
            }
        };
    }

    return null;
};

const moveCardFromFoundationToTableau = (state, { foundationPileIndex, tableauPileIndex }) => {
    const foudationPile = state.foundation.piles[foundationPileIndex];
    const tableauPile = state.tableau.piles[tableauPileIndex];

    const foundationCard = foudationPile[foudationPile.length - 1];
    const tableauTopCard = tableauPile[tableauPile.length - 1] || null;

    if (isValidTableauSequence(tableauTopCard, foundationCard)) {
        return {
            type: 'tableau/card-moved-from-foundation-to-tableau',
            payload: {
                foundation_pile: foundationPileIndex,
                tableau_pile: tableauPileIndex,
                card: foundationCard,
            }
        };
    }

    return null;
};

module.exports = {
    moveCardStackBetweenTableauPiles,
    moveCardFromStockToTableau,
    moveCardFromFoundationToTableau,
};

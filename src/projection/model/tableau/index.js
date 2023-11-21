const flipPileTopCard = (pile) => {
    if (pile.length) {
        const card = pile.slice(-1)[0];
        return [
            ...pile.slice(0, -1),
            { ...card, flipped: false },
        ];
    }

    return pile;
};

const gameInitialized = (state, { payload }) => {
    const { tableau } = payload;
    const piles = Object
        .keys(tableau)
        .reduce((state, pile_idx) => {
            const pile = tableau[pile_idx].map((card, card_idx) => ({
                ...card,
                flipped: card_idx !== pile_idx - 1,
            }));
            return {
                ...state,
                [pile_idx]: pile,
            };
        }, {});

    return {
        piles,
    };
};

const cardStackMovedBetweenTableauPiles = (state, { payload }) => {
    const originPile = flipPileTopCard(
        state.piles[payload.from_pile].slice(0, payload.from_pile_card_position)
    );
    const destinationPile = state.piles[payload.to_pile].concat(payload.card_stack);
    const piles = {
        ...state.piles,
        [payload.from_pile]: originPile,
        [payload.to_pile]: destinationPile,
    }
    return { ...state, piles };
};

const cardMovedFromStockToTableau = (state, { payload }) => {
    const pile = state.piles[payload.tableau_pile].concat(payload.card);
    const piles = {
        ...state.piles,
        [payload.tableau_pile]: pile,
    };
    return { ...state, piles };
};

const cardMovedFromFoundationToTableau = (state, { payload }) => {
    const pile = state.piles[payload.tableau_pile].concat(payload.card);
    const piles = {
        ...state.piles,
        [payload.tableau_pile]: pile,
    };
    return { ...state, piles };
};

const cardMovedFromTableauToFoundation = (state, { payload }) => {
    const pile = flipPileTopCard(
        state.piles[payload.tableau_pile].slice(0, -1))
        ;
    const piles = {
        ...state.piles,
        [payload.tableau_pile]: pile,
    };
    return { ...state, piles };
};

module.exports = {
    'solitaire/game-initialized': gameInitialized,
    'tableau/card-stack-moved-between-tableau-piles': cardStackMovedBetweenTableauPiles,
    'tableau/card-moved-from-stock-to-tableau': cardMovedFromStockToTableau,
    'tableau/card-moved-from-foundation-to-tableau': cardMovedFromFoundationToTableau,
    'foundation/card-moved-from-tableau-to-foundation': cardMovedFromTableauToFoundation,
};

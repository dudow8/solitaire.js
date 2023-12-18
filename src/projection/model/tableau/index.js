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
        5: [],
        6: [],
        7: [], 
    },
});

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
    const pile = flipPileTopCard(state.piles[payload.tableau_pile].slice(0, -1));
    const piles = {
        ...state.piles,
        [payload.tableau_pile]: pile,
    };
    return { ...state, piles };
};

module.exports = {
    [Projection.EVENTS.INITIALIZED]: onCreate,
    [Game.EVENTS.GAME_INITIALIZED]: gameInitialized,
    [Tableau.EVENTS.CARD_STACK_MOVED_BETWEEN_TABLEAU_PILES]: cardStackMovedBetweenTableauPiles,
    [Tableau.EVENTS.CARD_MOVED_FROM_STOCK_TO_TABLEAU]: cardMovedFromStockToTableau,
    [Tableau.EVENTS.CARD_MOVED_FROM_FOUNDATION_TO_TABLEAU]: cardMovedFromFoundationToTableau,
    [Foundation.EVENTS.CARD_MOVED_FROM_TABLEAU_TO_FOUNDATION]: cardMovedFromTableauToFoundation,
};

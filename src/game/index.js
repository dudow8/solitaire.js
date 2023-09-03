// Game State
const gameStateReducer = (state = [], { type, payload }) => {
    switch (type) {
        case 'NEW_GAME':
            return { ...payload };

        case 'MOVE_CARD_STACK_FROM_PILE_TO_PILE':
            const piles = {
                ...state.piles,
            }
            return {
                ...state,
                piles
            };

        default:
            return state;
    }
};

const gameQueryStateReducer = (state = [], { type, payload }) => {
    switch (type) {
        default:
            return state;
    }
}

const gameState = [];
const gameStateEventDispatch = (action) => {
    gameState.push(action);
};
const getGameState = () => {
    const state = gameState.reduce((previous, current) => (
        gameStateReducer(previous, current)
    ), []);
    return state;
}

// Game Commands
const startGame = (cardPack) => {
    const action = {
        type: 'NEW_GAME',
        payload: {
            cardPack,
            stock: cardPack.slice(28),
            foundation: {
                1: [],
                2: [],
                3: [],
                4: [],
            },
            tableau: {
                1: cardPack.slice(0, 1),
                2: cardPack.slice(1, 3),
                3: cardPack.slice(3, 6),
                4: cardPack.slice(6, 10),
                5: cardPack.slice(10, 15),
                6: cardPack.slice(15, 21),
                7: cardPack.slice(21, 28),
            }
        }
    };
    gameStateEventDispatch(action);
};
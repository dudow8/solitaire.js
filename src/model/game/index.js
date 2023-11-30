const {
    cards,
    shuffleCards,
} = require('../../entity/cards');

const STATE = {
    PLAYING: 'playing',
    COMPLETED: 'completed',
};

const EVENTS = {
    GAME_INITIALIZED: 'solitaire/game-initialized',
    GAME_COMPLETED: 'solitaire/game-completed',
};

const initializeGame = () => {
    const card_pack = shuffleCards(cards);
    return {
        type: EVENTS.GAME_INITIALIZED,
        payload: {
            card_pack,
            game_state: STATE.PLAYING,
            stock: card_pack.slice(28),
            foundation: {
                1: [],
                2: [],
                3: [],
                4: [],
            },
            tableau: {
                1: card_pack.slice(0, 1),
                2: card_pack.slice(1, 3),
                3: card_pack.slice(3, 6),
                4: card_pack.slice(6, 10),
                5: card_pack.slice(10, 15),
                6: card_pack.slice(15, 21),
                7: card_pack.slice(21, 28),
            }
        }
    };
};

const completeGame = (state) => {
    const foundations = Object.keys(state.foundation.piles);
    const completed = foundations.reduce((acumulated, idx) => {
        const isCompleted = state.foundation.piles[idx].length === 13;
        return acumulated && isCompleted;
    }, true);

    if (completed) {
        return {
            type: EVENTS.GAME_COMPLETED,
            payload: {
                game_state: STATE.COMPLETED,
            },
        }
    };

    return null;
};

module.exports = {
    STATE,
    EVENTS,
    initializeGame,
    completeGame,
};

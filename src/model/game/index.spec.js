const {
    STATE,
    completeGame,
    initializeGame,
} = require('./index');
const {
    SET,
    SUITS,
    cardFactory,
} = require('../../entity/cards');

describe('Model/Game', () => {
    describe('initializeGame()', () => {
        test('Should correclty distribute the sorted cards between the tableau piles and stock', () => {
            const event = initializeGame();
            const { payload: state } = event;

            expect(state.tableau['1'].length).toBe(1);
            expect(state.tableau['2'].length).toBe(2);
            expect(state.tableau['3'].length).toBe(3);
            expect(state.tableau['4'].length).toBe(4);
            expect(state.tableau['5'].length).toBe(5);
            expect(state.tableau['6'].length).toBe(6);
            expect(state.tableau['7'].length).toBe(7);

            expect(state.stock.length).toBe(24);
        });
    });

    describe('completeGame()', () => {
        test('should finish the game with all foundations complete', () => {
            const generateFullPile = (suit) => {
                return Object.keys(SET).map(setIDX => {
                    cardFactory(SET[setIDX], SUITS[suit])
                });
            };

            const state = {
                foundation: {
                    piles: {
                        1: generateFullPile(SUITS.HEART),
                        2: generateFullPile(SUITS.CLUB),
                        3: generateFullPile(SUITS.DIAMOND),
                        4: generateFullPile(SUITS.SPADE),
                    }
                }
            };

            const event = completeGame(state);
            expect(event.payload.game_state).toBe(STATE.COMPLETED);
        });

        test('should be null case not all foundations are complete', () => {
            const generateFullPile = (suit) => {
                return Object.keys(SET).map(setIDX => {
                    cardFactory(SET[setIDX], SUITS[suit])
                });
            };

            const state = {
                foundation: {
                    piles: {
                        1: generateFullPile(SUITS.HEART),
                        2: generateFullPile(SUITS.CLUB).slice(0, -1),
                        3: generateFullPile(SUITS.DIAMOND),
                        4: generateFullPile(SUITS.SPADE),
                    }
                }
            };

            const event = completeGame(state);
            expect(event).toBeNull();
        });
    });
});

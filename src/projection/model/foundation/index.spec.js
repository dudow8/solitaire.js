const FoundationProjection = require('./index');
const {
    Game,
    Tableau,
    Foundation,
} = require('../../../model');
const {
    SET,
    SUITS,
    cardFactory,
} = require('../../../entity/cards');

describe('Projection/Foundation', () => {
    const heartAceCard = cardFactory(SET.ACE, SUITS.HEART);

    describe('gameInitialized()', () => {
        const gameInitialized = FoundationProjection[Game.EVENTS.GAME_INITIALIZED];

        test('Should return a valid state', () => {
            const event = {
                payload: {
                    foundation: {
                        1: [],
                        2: [],
                        3: [],
                        4: [],
                    }
                }
            };

            const snapshot = gameInitialized({}, event);
            expect(Object.keys(snapshot.piles).length).toBe(4);
            expect(snapshot.piles[1].length).toBe(0);
            expect(snapshot.piles[2].length).toBe(0);
            expect(snapshot.piles[3].length).toBe(0);
            expect(snapshot.piles[4].length).toBe(0);
        });
    });

    describe('cardMovedFromTableauToFoundation()', () => {
        const cardMovedFromTableauToFoundation =
            FoundationProjection[Foundation.EVENTS.CARD_MOVED_FROM_TABLEAU_TO_FOUNDATION];

        test('Should return a valid state', () => {
            const state = {
                piles: {
                    1: [],
                    2: [],
                    3: [],
                    4: [],
                }
            };
            const event = {
                payload: {
                    tableau_pile: 1,
                    foundation_pile: 1,
                    card: heartAceCard,
                }
            };

            const snapshot = cardMovedFromTableauToFoundation(state, event);
            expect(snapshot.piles[1].length).toBe(1);
            expect(snapshot.piles[2].length).toBe(0);
            expect(snapshot.piles[3].length).toBe(0);
            expect(snapshot.piles[4].length).toBe(0);
        });
    });

    describe('cardMovedFromStockToFoundation()', () => {
        const cardMovedFromStockToFoundation =
            FoundationProjection[Foundation.EVENTS.CARD_MOVED_FROM_STOCK_TO_FOUNDATION];

        test('Should return a valid state', () => {
            const state = {
                piles: {
                    1: [],
                    2: [],
                    3: [],
                    4: [],
                }
            };
            const event = {
                payload: {
                    stock_index: 1,
                    foundation_pile: 1,
                    card: heartAceCard,
                }
            };

            const snapshot = cardMovedFromStockToFoundation(state, event);
            expect(snapshot.piles[1].length).toBe(1);
            expect(snapshot.piles[2].length).toBe(0);
            expect(snapshot.piles[3].length).toBe(0);
            expect(snapshot.piles[4].length).toBe(0);
        });
    });

    describe('cardMovedFromFoundationToTableau()', () => {
        const cardMovedFromFoundationToTableau =
            FoundationProjection[Tableau.EVENTS.CARD_MOVED_FROM_FOUNDATION_TO_TABLEAU];

        test('Should return a valid state', () => {
            const state = {
                piles: {
                    1: [heartAceCard],
                    2: [],
                    3: [],
                    4: [],
                }
            };
            const event = {
                payload: {
                    foundation_pile: 1,
                    tableau_pile: 1,
                    card: heartAceCard,
                }
            };

            const snapshot = cardMovedFromFoundationToTableau(state, event);
            expect(snapshot.piles[1].length).toBe(0);
        });
    });
});

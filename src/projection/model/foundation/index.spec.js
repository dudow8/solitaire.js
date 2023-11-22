const FoundationProjection = require('./index');

describe('Projection/Foundation', () => {
    const heartAceCard = {
        index: 0,
        value: 'ACE',
        suit: 'heart',
    };

    describe('gameInitialized()', () => {
        const gameInitialized = FoundationProjection['solitaire/game-initialized'];

        test('valid event data', () => {
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
        const cardMovedFromTableauToFoundation = FoundationProjection['foundation/card-moved-from-tableau-to-foundation'];

        test('valid event data', () => {
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
        const cardMovedFromStockToFoundation = FoundationProjection['foundation/card-moved-from-stock-to-foundation'];

        test('valid event data', () => {
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

    describe('cardMovedFromFoundationToTableau', () => {
        const cardMovedFromFoundationToTableau = FoundationProjection['tableau/card-moved-from-foundation-to-tableau'];

        test('valid event data', () => {
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

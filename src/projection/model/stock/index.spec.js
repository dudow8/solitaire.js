const StockProjection = require('./index');
const { Game } = require('../../../model');

describe('Projection/Stock', () => {
    const heartAceCard = {
        index: 0,
        value: 'ACE',
        suit: 'heart',
    };
    const heartTwoCard = {
        index: 1,
        value: '2',
        suit: 'heart',
    };
    const spadeTwoCard = {
        index: 1,
        value: '2',
        suit: 'spade',
    };

    describe('gameInitialized()', () => {
        const gameInitialized = StockProjection['solitaire/game-initialized'];

        test('valid event data', () => {
            const event = Game.initializeGame();
            const snapshot = gameInitialized({}, event);

            expect(snapshot.pile.length).toBe(24);
            expect(snapshot.active.index).toBeNull();
            expect(snapshot.active.card).toBeNull();
        });
    });

    describe('stockCardFlipped()', () => {
        const stockCardFlipped = StockProjection['stock/stock-card-flipped'];

        test('valid event data', () => {
            const state = {
                active: {
                    index: null,
                    card: null,
                },
                pile: [heartAceCard, heartTwoCard, spadeTwoCard],
            };
            const event = {
                payload: {
                    active_index: 0,
                    active_card: heartAceCard,
                }
            };

            const snapshot = stockCardFlipped(state, event);
            expect(snapshot.active.index).toBe(0);
            expect(snapshot.active.card).toBe(heartAceCard);
        });
    });

    describe('cardMovedFromStockToTableau()', () => {
        const cardMovedFromStockToTableau = StockProjection['tableau/card-moved-from-stock-to-tableau'];

        test('valid event with remaining itens on the stock pile', () => {
            const state = {
                active: {
                    index: 1,
                    card: heartTwoCard,
                },
                pile: [heartAceCard, heartTwoCard, spadeTwoCard],
            };
            const event = {
                payload: {
                    stock_index: 1,
                    tableau_pile: 1,
                    card: heartTwoCard,
                }
            };

            const snapshot = cardMovedFromStockToTableau(state, event);
            expect(snapshot.active.index).toBe(0);
            expect(snapshot.active.card).toBe(heartAceCard);
            expect(snapshot.pile).toEqual([heartAceCard, spadeTwoCard]);
        });

        test('valid event with no active card but cards available on the stock pile', () => {
            const state = {
                active: {
                    index: 0,
                    card: heartAceCard,
                },
                pile: [heartAceCard, heartTwoCard, spadeTwoCard],
            };
            const event = {
                payload: {
                    stock_index: 0,
                    tableau_pile: 1,
                    card: heartAceCard,
                }
            };

            const snapshot = cardMovedFromStockToTableau(state, event);
            expect(snapshot.active.index).toBeNull();
            expect(snapshot.active.card).toBeNull();
            expect(snapshot.pile).toEqual([heartTwoCard, spadeTwoCard]);
        });

        test('valid event with no remaining card on the stock pile', () => {
            const state = {
                active: {
                    index: 0,
                    card: heartAceCard,
                },
                pile: [heartAceCard],
            };
            const event = {
                payload: {
                    stock_index: 0,
                    tableau_pile: 1,
                    card: heartAceCard,
                }
            };

            const snapshot = cardMovedFromStockToTableau(state, event);
            expect(snapshot.active.index).toBeNull();
            expect(snapshot.active.card).toBeNull();
            expect(snapshot.pile).toEqual([]);
        });
    });

    describe('cardMovedFromStockToFoundation()', () => {
        const cardMovedFromStockToFoundation = StockProjection['foundation/card-moved-from-stock-to-foundation'];

        test('valid event with remaining itens on the stock pile', () => {
            const state = {
                active: {
                    index: 1,
                    card: heartTwoCard,
                },
                pile: [heartAceCard, heartTwoCard, spadeTwoCard],
            };
            const event = {
                payload: {
                    stock_index: 1,
                    foundation_pile: 1,
                    card: heartTwoCard,
                }
            };

            const snapshot = cardMovedFromStockToFoundation(state, event);
            expect(snapshot.active.index).toBe(0);
            expect(snapshot.active.card).toBe(heartAceCard);
            expect(snapshot.pile).toEqual([heartAceCard, spadeTwoCard]);
        });

        test('valid event with no active card but cards available on the stock pile', () => {
            const state = {
                active: {
                    index: 0,
                    card: heartAceCard,
                },
                pile: [heartAceCard, heartTwoCard, spadeTwoCard],
            };
            const event = {
                payload: {
                    stock_index: 0,
                    foundation_pile: 1,
                    card: heartAceCard,
                }
            };

            const snapshot = cardMovedFromStockToFoundation(state, event);
            expect(snapshot.active.index).toBeNull();
            expect(snapshot.active.card).toBeNull();
            expect(snapshot.pile).toEqual([heartTwoCard, spadeTwoCard]);
        });

        test('valid event with no remaining card on the stock pile', () => {
            const state = {
                active: {
                    index: 0,
                    card: heartAceCard,
                },
                pile: [heartAceCard],
            };
            const event = {
                payload: {
                    stock_index: 0,
                    foundation_pile: 1,
                    card: heartAceCard,
                }
            };

            const snapshot = cardMovedFromStockToFoundation(state, event);
            expect(snapshot.active.index).toBeNull();
            expect(snapshot.active.card).toBeNull();
            expect(snapshot.pile).toEqual([]);
        });
    });
});

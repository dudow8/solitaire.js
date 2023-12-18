const StockProjection = require('./index');
const Projection = require('../../../commons/projection');
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

describe('Projection/Stock', () => {
    const heartAceCard = cardFactory(SET.ACE, SUITS.HEART);
    const heartTwoCard = cardFactory(SET.TWO, SUITS.HEART);
    const spadeTwoCard = cardFactory(SET.TWO, SUITS.SPADE);

    describe('onCreate()', () => {
        const onCreate = StockProjection[Projection.EVENTS.INITIALIZED];

        test('should return the initial value', () => {
            const state = onCreate();
            const expected_state = {
                active: {
                    index: null,
                    card: null,
                },
                pile: [],
            };

            expect(state).toEqual(expected_state);
        });
    });


    describe('gameInitialized()', () => {
        const gameInitialized = StockProjection[Game.EVENTS.GAME_INITIALIZED];

        test('Should return a valid state', () => {
            const event = Game.initializeGame();
            const snapshot = gameInitialized({}, event);

            expect(snapshot.pile.length).toBe(24);
            expect(snapshot.active.index).toBeNull();
            expect(snapshot.active.card).toBeNull();
        });
    });

    describe('stockCardFlipped()', () => {
        const stockCardFlipped = StockProjection['stock/stock-card-flipped'];

        test('Should return a valid state', () => {
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
        const cardMovedFromStockToTableau =
            StockProjection[Tableau.EVENTS.CARD_MOVED_FROM_STOCK_TO_TABLEAU];

        test('Should return a state removing current active card and seting active card as active.index - 1', () => {
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

        test('Should return a state with active[index, card] = null, because active.index - 1 < 0', () => {
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

        test('Should return a state removing current active card, stock pile = [] and active[index, card] = null', () => {
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
        const cardMovedFromStockToFoundation =
            StockProjection[Foundation.EVENTS.CARD_MOVED_FROM_STOCK_TO_FOUNDATION];

        test('Should return a state removing current active card and seting active card as active.index - 1', () => {
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

        test('Should return a state with active[index, card] = null, because active.index - 1 < 0', () => {
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

        test('Should return a state removing current active card, stock pile = [] and active[index, card] = null', () => {
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

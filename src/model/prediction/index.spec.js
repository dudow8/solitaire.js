const {
    predictStockMove,
    predictTableauMove,
} = require('./index');
const {
    SET,
    SUITS,
    cardFactory,
} = require('../../entity/cards');
const {
    Foundation,
    Tableau,
} = require('..');

describe('Model/Prediction', () => {
    const heartAceCard = cardFactory(SET.ACE, SUITS.HEART);
    const heartTwoCard = cardFactory(SET.TWO, SUITS.HEART);
    const spadeTwoCard = cardFactory(SET.TWO, SUITS.SPADE);
    const heartTreeCard = cardFactory(SET.THREE, SUITS.HEART);
    const heartKingCard = cardFactory(SET.KING, SUITS.HEART);
    const heartKingCardFlipped = cardFactory(SET.KING, SUITS.HEART, true);

    describe('predictStockMove', () => {
        test('should match a move to foundation.piles[3]', () => {
            const state = {
                stock: {
                    active: {
                        index: 0,
                    },
                    pile: [heartTwoCard, heartTreeCard]
                },
                foundation: {
                    piles: {
                        1: [],
                        2: [],
                        3: [heartAceCard],
                        4: [],
                    }
                },
                tableau: {
                    piles: {},
                }
            };

            const event = predictStockMove(state);
            expect(event).not.toBeNull();
            expect(event.type).toBe(Foundation.EVENTS.CARD_MOVED_FROM_STOCK_TO_FOUNDATION);
            expect(event.payload.card).toEqual(heartTwoCard);
            expect(
                parseInt(event.payload.foundation_pile)
            ).toBe(3);
        });

        test('should match a move to foundation.piles[1]', () => {
            const state = {
                stock: {
                    active: {
                        index: 1,
                    },
                    pile: [heartTwoCard, heartAceCard, heartTreeCard]
                },
                foundation: {
                    piles: {
                        1: [],
                        2: [],
                        3: [],
                        4: [],
                    }
                },
                tableau: {
                    piles: {},
                }
            };

            const event = predictStockMove(state);
            expect(event).not.toBeNull();
            expect(event.type).toBe(Foundation.EVENTS.CARD_MOVED_FROM_STOCK_TO_FOUNDATION);
            expect(event.payload.card).toEqual(heartAceCard);
            expect(
                parseInt(event.payload.foundation_pile)
            ).toBe(1);
        });

        test('should match a move to tableau.piles[4]', () => {
            const state = {
                stock: {
                    active: {
                        index: 0,
                    },
                    pile: [spadeTwoCard, heartAceCard],
                },
                foundation: {
                    piles: { 1: [], 2: [], 3: [], 4: [] }
                },
                tableau: {
                    piles: {
                        1: [],
                        2: [],
                        3: [],
                        4: [heartTreeCard],
                        5: [],
                        6: [],
                        7: [],
                    },
                }
            };

            const event = predictStockMove(state);
            expect(event).not.toBeNull();
            expect(event.type).toBe(Tableau.EVENTS.CARD_MOVED_FROM_STOCK_TO_TABLEAU);
            expect(event.payload.card).toEqual(spadeTwoCard);
            expect(
                parseInt(event.payload.tableau_pile)
            ).toBe(4);
        });

        test('should match a move to tableau.piles[2]', () => {
            const state = {
                stock: {
                    active: {
                        index: 0,
                    },
                    pile: [heartKingCard, spadeTwoCard, heartAceCard],
                },
                foundation: {
                    piles: { 1: [], 2: [], 3: [], 4: [] }
                },
                tableau: {
                    piles: {
                        1: [heartTreeCard],
                        2: [],
                        3: [],
                        4: [],
                        5: [],
                        6: [],
                        7: [],
                    },
                }
            };

            const event = predictStockMove(state);
            expect(event).not.toBeNull();
            expect(event.type).toBe(Tableau.EVENTS.CARD_MOVED_FROM_STOCK_TO_TABLEAU);
            expect(event.payload.card).toEqual(heartKingCard);
            expect(
                parseInt(event.payload.tableau_pile)
            ).toBe(2);
        });

        test('should not match a move', () => {
            const state = {
                stock: {
                    active: {
                        index: 1,
                    },
                    pile: [heartKingCard, heartTreeCard, heartAceCard],
                },
                foundation: {
                    piles: { 1: [], 2: [], 3: [], 4: [] }
                },
                tableau: {
                    piles: {
                        1: [],
                        2: [spadeTwoCard],
                        3: [],
                        4: [],
                        5: [],
                        6: [],
                        7: [],
                    },
                }
            };

            const event = predictStockMove(state);
            expect(event).toBeNull();
        });
    });

    describe('predictTableauMove', () => {
        test('should match a move to foundation.piles[3]', () => {
            const state = {
                foundation: {
                    piles: {
                        1: [],
                        2: [],
                        3: [heartAceCard],
                        4: [],
                    }
                },
                tableau: {
                    piles: {
                        1: [],
                        2: [],
                        3: [heartKingCardFlipped, heartTreeCard, heartTwoCard],
                        4: [],
                        5: [],
                        6: [],
                        7: [],
                    },
                }
            };
            const payload = {
                from_tableau_pile_index: 3,
                from_pile_card_position: 2,
            };

            const event = predictTableauMove(state, payload);
            expect(event).not.toBeNull();
            expect(event.type).toBe(Foundation.EVENTS.CARD_MOVED_FROM_TABLEAU_TO_FOUNDATION);
            expect(event.payload.card).toEqual(heartTwoCard);
            expect(
                parseInt(event.payload.foundation_pile)
            ).toBe(3);
        });

        test('should match a move to foundation.piles[1]', () => {
            const state = {
                foundation: {
                    piles: {
                        1: [],
                        2: [],
                        3: [],
                        4: [],
                    }
                },
                tableau: {
                    piles: {
                        1: [],
                        2: [],
                        3: [heartKingCardFlipped, heartTreeCard, heartTwoCard],
                        4: [],
                        5: [heartAceCard],
                        6: [],
                        7: [],
                    },
                }
            };
            const payload = {
                from_tableau_pile_index: 5,
                from_pile_card_position: 0,
            };

            const event = predictTableauMove(state, payload);
            expect(event).not.toBeNull();
            expect(event.type).toBe(Foundation.EVENTS.CARD_MOVED_FROM_TABLEAU_TO_FOUNDATION);
            expect(event.payload.card).toEqual(heartAceCard);
            expect(
                parseInt(event.payload.foundation_pile)
            ).toBe(1);
        });
    });
});

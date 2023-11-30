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
    const spadeTwoCardFlipped = cardFactory(SET.TWO, SUITS.SPADE, true);
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
                fromTableauPileIndex: 3,
                fromPileCardPosition: 2,
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
                fromTableauPileIndex: 5,
                fromPileCardPosition: 0,
            };

            const event = predictTableauMove(state, payload);
            expect(event).not.toBeNull();
            expect(event.type).toBe(Foundation.EVENTS.CARD_MOVED_FROM_TABLEAU_TO_FOUNDATION);
            expect(event.payload.card).toEqual(heartAceCard);
            expect(
                parseInt(event.payload.foundation_pile)
            ).toBe(1);
        });

        test('should match a move to tableau.piles[4]', () => {
            const state = {
                foundation: {
                    piles: { 1: [], 2: [], 3: [], 4: [] }
                },
                tableau: {
                    piles: {
                        1: [spadeTwoCard, heartAceCard],
                        2: [],
                        3: [],
                        4: [heartTreeCard],
                        5: [],
                        6: [],
                        7: [],
                    },
                }
            };
            const payload = {
                fromTableauPileIndex: 1,
                fromPileCardPosition: 0,
            };

            const event = predictTableauMove(state, payload);
            expect(event).not.toBeNull();
            expect(event.type).toBe(Tableau.EVENTS.CARD_STACK_MOVED_BETWEEN_TABLEAU_PILES);
            expect(event.payload.card_stack).toEqual([spadeTwoCard, heartAceCard]);
            expect(
                parseInt(event.payload.to_pile)
            ).toBe(4);
        });

        test('should match a move to tableau.piles[3] when moving a king to an empty pile', () => {
            const state = {
                foundation: {
                    piles: { 1: [], 2: [], 3: [], 4: [] }
                },
                tableau: {
                    piles: {
                        1: [spadeTwoCardFlipped, heartKingCard],
                        2: [heartTreeCard],
                        3: [],
                        4: [],
                        5: [],
                        6: [],
                        7: [],
                    },
                }
            };
            const payload = {
                fromTableauPileIndex: 1,
                fromPileCardPosition: 1,
            };

            const event = predictTableauMove(state, payload);
            expect(event).not.toBeNull();
            expect(event.type).toBe(Tableau.EVENTS.CARD_STACK_MOVED_BETWEEN_TABLEAU_PILES);
            expect(event.payload.card_stack).toEqual([heartKingCard]);
            expect(
                parseInt(event.payload.to_pile)
            ).toBe(3);
        });

        test('should not match a move if the top card is flipped', () => {
            const state = {
                foundation: {
                    piles: { 1: [heartAceCard], 2: [], 3: [], 4: [] }
                },
                tableau: {
                    piles: {
                        1: [],
                        2: [heartKingCardFlipped, spadeTwoCard],
                        3: [],
                        4: [heartTreeCard],
                        5: [],
                        6: [],
                        7: [],
                    },
                }
            };
            const payload = {
                fromTableauPileIndex: 2,
                fromPileCardPosition: 0,
            };

            const event = predictTableauMove(state, payload);
            expect(event).toBeNull();
        });

        test('should not match a move', () => {
            const state = {
                foundation: {
                    piles: { 1: [heartAceCard], 2: [], 3: [], 4: [] }
                },
                tableau: {
                    piles: {
                        1: [],
                        2: [heartKingCardFlipped, heartTreeCard],
                        3: [],
                        4: [spadeTwoCard],
                        5: [],
                        6: [],
                        7: [],
                    },
                }
            };
            const payload = {
                fromTableauPileIndex: 2,
                fromPileCardPosition: 1,
            };

            const event = predictTableauMove(state, payload);
            expect(event).toBeNull();
        });
    });
});

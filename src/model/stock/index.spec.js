const {
    flipStockCard,
    predictMove,
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

describe('Model/Stock', () => {
    const heartAceCard = cardFactory(SET.ACE, SUITS.HEART);
    const heartTwoCard = cardFactory(SET.TWO, SUITS.HEART);
    const spadeTwoCard = cardFactory(SET.TWO, SUITS.SPADE);
    const heartTreeCard = cardFactory(SET.THREE, SUITS.HEART);
    const heartKingCard = cardFactory(SET.KING, SUITS.HEART);

    describe('flipStockCard()', () => {
        test('Active index should be 0 when there`s no previous active card', () => {
            const state = {
                stock: {
                    active: {
                        card: null,
                        index: null,
                    },
                    pile: [heartAceCard, heartTwoCard, heartTreeCard]
                }
            };

            const event = flipStockCard(state);
            expect(event.payload.active_card).toEqual(heartAceCard);
            expect(event.payload.active_index).toBe(0);
        });

        test('Active index should be a sequential index when there`s a previous active card', () => {
            const state = {
                stock: {
                    active: {
                        card: heartTwoCard,
                        index: 1,
                    },
                    pile: [heartAceCard, heartTwoCard, heartTreeCard]
                }
            };

            const event = flipStockCard(state);
            expect(event.payload.active_card).toEqual(heartTreeCard);
            expect(event.payload.active_index).toBe(2);
        });

        test('Active index should be null when next index is bigger then stock pile', () => {
            const state = {
                stock: {
                    active: {
                        card: heartTreeCard,
                        index: 2,
                    },
                    pile: [heartAceCard, heartTwoCard, heartTreeCard]
                }
            };

            const event = flipStockCard(state);
            expect(event.payload.active_card).toBeNull();
            expect(event.payload.active_index).toBeNull();
        });

        test('Next active index should be null with only one card in the stock pile', () => {
            const state = {
                stock: {
                    active: {
                        card: heartAceCard,
                        index: 0,
                    },
                    pile: [heartAceCard]
                }
            };

            const event = flipStockCard(state);
            expect(event.payload.active_card).toBeNull();
            expect(event.payload.active_index).toBeNull();
        });

        test('Next active index should be always null with no cards in the stock pile', () => {
            const state = {
                stock: {
                    active: {
                        card: null,
                        index: null,
                    },
                    pile: []
                }

            };
            const event = flipStockCard(state);
            const event_next = flipStockCard(state);

            expect(event).toBeNull();
            expect(event_next).toBeNull();
        });
    });

    describe('predictMove', () => {
        test('should find a move to foundation.piles[3]', () => {
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

            const event = predictMove(state);
            expect(event).not.toBeNull();
            expect(event.type).toBe(Foundation.EVENTS.CARD_MOVED_FROM_STOCK_TO_FOUNDATION);
            expect(event.payload.card).toEqual(heartTwoCard);
            expect(
                parseInt(event.payload.foundation_pile)
            ).toBe(3);
        });

        test('should find a move to foundation.piles[1]', () => {
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

            const event = predictMove(state);
            expect(event).not.toBeNull();
            expect(event.type).toBe(Foundation.EVENTS.CARD_MOVED_FROM_STOCK_TO_FOUNDATION);
            expect(event.payload.card).toEqual(heartAceCard);
            expect(
                parseInt(event.payload.foundation_pile)
            ).toBe(1);
        });

        test('should find a move to tableau.piles[4]', () => {
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

            const event = predictMove(state);
            expect(event).not.toBeNull();
            expect(event.type).toBe(Tableau.EVENTS.CARD_MOVED_FROM_STOCK_TO_TABLEAU);
            expect(event.payload.card).toEqual(spadeTwoCard);
            expect(
                parseInt(event.payload.tableau_pile)
            ).toBe(4);
        });

        test('should find a move to tableau.piles[2]', () => {
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

            const event = predictMove(state);
            expect(event).not.toBeNull();
            expect(event.type).toBe(Tableau.EVENTS.CARD_MOVED_FROM_STOCK_TO_TABLEAU);
            expect(event.payload.card).toEqual(heartKingCard);
            expect(
                parseInt(event.payload.tableau_pile)
            ).toBe(2);
        });

        test('should not find a move', () => {
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

            const event = predictMove(state);
            expect(event).toBeNull();
        });
    });
});
